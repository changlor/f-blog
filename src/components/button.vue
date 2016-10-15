<template>
<button class="button" v-on:click="ripplefunc">
    <span transition="ripple" v-for="ripple in ripples"></span>
</button>
</template>

<script>
export default {
    data () {
        return {
            ripples: []
        }
    },
    methods: {
        ripplefunc () {
            this.ripples.push({isPapapa: false});
            setTimeout(()=>{
                this.ripples.shift();
                console.log(this.ripples)
            },600)
        }
    },
}
</script>
<style>
.button {
    width: 90px;
    height: 30px;
    position: fixed;
    top: 50px;
    left: 50px;
    overflow: hidden;
    background-color: transparent;
    outline: none;
    border: 0;
    box-shadow: 0 2px 3px #ddd;
}
.ripple-transition {
    display: block;
    opacity: 0;
    position: absolute;
    width: 100px;
    height: 100px;
    content: '.';
    border-radius: 100%;
    right: 0;
    top: 0;
    background-color: #ddd;
    transform: scale(0);
}
.ripple-enter {
    animation: rippleOn 0.6s;
}
.ripple-leave {
    animation: rippleOff 0.2s;
}
@keyframes rippleOn {
    0% {
        opacity: 0.8;
        transform: scale(0);
    }

    100% {
        opacity: 0.1;
        transform: scale(2.5);
    }
}
@keyframes rippleOff {
    0% {
        opacity: 0.1;
        transform: scale(2.5);
    }

    100% {
        opacity: 0;
        transform: scale(2.5);
    }
}
</style>
