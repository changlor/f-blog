<template>
<div id="container">
    <article class="p" v-for="daily in dailyInfo">
        <a v-on:click="setTopicKey($index)" v-link="{ name: 'topic', params: { tid: daily.tid } }">
            <h2 class="p-title many">{{ daily.title }}</h2>
            <ul class="p-meta">
                <li><time>{{ daily.created_at }}</time></li>
            </ul>
            <div class="cover"><img v-bind:src="daily.cover" class=""></div>
        </a>
        <div class="p-text" v-html="daily.profile | marked"></div>
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
            dailyInfo: false,
            fetchDailyInfo: false,
            isCached: false,
        };
    },
    vuex: {
        getters: {
            fetchCachedColumnInfo: blogDataApi.fetchCachedColumnInfo,
            fetchCachedColumnStatus: blogDataApi.fetchCachedColumnStatus,
        },
        actions: {
            setTopicKey: blogCtrlApi.setCurrentTopicCacheKey,
            cachedInfo: blogCtrlApi.updateColumnCachedInfo,
            cachedStatus: blogCtrlApi.updateColumnCachedStatus,
        },
    },
    ready () {
        this.isCached = this.fetchCachedColumnStatus.daily;

        this.isCached
        ?
        this.dailyInfo = this.fetchCachedColumnInfo.daily
        :
        fetch('http://api.blog.rain/column/1')
        .then((response) => response.json())
        .then((response) => {
            this.dailyInfo = response.data;
            this.cachedInfo('daily', response.data);
            this.cachedStatus('daily', true);
        })
        .catch((error) => {
            console.error(error);
        });
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
<style>

</style>