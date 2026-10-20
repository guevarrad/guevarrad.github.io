const form = document.querySelector("#search-form");
const input = document.querySelector("#query");
const statusMessage = document.querySelector("#status");
const results = document.querySelector("#results");
const readingListElement = document.querySelector("#reading-list");
const readingList = JSON.parse(localStorage.getItem("readingList")) || [];

async function searchBooks(query) {
  const url = "https://openlibrary.org/search.json?limit=10&q=" + encodeURIComponent(query);
  console.log("fetching", url);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Book search failed with status " + response.status);
  }
  const data = await response.json();
  return data.docs;
}

function renderResults(books) {
  results.textContent = "";
  books.forEach(function (book) {
    const li = document.createElement("li");
    if (book.cover_i) {
      const img = document.createElement("img");
      img.src = "https://covers.openlibrary.org/b/id/" + book.cover_i + "-S.jpg";
      img.alt = "Cover of " + book.title;
      li.append(img);
    }

    let author = "Unknown author";
    if (book.author_name) {
      author = book.author_name[0];
    }

    let details = book.title + " — " + author;
    if (book.first_publish_year) {
      details += " (" + book.first_publish_year + ")";
    }
    li.append(document.createTextNode(details + " "));

    const save = document.createElement("button");
    save.type = "button";
    save.textContent = "Save";
    save.addEventListener("click", function () {
      console.log("save", book.title);
      if (book.key && readingList.some(function (savedBook) {
        return savedBook.key === book.key;
      })) {
        return;
      }
      readingList.push(book);
      renderReadingList();
    });
    li.append(save);
    results.append(li);
  });
}

function renderReadingList() {
  readingListElement.textContent = "";
  readingList.forEach(function (book, index) {
    const li = document.createElement("li");
    li.textContent = book.title + " ";

    const remove = document.createElement("button");
    remove.type = "button";
    remove.textContent = "Remove";
    remove.addEventListener("click", function () {
      readingList.splice(index, 1);
      renderReadingList();
    });

    li.append(remove);
    readingListElement.append(li);
  });
  localStorage.setItem("readingList", JSON.stringify(readingList));
}

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const query = input.value;
  console.log("searching for", query);

  statusMessage.textContent = "Searching...";
  results.textContent = "";
  try {
    const books = await searchBooks(query);
    console.log("got", books);
    renderResults(books);
    statusMessage.textContent = books.length === 0 ? "No books found" : "";
  } catch (error) {
    console.log("something went wrong:", error);
    statusMessage.textContent = "Couldn't reach the library. Check your connection.";
  }
});

renderReadingList();
