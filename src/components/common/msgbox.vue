<template>
<div class="msgbox-wrap">
    <div v-for="msgbox in contents" v-if="!msgbox.isRead" transition="msgbox">{{ msgbox.msg }}<a v-on:click="off($index)" class="msgbox-close">x</a></div>
</div>
</template>
<script>
import getters from '../../vuex/getters';
import actions from '../../vuex/actions';

export default {
    data () {
        return {
            contents: [],
        }
    },
    watch: {
        count: function (val) {
            this.contents = this.contents.concat(this.unreadContents);
            const openedCount = this.unreadContents.length;
            this.readed();
            setTimeout(() => {
                this.contents.splice(0, openedCount);
            }, 4000);
        }
    },
    methods: {
        off (index) {
            this.contents[index].isRead = true;
        },
    },
    vuex: {
        getters: {
            count: getters.getMsgboxCount,
            unreadContents: getters.getMsgboxContents,
        },
        actions: {
            create: actions.createMsgbox,
            readed: actions.readedMsgbox,
        }
    },
}
</script>
