<template>
<div class="shadow-wrap">
    <div class="rightbar-shadow" v-show="isRightbarActived"></div>
</div>
</template>
<script>
import blogDataApi from '../vuex/getters.js';

export default {
    vuex: {
        getters: {
            isRightbarActived: blogDataApi.getShadowRightbarActivedStatus,
        }
    },
}
</script>
<style>
.rightbar-shadow {
    position: fixed;
    width: 300px;
    height: 100%;
    z-index: 3;
}
</style>