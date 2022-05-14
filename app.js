let myLibrary = [];

function Book(author, title, year) {
    this.author = author;
    this.title = title;
    this.year = year;
    this.readStatus = false;
    this.dateID;
    this.expectValue = 0;

}


function addBookToLibrary(author, title, year, readStatus, expectValue) {
    const addBook = new Book(author, title, year);
    addBook.readStatus = readStatus;
    addBook.dateID = `date${Date.now()}`;
    addBook.expectValue = expectValue;
    myLibrary.push(addBook);
    refresh();
}


function removeBookFromLibrary(dateID) {
    myLibrary = myLibrary.filter(book => {
        return book.dateID !== dateID;
    });
    refresh();
};

const form = document.querySelector('#book-form');
const bookName = document.querySelector("#book-name");
const author = document.querySelector("#author");
const releaseDate = document.querySelector("#release-date");
const expectedValue = document.querySelector("#expected")
const readStatusCheck = document.querySelector("#read-yet")

form.addEventListener('submit', e => {
    e.preventDefault();
    addBookToLibrary(author.value, bookName.value, releaseDate.value, readStatusCheck.checked, expectedValue.value);
    clearForm();
})


function refresh() {
    document.querySelector('#library').innerHTML = '';
    myLibrary.forEach((book) => {
        const newBook = document.createElement('div');
        document.querySelector('#library').appendChild(newBook);
        newBook.setAttribute('id', `${book.dateID}`)
        newBook.setAttribute('class', `books`)
        theBook = document.querySelector(`#${book.dateID}`);
        theBook.innerHTML = `<h3>${book.title}</h3> ${book.author}  ${book.year} <span>期待值 ${book.expectValue}</span>`;

        const deleteButton = document.createElement('button');
        theBook.appendChild(deleteButton);
        deleteButton.setAttribute('class', 'delete');
        deleteButton.textContent = '❌';
        deleteButton.addEventListener('click', (e) => {
            removeBookFromLibrary(e.target.parentNode.id);
        });

        const readStatusButton = document.createElement('input');
        theBook.appendChild(readStatusButton);
        readStatusButton.setAttribute('class', 'read-status');
        readStatusButton.setAttribute('type', 'checkbox');
        if (book.readStatus === true) {
            readStatusButton.checked = true;
        };

    })
}

function clearForm() {
    bookName.value = "";
    author.value = '';
    releaseDate.value = '';
    expectedValue.value = '';
    readStatusCheck.value = '';
}