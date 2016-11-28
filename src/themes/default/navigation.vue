<template>
<div class="drawer">
    <div :class="['Yuki-navbar', isPush ? 'Yuki-navbar__push' : '']">
        <h1 class="Yuki-navbar__title">因雨而生</h1>
        <div class="Yuki-navbar__info">
            <p class="Yuki-navbar__desc">水能载舟，亦可..亦可赛艇？</p>
            <div class="Yuki-navbar__avatar">
                <a></a>
            </div>
            <ul class="Yuki-navbar__links">
                <li><a v-link="'/home'">首页</a></li>
                <li><a v-link="'/daily'">日常</a></li>
                <li><a v-link="'/feel'">随感</a></li>
                <li><a v-link="'/log'">更新日志</a></li>
                <li><a v-link="'/board'">留言板</a></li>
            </ul>
        </div>
        <a class="Yuki-navbar__btn" @click="toggle"></a>
    </div>
</div>
</template>
<script>
export default {
    data () {
        return {
            isPush: false,
        };
    },
    methods: {
        toggle () {
            this.isPush = !this.isPush;
        },
    },
}
</script>
<style>
.drawer {
    position: fixed;
    z-index: 10;
}
.Yuki-navbar {
    transition: left 0.4s ease-in-out;
    position: fixed;
    left: -285px;
    top: 0;
    width: 285px;
    height: 100%;
    background-color: rgb(51, 46, 57);
}
.Yuki-navbar__push {
    left: 0;
}
.Yuki-navbar:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 285px;
    height: 100%;
    background-image: url('../../assets/img/navbar/bg.png');
    opacity: 0.06;
    z-index: -1;
}
.Yuki-navbar__title {
    font-weight: 300;
    text-align: center;
    padding-top: 30px;
}
.Yuki-navbar__desc {
    font-size: 18px;
    margin: 15px 10%;
}
.Yuki-navbar__avatar {
    text-align: center;
    padding: 15px 0;
    width: 80%;
    margin: 10px 10%;
    border-top: 2px dashed rgba(255,255,255,.2);
    border-bottom: 2px dashed rgba(255,255,255,.2);
}
.Yuki-navbar__avatar a {
    width: 90px;
    height: 90px;
    background-image: url('../../assets/img/navbar/me.jpeg');
    background-size: 90px;
    display: inline-block;
    border-radius: 60px;
    box-shadow: 2px 2px 2px rgb(51, 46, 57) inset;
}
.Yuki-navbar__links {
    padding: 5px 16px;
    margin: 25px 10%;
}
.Yuki-navbar__links a {
    font-size: 22px;
}
.Yuki-navbar__btn {
    cursor: pointer;
    width: 32px;
    height: 32px;
    border: 3px solid #000;
    border-radius: 16px;
    position: absolute;
    left: 300px;
    bottom: 30px;
}
</style>