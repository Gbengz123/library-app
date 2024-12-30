const myLibrary = [];

const button = document.querySelector('button');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const library = document.querySelector('.library')
const addBook = document.querySelector('#addBtn')
const modalForm = document.querySelector('#modal')
const form = document.querySelector('form')
let book;
let bookContainer;
let titleNode, titleHead, titleContent;
let authorNode, authorHead, authorContent;
let buttons, rmbutn, readButn;

addBook.addEventListener('click', () => {
    modalForm.showModal();
})

title.addEventListener('input', () => {
    console.log(title.validity.rangeOverflow)
    if (title.validity.valueMissing){
        title.setCustomValidity('Enter title name')
        title.classList.add('error')
        title.previousElementSibling.textContent = title.validationMessage
    }
    else{
        title.setCustomValidity('')
        title.classList.remove('error')
        title.previousElementSibling.textContent = ''
    }
})

author.addEventListener('input', () => {
    console.log(author.validity.rangeOverflow)
    if (author.validity.valueMissing){
        author.setCustomValidity('Enter author name')
        author.classList.add('error')
        author.previousElementSibling.textContent = author.validationMessage
    }
    else{
        author.setCustomValidity('')
        author.classList.remove('error')
        author.previousElementSibling.textContent = ''
    }
})

form.addEventListener('submit', (event) => {
    if (!title.checkValidity()){
        event.preventDefault() // prvent form from submitting
    }
    else if(!author.checkValidity()){
        event.preventDefault() // prvent form from submitting
    }
    addBookToLibrary()
})

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
    form.reset()
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

        buttons = document.createElement('div');
        buttons.classList.add('button-container')

        rmbutn = document.createElement('div')
        rmbutn.innerHTML = '<svg id="rm-btn" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M16 12.75H8C7.59 12.75 7.25 12.41 7.25 12C7.25 11.59 7.59 11.25 8 11.25H16C16.41 11.25 16.75 11.59 16.75 12C16.75 12.41 16.41 12.75 16 12.75Z" fill="#000000"></path><path d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z" fill="#000000"></path></g></svg>'
        rmbutn.addEventListener('click', removeBook)

        readButn = document.createElement('div')
        readButn.innerHTML = '<svg id="read-btn" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z" fill="#000000"></path><path d="M10.5795 15.5801C10.3795 15.5801 10.1895 15.5001 10.0495 15.3601L7.21945 12.5301C6.92945 12.2401 6.92945 11.7601 7.21945 11.4701C7.50945 11.1801 7.98945 11.1801 8.27945 11.4701L10.5795 13.7701L15.7195 8.6301C16.0095 8.3401 16.4895 8.3401 16.7795 8.6301C17.0695 8.9201 17.0695 9.4001 16.7795 9.6901L11.1095 15.3601C10.9695 15.5001 10.7795 15.5801 10.5795 15.5801Z" fill="#000000"></path></g></svg>'
        readButn.addEventListener('click', markRead)

        buttons.appendChild(rmbutn)
        buttons.appendChild(readButn)
        bookContainer.appendChild(titleNode);
        bookContainer.appendChild(authorNode);
        bookContainer.appendChild(buttons)

        library.appendChild(bookContainer);
    })
}

function removeBook(e, index){
    index = e.target.closest('.books').getAttribute('data-index') // gets attribute of book
    myLibrary.splice(index, 1); //delete book from the list
    e.target.closest('.books').remove()//removes its element from the page
    console.log(myLibrary)
}

function markRead(e, index, rmbtn){    
    index = e.target.parentElement.getAttribute('data-index')
    rmbtn = document.querySelector('#read-btn')
    rmbtn.style.cssText = "fill: #22c55e;"
    console.log(rmbtn)
}



