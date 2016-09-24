<template>
    <div id="container"></div>
</template>
<script>
import localStorageApi from '../common/store.js';
export default {
    ready () {
        localStorageApi.fetchAuthor('changle')
        ? this.$route.router.go('/new')
        : this.$route.router.go('/contribute');
    }
}
</script>