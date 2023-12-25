const http = require("http");
const fs = require("fs");
const url = require("url");

// Read article
let dataFolder = "./data";
let article = "";
fs.readdir(dataFolder, (err, fileList) => {
  fileList.forEach((v) => {
    fs.readFile(`${dataFolder}/${v}`, (err, content) => {
      article += content;
    });
  });
});

const app = http.createServer((request, response) => {
  let _url = request.url;
  if (_url === "/") {
    let template = `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Meta-log</title>
    <link rel="stylesheet" href="./app.css" type="text/css" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR&family=Roboto&display=swap" rel="stylesheet" />
  </head>
  <body data-theme="light">
    <header>
      <div class="header-container">
        <a href=""><div>Meta-log</div></a>
        <nav class="toggle-container">
          <div id="dark-light-toggle">☀️</div>
          <div id="english-korean-toggle">한국어</div>
        </nav>
      </div>
    </header>
    <main>
      <div class="main-left">
        <div class="sticky">
          <span class="blind">카테고리</span>
          <div class="category-title">카테고리</div>
          <ul class="category-list">
            <a data-selected="false"><li>아이템</li></a>
            <a data-selected="false"><li>아이템</li></a>
            <a data-selected="false"><li>아이템</li></a>
            <a data-selected="false"><li>아이템</li></a>
            <a data-selected="false"><li>아이템</li></a>
          </ul>
        </div>
      </div>
      <div class="main-center">
        <div class="search-container">
          <span class="blind">검색</span>
          <div class="search-title">검색</div>
          <input class="search-box" type="text" placeholder="태그를 입력하세요" onkeypress="handle(event)" />
          <div class="entered-tags" data-entered="false">
            <ul class="entered-tag-list"></ul>
          </div>
        </div>
        <div class="posts-box">
          ${article}
        </div>
      </div>
      <div class="main-right">
        <div class="sticky">
          <div class="profile-container">
            <span class="blind">프로필</span>
            <div class="profile-title">프로필</div>
            <div class="profile-content">
              <img src="./avatar.png" alt="프로필 이미지" loading="lazy" decoding="async" />
              <div class="name">이재혁</div>
              <div class="role">프론트엔드 개발자</div>
              <div class="status-message">나는 지금 개발중</div>
            </div>
          </div>
          <a class="write-link">
            <div class="write">글쓰기 ✏️</div>
            <span class="blind">글쓰기</span>
          </a>
        </div>
      </div>
    </main>
    <script src="dynamic_UI.js" type="text/javascript"></script>
  </body>
</html>
    `;
    response.writeHead(200);
    response.end(template);
  } else {
    fs.readFile(`blog${_url}`, (err, data) => {
      response.writeHead(200);
      response.end(data);
    });
  }
});
app.listen(80);
