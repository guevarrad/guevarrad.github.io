import express from "express";

// Create the Express application that receives requests.
const app = express();
// Use the port specified in the lab instructions.
const port = 3000;

// Log the method and URL, then let the next middleware or route handle it.
function logger(req, res, next) {
  console.log("Request method:", req.method); // Print the HTTP method.
  console.log("Request URL:", req.url); // Print the requested path.
  next(); // Pass the request to the next middleware or route.
}

// Run the logger for incoming requests.
app.use(logger);

// Answer a GET request to the root URL.
app.get("/", function (req, res) {
  res.send("Hello"); // Send the page's response.
});

// Start the server and report its local address.
app.listen(port, function () {
  console.log("Listening on http://localhost:" + port);
});
