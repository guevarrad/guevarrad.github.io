import express from "express";
import morgan from "morgan";

// Create the Express application that receives requests.
const app = express();
// Use the port specified in the lab instructions.
const port = 3000;

// Log each request using Morgan's concise development format.
app.use(morgan("dev"));
// Parse submitted HTML form fields so routes can read req.body.
app.use(express.urlencoded());
// Send the form page and other public files.
app.use(express.static("public"));

// Escape HTML metacharacters so form values display as text, not markup.
function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

// Build the band name for /submit, or stop if either field is missing.
function bandNameGenerator(req, res, next) {
  const street = req.body.street; // Read the street field from the form.
  const pet = req.body.pet; // Read the pet field from the form.
  if (!street || !pet) {
    res.status(400).send("Both names are needed. <a href='/'>Try again</a>"); // Explain the missing input.
    return; // Stop without passing an invalid request along.
  }
  res.locals.bandName = street + " " + pet; // Store the generated name for the route.
  next(); // Continue to the route that displays the name.
}

// Remember generated names for the optional history page.
const bandNames = [];

// Show a short description of the generator.
app.get("/about", function (req, res) {
  res.send("<link rel='stylesheet' href='/style.css'><h1>About</h1><p>A little app that turns street and pet names into a band name.</p><a href='/'>Try it</a>"); // Send the about page.
});

// Show names generated since this server started.
app.get("/history", function (req, res) {
  const names = bandNames.map(escapeHtml); // Escape each saved name before putting it in HTML.
  res.send("<link rel='stylesheet' href='/style.css'><h1>Band name history</h1><ul>" + names.map((name) => "<li>" + name + "</li>").join("") + "</ul><a href='/'>Try it</a>"); // Render the saved names.
});

// Generate and safely display a band name after the middleware validates it.
app.post("/submit", bandNameGenerator, function (req, res) {
  const bandName = res.locals.bandName; // Get the name prepared by bandNameGenerator.
  bandNames.push(bandName); // Keep it for the history page.
  console.log("Band name:", bandName); // Show the generated name in the terminal.
  res.send("<link rel='stylesheet' href='/style.css'><h1>Your band name is:</h1><h2>" + escapeHtml(bandName) + "</h2><a href='/'>Another</a>"); // Return the safely escaped result.
});

// Start the server and report its local address.
app.listen(port, function () {
  console.log("Listening on http://localhost:" + port);
});
