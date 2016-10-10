<template>
<div class="shadow-wrap">
    <div class="rightbar-shadow" v-show="isRightbarActived"></div>
    <div class="global-shadow" v-show="isGlobalActived"></div>
</div>
</template>
<script>
import blogDataApi from '../vuex/getters.js';

export default {
    vuex: {
        getters: {
            isRightbarActived: blogDataApi.getShadowRightbarActivedStatus,
            isGlobalActived: blogDataApi.getShadowGlobalActivedStatus,
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
.global-shadow {
    top: 0;
    left: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 3;
}
</style>