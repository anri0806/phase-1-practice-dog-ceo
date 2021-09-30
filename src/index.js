console.log("%c HI", "color: firebrick");

document.addEventListener("DOMContentLoaded", function () {
  //Add Images!!  const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
  fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      data.message.forEach(function (imgData) {
        const container = document.querySelector("div#dog-image-container");
        const img = document.createElement("img");
        img.src = imgData;
        container.appendChild(img);
      });
    });

  //Add lists!! const breedUrl = 'https://dog.ceo/api/breeds/list/all'
  fetch("https://dog.ceo/api/breeds/list/all")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (let breed in data.message) {
        const ul = document.querySelector("ul#dog-breeds");
        const li = document.createElement("li");
        li.innerText = breed;
        ul.appendChild(li);

        //Change color of <li> when clicked!!
        li.addEventListener("click", function () {
          li.style.color = "red";
        });
      }
    });

  //Filter breeds with dropdown!!
  const dogSelect = document.getElementById("breed-dropdown");
  dogSelect.addEventListener("change", (e) => {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        let dogBreedArr = Object.keys(data.message);
        let result = dogBreedArr.filter((breed) => {
          return breed.startsWith(e.target.value);
        });

        const dogUl = document.querySelector("ul#dog-breeds");
        dogUl.innerText = "";

        result.forEach((breed) => {
          dogUl.innerHTML += `<li data-info="breed">${breed}</li>`;
        });
      });
  });
});
