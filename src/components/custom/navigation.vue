<template>
<div class="navbar-wrap">
    <!--
    <div id="admin-entrance">
        <a class="entrance" v-link="'/unme'">unme の route</a>
    </div>
    -->
    <ul v-bind:class="['navbar-ctrl', 'navbar', isRotate ? navbarRotate : '']">
        <li v-for="navbar in navbarArr" v-bind:class="'nav-' + ($index + 1)">
            <div v-bind:class="[ isRotate ? navbarRotateArr[$index] : isRotate ]">
                <a v-link="navbar.link"  v-on:click="switchNavbar($index)">
                    <i v-bind:class="['fa', navbar.icon]"></i>
                    <span>{{ navbar.desc }}</span>
                </a>
            </div>
        </li>
    </ul>
</div>
</template>
<script>
import blogCtrlApi from '../../vuex/actions.js';

export default {
    data () {
        return {  
            isRotate: false,
            navbarRotate: false,
            navbarArr: [
                {
                    icon: 'fa-photo',
                    link: '/photo',
                    desc: '照片',
                },
                {
                    icon: 'fa-home',
                    link: '/home',
                    desc: '首页',
                },
                {
                    icon: 'fa-daily',
                    link: '/daily',
                    desc: '日常',
                },
                {
                    icon: 'fa-feel',
                    link: '/feel',
                    desc: '随感',
                },
                {
                    icon: 'fa-board',
                    link: '/board',
                    desc: '留言',
                },
                {
                    icon: 'fa-code',
                    link: '/code',
                    desc: '代码',
                },
                {
                    icon: 'fa-music',
                    link: '/music',
                    desc: '音乐',
                },
                {
                    icon: 'fa-project',
                    link: '/project',
                    desc: '作品',
                },
            ],
            navbarRotateArr: [
                'nav-to-1',
                'nav-to-2',
                'nav-to-3',
                'nav-to-4',
                'nav-to-5',
                'nav-to-6',
                'nav-to-7',
                'nav-to-8',
                'nav-to-9',
                'nav-to-10',
                'nav-to-11',
            ],
        }
    },
    methods: {
        switchNavbar (navbarId) {
            if (this.isRotate) {
                return false;
            }
            this.isRotate = false;
            switch (navbarId) {
                case 2:
                    this.navbarRotateArr = [
                        'nav-to-2',
                        'nav-to-3',
                        'nav-to-4',
                        'nav-to-5',
                        'nav-to-6',
                        'nav-to-7',
                        'nav-to-8',
                        'nav-to-9',
                    ];
                    this.isRotate = true;
                    this.updateShadowActivedStatus('rightbar', true);
                    this.navbarRotate = 'navbar-clockwise-1';
                    setTimeout(() => {
                        this.navbarArr.unshift(this.navbarArr.pop());
                        this.isRotate = false;
                        this.updateShadowActivedStatus('rightbar', false);
                    }, 700);
                break;
                case 1:
                    this.navbarRotateArr = [
                        'nav-to-3',
                        'nav-to-4',
                        'nav-to-5',
                        'nav-to-6',
                        'nav-to-7',
                        'nav-to-8',
                        'nav-to-9',
                        'nav-to-10',
                    ];
                    this.isRotate = true;
                    this.updateShadowActivedStatus('rightbar', true);
                    this.navbarRotate = 'navbar-clockwise-2';
                    setTimeout(() => {
                        this.navbarArr.unshift(this.navbarArr.pop());
                        this.navbarArr.unshift(this.navbarArr.pop());
                        this.isRotate = false;
                        this.updateShadowActivedStatus('rightbar', false);
                    }, 700);
                break;
                case 4:
                    this.navbarRotateArr = [
                        'nav-to-0',
                        'nav-to-1',
                        'nav-to-2',
                        'nav-to-3',
                        'nav-to-4',
                        'nav-to-5',
                        'nav-to-6',
                        'nav-to-7',
                    ];
                    this.isRotate = true;
                    this.updateShadowActivedStatus('rightbar', true);
                    this.navbarRotate = 'navbar-eastern-1';
                    setTimeout(() => {
                        this.navbarArr.push(this.navbarArr.shift());
                        this.isRotate = false;
                        this.updateShadowActivedStatus('rightbar', false);
                    }, 700);
                break;
                default :
                break;
            }
        },
    },
    vuex: {
        actions: {
            updateShadowActivedStatus: blogCtrlApi.updateShadowActivedStatus,
        },
    },
}
</script>