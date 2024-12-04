const express = require("express");
const https = require("https");
const fs = require("fs");
const app = express();
require("dotenv").config();

//set port to use either deploymnet environment port or local port 3000
// const port = process.env.PORT || 3000;
// app.listen(port, () => console.log(`listening at port: ${port}`));
// app.use(express.json({ limit: "1mb" })); //limit the amount of data that can be posted to server

// server.js

const options = {
  key: fs.readFileSync("server.key"), // replace it with your key path
  cert: fs.readFileSync("server.crt"), // replace it with your certificate path
};

// Map file extensions to MIME types
const mimeTypes = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".json": "application/json",
  ".txt": "text/plain",
};

const path = require("path");

// Request listener to serve static files
const requestListener = (req, res) => {
  // Map the request URL to a file path in the `public` folder
  let filePath = path.join(__dirname, "public", req.url);

  // Serve index.html if the request is to the root
  if (req.url === "/") {
    filePath = path.join(__dirname, "public", "index.html");
  }

  // Get the file extension
  const ext = path.extname(filePath);

  // Set the Content-Type based on the file extension
  const contentType = mimeTypes[ext] || "application/octet-stream";

  // Check if the file exists and serve it
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // Handle file not found or server errors
      if (err.code === "ENOENT") {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
      } else {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("500 Internal Server Error");
      }
    } else {
      // Serve the file with the correct Content-Type
      res.writeHead(200, { "Content-Type": contentType });
      res.end(data);
    }
  });
};
const server = https.createServer(options, requestListener);

// Start the server on a specific port
server.listen(5500, () => {
  console.log("Server is running at https://localhost/");
});
