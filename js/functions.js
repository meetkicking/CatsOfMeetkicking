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
        setLIke(cardLike, pet.id, !pet.favourite);
    })
    
    card.append(cardImg, cardTitle, cardLike);
    
    tag.append(card);
    
    //console.log(cardImg.offsetWidth);
    //cardImg.style.height = cardImg.offsetWidth + "px";
    
    }

    function setLIke(element, id, like) {
    element.classList.toggle("fa-solid");
    element.classList.toggle("fa-regular");

    fetch(path + "/update/" + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({favourite: like})
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        pets = pets.map(pet => {
            if (pet.id === id) {
                pet.favourite = like;
            }
            return pet;
        })
        localStorage.setItem("CatsOfMeetkicking", JSON.stringify(pets));
    })
    }
    