const http = require("http");
const fs = require("fs");
const url = require("url");

const app = http.createServer((request, response) => {
  let _url = request.url;
  let template = `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="./app.css" />
    <title>Meta-log</title>
  </head>
  <body>
    <header>
      <div>Blog Name</div>
      <div>🌙☀️</div>
    </header>
  </body>
</html>
  `;
  response.writeHead(200);
  response.end(template);
});
app.listen(80);
