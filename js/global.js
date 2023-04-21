const block = document.querySelector(".wrapper");
const addBtn = document.querySelector(".add");
const mdBox = document.querySelector(".modal-block");
const mdClose = mdBox.querySelector(".modal-close");
const addForm = document.forms.add;
const previewTag = addForm.querySelector(".preview");
console.log(addForm);

let name = "meetkicking";
let path = `https://cats.petiteweb.dev/api/single/${name}`;

let pets = localStorage.getItem("CatsOfMeetkicking");
if (pets) {
    try {
    pets = JSON.parse(pets);
    for (let pet of pets) {
        createCard(pet, block);
    }
    } catch(error) {
        console.warn(error.message);
        pets = null;
    }
}

console.log("pets", pets);