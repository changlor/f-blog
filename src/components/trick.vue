<template>
<p class="trick-input" v-if="isTrick">{{ trickWords }}</p>
</template>
<script>
import { actions } from '../vendor/vuex';

export default {
    data () {
        return {
            isStart: false, isTrick: false, counter: 0,
            trickWords: '', trickInput: '', trickPassword: 'papapaisgood',
            username: '', password: '',
            inputType: 'trick',
        };
    },
    vuex: {
        actions: {
            bubbleDelegation: actions.bubbleDelegation,
            triggerHook: actions.triggerHook,
        }
    },
    methods: {
        bubble (event) {
            this.bubbleDelegation(event, this);
        },
        trigger (subscription) {
            this.triggerHook(subscription, this);
        },
        listenTrick () {
            window.addEventListener('keydown', this.keydownEvent);
            window.addEventListener('keypress', this.keypressEvent);
        },
        removeListenTrick () {
            window.removeEventListener('keydown', this.keydownEvent);
            window.removeEventListener('keypress', this.keypressEvent);  
        },
        keydownEvent (e) {
            if (e.keyCode == 8) {
                if (this.inputType == 'username') {
                    this.username = this.username.substring(0, this.username.length - 1);
                    this.trickWords = this.username;
                }
                if (this.inputType == 'password') {
                    this.password = this.password.substring(0, this.password.length - 1);
                    this.trickWords = this.password.length;
                }
                if (this.inputType == 'trick') {
                    this.trickInput = this.trickInput.substring(0, this.trickInput.length - 1);
                    this.trickWords = this.trickInput.charAt(this.trickInput.length - 1);
                }
            }
        },
        keypressEvent (e) {
            if (e.keyCode != 13 && this.inputType == 'trick') {
                this.inputTrick(e);
                this.startTrick(e);
            }
            if (e.keyCode != 13 && this.inputType == 'password') {
                this.inputPassword(e);
            }
            if (e.keyCode != 13 && this.inputType == 'username') {
                this.inputUsername(e);
            }
            if (e.keyCode == 13) {
                this.enter(e);
            }
        },
        inputUsername (e) {
            this.username += e.key;
            this.trickWords = this.username;
        },
        inputPassword (e) {
            this.password += e.key;
            this.trickWords = this.password.length;
        },
        inputTrick (e) {
            if (this.isTrick == true) {
                this.trickWords = e.key;
                this.trickInput += e.key;
            }
        },
        startTrick (e) {
            if (e.keyCode != 58 && this.isTrick == false && this.isStart == true) {
                this.isStart = false;
            }
            if (e.keyCode == 58 && this.isTrick == false && this.isStart == false) {
                this.counter++;
                switch (this.counter) {
                    case 9:
                    this.isStart = true;
                    this.counter = 0;
                    break;
                }
            }
        },
        enter (e) {
            // 输入密码部分
            const isPassword = this.inputType == 'password';
            if (isPassword) {
                this.bubble('signin');
                this.$nextTick(() => {
                    this.trigger('signin');
                });
                this.trickInput = '';
                this.trickWords = '';
                this.isTrick = false;
                this.isStart = false;
                this.inputType = 'trick';
            }
            //输入用户名部分
            const isUsername = this.inputType == 'username';
            if (isUsername) {
                this.trickWords = '请输入密码';
                this.inputType = 'password';
            }
            //输入秘技部分
            const isTrick = this.inputType == 'trick';
            if (isTrick && this.trickInput != this.trickPassword && this.isTrick == true) {
                this.trickInput = '';
                this.trickWords = '';
                this.isTrick = false;
                this.isStart = false;
            }
            if (isTrick && this.trickInput == this.trickPassword && this.isTrick == true) {
                this.trickInput = '';
                this.username = '';
                this.password = '';
                this.inputType = 'disabled';
                this.trickWords = '秘技：repetition side step！';
                setTimeout(() => {
                    this.trickWords = '请输入用户名';
                    this.inputType = 'username';
                }, 3000);
            }
            if (isTrick && this.isStart == true && this.isTrick == false) {
                this.counter = 0;
                this.isTrick = true;
            }
        },
    },
    ready () {
        this.listenTrick();
    },
    beforeDestroy () {
        this.removeListenTrick();
    }
}
</script>