<template>
<div class="buffer" >
    <div :class="['loading', isShake ? 'shake' : '']"></div>
    <div class="desc">{{ desc }}</div>
</div>
</template>
<style>
.buffer {
    display: none;
}
.desc {
    opacity: 0.7;
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #fff;
    text-align: center;
    padding-top: 80px;
    font-size: 24px;
    font-weight: 400;
    color: #999;
    z-index: 9;
}
.loading {
    z-index: 12;
    background: url('../assets/img/blog/loading.png') no-repeat;
    background-size: 136px;
    width: 68px;
    height: 40px;
    position: fixed;
    left: -200px;
    top: 20px;
}
.shake {
    background-position: -68px;
}
</style>
<script>
export default {
    data () {
        return {
            isShake: false, isLoaded: false, desc: 'loading...',
        };
    },
    ready () {
        setInterval(() => {
            this.desc = this.desc != 'loading...' ? 'loading...' : 'loading..';
            this.isShake = !this.isShake;
        }, 400)
    },
}
</script>