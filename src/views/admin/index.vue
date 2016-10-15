<template>
<div class="container admin__index">
    <div class="mdl-layout--fixed-tabs mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
        <div class="mdl-tabs__tab-bar">
            <a href="#posts-panel" class="mdl-layout__tab mdl-tabs__tab is-active">Posts</a>
        </div>
        <div class="mdl-tabs__panel is-active" id="posts-panel">
            <div class="list">
                <ul class="mdl-list">
                    <li v-for="post in posts" class="mdl-list__item">
                        <span class="mdl-list__item-primary-content">
                            {{ post.title }}
                        </span>
                        <button class="mdl-button mdl-js-button mdl-button--raised">
                            Update
                        </button>
                    </li>
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
                this.$nextTick(()=>{
                    componentHandler.upgradeDom();
                });
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
        this.$nextTick(()=>{
            componentHandler.upgradeDom();
        });
    },
}
</script>