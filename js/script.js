let cardWrapper = $(".card__wrapper"),
  inputSearch = $("#inputSearch");

let baseUrl = "https://api.dictionaryapi.dev/api/v2";



async function responseData(url, searchTerm) {
  try {
    let response = await fetch(url + `/entries/en/${searchTerm}`);
    let result = await response.json();
    renderData(result);
  } catch (error) {
    errorData(error);
  }
}

// -----------------------Render data -----------------------

// function renderData(data) {
//   cardWrapper.innerHTML = "";
//   console.log(data);

//   data.forEach((el) => {
//     const { word, phonetics, meanings } = el;
//     let allDefinitions = meanings
//       .map((m) => m.definitions.map((d) => d.definition).join("; "))
//       .join(", ");
//     let allPartOfSpeeches = meanings.map((m) => m.partOfSpeech).join("; ");
//     let allPhonetics = phonetics.map((p) => p.text).join("; ");

//     let card = createElement(
//       "div",
//       "",
//       `<h1 class="font-semibold text-[32px] mb-[12px]">${word}</h1>
//          <p class="italic text-[#8C8B8B] mb-[12px]">${allDefinitions}</p>
//          <p class="italic text-[#8C8B8B] mb-[12px]">${allPartOfSpeeches}</p>
//          <div class="flex gap-[5px] mb-[10px] items-center">
//              <i class="bi bi-volume-down text-2xl"></i>
//              <p class="text-[18px] text-[#8C8B8B]">${allPhonetics}</p>
//          </div>
//           <a href="#" class="py-[8px] px-[30px] bg-gray-400 text-white rounded-[10px] text-center">Read more</a>
//       `
//     );
//     cardWrapper.appendChild(card);
//   });
// }

function renderData(data) {
  cardWrapper.innerHTML = "";

  data.forEach((el) => {
    let card = createElement(
      "div",
      "",
      `<h1 class="font-semibold text-[32px] mb-[12px]">${el.word}</h1>
         <p class="italic text-[#8C8B8B] mb-[12px]">${el.meanings[0].partOfSpeech}, ${el.meanings[1].partOfSpeech} , ${el.meanings[2].partOfSpeech}</p>
         <div class="flex gap-[5px] mb-[0px] items-center">
             <audio src="${el.phonetics[0].audio}" controls class="mb-[15px]"></audio>
             <p class="text-[18px] text-[#8C8B8B]">${el.phonetics[2].text}</p>
         </div>
          <div class="mb-[25px]">
              <p>${el.meanings[0].definitions[0].definition}</p>
          </div>

          <a href="${el.phonetics[0].sourceUrl}" class="py-[8px] px-[30px] bg-gray-400 text-white rounded-[10px] text-center">Read more</a>
      `
    );
    cardWrapper.appendChild(card);
  });
}



inputSearch.addEventListener("keyup", (e) => {
  if (e.keyCode == 13 && e.target.value.trim().length) {
    let item = e.target.value;
    responseData(baseUrl, item);
  }
});



let cardErrorClassName = "flex items-center gap-[45px] mx-auto";

// --------------------- Error data------------------
function errorData(data) {
  cardWrapper.innerHTML = "";
  let dataError = createElement(
    "div",
    cardErrorClassName,
    ` <img src="./assets/images/error-image.png" alt="error-image">
       <div class="w-[530px] bg-[url(./assets/images/ellipse.svg)] bg-center bg-no-repeat ">
           <h1 class="text-[26px] mb-[20px] font-semibold text-center">${data.title}</h1>
           <p class="text-[18px] text-center w-[500px]">${data.message}</p>
       </div>
    `
  );
  cardWrapper.appendChild(dataError);
}
