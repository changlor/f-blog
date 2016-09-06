<template>
<div id="wrap">
    <navbar></navbar>
    <leftbar></leftbar>
    <div id="rightbar"><router-view></router-view></div>
</div>
</template>
<script>
import navbar from './components/navbar.vue';
import leftbar from './components/leftbar.vue';

export default {
  components: {
    navbar, leftbar
  },
};
</script>
<style>
body {
    margin: 0px;
}
.clearfix:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
}
#rightbar {
    margin-left: 300px;
}
</style>

