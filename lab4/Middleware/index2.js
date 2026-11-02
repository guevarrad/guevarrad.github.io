import express from "express";
import morgan from "morgan";

// Create the Express application that receives requests.
const app = express();
// Use the port specified in the lab instructions.
const port = 3000;

// Log each request using Morgan's concise development format.
app.use(morgan("dev"));

// Answer a GET request to the root URL.
app.get("/", function (req, res) {
  res.send("Hello"); // Send the page's response.
});

// Start the server and report its local address.
app.listen(port, function () {
  console.log("Listening on http://localhost:" + port);
});
