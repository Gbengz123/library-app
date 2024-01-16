const myLibrary = [];

const button = document.querySelector('button');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const library = document.querySelector('.library')
let book;
let bookContainer;
let titleNode, titleHead, titleContent;
let authorNode, authorHead, authorContent;
let rmbutn, readButn;

button.addEventListener('click', addBookToLibrary)


function Book(title, author){
    this.title = title;
    this.author = author;
    this.display = false;
    this.read = false
}

function addBookToLibrary(){
    book = new Book(title.value, author.value);
    myLibrary.push(book);
    bookDisplay();
    console.log(myLibrary);
}

function bookDisplay(){
    myLibrary.forEach(function(book, index){
        if(book.display === true) { // check if book is already on display
            return;
        }

        book.display = true
        bookContainer = document.createElement('div');
        bookContainer.classList.add('books');
        bookContainer.setAttribute('data-index', index)// binds object in dex with the book container

        titleNode = document.createElement('div')
        titleNode.classList.add('bookInfo');

        titleHead = document.createElement('h1')
        titleHead.textContent = 'Title: '
        titleContent = document.createElement('p')
        titleContent.textContent = book.title

        titleNode.appendChild(titleHead);
        titleNode.appendChild(titleContent);

        authorNode = document.createElement('div')
        authorNode.classList.add('bookInfo');

        authorHead = document.createElement('h1')
        authorHead.textContent = 'Author: '
        authorContent = document.createElement('p')
        authorContent.textContent = book.author

        authorNode.appendChild(authorHead);
        authorNode.appendChild(authorContent);

        rmbutn = document.createElement('button')
        rmbutn.textContent = 'remove'
        rmbutn.addEventListener('click', removeBook)

        readButn = document.createElement('button')
        readButn.textContent = 'read'
        readButn.addEventListener('click', markRead)
        
        bookContainer.appendChild(titleNode);
        bookContainer.appendChild(authorNode);
        bookContainer.appendChild(rmbutn);
        bookContainer.appendChild(readButn)

        library.appendChild(bookContainer);
    })
}

function removeBook(e, index){
    index = e.target.parentElement.getAttribute('data-index') // gets attribute of book
    myLibrary.splice(index, 1); //delete book from the list
    e.target.parentElement.remove()//removes its element from the page
    console.log(myLibrary)
}

function markRead(e, index){    
    index = e.target.parentElement.getAttribute('data-index')
    e.target.classList.toggle('read')
}

