'use strict'

var gBooks = [];
var gId = 1;
var BOOKS_KEY = 'booksApp'

function createBooks() {
    var books = loadFromStorage(BOOKS_KEY);
    if (!books || books.length === 0) {
        books = [];
        books.push(createBook('Hakarish Hapatish'))
        books.push(createBook('Lolo is going to the beach'))
        books.push(createBook('Popo is crying'))
    }
    gBooks = books;
    saveToStorage(BOOKS_KEY, books);
}



function createBook(name, userPrice) {
    return {
        name: name,
        id: gId++,
        price: userPrice ? userPrice : getRandPrice(),
        rate: 0
    }
}


function getBookIdx(bookId) {
    var bookIdx;
    gBooks.forEach(function (book, idx) {
        if (+book.id === bookId) {
            bookIdx = idx;
        }
    });
    return bookIdx;
}




function deleteBook(bookId) {
        var bookIdx = (getBookIdx(bookId))
        gBooks.splice(bookIdx, 1);
        renderTable();
        saveToStorage(BOOKS_KEY, gBooks);
}


function addBook(name, price) {
    if (name === null || price === null) return;
    var newBook = createBook(name, price);
    gBooks.unshift(newBook);
    renderTable();
    saveToStorage(BOOKS_KEY, gBooks);

}


function updateBook(bookId, bookPrice) {
    var bookIdx = (getBookIdx(bookId))
    gBooks[bookIdx].price = bookPrice;
    renderTable();

}


function getBookDetails(bookId) {
    var bookIdx = (getBookIdx(bookId))
    var book = gBooks[bookIdx];
    return book;

}


function onThumbsUp(bookId, bookRate) {
    if (bookRate < 10) {
        var bookIdx = (getBookIdx(bookId))
        var book = gBooks[bookIdx];
        book.rate = book.rate + 1;
        renderModal(book);
        saveToStorage(BOOKS_KEY, gBooks);
    }
}


function onThumbsDown(bookId, bookRate) {
    if (bookRate > 1) {
        var bookIdx = (getBookIdx(bookId))
        var book = gBooks[bookIdx];
        book.rate = book.rate - 1;
        renderModal(book);
        saveToStorage(BOOKS_KEY, gBooks);
    }

}