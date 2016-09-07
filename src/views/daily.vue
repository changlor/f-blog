<template>
<div id="container">
    <article class="p" v-for="daily in dailyIn">
        <a v-on:click="setTopicKey($index)" v-link="{ name: 'topic', params: { tid: daily.tid } }">
            <h2 class="p-title many">{{ daily.title }}</h2>
            <ul class="p-meta">
                <!--<li>代码</li>-->
                <!--<li><a href="#!u/1">卜卜口</a></li>-->
                <li><time>{{ daily.created_at }}</time></li>
            </ul>
            <div class="cover"><img v-bind:src="daily.cover" class=""></div>
        </a>
        <div class="p-text" v-html="daily.profile | marked">
        </div>
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
            dailyIn: false,
        };
    },
    vuex: {
        getters: {
            dailyInfo: blogDataApi.getDailyInfo,
        },
        actions: {
            setTopicKey: blogCtrlApi.setCurrentTopicCacheKey,
        },
    },
    ready () {
        fetch('http://api.blog.rain/column/1')
        .then((response) => response.json())
        .then((response) => {
            this.dailyIn = response.data;
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