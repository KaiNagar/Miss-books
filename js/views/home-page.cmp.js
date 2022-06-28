
export default {
    props: [],
    template: `
 <section class="main-home main-height">
     <h1>Welcome to Hero's Academy Library!!</h1>
     <h3>Choose your path wisely young hero!</h3>
    <img src="https://img1.hulu.com/user/v3/artwork/b4859a95-39ba-4051-a550-256c42e70a1d?base_image_bucket_name=image_manager&base_image=2d0d3308-9323-4716-b7d8-03f171c844af&size=1200x630&format=jpeg" alt="">
    <router-link class="router-link" to="/book">Go Read!</router-link>
    <router-link class="router-link" to="/about">Come see me!</router-link>
 </section>
 
 `,
    components: {},
    data() {
        return {};
    },
    methods: {},
    computed: {},
    created() { },
    unmounted() { },
};