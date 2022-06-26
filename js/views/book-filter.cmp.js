export default {
    props: ['max'],
    template: `
 <section class="books-filter-by">
     <input @input="filter" type="text" 
    v-model="filterBy.title"
     placeholder="Filter books by title">
     

    <label>
    <input @input="filter" type="range"
         v-model.number="filterBy.priceFrom"
         max="186">Min price: {{filterBy.priceFrom}}
    </label>

    <label>
 <input @input="filter" type="range" 
 v-model.number="filterBy.toPrice" 
 max="186"> 
 Max price: {{filterBy.toPrice}} </label>
 </section>
 `,
    components: {},
    data() {
        return {
            filterBy: {
                title: '',
                priceFrom: 0,
                toPrice: this.max,
            },
        };
    },
    methods: {
        filter() {
            this.$emit("filtered", { ...this.filterBy })
        }
    },
    computed: {
        // maxPrice(){
        //     return this.max
        // }
    },
    created() { },
    unmounted() { },
};