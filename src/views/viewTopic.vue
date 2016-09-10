<template>
    <div id="container">
    <article class="p">
        <h2 class="p-title many">{{ article.title }}</h2>
        <ul class="p-meta">
            <li><time>{{ article.created_at }}</time></li>
        </ul>
        <div v-if="article.cover != ''" class="cover"><img v-bind:src="article.cover"></div>
        <div class="p-text" v-html="text | marked"></div>
    </article>
</div>
</template>
<script>
import marked from 'marked';
import blogDataApi from '../vuex/getters.js';
import blogCtrlApi from '../vuex/actions.js';
export default {
    data () {
        return {
            articleId: false,
            articleIndex: false,
            article: false,
            text: '',
            isCached: '',
        };
    },
    vuex: {
        getters: {
            fetchCachedArticleStatus: blogDataApi.fetchCachedArticleStatus,
            fetchCachedArticleInfo: blogDataApi.fetchCachedArticleInfo,
            topicKey: blogDataApi.getCurrentTopicKey,
        },
        actions: {
            cachedInfo: blogCtrlApi.updateArticleCachedInfo,
            cachedStatus: blogCtrlApi.updateArticleCachedStatus,
        },
    },
    ready () {
        this.articleId = this.$route.params.tid;
        this.isCached = this.fetchCachedArticleStatus.hasOwnProperty(`id${this.articleId}`);
        let fetchCachedArticle = () => {
            this.articleIndex = this.fetchCachedArticleStatus[`id${this.articleId}`];
            this.article = this.fetchCachedArticleInfo[this.articleIndex];
            this.text = this.article.profile + this.article.body;
        };
        let fetchArticle = () => {
            const fetchUrl = `http://api.blog.rain/articles/${this.articleId}`;
            fetch(fetchUrl)
                .then((response) => response.json())
                .then((response) => {
                this.article = response.data;
                this.articleIndex = this.fetchCachedArticleInfo.length;
                this.text = this.article.profile + this.article.body;
                this.cachedInfo(this.article);
                this.cachedStatus(this.articleId, this.articleIndex);
            })
            .catch((error) => {
                console.error(error);
            });
        };
        //console.log(this.fetchCachedArticle);
        //fetchCachedArticle.call(this);
        //this.isCached ? fetchCachedArticle.call(this) : fetchArticle();
        marked.setOptions({
            renderer: new marked.Renderer(),
            gfm: true,
            tables: true,
            breaks: true,
            pedantic: false,
            sanitize: true,
            smartLists: true,
            smartypants: false
        });
    },
    filters: {
        marked: marked
    },
}
</script>