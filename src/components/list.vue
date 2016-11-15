<template>
<span class="dropdown-list">
    <a class="select" :class="{ 'selected': isSelected }" @click="selected">选择类别</a>
    <ul class="options" :style="selectList" v-show="isSelected">
        <li v-for="option in options" @click="select(option)">{{ option.value }}</li>
    </ul>
</span>
</template>
<script>
export default {
    data () {
        return {
            isSelected: false,
            selectList: {
                position: 'absolute',
                left: '',
            },
        };
    },
    props: ['options'],
    methods: {
        selected () {
            this.isSelected = !this.isSelected;
            this.selectList.left = this.$el.offsetLeft + 'px';
        },
        select (option) {
            this.isSelected = false;
            this.$emit('select', option);
        }
    },
}
</script>