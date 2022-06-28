import { bookService } from "../services/book-service.js"


export default {
    props: [],
    template: `
    <section class="add-book-preview">
        <form @submit.prevent="showBooks">
        <label for="book-add">Add a book: </label>
        <input v-model="value" id="book-add" list="new-books"  type="search" placeholder="Enter book name">
        <button class="search">Search</button>
        </form>
        <div v-if="newBooksList" class="new-books">
            <ul>
                <li v-for="(book,idx) in newBooksList" :key="idx">
                    {{book.title}}
                    <button @click="addBook(idx)">+</button>
                </li>
            </ul>
        </div>
        
    </section>
    `,
    components: {},
    data() {
        return {
            value: null,
            newBooksList: null

        };
    },
    methods: {
        showBooks() {
            bookService.getNewBooksList(this.value)
                .then(newBooksList => {
                    this.newBooksList = newBooksList
    
                    
                })
        },
        addBook(idx) {
            this.$emit('addNewBook', this.newBooksList[idx])
            this.newBooksList = null
            this.value = null
            
        },


    },
    computed: {

    },
    created() { },
    unmounted() { },
};


