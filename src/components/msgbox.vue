<template>
<div class="msgbox-wrap">
    <div v-for="msgbox in msgboxes" v-if="!msgbox.isRead" transition="msg-box">{{ msgbox.msg }}<a v-on:click="offMsgbox($index)" class="close">x</a></div>
</div>
</template>
<script>
import blogDataApi from '../vuex/getters.js';
import blogCtrlApi from '../vuex/actions.js';
export default {
    data () {
        return {
            msgboxes: [],
        }
    },
    watch: {
        msgboxCount: function (val) {
            this.msgboxes = this.msgboxes.concat(this.msgboxContents);
            const openMsgboxCount = this.msgboxContents.length;
            this.readMsgbox();
            setTimeout(() => {
                this.msgboxes.splice(0, openMsgboxCount);
            }, 4000);
        }
    },
    methods: {
        offMsgbox (index) {
            this.msgboxes[index].isRead = true;
        },
    },
    vuex: {
        getters: {
            msgboxCount: blogDataApi.getMsgboxCount,
            msgboxContents: blogDataApi.getMsgboxCreateContents,
        },
        actions: {
            createNewMsgbox: blogCtrlApi.createNewMsgbox,
            readMsgbox: blogCtrlApi.readMsgbox,
        }
    },
}
</script>
