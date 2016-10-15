<script>
import Article from '../../model/Article.js';
import Comment from '../../model/Comment.js';
import Category from '../../model/Category.js';
import Editor from '../../model/Editor.js';
import Auth from '../../model/Auth.js';
import getters from '../../vuex/getters.js';
import actions from '../../vuex/actions.js';

const Model = {};
Model.Article = Article;
Model.Comment = Comment;
Model.Editor = Editor;
Model.Category = Category;
Model.Auth = Auth;

export default {
    data () {
        return {
            events: { unresolved: [], resolved: [] },
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
            this.events.unresolved = this.events.unresolved.concat(this.unreadEvents.delegation);
            this.readedEvents();
            const length = this.events.unresolved.length;
            for (let i = 0; i < length; i++) {
                const event = this.events.unresolved.shift();
                const [model, method, params, callback] = [event.model, event.method, event.params, event.callback];
                this.call(model, method, params, callback);
                this.events.resolved.push(event);
            }
        },
        call (model, method, params, callback) {
            Model[model][method](params, callback);
        },
    },
    watch: {
        isBubbled: function (val) {
            this.handle();
        }
    },
}
</script>