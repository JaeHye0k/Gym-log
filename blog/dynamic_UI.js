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

// 태그 입력 시
const searchBox = document.querySelector(".search-box");
let allArticles = [...document.querySelectorAll(".posts-box article")];
var tagArr = [];
var filteredArticles = [];
function handle(e) {
  var tagName = searchBox.value;
  // 입력값이 공백이 아니면서 엔터를 눌렀을 때
  if (tagName && e.keyCode === 13) {
    tagName = searchBox.value;
    // 태그 영역 활성화
    document.querySelector(".entered-tags").dataset.entered = "true";
    // 기입한 태그 생성
    var li = document.createElement("li");
    var span = li.appendChild(document.createElement("span"));
    span.appendChild(document.createTextNode(tagName));
    var xButton = document.createElement("span");
    xButton.innerHTML = "&times;";
    xButton.setAttribute("class", "x-button");
    li.appendChild(xButton);
    document.querySelector(".entered-tag-list").appendChild(li);
    // 검색 창 비우기
    searchBox.value = "";
    // 태그에 해당하는 article만 표시
    tagArr.push(tagName);
    filteredArticles = allArticles.filter((article) => tagArr.includes(article.querySelector(".post-tag").innerText));
    allArticles.forEach((element) => {
      if (filteredArticles.includes(element)) element.dataset.filtered = "true";
      else element.dataset.filtered = "false";
    });
  }
}

// posts-box에서 클릭이벤트 발생시 해당 이벤트가 발생한 노드 삭제
var observeDOM = (function () {
  var MutationObserver = window.MutationObserver || window.WebkitMutationObserver;
  return function (target, callback) {
    if (!target || target.nodeType !== 1) return;

    if (MutationObserver) {
      // 새로운 observer 정의
      var mutationObserver = new MutationObserver(callback);
      // observer가 자식 노드의 변화를 관찰하게 한다
      mutationObserver.observe(target, { childList: true, subtree: true });
      return mutationObserver;
    }
    // 브라우저가 MutationObserver를 지원하지 않을 경우
    else if (window.addEventListener) {
      target.addEventListener("DOMNodeInserted", callback, false);
      target.addEventListener("DOMNodeRemoved", callback, false);
    }
  };
})();

// 기입한 태그를 지우면 포스팅 영역에도 반영
var listElm = document.querySelector(".entered-tags");
listElm.onclick = function (e) {
  if (e.target.classList.value === "x-button") {
    // 태그 영역에서 태그 삭제
    e.target.parentNode.parentNode.removeChild(e.target.parentNode);

    // 포스팅 영역에서 삭제된 태그 반영
    var index = tagArr.indexOf(e.target.previousElementSibling.innerText);
    tagArr.splice(index, 1);
    filteredArticles = allArticles.filter((article) => tagArr.includes(article.querySelector(".post-tag").innerText));
    allArticles.forEach((element) => {
      if (filteredArticles.includes(element)) element.dataset.filtered = "true";
      else element.dataset.filtered = "false";
    });
  }
};
