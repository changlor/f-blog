<template>
<div class="main">
    <div class="feature">
        <div class="title">
            <span>Recently</span>
        </div>
    </div>
    <div class="content">
        <div class="row">
            <div class="module col-mb-12 col-tb-4">
                <ul class="module-lists">
                    <li class="title"><span>posts</span></li>
                    <li v-for="post in posts">
                        <span>
                            <time>10-16</time>:
                        </span>
                        <a>{{ post.title }}</a>
                    </li>
                </ul>
            </div>
            <div class="module col-mb-12 col-tb-4">
                <ul class="module-lists">
                    <li class="title"><span>comments</span></li>
                </ul>
            </div>
            <div class="module col-mb-12 col-tb-4">
                <ul class="module-lists">
                    <li class="title"><span>notices</span></li>
                </ul>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import getters from '../../vuex/getters';
import actions from '../../vuex/actions';

export default {
    data () {
        return {
            posts: [],
        };
    },
    methods: {
        getPosts () {
            const callback = (res) => {
                this.posts = res.data;
            };
            this.eventDelegation({
                params: {
                    category: 'index',
                },
                model: 'Article',
                method: 'getPosts',
                callback: callback,
            });
        },
    },
    vuex: {
        getters: {
            count: getters.getMsgboxCount,
        },
        actions: {
            switchAdminModes: actions.switchAdminModes,
            eventDelegation: actions.eventDelegation,
            createMsgbox: actions.createMsgbox,
        },
    },
    ready () {
        this.switchAdminModes(true);
        this.getPosts();
    },
}
</script>