<template>
<div class="amuse-wrap">
    <div class="unme">
        <a v-if="!isGambled" v-on:click="unme">神はサイコロを投げる</a>
    </div>
    <div v-if="isGambled" class="unme-shadow">
        <div v-if="isKamiWords" class="kami-words">{{ kamiWords }}</div>
    </div>
</div>
</template>
<script>
export default {
    data () {
        return {
            isGambled: false,
            isKamiWords: false,
            kamiWords: '命运向你投掷了一个硬币',
            hasUnme: false,
        }
    },
    methods: {
        unme () {
            this.isGambled = true;
            this.isKamiWords = true;
            let $this = this;
            setTimeout(function () {
                $this.isKamiWords = false;
            }, 6000);
            if (this.hasUnme) {
                setTimeout(function () {
                    $this.isGambled = false;
                }, 7000);
            }
            if (!this.hasUnme) {
                this.hasUnme = true;
                setTimeout(function () {
                    $this.kamiWords = '你的命运硬币是反面';
                    $this.isKamiWords = true;
                }, 7000);
                setTimeout(function () {
                    $this.isKamiWords = false;
                }, 13000);
                setTimeout(function () {
                    $this.kamiWords = '你';
                    $this.isKamiWords = true;
                }, 14000);
                setTimeout(function () {
                    $this.isKamiWords = false;
                }, 20000);
                setTimeout(function () {
                    $this.kamiWords = '很怠惰呢';
                    $this.isKamiWords = true;
                }, 21000);
                setTimeout(function () {
                    $this.kamiWords = '你，很怠惰呢';
                    $this.isKamiWords = false;
                }, 27000);
                setTimeout(function () {
                    $this.isGambled = false;
                }, 28000);
            }
        },
    }
}
</script>