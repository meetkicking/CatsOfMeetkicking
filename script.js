if (!pets) {
fetch(path + "/show")
    .then(function (response) {
        //console.log(response);
        return response.json();
    })
    .then(function (data) {
        //console.log(data);
        if (data.length) {
            pets = data;
            localStorage.setItem("CatsOfMeetkicking", JSON.stringify(data));
            for (let pet of data) {
                createCard(pet, block);
            }
        }
    })
}

    /*fetch(path + "/show")
    .then(response => response.json())
    .then(data => { console.log(data) });
    */

    addBtn.addEventListener("click", event => {
        mdBox.classList.toggle("active");
    });

    mdClose.addEventListener("click", event => {
        mdBox.classList.remove("active");
    });

    mdBox.addEventListener("click", event => {
        if (event.target === event.currentTarget) {
            mdBox.classList.remove("active");
        }
    });

    /*addForm.elements.favourite.addEventListener("change", event => {
        console.log(event.currentTarget.value);
        console.log(event.currentTarget.checked);
    })*/

    addForm.elements.image.addEventListener("change", event => {
        //const previewTag = addForm.querySelector(".preview");
        previewTag.style.backgroundImage = `url(${event.currentTarget.value})`;
    })

    addForm.addEventListener("submit", event => {
        event.stopPropagation()

        event.preventDefault();
        //console.log("hi!");

        /*console.log(addForm);
        console.log(event.currentTarget);
        console.log(addForm.children);
        console.log(addForm.elements);*/

        const body = {};

        for (let index = 0; index < addForm.elements.length; index++) {
            const element = addForm.elements[index];
            console.log(element.name, element.value);
            if (element.name) {
                if (element.name === "favourite") {
                body[element.name] = element.checked;
                } else {
                    body[element.name] = element.value;
                }
            }
        }
        //console.log(body);

        fetch(path + "/ids")
        .then(response => response.json())
        .then(ids => {
            console.log(ids);
            body.id = ids.length > 0 ? ids[ids.length - 1] + 1 : 1;
            //body.id = ids[ids.length - 1] + 1;
            console.log(body);
            return fetch(path + "/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })
        })
        .then(response => {
            if (response.status === 200) {
                addForm.reset();
                previewTag.style = null;
                mdBox.classList.remove("active");
                createCard(body, block);
                pets.push(body);
                localStorage.setItem("CatsOfMeetkicking", JSON.stringify(pets));
            }
            //console.log(response.status);
        })
        /*.then(data => {
            console.log(data);
        })*/
    })