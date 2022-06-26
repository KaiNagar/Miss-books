import myJson from './books.json' assert {type: 'json'};
import { utilService } from "./util-service.js";

export const bookService = {
    query,
    remove,
    save,
    getEmptyBook,
}
const BOOKS_KEY = 'books'

function query(){
    let books = utilService.loadFromStorage(BOOKS_KEY)
    if(!books || !books.length){
        books = myJson
        utilService.saveToStorage(BOOKS_KEY,myJson)
    }
    return books
}

function remove(bookId){
const books = query()
const idx = books.findIndex(book=> book.id === bookId)
books.splice(idx,1)
utilService.saveToStorage(BOOKS_KEY,books)
}

function save(book){
    book.id = utilService.makeId()
    const books = query()
    books.push(book)
    utilService.saveToStorage(BOOKS_KEY,books)
    return book
}

function getEmptyBook() {
    return {
        id: null,
        title: null,
        subtitle: null,
        authors:null,
        publishedDate: null,
        pageCount: null,
        categories: null,
        thumbnail: null,
        language: null,
        listPrice: null
    }
}
