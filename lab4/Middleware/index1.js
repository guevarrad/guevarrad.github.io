import express from "express";

// Create the Express application that receives requests.
const app = express();
// Use the port specified in the lab instructions.
const port = 3000;

// Read submitted form fields into req.body.
app.use(express.urlencoded());
// Send files such as the form page from the public folder.
app.use(express.static("public"));

// Receive the form submission and show its fields in the server terminal.
app.post("/submit", function (req, res) {
  console.log(req.body); // Show the parsed form fields in the terminal.
  res.send("Got it! Look at the server terminal."); // Send a confirmation to the browser.
});

// Start the server and report its local address.
app.listen(port, function () {
  console.log("Listening on http://localhost:" + port);
});
