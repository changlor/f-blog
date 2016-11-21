<script>
import Func from '../lib';
import subscribers from '../model';
import { actions, getters } from '../vuex';
import vuexConfig from '../../config/vuex';
import delegationConfig from '../../config/vuex';

const delegation = {
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
        bubble (subscription, page, component) {
            subscribers.bubble(subscription, page, component);
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
            this.bubble(subscription, page, this);
        },
    },
    watch: {
        isBubbled: function () {
            this.handle();
        },
    },
}

Object.assign(delegation.vuex.actions, vuexConfig.actions);

export default delegation;
</script>