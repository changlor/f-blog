<template>
<div id="funcBar">
    <sandbox></sandbox>
    <shadow></shadow>
    <msgbox></msgbox>
    <delegation></delegation>
</div>
<div id="leftbar" v-if="!isAdmin">
    <amuse></amuse>
    <navbar></navbar>
    <div class="sidebar">
        <div class="cover-img"></div>
        <div class="bottom-block">
            <a>因雨而生</a>
        </div>
    </div>
</div>
<div id="leftbar" v-else>
    <admin-navbar></admin-navbar>
</div>
</template>
<script>
import navbar from './navbar.vue';
import delegation from './delegation.vue';
import msgbox from './msgbox.vue';
import amuse from './amuse.vue';
import shadow from './shadow.vue';
import sandbox from './sandbox.vue';
import adminNavbar from './adminNavbar.vue';

import getters from '../vuex/getters';
import actions from '../vuex/actions';

export default {
    vuex: {
        getters: {
            isAdmin: getters.getAdminStatus,
        },
    },
    components: {
        navbar, msgbox, amuse, sandbox, adminNavbar, shadow, delegation
    },
}
</script>