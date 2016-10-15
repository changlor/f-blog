<template>
<div class="admin-navbar-wrap">
    
</div>
</template>
<script>
import actions from '../vuex/actions.js';

export default {
    methods: {
        backToBlog () {
            this.switchAdminModes(false);
            this.$route.router.go('/daily');
        },
    },
    vuex: {
        actions: {
            switchAdminModes: actions.switchAdminModes,
        },
    }
}
</script>
<style>
#leftbar {
    position: absolute;
    height: 100%;
}
</style>