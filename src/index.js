let addToy = false;

const toyCollection = document.querySelector("#toy-collection");
// console.log(toyCollection);
// toyobj
// id: 2,
// name: "Buzz Lightyear",
// image: "http://www.pngmart.com/files/6/Buzz-Lightyear-PNG-Transparent-Picture.png",
// likes: 14
// },
document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/toys")
    .then((res) => res.json())
    .then(function (toys) {
      toys.forEach(function (toy) {
        let toyCard = document.createElement("div");
        toyCard.classList.add("card");
        // console.log(toyCard);
        let toyName = document.createElement("h2");
        toyName.innerText = toy.name;
        toyCard.append(toyName);
        let toyImg = document.createElement("img");
        toyImg.src = toy.image;
        toyImg.className = "toy-avatar";
        toyCard.append(toyImg);
        let toyLike = document.createElement("p");
        toyLike = `${toy.likes} Likes`;
        toyCard.append(toyLike);
        let toyButton = document.createElement("button");
        toyButton.classList.add("like-button");
        toyButton.innerText = "like";
        toyCard.append(toyButton);
        toyCollection.append(toyCard);
      });
      console.log(toyCollection);
    });

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
/*
Step1: get Fetch  
Step2: get each toy obj  
Step3: create div element 
step4: add card class to div
step5: slap div on DOM 
*/
