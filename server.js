const http = require("http");

const commands = [
  {
    name: "ping",
    description: "Bot response test",
    author: "Shakib",
    version: "1.0.0"
  },
  {
    name: "hello",
    description: "Greeting command",
    author: "Shakib",
    version: "1.0.0"
  }
];

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.url === "/") {
    return res.end(JSON.stringify({
      name: "ShakibStore API",
      status: "online",
      author: "Shakib"
    }));
  }

  if (req.url.startsWith("/commands")) {
    return res.end(JSON.stringify(commands));
  }

  res.statusCode = 404;
  res.end(JSON.stringify({ error: "Not found" }));
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("ShakibStore API running on port " + PORT);
});
