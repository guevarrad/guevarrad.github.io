# cs333-lab2
JS event handlers + functions + loops: build a drum kit 🥁
Do each step below, and **answer the questions right here in this `README.md` file** as you go (type your answers under each question).

**How this lab works (three links to hand in):**
- **Your code:** make your own copy of this lab (click **Use this template**, or clone it),
  do your work, and **push it to your own GitHub repo** so I can see your code.
- **Your landing page:** your site's home page on `lampforall`, linking to all your labs.
- **Your live drum kit:** **SFTP your lab folder to your web folder on `lampforall`** so it
  runs at `.../students/yourname/lab2/`.

You'll submit all three links in Moodle (see the last step).

> ⚠️ **Two rules that keep "it works on my laptop" working on the server too:**
> 1. **Relative paths only.** Write `sounds/snare.mp3`, never `/sounds/snare.mp3`. A leading `/`
>    means "the root of the whole server," and your site lives under `/students/yourname/lab2/`.
> 2. **Filenames are case-sensitive on the server.** The server runs Linux: `Snare.mp3` and
>    `snare.mp3` are *different files* there, even though your Mac/Windows laptop treats them as the
>    same. Match the spelling *exactly*, including capitals and hyphens.

## Part 1: clicking

1. Open `index.html` with live preview. Notice there's no `<script>` tag yet. Create your JS in
   `index.js` and add the `<script>` tag yourself. Where in the page should it go, and why?
   (Hint: what happens if your script looks for the buttons before they exist?)
   Answer: The script should go near the end of the `<body>`, just before `</body>`. That way the HTML buttons already exist when JavaScript runs, so `document.querySelectorAll(".drum")` can find them. If the script loads in the `<head>`, it may run before the buttons are created and the listeners would not attach.

2. Add an event listener to **each** drum button. Use a **loop**, not seven copies of the same code.
   (Hint: `document.querySelectorAll(".drum")`)
   Answer: Use `const buttons = document.querySelectorAll(".drum");` and loop through the buttons with `forEach()`. This attaches the same click behavior to every drum key without repeating the code seven times.

3. Inside your listener, `console.log` which button was clicked. Your listener function receives an
   **event object**. Give it a parameter and look inside it:
   ```js
   button.addEventListener("click", function (event) {
     console.log(event.target.innerHTML);   // the letter on the button you clicked
   });
   ```
   What is `event.target`? (Try `console.log(event)` and poke around.) You'll use the same event
   object again in Part 2 for the keyboard.
   Answer: `event.target` is the exact element that triggered the event. For a click on a drum button, it is the button itself, so `event.target.innerHTML` gives the letter on that button. The event object also contains other information about the click, like the key pressed or the target element.

4. Add a drum sound to the listener. Start with **one** sound for every button:
   ```js
   let sound = new Audio("sounds/tom-1.mp3");   // relative path!
   sound.play();
   ```
   Answer: Create an `Audio` object with a relative path such as `"sounds/snare.mp3"` and call `sound.play()` in the click handler.

5. In `styles.css`, give each button a background image (`.w`, `.a`, `.s`, ...), using the files in `images/`.
   Note: paths in a CSS file are relative to **the CSS file**, not the HTML page.
   Check every filename against the real file *exactly* (case and hyphens count on the server).
   Answer: Background-image paths in CSS are relative to `styles.css`. Use the exact file names and capitalization from the `images/` folder, such as `url("images/crash.png")` or `url("images/kick.png")`.

6. Give each button its own sound that matches its image, so you have a playable drum kit.
   (Hint: a `switch` on the button's letter works well, and so does `if`/`else if`.)
   Watch out: the image and sound names don't match each other (`kick.png` vs `kick-bass.mp3`,
   `tom1.png` vs `tom-1.mp3`). Copy the real names.
   Answer: Use a `switch` or `if/else if` statement on each button letter to choose the matching sound file. For example, `w` uses `crash.mp3`, `a` uses `kick-bass.mp3`, and so on.

## Part 2: the keyboard

7. Make the keyboard play the drums too: pressing `w` plays the same sound as clicking the `w` button.
   One way: add a `keydown` listener to the whole `document`, and use `event.key` to see which key was pressed.
   Answer: Add a `keydown` listener to `document` and check `event.key.toLowerCase()`. When the key matches one of the drum keys, call the same sound function used by the mouse clicks.

8. Don't repeat yourself: clicking and typing should both call **the same function** that plays a sound
   for a given key. How did you organize that?
   Answer: Create one shared function such as `playDrumSound(letter)`. Both the click handler and the `keydown` handler call that function so the sound logic is in one place.

9. Use `console.log` to see what's happening while you build this. Important! **Leave these in your code.**
   Answer: Keep `console.log` statements in the code to track key presses, button clicks, and sound selection while testing. These logs help with debugging and stay in the final version.

10. Comment your code in an educational way: not for the public, but to write down how everything works. I will be looking for this!
    Answer: Add comments that explain how the buttons are selected, how the sound function works, how the click and keydown events connect, and how the pressed animation is triggered.

11. Optional: make the button visibly react when played (hint: there's a `.pressed` class in the CSS, plus `classList` and `setTimeout`).
    Answer: Add a small `animateButton()` function that adds the `.pressed` class to the matching button and removes it after a short timeout. This gives the button a quick visual pressed effect.

## Organize your site: a landing page for all your labs

From now on, your site at `.../students/yourname/` is your **landing page**: the home base that
links to every lab you do this term. Set it up like this in your web folder:

```
public_html/            ← https://.../students/yourname/
├── index.html          ← your landing page (home)
├── lab1/               ← your Lab 1 form pages (form.html, submit.php, ...)
└── lab2/               ← this drum kit
```

12. Make (or clean up) your landing page `index.html`: your name, a short intro, and a link to each lab.
    Give each lab a line or two saying what it is. Make it look like *yours*.
    Answer: The landing page includes the student name, a short intro, and links to each lab with a brief description. A simple layout with clear headings and a consistent style keeps the page easy to read.

13. Move your Lab 1 files into a `lab1/` folder. After moving them, **re-test your form**: does it still submit
    and show the results? Why does a form whose `action` is `submit.php` (a relative path) keep working when the
    whole folder moves together?
    Answer: The form still submits correctly if the files stay together in the `lab1/` folder. The `action="submit.php"` value is relative to the form page, so moving the whole folder keeps the path valid.

14. Every lab page needs a way back home. Add a link from the drum kit (and your Lab 1 pages) to your landing page:
    ```html
    <a href="../">← Home</a>
    ```
    `../` means "up one folder." Why would `href="/"` send you to the wrong place on our server?
    (Hint: rule 1 at the top.)
    Answer: `../` goes up one folder, which returns to `/students/yourname/`. The path `href="/"` goes to the server root, not the student folder, so it takes the user to the wrong place.

15. Links from your landing page go *down* into the folders: `href="lab1/"` and `href="lab2/"`.
    Answer: The landing page uses relative links such as `href="lab1/"` and `href="lab2/"` because both folders are inside the same student directory. Relative links keep the site working on the server.

## Deploy it

16. Test everything locally first, including every link, both ways.
    Answer: Open the site locally and check every link in both directions. Confirm that images, sounds, and pages load from the correct relative paths.

17. However you have your SFTP set up, upload: your landing page `index.html`, the `lab1/` folder, and this lab as `lab2/`.
    You don't need to upload the hidden `.git` folder (the server won't serve it anyway).
    Remove the old Lab 1 files from the top of your web folder once `lab1/` works, so you don't have two copies.
    Answer: The final site includes the landing page plus the `lab1/` and `lab2/` folders. The hidden `.git` folder is not needed on the server, and duplicate Lab 1 files should be removed.

18. Open your live site at `https://lampforall.cis251296.projects.jetstream-cloud.org/students/yourname/` and click
    through **everything**: home → Lab 1 → home → Lab 2 → home. Every image, sound and link should work there,
    not just locally.
    Answer: Test the live site by going from home to each lab and back again. Check that links, images, and sounds all work on the server.

19. **Works locally but broken on the server?** Open DevTools (right-click → Inspect) → **Console** and **Network** tabs,
    and look for red **404** errors. Almost every time it's one of the two rules at the top:
    a leading `/` in a path, or a filename whose case or spelling doesn't match.
    Did you hit one? Which one, and how did you fix it?
    Answer: The most common server issue is a bad path, such as using `/sounds/snare.mp3` instead of `sounds/snare.mp3`, or a filename with the wrong capitalization. Matching the exact file names and using relative paths fixes the problem.

20. Push this repo (your code **and** this README with your answers) to **your own GitHub repo**.
    Answer: Commit the code and README, then push the project to a GitHub repository so the work is saved and available for grading.

21. Submit in Moodle three links: (1) your GitHub repo, (2) your landing page, and (3) your live drum kit.
    Answer: The final submission includes the GitHub repo link, the landing page URL, and the live drum kit URL.
