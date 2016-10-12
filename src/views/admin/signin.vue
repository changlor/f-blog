<template>
<div id="container">
    <div class="user-login clearfix">
        <a class="form-input form-title">sekai の entrance</a>
        <input class="form-input" placeholder="用户名" v-model="username" />
        <input class="form-input" placeholder="密码" type="password" v-model="password" />
        <a v-on:click="signin" class="form-input" id="submit">提交</a>
    </div>
</div>
</template>
<script>
import getters from '../../vuex/getters';
import actions from '../../vuex/actions';

export default {
    data () {
        return {
            username: '',
            password: '',
        };
    },
    methods: {
        signin () {
            const callback = (res) => {
                console.log(res);
            };
            this.eventDelegation({
                params: {
                    username: this.username,
                    password: this.password,
                },
                model: 'user',
                method: 'signin',
                callback: callback,
            });
        }
    },
    vuex: {
        actions: {
            eventDelegation: actions.eventDelegation,
            createMsgbox: actions.createMsgbox,
        },
    },
}
</script>
<style>
.form-input {
    margin-top: 20px;
    float: left;
    clear: left;
    background-color: #f9f9f9;
    bottom: 50px;
    font-size: 16px;
    outline: none;
    border: 0;
    border-radius: 3px;
    padding: 10px 15px;
    width: 300px;
}
.form-title {
    background-color: transparent;
    text-align: center;
    font-size: 18px;
}
.user-login {
    padding: 200px;
}
#submit {
    background-color: rgba(238, 110, 115, 1);
    text-align: center;
    color: #fff;
    cursor: pointer;
}
</style>