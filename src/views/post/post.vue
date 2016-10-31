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
                    <div v-html="postBody | parseMarkdown"></div>
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
                    <button v-on:click="createComment" v-bind:class="['post-button', isCommitting ? 'committing' : '']" type="submit">{{ commit }}</button>
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
                                    <li> • <time>{{ comment.created_at | formatTime }}</time></li>
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
import Data from '../../common/Data';
import Common from '../../common/Common';
import pagination from '../../components/common/pagination';
import actions from '../../vuex/actions';
import getters from '../../vuex/getters';

export default {
    data () {
        return {
            //文章主体部分
            post: {}, postId: false, postBody: '',
            //评论
            comments: [],
            //状态
            isCached: false, isStored: false, hasComment: false, isCommitting: false,
            //回复
            commit: '发布', nickname: '', email: '', website: '', content:'',
            //分页链接
            commentsCount: 0, pageSize: 6, currentPage: 1,
        };
    },
    methods: {
        readPost () {
            this.post = this.cachedPosts[`id-${this.postId}`];
            this.postBody = this.post.body;
        },
        getPost () {
            const callback = (res) => {
                if (res.success && !res.isNewest) {
                    this.cachePost(res.data);
                    this.readPost();
                }
            };
            this.eventDelegation({
                model: 'Article',
                method: 'getPost',
                params: {
                    postId: this.postId,
                    config: {
                        version: true,
                        store: true,
                    },
                },
                callback: callback,
            });
        },
        getStoredPost () {
            const callback = (res) => {
                this.cachePost(res);
                this.readPost();
            };
            this.eventDelegation({
                model: 'Article',
                method: 'getStoredPost',
                params: { postId: this.postId },
                callback: callback,
            });
        },
        getComments () {
            const callback = (res) => {
                this.comments = res.data.comments;
                this.commentsCount = res.data.commentsCount;
                this.hasComment = this.commentsCount != 0;
            };
            this.eventDelegation({
                model: 'Comment',
                method: 'getComments',
                params: {
                    postId: this.postId,
                    currentPage: this.currentPage,
                },
                callback: callback,
            });
        },
        createComment () {
            if (this.isCommitting) {
                return false;
            }
            const callback = {};
            callback.before = (res) => {
                if (res.success) {
                    this.commit = '评论正在发射中...';
                    this.isCommitting = true;
                } else {
                    this.createMsgbox(res.msg);
                }
            };
            callback.after = (res) => {
                this.commit = '发布';
                this.isCommitting = false;
                if (res.success) {
                    this.comments = res.data.comments;
                    this.commentCount = res.data.commentCount;
                    this.content = '';
                } else {
                    this.createMsgbox(res.msg);
                }
            };
            this.eventDelegation({
                model: 'Comment',
                method: 'createComment',
                params: {
                    postId: this.postId,
                    nickname: this.nickname,
                    email: this.email,
                    website: this.website,
                    content: this.content,
                },
                callback: callback,
            });
        },
        skipPage (number) {
            this.currentPage = number;
            this.$nextTick(() => {
                this.triggerHookFunc('comment');
            });
        },
    },
    vuex: {
        getters: {
            cachedPosts: getters.fetchCachedPosts,
        },
        actions: {
            cachePost: actions.cachePost,
            createMsgbox: actions.createMsgbox,
            eventDelegation: actions.eventDelegation,
            triggerHookFunc: actions.triggerHookFunc,
        }
    },
    components: {
        pagination,
    },
    ready () {
        this.postId = this.$route.params.tid;
        const setting = new Data({
            postId: this.postId,
            storeKey: `id-${this.postId}`,
        });

        this.isCached = this.cachedPosts.hasOwnProperty([`id-${this.postId}`]);
        this.isStored = setting.variables.isStored;

        //首先--读取缓存资源
        this.isCached ? this.readPost() : false;
        //其次--读取本地文章资源
        !this.isCached && this.isStored ? this.getStoredPost() : false;
        //最后--读取在线文章资源
        this.getPost();
        //读取评论资源
        setTimeout(()=>{
            this.getComments();
        }, 0);
    },
    filters: {
        parseMarkdown: Common.parseMarkdown,
        formatTime: Common.formatTime,
    },
    watch: {
        currentPage: function () {
            this.getComments();
        }
    }
}
</script>



















