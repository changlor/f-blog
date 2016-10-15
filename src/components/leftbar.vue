<template>
    <delegation></delegation>
    <admin-banner v-if="isAdmin"></admin-banner>
    <admin-navigation v-if="isAdmin"></admin-navigation>
    <banner v-if="!isAdmin"></banner>
    <navigation v-if="!isAdmin"></navigation>
</template>
<script>
//admin
import adminBanner from './admin/banner.vue';
import adminNavigation from './admin/navigation.vue';
//custom
import navigation from './custom/navigation.vue';
import banner from './custom/banner.vue';
//common
import delegation from './delegation.vue';
import button from './button.vue';

import getters from '../vuex/getters';
import actions from '../vuex/actions';

export default {
    data () {
        return {
            isAdmin: false,
        }
    },
    components: {
        //admin
        adminBanner, adminNavigation,
        //custom
        navigation, banner,
        //common
        delegation, button
    },
}
</script>