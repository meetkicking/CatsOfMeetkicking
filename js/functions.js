function createCard(pet, tag) {

    const card = document.createElement("div");
    card.className = "card";

    const cardImg = document.createElement("div");
    cardImg.className = "pic";

    if (pet.image) {
        cardImg.style.backgroundImage = `url(${pet.image})`;
    } else {
        cardImg.classList.add("tmp");
    }

    const cardTitle = document.createElement("h2");
    cardTitle.innerText = pet.name;

    const cardLike = document.createElement("i");
    cardLike.className = "like fa-heart";
    cardLike.classList.add(pet.favourite ? "fa-solid" : "fa-regular");
    cardLike.addEventListener("click", element => {
        setLike(cardLike, pet.id, !pet.favourite);
    });


const trash = document.createElement("i");
trash.className = "fa-solid fa-trash card__trash";
trash.addEventListener("click", event => {
    event.stopPropagation();
//deleteCard(???, event.currentTarget.parentElement);
deleteCard(pet.id, card);
});


    card.append(cardImg, cardTitle, trash, cardLike);
    tag.append(card);

    
    card.addEventListener("click", (event) => {
        deleteCard(cat.id, card)
    });
    tag.append(card);

    //console.log(cardImg.offsetWidth);
    //cardImg.style.height = cardImg.offsetWidth + "px";

}

    function setLike(element, id, like) {
    element.classList.toggle("fa-solid");
    element.classList.toggle("fa-regular");

    fetch(path + "/update/" + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({favourite: like}),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        pets = pets.map(pet => {
            if (pet.id === id) {
                pet.favourite = like;
            }
            return pet;
        });
        localStorage.setItem("CatsOfMeetkicking", JSON.stringify(pets));
    });
    }

    function deleteCard(id, element) {
        if (id) {
            fetch(`${path}/delete/${id}`, {
                method: "DELETE",
            })
            .then(response => {
                //console.log(response.status);
                if (response.status === 200) {
                    element.remove();
                }
            });
        }
    }