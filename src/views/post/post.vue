<template>
<div class="container">
    <div class="row">
        <div id="post">
            <article class="post">
                <h2 class="post-title">{{ post.title }}</h2>
                <ul class="post-meta">
                    <li><time>{{ post.created_at }}</time></li>
                    <li> • 阅读: 374</li>
                    <li> • <a href="https://hran.me/category/nichijou/">日常</a></li>
                </ul>
                <p class="cover" v-if="post.cover != ''"><img v-bind:src="post.cover"></p>
                <div class="post-content">
                    <p></p>
                    <div v-html="post.body"></div>
                </div>
                <div class="tags">
                    <div class="dkeywords">
                        <div class="keywords">标签: <a href="https://hran.me/tag/Apple-Store/">Apple Store</a>, <a href="https://hran.me/tag/%E5%94%AE%E5%90%8E/">售后</a></div>
                    </div>
                </div>
                <div class="post-buttons">
                    <a id="toggle-archives" href="https://hran.me/archives.html">返回文章列表</a>
                    <a id="toggle-post-qr-code">文章二维码</a>
                    <a id="toggle-reward-qr-code">打赏</a>
                </div>
            </article>
        </div>
    </div>
</div>
<div id="body-bottom">
    <div class="container">
        <div id="comments">
            <span class="widget-title text-center" style="padding-bottom: 15px;">评论列表</span>
            <div class="comment-wrap">
                <div class="row comment-info">
                    <div class="col-mb-12 col-tb-4">
                        <input v-model="nickname" placeholder="小明" />
                    </div>
                    <div class="col-mb-12 col-tb-4">
                        <input v-model="email" placeholder="@gmail.com" />
                    </div>
                    <div class="col-mb-12 col-tb-4">
                        <input v-model="website" placeholder="http://" />
                    </div>
                </div>
                <div class="comment-editor">
                    <textarea v-model="content" placeholder="说点什么吧OoO"></textarea>
                </div>
                <div class="comment-toolbar">
                    <button v-bind:class="['post-button', isCommitting ? 'committing' : '']" type="submit">{{ commit }}</button>
                </div>
                <div class="comment-analysis">
                    <ul class="post-meta">
                        <li><a>{{ commentsCount }}条评论</a></li>
                        <li> • <time>{{ post.created_at }}</time></li>
                    </ul>
                </div>
                <div v-if="hasComment" class="comment">
                    <ul>
                        <li v-for="comment in comments" class="comment-item clearfloat">
                            <div class="avatar">
                                <a><img src="https://avatar.duoshuo.com/avatar-100/664/255040.jpg" alt="CAISIDUO"></a>
                            </div>
                            <div class="content">
                                <p>{{ comment.content }}</p>
                                <ul class="post-meta">
                                    <li><a>{{ comment.nickname }}</a></li>
                                    <li> • <time>{{ comment.created_at }}</time></li>
                                </ul>
                            <div>
                        </li>
                    </ul>
                    <pagination v-bind:record-count="commentsCount" v-bind:current-page="currentPage" v-on:skip-page="skipPage"></pagination>
                </div>
                <p class="no-comment" v-else>还没有评论，来抢个沙发吧</p>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import pagination from '../../components/common/pagination';
import actions from '../../vuex/actions';

export default {
    data () {
        return {
            //文章主体部分
            post: {},
            //评论
            comments: [], hasComment: false, commentsCount: 0, pageSize: 6, currentPage: 1,
        };
    },
    components: {
        pagination,
    },
    vuex: {
        actions: {
            bubbleDelegation: actions.bubbleDelegation,
            triggerHook: actions.triggerHook,
        }
    },
    methods: {
        bubble (event) {
            this.bubbleDelegation(event, this);
        },
        trigger (subscription) {
            this.triggerHook(subscription, this);
        },
        skipPage (number) {
            this.currentPage = number;
        },
    },
    ready () {
        this.bubble('viewpost');
    },
    watch: {
        currentPage: function () {
            this.bubble('commentsturnpage');
            this.$nextTick(() => {
                this.trigger('commentsturnpage');
            });
        }
    }
}
</script>