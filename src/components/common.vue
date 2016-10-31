<template>
    <hook></hook>
    <delegation></delegation>
    <msgbox></msgbox>
</template>
<script>
import delegation from './common/delegation';
import msgbox from './common/msgbox';
import hook from './common/hook';

export default {
    components: {
        delegation, msgbox, hook
    },
}
</script>