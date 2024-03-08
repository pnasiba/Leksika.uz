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


// Chatgpt 
function renderData(data) {
  console.log(data);
  cardWrapper.innerHTML = "";

  data.forEach((el) => {
    let phoneticContent = el.phonetics
      .map((phonetic) => {
        let audioElement = phonetic.audio
          ? `<audio src="${phonetic.audio}" controls></audio>`
          : "";
        return `
        <div class="flex gap-[10px] mb-[15px] items-center">
          ${audioElement}
          <p class="text-[18px] text-[#8C8B8B]">${phonetic.text}</p>
        </div>
      `;
      })
      .join("");

    let card = createElement(
      "div",
      "",
      `<h1 class="font-semibold text-[32px] mb-[12px]">${el.word}</h1>
         <p class="italic text-[#8C8B8B] mb-[12px]">${el.meanings[0].partOfSpeech}</p>
         ${phoneticContent}
         <div class="mb-[25px]">
            <p>${el.meanings[0].definitions[0].definition}</p>
          </div>

          <a href="${el.phonetics.sourceUrl}" class="py-[8px] px-[30px] bg-gray-400 text-white rounded-[10px] mb-[10px] text-center">Read more</a>
      `
    );
    cardWrapper.appendChild(card);
  });
}

// some problem in my code
// function renderData(data) {
//   console.log(data);
//   cardWrapper.innerHTML = "";

//   data.forEach((el) => {
//     const {
//       word,
//       phonetic,
//       phonetics: { audio, sourceUrl },
//       meanings: {
//         partOfSpeech,
//         definitions: { definition },
//       },
//     } = el;
//     let card = createElement(
//       "div",
//       "",
//       `<h1 class="font-semibold text-[32px] mb-[12px]">${word}</h1>
//          <p class="italic text-[#8C8B8B] mb-[12px]">${partOfSpeech}</p>
//          <div class="flex gap-[5px] mb-[0px] items-center">
//              <i class="bi bi-volume-down text-2xl"></i>
//              <p class="text-[18px] text-[#8C8B8B]">${phonetic}</p>
//          </div>
//           <div class="mb-[25px]">
//               <p>${meanings.definitions.definition}</p>
//           </div>

//           <a href="${sourceUrl}" class="py-[8px] px-[30px] bg-gray-400 text-white rounded-[10px] text-center">Read more</a>
//       `
//     );
//     cardWrapper.appendChild(card);
//   });
// }



inputSearch.addEventListener("keyup", (e) => {
  if (e.keyCode == 13 && e.target.value.trim().length) {
    let item = e.target.value;
    responseData(baseUrl, item);
  }
});



let cardErrorClassName = "flex items-center gap-[45px] mx-auto";

// --------------------- Error data------------------
function errorData(error) {
  console.log(error);
  cardWrapper.innerHTML = "";
  let dataError = createElement(
    "div",
    cardErrorClassName,
    ` <img src="./assets/images/error-image.png" alt="error-image">
       <div class="w-[530px] bg-[url(./assets/images/ellipse.svg)] bg-center bg-no-repeat ">
           <h1 class="text-[26px] mb-[20px] font-semibold text-center">${error.title}</h1>
           <p class="text-[18px] text-center w-[500px]">${error.message}</p>
       </div>
    `
  );
  cardWrapper.appendChild(dataError);
}
