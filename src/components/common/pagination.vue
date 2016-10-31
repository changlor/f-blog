<template>
<ol class="page-navigator">
    <li v-bind:class="{ 'current': link.isCurrent }" v-for="link in links">
        <a v-if="!link.isBreak" v-on:click="skipPage(link.number)">{{ link.number }}</a>
        <span v-if="link.isBreak && link.isShow">...</span>
    </li>
</ol>
</template>
<script>
export default {
    data () {
        return {
            links: [],
            totalPage: 1, lowBreak: 0, highBreak: 1,
        };
    },
    methods: {
        calculate () {
            if (typeof this.pageSize != 'number') {
                this.pageSize = 6;
            }
            this.totalPage = Math.ceil(this.recordCount / this.pageSize);
            for (let i = 1; i <= this.totalPage; i++) {
                let isBreak = Math.abs(this.currentPage - i) > 2;
                let isShow = Math.abs(this.currentPage - i) == 3;
                if (i == this.totalPage || i == 1) {
                    isBreak = false;
                    isShow = true;
                }
                const isCurrent = i == this.currentPage;
                if (this.links.hasOwnProperty(i - 1)) {
                    const link = this.links[i - 1];
                    link.number = i;
                    link.isBreak = isBreak;
                    link.isShow = isShow;
                    link.isCurrent = isCurrent;
                } else {
                    this.links = [...this.links, ...[{ number: i, isBreak: isBreak, isShow: isShow, isCurrent: isCurrent}]];
                }
            }
        },
        skipPage (number) {
            this.$emit('skip-page', number);
        },
    },
    //依次为记录总数，当前页面，每页记录数
    props: ['recordCount', 'currentPage', 'pageSize'],
    ready () {
        this.calculate();
    },
    watch: {
        recordCount: function () {
            this.calculate();
        },
        currentPage: function () {
            this.calculate();
        },
        pageSize: function () {
            this.calculate();
        },
    }
}
</script>