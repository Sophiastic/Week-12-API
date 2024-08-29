document.getElementById("render-books").addEventListener("click", async () => {
  const response = await fetch("http://localhost:3000/Title");
  /*setting up to put information to a table.*/
  const books = await response.json();
  const tableBody = document.querySelector("table tbody");
  tableBody.innerHTML = "";
  books.forEach((book) => {
    //row is for each section of my table
    const row = document.createElement("tr");

    //here is where i'm adding every element from my json data to its designated area
    const titleCell = document.createElement("td");
    titleCell.textContent = `Title: ${book.title}`;

    const genreCell = document.createElement("td");
    genreCell.textContent = `Genre ID: ${book.genreId}`;

    const authorCell = document.createElement("td");
    authorCell.textContent = `Author ID: ${book.authorId}`;
    //for my delete button
    const deleteCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.addEventListener("click", async () => {
      await fetch(`http://localhost:3000/Title/${book.id}`),
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
        };
      //each row will have its own  button to be removed
      row.remove();
    });

    //adding a delete button to each row
    deleteButton.innerHTML = "Read it!";
    deleteCell.appendChild(deleteButton);

    //adding it all together
    row.appendChild(titleCell);
    row.appendChild(genreCell);
    row.appendChild(authorCell);
    row.appendChild(deleteCell);
    tableBody.appendChild(row);
  });
});

//here i'll be working on adding information from the form to the table/json info

document
  .getElementById("bookForm")
  .addEventListener("submit", async function onCreateNewBookClick(event) {
    event.preventDefault();
    const titleInput = document.getElementById("title");
    const genreInput = document.getElementById("genre");
    const authorInput = document.getElementById("author");

    const title = titleInput.value;
    const genre = genreInput.value;
    const author = authorInput.value;

    const response = await fetch("http://localhost:3000/Title", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        genre: genre,
        author: author,
      }),
    });
    //this should clear the form after hitting the add/submit button
    document.getElementById("title").value = "";
    document.getElementById("genre").value = "";
    document.getElementById("author").value = "";
  });
