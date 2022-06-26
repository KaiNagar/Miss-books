


export default {
    props: ['book'],
    template: `
 <section class="book-details">
    <div class="book-info">
        <p>Title: {{title}}</p>
        <p>Price: <span :class="priceRange">{{price}}</span></p>
        <img :src="book.thumbnail" alt="">
        <p>Author: {{this.book.authors[0]}}</p>
        <p>Pages: {{pages}}</p>
        <p>Published at: {{publish}}</p>
        <p>Categories: {{categories}}</p>
        <p>Language: {{language}}</p>
        <p v-if="!fullDesc">Description: {{description}} <span class="desc-btn" @click="fullDesc = true">...</span></p>
        <p v-else>Description full: {{book.description}} <span class="desc-btn" @click="fullDesc = false">Less</span></p>
        <p class="sale" v-if="isOnSale"><img src="https://www.pngall.com/wp-content/uploads/2016/04/Sale-PNG-Clipart.png"></p>
        <button @click="$emit('close')">Back</button>
    </div>
 </section>
 `,
    components: {},
    data() {
        return {
            fullDesc: false,
            isOnSale: this.book.listPrice.isOnSale,
        }
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
        }

    },
    created() {

    },
    unmounted() { },
};