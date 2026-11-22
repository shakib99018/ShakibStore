const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.url === "/") {
    return res.end(JSON.stringify({
      name: "ShakibStore API",
      status: "online",
      author: "Shakib",
      version: "1.0.0"
    }));
  }

  if (req.url === "/commands") {
    const file = path.join(__dirname, "commands.json");
    const commands = JSON.parse(fs.readFileSync(file, "utf8"));
    return res.end(JSON.stringify(commands));
  }

  res.statusCode = 404;
  res.end(JSON.stringify({
    error: "Not found"
  }));
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log("ShakibStore running on port " + PORT);
});
