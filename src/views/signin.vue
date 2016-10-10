<template>
<div id="container">
    <div class="user-login clearfix">
        <a class="form-input form-title">sekai の entrance</a>
        <input class="form-input" v-model="username" placeholder="用户名" />
        <input class="form-input" v-model="password" placeholder="密码" type="password" />
        <a class="form-input" v-on:click="getToken" id="submit">提交</a>
    </div>
</div>
</template>
<script>
import blogCtrlApi from '../vuex/actions.js';
import getLocalStorageApi from '../common/store.js';
export default {
    data () {
        return {
            username: '',
            password: '',
        };
    },
    methods: {
        getToken () {
            fetch('http://api.blog.rain/user', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: this.username,
                    password: this.password,
                }),
            })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((response) => {
                if (response.success) {
                    getLocalStorageApi.savedToken(response.data.token);
                    this.$route.router.go('/new');
                }
            })
            .catch((error) => {
                console.error(error);
            });
            //this.createNewMsgBox(true, '发射成功啦~QwQ')
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