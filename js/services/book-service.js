import myJson from './books.json' assert {type: 'json'};
import { utilService } from "./util-service.js";
import { storageService } from "./async-storage-service.js"

export const bookService = {
    query,
    remove,
    save,
    getEmptyBook,
    get,
    addReview,
    removeReview,
    getNewBooksList,
    addGoogleBook,
    getMovingBookId,
}
const BOOKS_KEY = 'books'
const NEW_BOOKS_KEY = 'newBooks'




_createBooks()

function query() {
    return storageService.query(BOOKS_KEY)
}

function addGoogleBook(googleBook) {
    query().then(books => {
        books.unshift(googleBook)
        utilService.saveToStorage(BOOKS_KEY, books)
    })
}

function addReview(bookId, review) {
    return get(bookId).then(book => {
        if (!book?.reviews || !book?.reviews.length) book.reviews = []
        book.reviews.unshift(review)
        return save(book)
    })
}

function removeReview(bookId, reviewId) {
    return storageService.get(BOOKS_KEY, bookId).then(book => {
        book.reviews.splice(reviewId, 1)
        save(book)
    })
}

function get(bookId) {
    return storageService.get(BOOKS_KEY, bookId)
}

function remove(bookId) {
    return storageService.remove(BOOKS_KEY, bookId)
}

function save(book) {
    if (book.id) return storageService.put(BOOKS_KEY, book)
    else return storageService.post(BOOKS_KEY, book)
}

function getEmptyBook() {
    return {
        id: null,
        title: null,
        subtitle: null,
        authors: null,
        publishedDate: null,
        pageCount: null,
        categories: null,
        thumbnail: null,
        language: null,
        listPrice: null
    }
}


function _createBooks() {
    storageService.query(BOOKS_KEY).then(books => {
        if (!books || !books.length) utilService.saveToStorage(BOOKS_KEY, myJson)
    })
}


function getMovingBookId(bookId, dir) {
    return storageService.query(BOOKS_KEY)
        .then(books => {
            const idx = books.findIndex(book => book.id === bookId)
            if (dir === 'next') return (idx < books.length - 1) ? books[idx + 1].id : books[0].id
            if (dir === 'prev') return (idx > 0) ? books[idx-1].id : books[books.length-1].id
        })
}



function getNewBooksList(value) {
    let booksCache = utilService.loadFromStorage(NEW_BOOKS_KEY) || {}
    console.log('book cache first', booksCache);
    const GOOGLE_BOOK = `https://www.googleapis.com/books/v1/volumes?printType=books&q=${value}`
    if (booksCache[value]) {
        console.log('getting from cache')
        return Promise.resolve(booksCache[value])
    }
    console.log('getting from server')
    return axios.get(GOOGLE_BOOK)
        .then(res => res.data.items)
        .then(items => {
            let newItems = items.map(getBooksInfo)
            booksCache[value] = newItems
            utilService.saveToStorage(NEW_BOOKS_KEY, booksCache)
            return newItems
        })
}

function getBooksInfo(item) {
    const info = item.volumeInfo
    const code = ['EUR', 'ILS', 'USD']
    return {
        id: item.id,
        title: info.title,
        subtitle: info.subtitle,
        authors: info.authors,
        publishedDate: info.publishedDate,
        description: info.description,
        pageCount: info.pageCount,
        categories: info.categories,
        thumbnail: info.imageLinks.thumbnail,
        language: info.language,
        listPrice: {
            amount: utilService.getRandomInt(0, 200),
            currencyCode: code[utilService.getRandomInt(0, code.length - 1)],
            isOnSale: (Math.random() > 0.49) ? true : false,
        }
    }

}
