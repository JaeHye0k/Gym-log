// const app = require("./blog/app.js");
// console.log(app.articles);

// 다크모드 - 라이트 모드
const body = document.querySelector("body");
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
let list = document.querySelector(".category-list").children;
[...list].forEach((e) =>
  e.addEventListener("click", (event) => {
    // prettier-ignore
    [...list].filter((e) => e.dataset.selected === "true").forEach((e) => {
        if (e !== event.currentTarget) e.dataset.selected = "false";
      });
    e.dataset.selected = JSON.parse(e.dataset.selected) ? "false" : "true";
  })
);

let allArticles = [...document.querySelectorAll(".posts-box article")];
let enteredTagList = [];

// 태그 검색창에 키 입력 시 태그와 실시간 매칭
const searchBox = document.querySelector(".search-box");
searchBox.addEventListener("input", (event) => {
  let inputData = searchBox.value.toLowerCase();
  allArticles.forEach((article) => {
    let tagList = [...article.querySelectorAll(".post-tag")].map((tag) => tag.innerText);
    tagList = tagList.map((tag) => tag.toLowerCase());
    tagList.forEach((tag) => {
      if (inputData) {
        if (tag.includes(inputData)) article.dataset.filtered = "true";
        else article.dataset.filtered = "false";
      } else {
        let enteredTagList = enteredTagList.map((tag) => tag.toLowerCase());
        if (enteredTagList.some((tag) => tagList.includes(tag))) article.dataset.filtered = "true";
        else article.dataset.filtered = "false";
      }
    });
  });
});

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
const filterArticles = function (enteredTagList) {
  allArticles.forEach((article) => {
    let tagList = [...article.querySelectorAll(".post-tag")].map((tag) => tag.innerText);
    tagList = tagList.map((tag) => tag.toLowerCase());
    if (enteredTagList.some((tag) => tagList.includes(tag))) article.dataset.filtered = "true";
    else article.dataset.filtered = "false";
  });
};

// 태그 입력 후 엔터키 입력시
searchBox.addEventListener("keydown", (event) => {
  let inputData = searchBox.value;
  // 입력값이 공백이 아니면서 엔터를 눌렀을 때
  if (inputData && event.keyCode === 13) {
    document.querySelector(".entered-tags").dataset.entered = "true";
    createTagCard(inputData);
    searchBox.value = "";
    enteredTagList.push(inputData);
    let enteredTagList = enteredTagList.map((tag) => tag.toLowerCase());
    filterArticles(enteredTagList);
  }
});

// 입력한 태그 삭제시
const listElm = document.querySelector(".entered-tags");
listElm.onclick = function (e) {
  if (e.target.classList.value === "x-button") {
    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
    // 포스팅 영역에 삭제된 태그 반영
    let index = enteredTagList.indexOf(e.target.previousElementSibling.innerText);
    enteredTagList.splice(index, 1);
    enteredTagList = enteredTagList.map((tag) => tag.toLowerCase());

    if (enteredTagList.length < 1) {
      allArticles.forEach((element) => {
        element.dataset.filtered = "true";
      });
    } else {
      allArticles.forEach((article) => {
        let tagList = [...article.querySelectorAll(".post-tag")].map((tag) => tag.innerText);
        tagList = tagList.map((tag) => tag.toLowerCase());
        if (enteredTagList.some((tag) => tagList.includes(tag))) article.dataset.filtered = "true";
        else article.dataset.filtered = "false";
      });
    }
  }
};
