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
let allArticle = [...document.querySelector(".posts-box").querySelectorAll("article")];
var tagArr = [];
var tagFilter = [];
function handle(e) {
  let tag = searchBox.value;
  // 입력값이 공백이 아니면서 엔터를 눌렀을 때
  if (tag && e.keyCode === 13) {
    tag = searchBox.value;
    document.querySelector(".entered-tags").dataset.entered = "true";
    // 기입한 태그 생성
    var li = document.createElement("li");
    var span = li.appendChild(document.createElement("span"));
    span.appendChild(document.createTextNode(tag));
    var innerSpan = span.appendChild(document.createElement("span"));
    innerSpan.appendChild(document.createTextNode("x"));
    innerSpan.classList.add("delete-tag");
    document.querySelector(".entered-tag-list").appendChild(li);
    searchBox.value = "";
    tagArr.push(tag);
    filteredArticle = [...document.querySelector(".posts-box").querySelectorAll("article")].filter((v) => tagArr.includes(v.querySelector(".post-tag").innerText));
    allArticle.forEach((v) => {
      if (filteredArticle.includes(v)) v.dataset.filtered = "true";
      else v.dataset.filtered = "false";
    });
  }
}
