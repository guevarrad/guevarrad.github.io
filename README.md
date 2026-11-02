# cs333-lab5
APIs with Express: a recipe server, a jokes API, and your first database 🍝😂🍎

Do each step below, and **answer the questions right here in this `README.md` file** as you go (type your answers under each question).

- **Part 1 — after Monday's class.** A small server that sends recipes, as a web page and as JSON.
- **Part 2 — after Wednesday's class.** A jokes API you can read, add to, change and delete from.
- **Part 3 — MongoDB on your computer.** Install it and make your first database.
- **Part 4 — your own server.** Log in and look around. Nothing to deploy yet.

Every step gives you the code. Type it in (typing it is how it sticks), run it, test it, then do the small **TODO** or answer the question.

**Everything in Parts 1–3 runs on your computer**, the same as Lab 4. Hand in one link: your GitHub repo.

**Stuck?** Look at the **Stuck?** table at the bottom first. Then post in the Slack lab thread: (1) the command you ran, (2) the **exact** error, copied and pasted, (3) what you already tried.

---

# Part 1: Recipes (after Monday)

An **API** is a set of addresses (routes) a program can ask for data. In Week 3 you were the one asking: your Book Finder called Open Library's `/search.json`. Now you write the server that answers.

You'll test with the **REST Client** extension from Lab 4: open a `.http` file and click **Send Request** above a request.

## 1. Run it

```bash
cd Recipes
npm install
npm run dev
```

Open `http://localhost:3000`.

**Question 1:** which recipe do you see? Which line of `index.js` picks that one?

Answer: It shows `Pasta Carbonara`. The root route picks the first recipe with `recipes[0]`.

## 2. Add your own recipes

Add **two** recipes of your own to the end of `recipes.json`, in the same shape as the others. Reload the page.

**TODO:** take away one comma between two recipes, save, and reload the page.
**Question 2:** what does the server terminal say? Why is JSON this strict? (Week 3 slides.) Put the comma back.

Answer: The terminal shows a JSON error because the missing comma makes the file invalid. We put the comma back to fix it.

## 3. Send a request without the browser

Open `Recipes/requests.http` and click **Send Request** above the first request. The answer opens on the right: the status line (`200 OK`), the headers, then the HTML.

## 4. Every recipe, as JSON

Type this under `// Your routes go here`:

```js
app.get("/recipes", function (req, res) {
  res.json(getRecipes());
});
```

Send the second request in `requests.http`, then open `http://localhost:3000/recipes` in the browser too.

**Question 3:** look at the `Content-Type` header for `/` and for `/recipes`. What's different, and which one is for people and which one is for programs?

Answer: `/` sends HTML for people to view in a browser. `/recipes` sends JSON for programs to use.

## 5. One recipe: a path parameter

```js
app.get("/recipes/:index", function (req, res) {
  const index = parseInt(req.params.index);
  const recipe = getRecipes()[index];
  res.send(recipePage(recipe));
});
```

Send the `/recipes/1` request. `:index` is a **path parameter**: whatever is in that part of the address ends up in `req.params.index`.

**Question 4:** which recipe is `/recipes/1`? Why not the first one?

Answer: `/recipes/1` is `Chicken Stir-Fry`. Array indexes start at `0`, so index `1` is the second recipe.

**TODO:** send the `/recipes/99` request. **Question 5:** what happens, and what does the terminal say? Fix it: put this line right after `const recipe = ...`, and send it again:

Answer: It returns `404 Not Found` because there is no recipe at index `99`.

```js
if (!recipe) return res.status(404).send("No recipe number " + index);
```

## 6. Search: a query parameter

```js
app.get("/search", function (req, res) {
  const ingredient = req.query.ingredient;
  const found = getRecipes().filter((recipe) => recipe.ingredients.includes(ingredient));
  res.json(found);
});
```

Send the `/search?ingredient=Eggs` request. Everything after `?` is the **query string**, and Express puts it in `req.query`.

**TODO:** change `Eggs` to `eggs` and send it again. **Question 6:** what comes back, and why? (Optional: make the search work for any capitalisation.)

Answer: `Eggs` finds the recipe, but `eggs` returns no results because capitalization must match. I changed the search to ignore capitalization.

Commit: `Part 1: recipes`

---

# Part 2: Jokes API (after Wednesday)

Same idea, but now the client can **add, change and delete** jokes, not just read them. The jokes live in an array at the bottom of `Jokes/index.js`.

| Method | Route | It does |
| --- | --- | --- |
| GET | `/random` | a random joke (done for you) |
| GET | `/jokes/:id` | one joke |
| GET | `/filter?type=Puns` | jokes of one type |
| POST | `/jokes` | add a joke |
| PUT | `/jokes/:id` | replace a joke completely |
| PATCH | `/jokes/:id` | change part of a joke |
| DELETE | `/jokes/:id` | delete a joke |

Stop the recipe server (**Ctrl+C**), then:

```bash
cd ../Jokes
npm install
npm run dev
```

Open `Jokes/requests.http` and send request **1** a few times.

## 7. Get a specific joke

Under `// 2. Get a specific joke`:

```js
app.get("/jokes/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const foundJoke = jokes.find((joke) => joke.id === id);
  res.json(foundJoke);
});
```

**Question 7:** why do we need `parseInt` here? What would `joke.id === id` do without it?

Answer: The ID from the URL is text, but joke IDs are numbers. `parseInt` converts it to a number so they can match.

**TODO:** send the `/jokes/99` request. It says `200 OK` but sends nothing back. Fix it the same way as step 5, with a `404`.

## 8. Filter jokes by type

**TODO:** write this one yourself, under `// 3. Filter jokes by type`. It's step 6 again: read `req.query.type`, `filter` the jokes whose `jokeType` matches, and send them with `res.json`. Test it with the `/filter?type=Puns` request.

Answer: The route returns jokes whose type matches the requested type.

## 9. Post a new joke

```js
app.post("/jokes", function (req, res) {
  const newJoke = {
    id: jokes.length + 1,
    jokeText: req.body.text,
    jokeType: req.body.type,
  };
  jokes.push(newJoke);
  res.json(newJoke);
});
```

Send request **4**. To get your new joke back, change request **2** to `/jokes/13` and send it.

**TODO:** save `index.js` (that restarts the server), then send `/jokes/13` again.
**Question 8:** where did your joke go? Why? What would fix it? (Hint: Part 3.)

Answer: The joke disappeared when the server restarted because the array resets. Saving jokes in a database would keep them.

## 10. Put and patch

```js
app.put("/jokes/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const replacementJoke = {
    id: id,
    jokeText: req.body.text,
    jokeType: req.body.type,
  };
  const searchIndex = jokes.findIndex((joke) => joke.id === id);
  jokes[searchIndex] = replacementJoke;
  res.json(replacementJoke);
});

app.patch("/jokes/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const existingJoke = jokes.find((joke) => joke.id === id);
  const replacementJoke = {
    id: id,
    jokeText: req.body.text || existingJoke.jokeText,
    jokeType: req.body.type || existingJoke.jokeType,
  };
  const searchIndex = jokes.findIndex((joke) => joke.id === id);
  jokes[searchIndex] = replacementJoke;
  res.json(replacementJoke);
});
```

Send requests **5** and **6**.

**TODO:** in request **5** (PUT), delete `text=...&` so it only sends `type=Programming`, and send it again.
**Question 9:** what happened to the joke's text? So what is the difference between PUT and PATCH?

Answer: The text disappeared because `PUT` replaces the whole joke. `PATCH` changes only the fields you send.

## 11. Delete a joke

```js
app.delete("/jokes/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const searchIndex = jokes.findIndex((joke) => joke.id === id);
  if (searchIndex === -1) {
    return res.status(404).json({ error: "No joke with id " + id });
  }
  jokes.splice(searchIndex, 1);
  res.sendStatus(200);
});
```

Send request **7**, then send it again.

**Question 10:** what status do you get the first time, and the second time?

Answer: The first request returns `200 OK`. The second returns `404 Not Found` because the joke is already deleted.

**TODO:** with joke 4 deleted, send request **4** (POST) once.
**Question 11:** what `id` does the new joke get? Is there already a joke with that id? Why is that a problem? (Optional: fix it.)

Answer: The new joke gets ID `12`, which is already in use. IDs should be unique, so the server should choose an unused ID.

**Comment your `Jokes/index.js`** in your own words: one comment above each route saying what it does.

Commit: `Part 2: jokes API`

---

# Part 3: MongoDB on your computer

Question 8 showed the problem: the jokes live in an array, so they're gone every time the server restarts. A **database** keeps data after the program stops. We'll use **MongoDB**, which stores data as documents that look like JSON.

You install two things: **MongoDB Community Server** (the database, it listens on port **27017**) and **mongosh** (a shell where you type database commands).

**Do this on your own laptop, plugged in.** It takes a while.

**Mac** (needs [Homebrew](https://brew.sh); run `brew update` first):

```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Windows:** follow [Install MongoDB Community on Windows](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/): the **MSI** installer, **Install MongoDB as a Service**, defaults are fine. Then install [mongosh](https://www.mongodb.com/docs/mongodb-shell/install/). If `mongosh` is "not recognized", add its `bin` folder to your **Path** and open a new terminal.

## 12. Open the shell

```bash
mongosh
```

You should see a `test>` prompt. **Question 12:** what version of MongoDB does it say you're connected to?

Answer: MongoDB version `9.0.4`.

## 13. Make a database
Type these one at a time:

```js
show dbs
use fruitsDB
db.fruits.insertOne({ name: "Apple", rating: 8, review: "Crunchy" })
db.fruits.insertMany([
  { name: "Banana", rating: 6, review: "Good for a snack" },
  { name: "Kiwi", rating: 9, review: "Underrated" }
])
db.fruits.find()
show dbs
```

**Question 13:** was `fruitsDB` in the first `show dbs`? When did it appear?

Answer: No. It appeared after I added fruit documents to it.

**TODO:** add one more fruit of your choice, then run `db.fruits.find({ rating: { $gt: 7 } })`.
**Question 14:** what does that last command find?

Answer: It finds fruits with a rating greater than 7.

Copy everything from your terminal (from `mongosh` to the last command) and paste it here, in a code block:

```

PS C:\Users\denni> mongosh  --version
2.14.1
PS C:\Users\denni> mongosh.exe
Current Mongosh Log ID: 6ae84fdabaa0487245e208bf
Connecting to:          mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.14.1
Using MongoDB:          9.0.4
Using Mongosh:          2.14.1

For mongosh info see: https://www.mongodb.com/docs/mongodb-shell/


To help improve our products, pseudo-anonymous usage data is collected from interactive and agentic sessions only, and sent to MongoDB periodically (https://www.mongodb.com/legal/privacy-policy).
You can opt-out by running the disableTelemetry() command.

------
   The server generated these startup warnings when booting
   2026-11-02T00:12:20.092-08:00: Access control is not enabled for the database. Read and write access to data and configuration is unrestricted
------

test> show dbs
admin   40.00 KiB
config  60.00 KiB
local   40.00 KiB
test> use fruitsDB
switched to db fruitsDB
fruitsDB> db.fruits.insertOne({ name: "Apple", rating: 8, review: "Crunchy" })
{
  acknowledged: true,
  insertedId: ObjectId('6ae850b0baa0487245e208c0')
}
fruitsDB> db.fruits.insertMany([
|   { name: "Banana", rating: 6, review: "Good for a snack" },
|   { name: "Kiwi", rating: 9, review: "Underrated" }
| ])
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId('6ae850b9baa0487245e208c1'),
    '1': ObjectId('6ae850b9baa0487245e208c2')
  }
}
fruitsDB> db.fruits.find()
[
  {
    _id: ObjectId('6ae850b0baa0487245e208c0'),
    name: 'Apple',
    rating: 8,
    review: 'Crunchy'
  },
  {
    _id: ObjectId('6ae850b9baa0487245e208c1'),
    name: 'Banana',
    rating: 6,
    review: 'Good for a snack'
  },
  {
    _id: ObjectId('6ae850b9baa0487245e208c2'),
    name: 'Kiwi',
    rating: 9,
    review: 'Underrated'
  }
]
fruitsDB> show dbs
admin     40.00 KiB
config    60.00 KiB
fruitsDB   8.00 KiB
local     40.00 KiB
fruitsDB> db.fruits.insertOne({ name: "Orange", rating: 7, review: "Citrusy" })
| db.fruits.find({ rating: { $gt: 7 } })
[
  {
    _id: ObjectId('6ae850b0baa0487245e208c0'),
    name: 'Apple',
    rating: 8,
    review: 'Crunchy'
  },
  {
    _id: ObjectId('6ae850b9baa0487245e208c2'),
    name: 'Kiwi',
    rating: 9,
    review: 'Underrated'
  }
]
fruitsDB>
```

Type `exit` to leave mongosh.

Commit: `Part 3: MongoDB`

---

# Part 4: Your own server

This week you each get **your own server**. It isn't like `lampforall`: you have a real shell, and it can run Node and MongoDB. We'll deploy to it in the next labs. Today, just log in and look around. **Don't install or change anything yet.**

I'll post your server's address and username in Slack when the servers are ready. If they aren't ready by the due date, skip Part 4 for now: it moves to Lab 6.

```bash
ssh yourname@your-server-address
```

Then type each of these and look at what it says:

| Type this | It shows |
| --- | --- |
| `whoami` | your username |
| `hostname` | the server's name |
| `pwd` and `ls` | where you are, and what's there |
| `node --version` | which Node, if any |
| `mongod --version` | which MongoDB, if any |
| `df -h /` | how much disk space there is |
| `free -h` | how much memory there is |
| `exit` | log out |

**Question 15:** what versions of Node and MongoDB are on your server? Are they the same as on your laptop?
**Question 16:** how much disk space and memory does your server have? Is that more or less than your laptop?

---

# Hand it in

17. Push this repo (code **and** this README with your answers) to **your own GitHub repo**.
18. Submit your GitHub repo link in Moodle.

---

## Stuck?

| You see | What's going on | Fix |
| --- | --- | --- |
| `Cannot find package 'express'` | You didn't `npm install` in *this* folder | `pwd` to check where you are, `cd Recipes` or `cd Jokes`, then `npm install` |
| `EADDRINUSE: address already in use :::3000` | The other server is still running | Ctrl+C in every terminal tab. Only run one of Recipes or Jokes at a time |
| `SyntaxError: ... in JSON` | A missing or extra comma (or quote) in `recipes.json` | Check the line the error points to |
| `Cannot GET /something` | No route for that address, or the wrong method | Check the spelling, and `get` vs `post` |
| `req.body` is `undefined` | `app.use(express.urlencoded());` is missing | Put it near the top, above the routes |
| The request spins forever | The route never sends anything back | Every route needs a `res.send`, `res.json` or `res.sendStatus` |
| No **Send Request** link in the `.http` file | REST Client isn't installed | Install the **REST Client** extension in VS Code |
| `mongosh: command not found` / `not recognized` | mongosh isn't installed, or isn't on your Path | Install mongosh, add it to Path, open a **new** terminal |
| `MongoNetworkError: connect ECONNREFUSED 127.0.0.1:27017` | The database server isn't running | Mac: `brew services start mongodb-community`. Windows: start the **MongoDB** service in Services |
| `Permission denied (publickey)` | Your server doesn't have your SSH key, or you used the wrong username | Check the username in Slack, then ask in the Slack thread |
