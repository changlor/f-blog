<template>
<div class="buffer" >
    <div class="loading"></div>
    <div class="desc">{{ desc }}</div>
</div>
</template>
<style>
@keyframes loading{
    from {
        left: 0px;
    }
    to {
        left: 1000px;
    }
}
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
    background-position: 0px;
    position: fixed;
    left: 200px;
    top: 20px;
}
</style>
<script>
export default {
    data () {
        return {
            isLoaded: false, desc: 'loading...',
        };
    },
    ready () {
        setInterval(() => {
            this.desc = this.desc != 'loading...' ? 'loading...' : 'loading..';
        }, 500)
    },
}
</script>