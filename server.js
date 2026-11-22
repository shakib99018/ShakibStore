const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.url === "/") {
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify({
      name: "ShakibStore API",
      status: "online",
      author: "Shakib",
      version: "1.0.0"
    }));
  }

  if (req.url === "/commands") {
    res.setHeader("Content-Type", "application/json");

    const file = path.join(__dirname, "commands.json");
    const commands = JSON.parse(fs.readFileSync(file, "utf8"));

    return res.end(JSON.stringify(commands));
  }

  const match = req.url.match(/^\/command\/([a-zA-Z0-9_-]+)$/);

  if (match) {
    const name = match[1];
    const file = path.join(__dirname, "commands", name + ".js");

    if (!fs.existsSync(file)) {
      res.statusCode = 404;
      return res.end("Command file not found");
    }

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    return res.end(fs.readFileSync(file, "utf8"));
  }

  res.statusCode = 404;
  res.end(JSON.stringify({ error: "Not found" }));
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log("ShakibStore running on port " + PORT);
});
