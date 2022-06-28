import { bookService } from "../services/book-service.js";
import bookList from "../cmps/book-list.cmp.js"
import bookFilter from "./book-filter.cmp.js"
import bookAdd from "../cmps/book-add.cmp.js"
import { eventBus } from "../services/eventBus-service.js"



export default {
    template: `
    <section v-if="books">
        <book-filter @filtered="setFilter" :max="maxPrice"/>
        <book-add  @addNewBook="addNewBook"/>
        <book-list :books="booksToDisplay" />
    </section>
        `,
    components: {
        bookList,
        bookFilter,
        bookAdd,
    },
    data() {
        return {
            books: null,
            filterBy: null,
            highestPrice: 0,
        }
    },
    methods: {
        setFilter(filterBy) {
            this.filterBy = filterBy
        },
        addNewBook(newBook) {
            bookService.addGoogleBook(newBook)
            this.books.unshift(newBook)
            eventBus.emit('show-msg', { txt: `Added new book ${newBook.title}!`, type: 'success' ,link:'/book'})
        }
    },
    computed: {
        booksToDisplay() {
            if (!this.filterBy) return this.books
            const regex = new RegExp(this.filterBy.title, "i")
            const { toPrice, priceFrom } = this.filterBy
            return this.books.filter((book) => regex.test(book.title) && amount <= toPrice && amount >= priceFrom)
        },
        maxPrice() {
            this.books.forEach(({
                listPrice: { amount } }) => {
                if (amount > this.highestPrice) this.highestPrice = amount
            })
            return this.highestPrice
        }
    },
    created() {
        bookService.query().then(books => this.books = books)
    },
    unmounted() {

    }
}