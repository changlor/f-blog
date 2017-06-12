<template>
<div>
    <Navbar></Navbar>
    <div class="container-Rain__simple row">
        <section class="kit-contrast-hidden-mb kit-max-mb">
            <div class="cover-mb">
                <i class="user-icon"></i>
                <p class="user-info-tb user-name">Changle</p>
                <p class="user-info-tb user-sign"><span>四月は君の嘘</span></p>
            </div>
            <div class="home">
                <ul class="post-items">
                    <li v-for="post in posts">
                        <article>
                            <router-link to="post" class="post-title">{{ post.title }}</router-link>
                            <p class="post-date"><i class="fa fa-calendar"></i> {{ post.created_at }}</p>
                            <router-link to="post" class="post-brief">{{ post.body }}</router-link>
                        </article>
                    </li>
                </ul>
            </div>
        </section>
        <section class="col-tb-12 kit-contrast-hidden-tb kit-hidden-mb">
            <div class="cover">
                <i class="user-icon"></i>
                <p class="user-info-tb user-name">Changle</p>
                <p class="user-info-tb user-sign"><span>四月は君の嘘</span></p>
            </div>
            <div class="home">
                <ul class="post-items">
                    <li v-for="post in posts">
                        <article>
                            <router-link to="post" class="post-title">{{ post.title }}</router-link>
                            <p class="post-date"><i class="fa fa-calendar"></i> {{ post.created_at }}</p>
                            <router-link to="post" class="post-brief">{{ post.body }}</router-link>
                        </article>
                    </li>
                </ul>
            </div>
        </section>
        <section class="col-tb-9 kit-hidden-tb">
            <div class="home">
                <ul class="post-items">
                    <li v-for="post in posts">
                        <article>
                            <router-link to="post" class="post-title">{{ post.title }}</router-link>
                            <p class="post-date"><i class="fa fa-calendar"></i> {{ post.created_at }}</p>
                            <router-link to="post" class="post-brief">{{ post.body }}</router-link>
                        </article>
                    </li>
                </ul>
            </div>
        </section>
        <section class="user user-Rain__simple col-tb-3 kit-hidden-tb">
            <i class="user-icon"></i>
            <p class="user-info user-name">Changle</p>
            <p class="user-info user-sign"><span>四月は君の嘘</span></p>
            <p class="user-info">
                <span class="user-skills">php / JavaScript / html5</span>
            </p>
        </section>
    </div>
</div>
</template>
<script>
import Navbar from '../components/Navbar';

export default {
    data () {
        return {
            posts: []
        }
    },
    methods: {
        delegation () {
            this.$store.dispatch('bubbleDelegation', { subscription: 'viewPosts', page: this});
        }
    },
    mounted () {
        this.delegation('viewPosts');
    },
    components: {
        Navbar
    }
}
</script>
<style>
    body {
        font-size: 18px;
        margin: 0;
    }
    .space {
        flex: 1;
    }
    .cover {
        background-image: url('../assets/img/cover.jpg');
        background-position: center;
        background-repeat: no-repeat;
        background-color: #808080;
        background-attachment: scroll;
        background-size: cover;
        height: 500px;
        display: table;
        width: 100%;
        margin-bottom: 20px;
        text-align: center;
    }
    .cover-mb {
        background-image: url('../assets/img/cover.jpg');
        background-position: center;
        background-repeat: no-repeat;
        background-color: #808080;
        background-attachment: scroll;
        background-size: cover;
        height: 300px;
        display: table;
        width: 100%;
        margin-bottom: 20px;
        text-align: center;
    }
    .container-Rain__simple {
        margin-top: 60px;
    }
    .cover-mb .user-icon {
        width: 100px;
        height: 100px;
        background-size: 100px;
    }
    .cover .user-icon {
        width: 110px;
        height: 110px;
        background-size: 110px;
    }
    .user-info-tb.user-name {
        color: #fafafa;
    }
    .user-info-tb.user-sign {
        color: #dfdfdf;
    }
    .user-icon {
        width: 168px;
        height: 168px;
        border-radius: 84px;
        margin-top: 60px;
        box-shadow: rgba(0, 0, 0, 0.118) 0px 2px 5px 0px;
        display: inline-block;
        background-image: url('../assets/img/me.jpg');
        background-size: 168px;
    }
    .user-info-tb {
        margin-top: 8px;
        text-align: center;
        color: #666;
    }
    .user-info {
        margin-top: 8px;
        width: 168px;
        text-align: center;
        color: #666;
    }
    .user-skills {
        display: inline-block;
        background-color: #fafafa;
        border: .0625rem solid #fafafa;
        padding: 6px;
        margin-top: 5px;
        border-radius: 18px;
        font-size: 12px;
        text-align: center;
        box-shadow: rgba(0, 0, 0, 0.118) 0px 2px 5px 0px;
        cursor: pointer;
    }
    .post-date {
        font-size: 15px;
        padding: 10px;
        padding-top: 0;
        margin-top: 5px;
        color: #777;
    }
    .user-sign {
        font-size: 14px;
        color: #999;
    }
    
    .post-items {
        margin: 10px;
        padding: 0;
    }
    article {
        padding: 20px 0;
        border-bottom: 1px solid #ddd;
    }
    .post-items li {
        display: inline-block;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
        padding: 0 40px;
    }
    .post-title {
        font-size: 25px;
        display: inline-block;
        width: 100%;
        padding: 10px;
        padding-bottom: 0;
        color: #444;
        text-decoration: none;
        transition: color 0.3s ease-in-out;
    }
    article:hover .post-title {
        color: #FC7097;
    }
    .post-brief {
        padding: 10px;
        margin: 0;
        color: #666;
        display: inline-block;
        width: 100%;
        text-decoration: none;
        box-sizing: border-box;
    }
    article:hover .post-brief {
        background-color: #f9f9f9;
    }
</style>