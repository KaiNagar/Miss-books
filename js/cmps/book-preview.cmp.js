
export default {
    props: ["book"],
    template: `
    <article class="book-preview">
        <p>{{title}}</p>
        <img @click="$emit('open',book.id)" :src="book.thumbnail" alt="">
        <p>Price: <span :class="priceRange">{{price}}</span></p>
    </article>
    `,
    components: {

    },

    data() {
        return {

        };
    },
    methods: {
        formatCurrency(num, lang, currency) {
            return (new Intl.NumberFormat(lang, { style: 'currency', currency: currency }).format(num))
        }

    },
    computed: {
        title() {
            return this.book.title.charAt(0).toUpperCase() + this.book.title.slice(1)
        },
        price() {
            return this.formatCurrency(this.book.listPrice.amount, this.book.language, this.book.listPrice.currencyCode)
        },
        priceRange() {
            if (this.book.listPrice.amount > 150) return 'red'
            if (this.book.listPrice.amount < 20) return 'green'
        }


    },
    created() { },
    unmounted() { },
};
