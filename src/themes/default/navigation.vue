<template>
<div class="drawer">
    <ul v-bind:class="['navbar', isRotate ? navbarRotate : '']">
        <li v-for="navbar in navbarArr" v-bind:class="'nav-' + ($index + 1)">
            <div v-bind:class="[ isRotate ? navbarRotateArr[$index] : isRotate ]">
                <a v-link="navbar.link">
                    <i v-bind:class="['b-fa', navbar.icon]"></i>
                    <span>{{ navbar.desc }}</span>
                </a>
            </div>
        </li>
    </ul>
</div>
</template>
<script>
import { Func } from '../../vendor';
import { actions, getters } from '../../vendor/vuex';

export default {
    data () {
        return {
            routes: [], path: '',
            isMove: false, isRotate: false, navbarRotate: false,
            custom: [
                {
                    icon: 'b-fa-photo',
                    link: '/photo',
                    desc: '照片',
                },
                {
                    icon: 'b-fa-home',
                    link: '/home',
                    desc: '首页',
                },
                {
                    icon: 'b-fa-daily',
                    link: '/daily',
                    desc: '日常',
                },
                {
                    icon: 'b-fa-feel',
                    link: '/feel',
                    desc: '随感',
                },
                {
                    icon: 'b-fa-board',
                    link: '/board',
                    desc: '留言',
                },
                {
                    icon: 'b-fa-code',
                    link: '/code',
                    desc: '代码',
                },
                {
                    icon: 'b-fa-music',
                    link: '/music',
                    desc: '音乐',
                },
                {
                    icon: 'b-fa-project',
                    link: '/project',
                    desc: '作品',
                },
            ],
            admin: [
                {
                    icon: 'b-fa-photo',
                    link: '/photo',
                    desc: '照片',
                },
                {
                    icon: 'b-fa-home',
                    link: '/home',
                    desc: '首页',
                },
                {
                    icon: 'b-fa-daily',
                    link: '/write',
                    desc: '撰写',
                },
                {
                    icon: 'b-fa-feel',
                    link: '/feel',
                    desc: '随感',
                },
                {
                    icon: 'b-fa-board',
                    link: '/board',
                    desc: '留言',
                },
                {
                    icon: 'b-fa-code',
                    link: '/code',
                    desc: '代码',
                },
                {
                    icon: 'b-fa-music',
                    link: '/music',
                    desc: '音乐',
                },
                {
                    icon: 'b-fa-project',
                    link: '/project',
                    desc: '作品',
                },
            ],
            navbarArr: [],
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
        adaptation () {
            this.navbarArr.map((navbar, index) => {
                if (navbar.link == this.path) {
                    if (index >= 1 && index <= 4) {
                        this.switchNavbar(index)
                    } else {
                        this.switchNavbar(1);
                        this.navbarArr = this.navbarArr.concat(this.navbarArr.splice(0, index));
                        this.navbarArr.unshift(this.navbarArr.pop());
                    }
                }
            });
        },
        rotate () {
            if (!this.isMove && this.routes.length > 0) {
                this.path = this.routes.shift();
                this.adaptation();
            }
        },
        switchNavbar (navbarId) {
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
                    this.isMove = true;
                    this.navbarRotate = 'navbar-clockwise-1';
                    setTimeout(() => {
                        this.navbarArr.unshift(this.navbarArr.pop());
                        this.isRotate = false;
                        setTimeout(() => {
                            this.isMove = false;
                        }, 100)
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
                    this.isMove = true;
                    this.navbarRotate = 'navbar-clockwise-2';
                    setTimeout(() => {
                        this.navbarArr.unshift(this.navbarArr.pop());
                        this.navbarArr.unshift(this.navbarArr.pop());
                        this.isRotate = false;
                        setTimeout(() => {
                            this.isMove = false;
                        }, 100)
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
                    this.isMove = true;
                    this.navbarRotate = 'navbar-eastern-1';
                    setTimeout(() => {
                        this.navbarArr.push(this.navbarArr.shift());
                        this.isRotate = false;
                        setTimeout(() => {
                            this.isMove = false;
                        }, 100)
                    }, 700);
                break;
                default :
                break;
            }
        },
    },
    vuex: {
        actions: {
            bubbleDelegation: actions.bubbleDelegation,
            triggerHook: actions.triggerHook,
        },
        getters: {
            isAdmin: getters.getAdminStatus,
        },
    },
    ready () {
        this.navbarArr = this.isAdmin ? this.admin : this.custom;
        this.routes.push(this.$route.path);
        this.rotate();
    },
    watch: {
        '$route.path': function () {
            this.routes.push(this.$route.path);
            this.rotate();
        },
        isMove: function () {
            this.rotate();
        },
        isAdmin: function () {
            this.navbarArr = this.isAdmin ? this.admin : this.custom;
        }
    }
}
</script>