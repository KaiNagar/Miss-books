import { eventBus } from "../services/eventBus-service.js";
export default {
    template: `
 <section v-if="msg" class="user-msg" :class="msg.type">
    <p>{{msg.txt}}</p>
    <router-link :to="msg.link">Check this out</router-link>
    <button @click="close">close</button>
 </section>
`,
    data() {
        return {
            unsubscribe: null,
            msg: null,
    }
    },
    created() {
        this.unsubscribe = eventBus.on('show-msg', this.showMsg)
    },
    methods: {
        showMsg(msg) {
            this.msg = msg
            setTimeout(() => {
                this.msg = null
            }, 3000)
        },
        close(){
            this.msg = null
        }
    },
    computed: {},
    unmounted() {
        this.unsubscribe()
    },
}