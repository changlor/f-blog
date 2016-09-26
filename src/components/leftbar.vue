<template>
<div id="leftbar">
    <sandbox></sandbox>
    <shadow></shadow>
    <amuse></amuse>
    <msgbox></msgbox>
    <navbar></navbar>
    <div class="sidebar">
        <div class="cover-img"></div>
        <div class="bottom-block">
            <a>因雨而生</a>
        </div>
    </div>
</div>
</template>
<script>
import navbar from './navbar.vue';
import msgbox from './msgbox.vue';
import amuse from './amuse.vue';
import shadow from './shadow.vue';
import sandbox from './sandbox.vue';

export default {
    components: {
        navbar, msgbox, amuse, sandbox, shadow
    },
}
</script>