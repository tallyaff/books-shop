
'use strict'



function onInit() {
    createBooks();
    renderTable()
}


function renderTable() {
    var strHTMLs = gBooks.map(function (book) {
        return `<tr>
        <td>${book.name}</td>
        <td>${book.id}</td>
        <td>${book.price}</td>
        <td>
        <div class='action-btns'>
        <button class='btn-read btn btn-primary' onclick ="onBookDetailsModal(${book.id})" >Read</button>
        <button class='btn-update btn btn-warning' onclick ="onGetUpdateBookModal(${book.id})" >Update</button>
        <button class='btn-delete btn btn-danger' onclick ="onDeleteBook(event, ${book.id})">Delete</button>
        </div></td>
        </tr>`
    })
    $('.tbody-books').html(strHTMLs.join(''));
}

function onDeleteBook(event, bookId) {
    deleteBook(bookId);
}

function readAndAddNewBook() {
    var bookName = $('.book-name').val();
    var bookPrice = $('.book-price').val();
    addBook(bookName, bookPrice)
}

function readAndUpdateBook(bookId) {
    var bookPrice = $('.book-price').val();
    updateBook(bookId, bookPrice);
}


function onGetUpdateBookModal(bookId) {
    $("#modal").modal();
    $('.uniqe').replaceWith(`<button type="button" class="btn uniqe btn-primary" data-dismiss="modal" onclick="readAndUpdateBook(${bookId})">Update Book</button>`);
    $('.book-name-label').hide();
    $('.book-name').hide();
    $('.modal-title').text('Update Book');
    $('.book-price-label').text('Please update book price');
}


function getAddBookModal() {
    $('.uniqe').replaceWith('<button type="button" class="btn uniqe btn-primary" data-dismiss="modal" onclick="readAndAddNewBook()">Add Book</button>');
    $('.book-name-label').show();
    $('.book-name').show();
    $('.modal-title').text('Add a new book');
    $('.book-price-label').text('Please enter book price');
}

function onBookDetailsModal(bookId) {
    var book = getBookDetails(bookId);
    renderModal(book);

}


function renderModal(book) {
    var bookDetails = `<div>Book Name : ${book.name}<br> Book ID : ${book.id}<br> Book Price : ${book.price}
    <br>Book Rate: ${book.rate} Change Rate: <button onclick='onThumbsUp(${book.id},${book.rate})'>Up</button>
    <button onclick='onThumbsDown(${book.id},${book.rate})'>Down</button> <br>image:<br>  <img src="img/${book.id}.png"></div>`
    $('.read-modal-body').html(bookDetails);
    $('#book-details-modal').modal();
}

