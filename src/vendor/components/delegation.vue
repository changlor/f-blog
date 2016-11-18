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
            isAdmin: getters.getAdminStatus,
        },
        actions: {
            switchAdminModes: actions.switchAdminModes,
            resolveSubscriptions: actions.resolveDelegationSubscriptions,
        }
    },
    methods: {
        validate () {
            let userInfo = Func.read('userInfo');
            try {
                userInfo = JSON.parse(userInfo);
            } catch (e) {
                userInfo = {};
            }
            userInfo = userInfo || {};
            if (!userInfo.isLogin && this.isAdmin) {
                this.bubble('signout', this, this);
            }
            if (userInfo.isLogin && !this.isAdmin) {
                this.bubble('signin', this, this);
            }
        },
        signin () {
            this.switchAdminModes(true);
        },
        signout () {
            this.switchAdminModes(false);
        },
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
        '$route.path': function () {
            this.validate();
        },
    },
    ready () {
        this.validate();
    },
}

Object.assign(delegation.vuex.actions, vuexConfig.actions);

export default delegation;
</script>