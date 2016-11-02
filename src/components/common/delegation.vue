<script>
import delegation from '../../model/load';
import getters from '../../vuex/getters';
import actions from '../../vuex/actions';

export default {
    data () {
        return {
            events: { unresolved: [], resolved: [] },
        }
    },
    vuex: {
        getters: {
            unresolvedEvents: getters.getDelegationEvents,
            isBubbled: getters.getDelegationListener,
        },
        actions: {
            resolveEvents: actions.resolveDelegationEvents,
        }
    },
    methods: {
        bubble (subscription, input) {
            delegation.bubble(subscription, input);
        },
        handle () {
            this.events.unresolved = this.events.unresolved.concat(this.unresolvedEvents);
            this.resolveEvents();
            const length = this.events.unresolved.length;
            for (let i = 0; i < length; i++) {
                const event = this.events.unresolved.shift();
                this.call(event.subscription, event.input);
                this.events.resolved.push(event);
            }
        },
        call (subscription, input) {
            this.bubble(subscription, input);
        },
    },
    watch: {
        isBubbled: function () {
            this.handle();
        }
    },
}
</script>