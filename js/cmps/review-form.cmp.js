import { eventBus } from "../services/eventBus-service.js";

export default {
    props:['book'],
    template: `
 <section>
 <div v-if="book" class="review">
    <h2>Leave a review :</h2>
        <form @submit.prevent="sendReview" action="">
            <label for="user-name">Enter full name: </label>
            <input required v-model="review.name"  name="user-name" type="text" placeholder="enter full name please">
            <br>
            <label for="user-email">Enter email: </label>
            <input required v-model="review.email" name="user-email" type="email" placeholder="enter email please">
            <br>
            <label for="user-rating">Rating</label>
            <select required v-model="review.rating" name="user-rating" id="">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <br>
            <label for="date">Date of review: </label>
            <input v-model="review.date" type="date">
            <br>
            <label for="user-text">Free text here:</label>
            <textarea v-model="review.text" name="user-text" id="" cols="30" rows="10"></textarea>

            <button>Send Review</button>
        </form>
    </div>
 </section>
 `,
    components: {},
    data() {
        return {
            review: {
                name: null,
                email: null,
                rating: null,
                date: null,
                text:null,
            },
            today: null,
        };
    },
    methods: {
        sendReview() {
            this.$emit('addReview', this.review)
            this.review = {
                name: null,
                email: null,
                rating: null,
                date: this.today,
            }
            eventBus.emit('show-msg', { txt: `Sent review successfully to book ${this.book.title}!`, type: 'success' ,link:'/book'});
        }
    },
    computed: {},
    created() {
        var now = new Date();
        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);
        this.today = now.getFullYear() + "-" + (month) + "-" + (day)
        this.review.date = this.today
    },
    unmounted() { },
};