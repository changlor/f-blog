<template>
<div id="container">
    <article class="p" v-for="article in articles">
        <a v-link="{ name: 'topic', params: { tid: article.id } }">
            <h2 class="p-title many">{{ article.title }}</h2>
            <ul class="p-meta">
                <li><time>{{ article.created_at }}</time></li>
            </ul>
            <div class="cover"><img v-bind:src="article.cover" class=""></div>
        </a>
        <div class="p-text" v-html="article.profile | marked"></div>
    </article>
</div>
</template>
<script>
import marked from 'marked';
import blogFetchApi from '../common/fetch.js';
import blogDataApi from '../vuex/getters.js';
import blogCtrlApi from '../vuex/actions.js'
import localStorageApi from '../common/store.js';
export default {
    data () {
        return {
            articles: false,
            isCached: false,
            isLocalStored: false,
            version: false,
        };
    },
    methods: {
        fetchCategory: blogFetchApi.fetchData,
        localStoredCategory: localStorageApi.savedCategory,
        fetchLocalStoredCategory: localStorageApi.fetchCategory,
        localStoredArticle: localStorageApi.savedArticle,
        fetchLocalStoredArticle: localStorageApi.fetchArticle,
        getLocalStoredCategoryVersion: localStorageApi.storedCategoryVersion,
    },
    vuex: {
        getters: {
            fetchCachedCategoryInfo: blogDataApi.fetchCachedCategoryInfo,
            fetchCachedCategoryStatus: blogDataApi.fetchCachedCategoryStatus,
        },
        actions: {
            cachedInfo: blogCtrlApi.updateCategoryCachedInfo,
            cachedStatus: blogCtrlApi.updateCategoryCachedStatus,
        },
    },
    ready () {
        this.isCached = this.fetchCachedCategoryStatus.daily;
        this.isLocalStored = this.fetchLocalStoredCategory('daily') !== null;
        //如果有本地保存，则获取本地缓存版本号
        if (this.isLocalStored) {
            this.version = this.getLocalStoredCategoryVersion('daily');
        }

        const cachedArticles = (articles) => {
            this.isCached = true;
            this.articles = articles;
            this.cachedInfo('daily', articles);
            this.cachedStatus('daily', true);
        }
        const storedArticles = (articles) => {
            this.localStoredCategory('daily', articles);
            for (let key in articles) {
                const article = articles[key];
                if (this.fetchLocalStoredArticle(article.id) === null) {
                    this.localStoredArticle(article.id, {
                        id: article.id,
                        title: article.title,
                        body: article.profile,
                        cover: article.cover,
                        created_at: article.created_at,
                    });
                }
            }
        }

        const fetchCategoryCallback = (response) => {
            cachedArticles(response.data);
            storedArticles(response.data);
        };

        //获取localstorage缓存，如果本地存在数据，则不重复发送额外新的获取请求
        if (this.isLocalStored && !this.isCached) {
            cachedArticles(this.fetchLocalStoredCategory('daily'));
        }

        this.isCached
        ? this.dailyArticles = this.fetchCachedCategoryInfo.daily
        : this.fetchCategory('category/1', fetchCategoryCallback);

        //最后，当本地存在文章缓存的时候，为避免无法更新数据，需要确认一次版本号
        const fetchNewVersionCategoryCallback = (response) => {
            if (response.data.version != this.version) {
                cachedArticles(response.data);
                storedArticles(response.data);
            }
        };
        if (this.isLocalStored) {
            this.fetchCategory(`category/1?version=${this.version}`, fetchNewVersionCategoryCallback);
        }

        marked.setOptions({
            renderer: new marked.Renderer(),
            gfm: true,
            tables: true,
            breaks: true,
            pedantic: false,
            sanitize: true,
            smartLists: true,
            smartypants: false,
        });
    },
    filters: {
        marked: marked
    },
}
</script>
<style>
    .cover {
        overflow: hidden;
        position: relative;
        border-radius: 10px;
    }
    img {
        margin: -60px 0;
    }
</style>