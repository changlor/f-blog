<template>
<div id="leftbar" v-if="!isAdmin">
    <sandbox></sandbox>
    <shadow></shadow>
    <amuse></amuse>
    <msgbox></msgbox>
    <navbar></navbar>
    <delegation></delegation>
    <div class="sidebar">
        <div class="cover-img"></div>
        <div class="bottom-block">
            <a>因雨而生</a>
        </div>
    </div>
</div>
<div id="leftbar" v-else>
    <msgbox></msgbox>
    <shadow></shadow>
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
import blogDataApi from '../vuex/getters';
import blogCtrlApi from '../vuex/actions';

export default {
    vuex: {
        getters: {
            isAdmin: blogDataApi.getAdminStatus,
        },
    },
    components: {
        navbar, msgbox, amuse, sandbox, adminNavbar, shadow, delegation
    },
}
</script>