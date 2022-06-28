import { bookService } from "../services/book-service.js";
import reviewsList from "../cmps/reviews.cmp.js"
import reviewForm from "../cmps/review-form.cmp.js"


export default {
    template: `
 <section v-if="book" class="book-details main-height">

    <review-form :book="book" @addReview="addReview" />

    <div class="book-info">
        <p>Title: {{title}}</p>
        <p>Price: <span class="book-price" :class="priceRange">{{price}}</span></p>
        <img :src="book.thumbnail" alt="">
        <p>Author: {{this.book.authors[0]}}</p>
        <p>Pages: {{pages}}</p>
        <p>Published at: {{publish}}</p>
        <p>Categories: {{categories}}</p>
        <p>Language: {{language}}</p>
        <p v-if="!fullDesc">Description: {{description}} <span class="desc-btn" @click="fullDesc = true">...</span></p>
        <p v-else>Description full: {{descriptionLong}} <span class="desc-btn" @click="fullDesc = false">Less</span></p>
        <p class="sale" v-if="isOnSale"><img src="https://www.pngall.com/wp-content/uploads/2016/04/Sale-PNG-Clipart.png"></p>

        <router-link @click="dir='prev'" :to="'/book/' + nextBookId">Previus book</router-link>|
        <router-link @click="dir=''" to="/book">Back</router-link>|
        <router-link @click="dir='next'" :to="'/book/' + nextBookId">Next book</router-link>
    </div>

    <reviews-list :book="book" />
    
    
 </section>
 `,
    components: {
        reviewsList,
        reviewForm
    },
    data() {
        return {
            book: null,
            isOnSale: null,
            fullDesc: false,
            nextBookId: null,
            dir: 'next',

        }
    },
    methods: {
        formatCurrency(num, lang, currency) {
            return (new Intl.NumberFormat(lang, { style: 'currency', currency: currency }).format(num))
        },
        addReview(review) {
            bookService.addReview(this.book.id, review).then(book => {
                this.book = book
            })
        }

    },
    computed: {
        title() {
            return this.book.title.charAt(0).toUpperCase() + this.book.title.slice(1)
        },
        price() {
            return this.formatCurrency(this.book.listPrice.amount, this.book.language, this.book.listPrice.currencyCode)
        },
        categories() {
            var categories = ''
            this.book.categories.forEach(categorie => categories += `${categorie} `)
            return categories
        },
        pages() {
            if (this.book.pageCount > 500) return `${this.book.pageCount}, Long reading`
            else if (this.book.pageCount) return `${this.book.pageCount}, Decent Reading`
            else return `${this.book.pageCount}, Light Reading`
        },
        language() {
            let language
            let lang = this.book.language
            switch (lang) {
                case 'he':
                    language = 'Hebrew / עברית'
                    break;
                case 'en':
                    language = 'English / אנגלית'
                    break;
                case 'sp':
                    language = 'Spanish / ספרדית'
                    break;
            }
            return language
        },
        priceRange() {
            if (this.book.listPrice.amount > 150) return 'red'
            if (this.book.listPrice.amount < 20) return 'green'
        },
        publish() {
            let pubDiff = new Date().getFullYear() - this.book.publishedDate
            if (pubDiff > 10) return `${pubDiff} Years ago, Veteran Book`
            else if (pubDiff < 1) return `This year,  New!`
            else return `${pubDiff} Years ago`

        },
        description() {
            let description = this.book.description.slice(0, 97)
            return description
        },
        descriptionLong() {
            let description = this.book.description.slice(0, 250)
            return description
        }

    },
    created() {
        const id = this.$route.params.bookId
        bookService.get(id).then(book => {
            this.book = book
            this.isOnSale = this.book.listPrice.isOnSale
        })
    },
    watch: {
        '$route.params.bookId': {
            handler() {
                if (this.dir === '') return
                const id = this.$route.params.bookId
                bookService.get(id).then(book => {
                    this.book = book
                    bookService.getMovingBookId(book.id, this.dir)
                        .then(nextBookId => this.nextBookId = nextBookId)
                })
            },
            immediate: true
        }

    },
    unmounted() { },
};