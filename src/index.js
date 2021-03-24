let addToy = false;

const toyCollection = document.querySelector("#toy-collection");
const url = "http://localhost:3000/toys/"
// console.log(toyCollection);
// toyobj
// id: 2,
// name: "Buzz Lightyear",
// image: "http://www.pngmart.com/files/6/Buzz-Lightyear-PNG-Transparent-Picture.png",
// likes: 14
// },
document.addEventListener("DOMContentLoaded", () => {
  //Fetch toys from url(...localhost:3000...)  
  fetch(url)
    .then((res) => res.json())    //converts promise to json
    .then(function (toys) {       //converts json to object/array
      //If toys was an Object, use Object.keys(toys) to get key array
      toys.forEach(function (toy) {   //Iterate through array
        addToyCard(toy)   //add current toy to card(slap it on the DOM)
      });
      // console.log(toyCollection);
    });
  
  function addToyCard(toy) {
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
        toyLike.innerText = `${toy.likes} Likes`;
        toyCard.append(toyLike);
        let toyButton = document.createElement("button");
        toyButton.classList.add("like-button");
        toyButton.innerText = "like";
        toyCard.append(toyButton);
        toyCollection.append(toyCard);    //Puts the toyCard(and everything included) onto the DOM

        toyButton.addEventListener("click", () => {
          //Updates likes on clicked toyCard(toyButton)
          fetch(url + toy.id, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              "likes": toy.likes + 1    //change ":likes" to likes + 1
            })
          })
            .then(res => res.json())
            .then(updatedToy => {
              //Update DOM
              toy = updatedToy
              toyLike.innerText = `${toy.likes} Likes`
            })
        })
  }

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

  toyFormContainer.addEventListener("submit", event => {
    event.preventDefault()
    // event.target //form
    // event.target.name //name field
    // event.target.image //img field

    // debugger;

    //Add  new toy to json(database)
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "name": event.target.name.value,    //get name from field and pass here
        "image": event.target.image.value,  //get img from field and pass here
        "likes": 0
      })
    })
      .then(res => res.json())
      .then(newToy => addToyCard(newToy))   //Add new toy to DOM
  })
});
/*
Step1: get Fetch  
Step2: get each toy obj  
Step3: create div element 
step4: add card class to div
step5: slap div on DOM 
*/
