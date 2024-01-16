const body = document.querySelector("body");
const allArticles = [...document.querySelectorAll(".posts-box article")];
const allTags = document.querySelectorAll(".posts-box .post-tag");
const searchBox = document.querySelector(".search-box");
const list = document.querySelector(".category-list").children;
const enteredTags = document.querySelector(".entered-tags");
const enteredTagList = [];

// 다크모드 - 라이트 모드
const dark_light_toggle = document.querySelector("#dark-light-toggle");
dark_light_toggle.addEventListener("click", (event) => {
  if (body.dataset.theme === "light") {
    body.dataset.theme = "dark";
    body.classList.add("dark");
    body.classList.remove("light");
    dark_light_toggle.textContent = "🌙";
    document.documentElement.style.setProperty("color-scheme", "dark");
  } else {
    body.dataset.theme = "light";
    body.classList.add("light");
    body.classList.remove("dark");
    dark_light_toggle.textContent = "☀️";
    document.documentElement.style.setProperty("color-scheme", "light");
  }
});

// 영어 - 한국어
const english_korean_toggle = document.querySelector("#english-korean-toggle");
english_korean_toggle.addEventListener("click", (event) => {
  if (english_korean_toggle.innerHTML === "한국어") english_korean_toggle.innerHTML = "English";
  else english_korean_toggle.innerHTML = "한국어";
});

// 카테고리 클릭시
[...list].forEach((e) =>
  e.addEventListener("click", (event) => {
    // prettier-ignore
    [...list].filter((e) => e.dataset.selected === "true").forEach((e) => {
        if (e !== event.currentTarget) e.dataset.selected = "false";
      });
    e.dataset.selected = JSON.parse(e.dataset.selected) ? "false" : "true";
  })
);

// 기입한 태그 생성
const createTagCard = function (inputData) {
  const li = document.createElement("li");
  const span = li.appendChild(document.createElement("span"));
  span.appendChild(document.createTextNode(inputData));
  const xButton = document.createElement("span");
  xButton.innerHTML = "&times;";
  xButton.setAttribute("class", "x-button");
  li.appendChild(xButton);
  document.querySelector(".entered-tag-list").appendChild(li);
};

// 입력한 태그에 해당하는 article만 표시
const filterArticles = function (inputData) {
  if (inputData !== null) inputData = inputData.toLowerCase(); // 대소문자 구별 X
  allArticles.forEach((article) => {
    let tags = article.querySelectorAll(".post-tag");
    for (let tag of tags) {
      let tagText = tag.innerText.toLowerCase();
      // 입력한 태그에 매칭하는 글만 표시
      if (tagText.includes(inputData)) {
        tag.parentElement.dataset.filtered = "true";
        break;
      } else {
        tag.parentElement.dataset.filtered = "false";
      }

      if (enteredTagList.includes(tagText)) {
        tag.parentElement.dataset.filtered = "true";
        break;
      } else {
        tag.parentElement.dataset.filtered = "false";
      }
      //입력된 문자도 없고, entered-tag도 없을 때
      if (inputData === null && enteredTagList.length === 0) {
        tag.parentElement.dataset.filtered = "true";
        break;
      }
    }
  });
};

// 태그 검색창에 키 입력 시 태그와 실시간 매칭: O(N), N=태그의 총 개수
searchBox.addEventListener("input", (event) => {
  let inputData = searchBox.value;
  if (inputData === "") inputData = null;
  filterArticles(inputData);
});

// searchBox에 태그를 입력하고 엔터를 누를 시: O(N), N=태그의 총 개수
searchBox.addEventListener("keydown", (event) => {
  let inputData = searchBox.value;
  if (inputData && event.keyCode === 13) {
    enteredTagList.push(inputData);
    document.querySelector(".entered-tags").dataset.entered = "true";
    createTagCard(inputData);
    searchBox.value = "";
    filterArticles(inputData);
  }
});

// 입력한 태그 삭제시
enteredTags.onclick = function (e) {
  let enteredTagText = e.target.previousElementSibling.innerText;
  let tagIdx = enteredTagList.indexOf(enteredTagText);
  // x 버튼 클릭시
  if (e.target.classList.value === "x-button") {
    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
    enteredTagList.splice(tagIdx, 1);
    filterArticles(null);
  }
};
