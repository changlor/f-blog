<template>
    <div id="container"></div>
</template>
<script>
import store from '../common/store.js';
export default {
    ready () {
        store.read('changle')
        ? this.$route.router.go('/new')
        : this.$route.router.go('/contribute');
    }
}
</script>