<template>
<div class="sandbox-wrap"></div>
</template>
<script>
import blogCtrlApi from '../vuex/actions.js';

export default {
    vuex: {
        actions: {
            createNewMsgbox: blogCtrlApi.createNewMsgbox,
            updateShadowActivedStatus: blogCtrlApi.updateShadowActivedStatus,
        }
    },
    ready () {
        //
    },
}
</script>