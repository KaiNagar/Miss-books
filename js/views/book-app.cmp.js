import { bookService } from "../services/book-service.js";
import bookList from "../cmps/book-list.cmp.js"
import bookDetails from "./book-details.cmp.js"
import bookFilter from "./book-filter.cmp.js"


export default {
    template: `
    <section>
        <book-filter @filtered="setFilter" :max="maxPrice"/>
        <book-list :books="booksToDisplay" @selected="selectBook"/>
        <book-details v-if="selectedBook" :book="selectedBook" @close="selectedBook= null"/>
        <div @click="selectedBook= null" v-if="selectedBook" class="screen"></div>
    </section>
        `,
    components: {
        bookList,
        bookDetails,
        bookFilter,
    },
    data() {
        return {
            books: bookService.query(),
            selectedBook: null,
            filterBy: null,
        }
    },
    methods: {
        selectBook(bookId) {
            this.selectedBook = this.books.find(book => book.id === bookId)
        },
        setFilter(filterBy) {
            this.filterBy = filterBy
        }

    },
    computed: {
        booksToDisplay() {
            if (!this.filterBy) return this.books
            const regex = new RegExp(this.filterBy.title, "i")
            const { toPrice, priceFrom } = this.filterBy
            let books = this.books.filter((book) => regex.test(book.title))
            return books.filter(({ listPrice: { amount } }) => amount <= toPrice && amount >= priceFrom)
        },
        maxPrice() {
            let price = 0
            this.books.forEach(({ listPrice: { amount } }) => {
                if (amount > price) price = amount
            })
            return price
        }
    },
    created() {
    },
    unmounted() {

    }
}