<script>
import delegation from '../model';
import getters from '../vuex/getters';
import actions from '../vuex/actions';

export default {
    data () {
        return {
            subscriptions: { unresolved: [], resolved: [] },
        }
    },
    vuex: {
        getters: {
            unresolvedSubscriptions: getters.getDelegationSubscriptions,
            isBubbled: getters.getDelegationListener,
        },
        actions: {
            resolveSubscriptions: actions.resolveDelegationSubscriptions,
        }
    },
    methods: {
        bubble (subscription, page) {
            delegation.bubble(subscription, page);
        },
        handle () {
            this.subscriptions.unresolved = this.subscriptions.unresolved.concat(this.unresolvedSubscriptions);
            this.resolveSubscriptions();
            const length = this.subscriptions.unresolved.length;
            for (let i = 0; i < length; i++) {
                const subscription = this.subscriptions.unresolved.shift();
                this.call(subscription.subscription, subscription.page);
                this.subscriptions.resolved.push(subscription);
            }
        },
        call (subscription, page) {
            this.bubble(subscription, page);
        },
    },
    watch: {
        isBubbled: function () {
            this.handle();
        }
    },
}
</script>