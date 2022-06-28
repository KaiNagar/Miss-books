import { bookService } from "../services/book-service.js";
import { eventBus } from "../services/eventBus-service.js";

export default {
    props: ['book'],
    template: `
        <section v-if="book" class="reviews-data">
            <h2>Reviews: </h2>
            <ol>
                <li v-for="(review,idx) in book.reviews" :key="idx">
                Name: {{review.name}}
                <br>
                Email: {{review.email}}
                <br>
                Rating: {{review.rating}}
                <br>
                Date: {{review.date}}  
                <br>
                Text: {{review.text}}
                <br>
                <button @click="removeReview(idx)">X</button>
                </li>
            </ol>
        </section>
    `,
    components: {},
    data() {
        return {
            // book: null,
            reviews: null,
        };
    },
    methods: {
        removeReview(idx) {
            if (confirm('Are you sure you want to delete this review?'))
                bookService.removeReview(this.book.id, idx).then(() => {
                    this.book.reviews.splice(idx, 1)
                    eventBus.emit('show-msg', { txt: `Deleted review successfully from ${this.book.title}`, type: 'danger', link: '/book' });
                })
        }
    },
    computed: {},
    created() {
        // const id = this.$route.params.bookId
        // bookService.get(id).then(book => {
        //     this.book = book
        //     this.reviews = book.reviews
        // })
        // this.review = this.book.reviews
    },
    unmounted() { },
};