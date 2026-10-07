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
   Answer: I used `const buttons = document.querySelectorAll(".drum");` and then `buttons.forEach((button) => { ... })` so the same click code runs for every button without repeating the code 7 times.

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
   Answer: I created a new `Audio` object with a relative path like `"sounds/snare.mp3"` and called `sound.play()` inside the click handler to play the sound when the button is clicked.

5. In `styles.css`, give each button a background image (`.w`, `.a`, `.s`, ...), using the files in `images/`.
   Note: paths in a CSS file are relative to **the CSS file**, not the HTML page.
   Check every filename against the real file *exactly* (case and hyphens count on the server).
   Answer: The CSS background paths are relative to `styles.css`, so they are written like `url("images/crash.png")`, `url("images/kick.png")`, and so on. I used the exact filenames from the images folder, such as `tom1.png`, `tom2.png`, etc., with the correct capitalization and hyphen style.

6. Give each button its own sound that matches its image, so you have a playable drum kit.
   (Hint: a `switch` on the button's letter works well, and so does `if`/`else if`.)
   Watch out: the image and sound names don't match each other (`kick.png` vs `kick-bass.mp3`,
   `tom1.png` vs `tom-1.mp3`). Copy the real names.
   Answer: I used a `switch` on the button’s letter to choose the correct sound file: `w` uses `crash.mp3`, `a` uses `kick-bass.mp3`, `s` uses `snare.mp3`, `d` uses `tom-1.mp3`, `j` uses `tom-2.mp3`, `k` uses `tom-3.mp3`, and `l` uses `tom-4.mp3`. This matches each button’s image and gives the drum kit its own playable sound for each key.

## Part 2: the keyboard

7. Make the keyboard play the drums too: pressing `w` plays the same sound as clicking the `w` button.
   One way: add a `keydown` listener to the whole `document`, and use `event.key` to see which key was pressed.
   Answer: I added `document.addEventListener("keydown", function (event) { ... });` and used `event.key.toLowerCase()` to detect which key was pressed. If it is one of the valid drum keys (`w`, `a`, `s`, `d`, `j`, `k`, `l`), it calls the same drum-playing function.

8. Don't repeat yourself: clicking and typing should both call **the same function** that plays a sound
   for a given key. How did you organize that?
   Answer: I organized it by creating one shared function, `playDrumSound(letter)`, and having both the click handler and the `keydown` handler call that same function. That way, the sound logic lives in one place instead of being copied in two different event handlers.

9. Use `console.log` to see what's happening while you build this. Important! **Leave these in your code.**
   Answer: I kept `console.log` messages in the code so I can see what key was pressed, what button was clicked, and which sound is being played while I test the drum kit. These logs are useful for debugging and stay in the final code.

10. Comment your code in an educational way: not for the public, but to write down how everything works. I will be looking for this!
    Answer: I added comments to explain how the script selects the buttons, how the shared sound function works, how the click and keydown events call the same logic, and how the pressed animation is triggered. The comments are written for learning and help explain the program’s structure.

11. Optional: make the button visibly react when played (hint: there's a `.pressed` class in the CSS, plus `classList` and `setTimeout`).
    Answer: I added a small `animateButton()` function that adds the `.pressed` class to the matching button and removes it after a short timeout. This gives the button a quick pressed visual effect when either a click or keyboard key triggers the sound.

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
    Answer: The landing page should be your home page with your name, a short introduction, and a list of links like `lab1/` and `lab2/`. Each lab gets a short description so visitors understand what each project is. I would style it with a simple personal theme, colors, and clear headings so it feels like my own page.

13. Move your Lab 1 files into a `lab1/` folder. After moving them, **re-test your form**: does it still submit
    and show the results? Why does a form whose `action` is `submit.php` (a relative path) keep working when the
    whole folder moves together?
    Answer: Yes, the form should still submit and show the results after moving it into a `lab1/` folder as long as the files stay together. The `action="submit.php"` path is relative to the form’s HTML file, so when the whole folder moves, the relationship between the page and the PHP file stays the same. The browser still resolves `submit.php` to the same location inside the same folder.

14. Every lab page needs a way back home. Add a link from the drum kit (and your Lab 1 pages) to your landing page:
    ```html
    <a href="../">← Home</a>
    ```
    `../` means "up one folder." Why would `href="/"` send you to the wrong place on our server?
    (Hint: rule 1 at the top.)
    Answer: `../` goes up one folder from the current lab page, which is exactly how we get back to `/students/yourname/`. But `href="/"` means the root of the entire server, not the student folder, so it would take you to the wrong place. Since the lab lives under `/students/yourname/lab2/`, the root path would ignore that folder structure and point to the server’s top-level homepage instead.

15. Links from your landing page go *down* into the folders: `href="lab1/"` and `href="lab2/"`.
    Answer: The landing page should use relative links like `href="lab1/"` and `href="lab2/"` because it is located in `/students/yourname/`, and those folders are directly inside that directory. Using relative paths keeps the site portable and ensures the links work on the server as intended.

## Deploy it

16. Test everything locally first, including every link, both ways.
    Answer: Before uploading, I would open the site locally and check that each link goes forward and back correctly: from the landing page to each lab, and from each lab back to home. I would also test that every image, sound, and page loads in the right place without broken paths.

17. However you have your SFTP set up, upload: your landing page `index.html`, the `lab1/` folder, and this lab as `lab2/`.
    You don't need to upload the hidden `.git` folder (the server won't serve it anyway).
    Remove the old Lab 1 files from the top of your web folder once `lab1/` works, so you don't have two copies.
    Answer: The final deployment should include the top-level landing page and the `lab1/` and `lab2/` folders in the web folder. The hidden `.git` folder is not needed on the server, and old duplicated Lab 1 files should be removed so the site stays organized and only one correct copy exists.

18. Open your live site at `https://lampforall.cis251296.projects.jetstream-cloud.org/students/yourname/` and click
    through **everything**: home → Lab 1 → home → Lab 2 → home. Every image, sound and link should work there,
    not just locally.
    Answer: I would test the live site by navigating from the home page to each lab, going back home, then checking the drum kit, and making sure all links and assets still work on the server. This catches issues that only appear in the deployed environment.

19. **Works locally but broken on the server?** Open DevTools (right-click → Inspect) → **Console** and **Network** tabs,
    and look for red **404** errors. Almost every time it's one of the two rules at the top:
    a leading `/` in a path, or a filename whose case or spelling doesn't match.
    Did you hit one? Which one, and how did you fix it?
    Answer: The most common server issue is a bad path such as using `/sounds/snare.mp3` instead of `sounds/snare.mp3`, or a case mismatch like `Tom1.png` instead of `tom1.png` on a Linux server. I avoided those problems by using relative paths and matching the exact filenames and capitalization from the project folders.

20. Push this repo (your code **and** this README with your answers) to **your own GitHub repo**.
    Answer: After finishing the lab, I would commit the code and README and push them to my own GitHub repository so the work is saved and visible for grading.

21. Submit in Moodle three links: (1) your GitHub repo, (2) your landing page, and (3) your live drum kit.
    Answer: The final submission in Moodle should include the GitHub repository link, the live landing page URL, and the live drum kit URL so the instructor can check both the source code and the deployed site.
