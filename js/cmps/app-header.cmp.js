export default {
    template: `
    <section class="main-header">
        <img :src="logo" alt="">
    </section>
    `,
    data() {
        return {
            logo: 'https://images.squarespace-cdn.com/content/v1/5e98c7c222a00461fe372e41/1608690579484-5B596XZBUWJF9WAJ291R/bookshop-logo-dark-orig_1.png?format=1000w'
        };
    },
    computed: {},
};