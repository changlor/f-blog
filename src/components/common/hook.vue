<script>
import getters from '../../vuex/getters';
import actions from '../../vuex/actions';
import hooks from '../../plugin/plugin';

export default {
    data () {
        return {
            subscription: { unresolved: [], resolved: [] },
        };
    },
    methods: {
        handle () {
            this.subscription.unresolved = this.subscription.unresolved.concat(this.unresolvedHooks.subscription);
            this.readedFuncs();
            console.log(this.subscription.unresolved);
            const length = this.subscription.unresolved.length;
            for (let i = 0; i < length; i++) {
                const subscription = this.subscription.unresolved.shift();
                console.log(subscription)
                this.call(subscription);
                this.subscription.resolved.push(subscription);
            }
        },
        call (method) {
            hooks.trigger(method);
        },
    },
    vuex: {
        getters: {
            isTriggered: getters.getHookListener,
            unresolvedHooks: getters.readHookFuncs,
        },
        actions: {
            readedFuncs: actions.readedFuncs,
            triggerHookFunc: actions.triggerHookFunc,
        }
    },
    watch: {
        isTriggered: function () {
            this.handle();
        }
    }
}
</script>