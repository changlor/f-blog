<template>
    <div id="container">
    <article class="p">
        <h2 class="p-title many">{{ dailyInfo[topicKey].title }}</h2>
        <ul class="p-meta">
            <li><time>{{ dailyInfo[topicKey].created_at }}</time></li>
        </ul>
        <div class="cover"><img v-bind:src="dailyInfo[topicKey].cover" class="" onload="this.className=''"></div>
        <div class="p-text" v-html="dailyInfo[topicKey].text"></div>
    </article>
</div>
</template>
<script>
import blogDataApi from '../vuex/getters.js';
export default {
    data () {
        return {
            tid: 0,
        };
    },
    vuex: {
        getters: {
            dailyInfo: blogDataApi.getDailyInfo,
            topicKey: blogDataApi.getCurrentTopicKey,
        },
    },
    ready () {
        this.tid = this.$route.params.tid;
    },
}
</script>