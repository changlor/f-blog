<script>
import article from '../model/article.js';
import category from '../model/category.js';
import getters from '../vuex/getters.js';
import actions from '../vuex/actions.js';

const Model = {};
Model.article = article;
Model.category = category;

export default {
    data () {
        return {
            events: [],
        }
    },
    vuex: {
        getters: {
            unreadEvents: getters.readEvents,
            isBubbled: getters.getEventListener,
            cachedPosts: getters.fetchCachedPosts,
        },
        actions: {
            readedEvents: actions.readedEvents,
            cachePost: actions.cachePost,
            handledEvent: actions.handledEvent,
        }
    },
    methods: {
        handle () {
            this.events = this.events.concat(this.unreadEvents.delegation);
            this.readedEvents();
            for (let i = 0; i < this.events.length; i++) {
                const event = this.events[i];
                const [model, method, params, callback] = [event.model, event.method, event.params, event.callback];
                this.call(model, method, params, callback);
            }
        },
        call (model, method, params, callback) {
            Model[model][method](params, callback);
        },
    },
    ready () {
        
    },
    watch: {
        isBubbled: function (val) {
            this.handle();
        }
    },
}
</script>