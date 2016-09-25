<template>
<div id="navbar-wrap">
  <div class="msg-box-wrap">
    <div v-for="msgBox in msgBoxes" v-if="msgBox.isOn" transition="msg-box">{{ msgBox.msg }}<a v-on:click="offMsgBox($index)" class="close">x</a></div>
  </div>
  <div v-if="isGambled" class="unme-shadow">
    <div v-if="isKamiWords" class="kami-words">{{ kamiWords }}</div>
  </div>
  <div class="unme">
    <a v-if="!isGambled" v-on:click="unme">神はサイコロを投げる</a>
  </div>
  <div id="admin-entrance">
    <a class="entrance" v-link="'/unme'">unme の route</a>
  </div>
  <ul v-if="!isGambled" v-bind:class="[isContrary ? 'contrary-navbar' : 'navbar']" id="navbar-ctrl">
    <li class="about">
      <div>
        <a v-link="'/about'">
          <i v-link="'/about'" class="fa fa-about"></i>
          <span>关于</span>
        </a>
      </div>
    </li>
    <li class="daily">
      <div>
        <a v-link="'/daily'">
          <i v-link="'/daily'" class="fa fa-daily"></i>
          <span>日常</span>
        </a>
      </div>
    </li>
    <li class="photo">
      <div>
        <a v-link="'/photo'">
          <i v-link="'/photo'" class="fa fa-photo"></i>
          <span>照片</span>
        </a>
      </div>
    </li>
    <li class="coding">
      <div>
        <a v-link="'/code'">
          <i v-link="'/code'" class="fa fa-code"></i>
          <span>代码</span>
        </a>
      </div>
    </li>
    <li class="feel">
      <div>
        <a v-link="'/feel'">
          <i v-link="'/feel'" class="fa fa-feel"></i>
          <span>随感</span>
        </a>
      </div>
    </li>
    <li class="board">
      <div>
        <a  v-link="'/board'">
          <i v-link="'/board'" class="fa fa-board"></i>
          <span>留言</span>
        </a>
      </div>
    </li>
    <li class="music">
      <div>
        <a v-link="'/music'">
          <i v-link="'/music'" class="fa fa-music"></i>
          <span>音乐</span>
        </a>
      </div>
    </li>
    <li class="project">
      <div>
        <a v-link="'/project'">
          <i v-link="'/project'" class="fa fa-project"></i>
          <span>作品</span>
        </a>
      </div>
    </li>
  </ul>
</div>
</template>

<script>
import blogDataApi from '../vuex/getters.js';
import blogCtrlApi from '../vuex/actions.js';
export default {
  data () {
    return {
      isContrary: false,
      isGambled: false,
      isKamiWords: false,
      kamiWords: '命运向你投掷了一个硬币',
      hasUnme: false,
      msgBoxes: []
    }
  },
  vuex: {
    getters: {
      isMsgBoxCreate: blogDataApi.getMsgBoxCreateStatus,
      msgBoxContent: blogDataApi.getMsgBoxCreateContent,
    },
    actions: {
      createNewMsgBox: blogCtrlApi.createNewMsgBox,
    }
  },
  watch: {
    isMsgBoxCreate: function (val) {
      if (val) {
        const index = this.msgBoxes.push({msg: this.msgBoxContent,isOn: true});
        console.log(index);
        setTimeout(() => {
          this.msgBoxes.splice(index - 1, 1);
          this.createNewMsgBox(false);
        }, 4000);
      }
    }
  },
  methods: {
    offMsgBox (index) {
      this.msgBoxes[index].isOn = false;
    },
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
  },
  ready () {
    let $this = this;
    const scrollFunc = function(e) {
      e.preventDefault();
      e = e || window.event;
      e.wheelDelta < 0 ? $this.isContrary = false : $this.isContrary = true;
    }
    //document.getElementById('navbar-ctrl').addEventListener('onmousewheel', scrollFunc, false); 
    document.getElementById('navbar-wrap').onmousewheel = scrollFunc;
  } 
}
</script>

<style scoped>
@keyframes mBoxOn
{
  from {opacity: 0;}
  to {opacity: 1;}
}
@keyframes mBoxOff
{
  to {opacity: 0;}
}
.msg-box-btn {
  position: fixed;
  left: 180px;
  top: 70px;
  cursor: pointer;
}
.msg-box-wrap {
  position: fixed;
  right: 0;
  top: 40px;
  z-index: 100;
}
.msg-box-transition {
  width: 230px;
  min-height: 40px;
  color: #fff;
  padding: 10px;
  margin: 10px;
  border-radius: 6px;
  font-size: 14px;
  background-color: #222;
}
.msg-box-enter {
  animation: mBoxOn 1.5s 1;
}
.msg-box-leave {
  animation: mBoxOff 1.5s 1;
}
.close {
  position: absolute;
  left: 220px;
  cursor: pointer;
  padding: 5px;
  padding-top: 0px;
}
/* admin-entrance */
#admin-entrance {
  right: 8px;
  top: 20px;
  position: fixed;
}
/* kami */
@keyframes bDark
{
  from {opacity: 0.2;}
  to {opacity: 0.7;}
}
@keyframes wDark
{
  0% {opacity: 0.2;}
  20% {opacity: 1;}
  70% {opacity: 1;}
  100% {opacity: 0;}
}
.unme-shadow {
  position: fixed;
  width: 100%;
  height: 100%;
  opacity: 0.7;
  background-color: black;
  animation: bDark 2s 1;
}
.kami-words {
  position: fixed;
  font-size: 40px;
  bottom: 200px;
  left: 400px;
  color: red;
  opacity: 0;
  animation: wDark 6s 1;
}
.unme a {
  position: fixed;
  top: 80px;
  left: 220px;
  transition: all 0.6s ease-in-out;
  cursor: pointer;
  z-index: 39;
}
/* 样式控制 */
#navbar-ctrl li {
  font-size:20px;
  line-height: 208px;
  width:300px;
  list-style: none;
  position:absolute;
  text-align:center;
  transform-origin:231px 300px;
}
#navbar-ctrl li div a {
  text-decoration: none;
}
#navbar-ctrl li div a span {
  padding-left: 1em;
  color: #58c5c7;
}
/* 旋转控制 */
#navbar-wrap {
  width: 300px;
  height: 100%;
  position: fixed;
  z-index: 2;
}
.navbar {
  position: fixed;
  left: 200px;
  width: 480px;
  height: 530px;
  padding: 0px;
  transition: all 0.6s ease-in-out;
  left: -220px;
  top: 30px;
}
#navbar-wrap:hover .navbar {
  top: 45px;
  left: -198px;
  transform: rotate(45deg);
}
.contrary-navbar {
  position: fixed;
  width: 480px;
  height: 530px;
  padding: 0px;
  transition: all 0.6s ease-in-out;
  left: -230px;
  top: 30px;
  z-index: 3;
}
#navbar-wrap:hover .contrary-navbar {
  top: 83px;
  left: -270px;
  transform: rotate(225deg);
}
.about {
  transform: rotate(0deg);
}
.about div {
  transform: rotate(0deg);
  transition: transform 0.6s ease-in-out;
}
#navbar-wrap:hover .navbar .about div {
  transform: rotate(-45deg);
}
#navbar-wrap:hover .contrary-navbar .about div {
  transform: rotate(-225deg);
}
.daily {
  transform: rotate(45deg);
}
.daily div {
  transform: rotate(-45deg);
  transition: transform 0.6s ease-in-out;
}
#navbar-wrap:hover .navbar .daily div {
  transform: rotate(-90deg);
}
#navbar-wrap:hover .contrary-navbar .daily div {
  transform: rotate(-270deg);
}
.photo {
  transform: rotate(90deg);
}
.photo div {
  transform: rotate(-90deg);
  transition: transform 0.6s ease-in-out;
}
#navbar-wrap:hover .navbar .photo div {
  transform: rotate(-135deg);
}
#navbar-wrap:hover .contrary-navbar .photo div {
  transform: rotate(-315deg);
}
.coding {
  transform: rotate(135deg);
}
.coding div {
  transform: rotate(-135deg);
  transition: transform 0.6s ease-in-out;
}
#navbar-wrap:hover .navbar .coding div {
  transform: rotate(-180deg);
}
#navbar-wrap:hover .contrary-navbar .coding div {
  transform: rotate(-360deg);
}
.feel {
  transform: rotate(180deg);
}
.feel div {
  transform: rotate(-180deg);
  transition: all 0.6s ease-in-out;
}
#navbar-wrap:hover .navbar .feel div {
  transform: rotate(-225deg);
}
#navbar-wrap:hover .contrary-navbar .feel div {
  transform: rotate(-405deg);
}
.board {
  transform: rotate(225deg);
}
.board div {
  transform: rotate(-225deg);
  transition: all 0.6s ease-in-out;
}
#navbar-wrap:hover .navbar .board div {
  transform: rotate(-270deg);
}
#navbar-wrap:hover .contrary-navbar .board div {
  transform: rotate(-450deg);
}
.music {
  transform: rotate(270deg);
}
.music div {
  transform: rotate(-270deg);
  transition: all 0.6s ease-in-out;
}
#navbar-wrap:hover .navbar .music div {
  transform: rotate(-315deg);
}
#navbar-wrap:hover .contrary-navbar .music div {
  transform: rotate(-495deg);
}
.project {
  transform: rotate(315deg);
}
.project div {
  transform: rotate(-315deg);
  transition: all 0.6s ease-in-out;
}
#navbar-wrap:hover .navbar .project div {
  transform: rotate(-360deg);
}
#navbar-wrap:hover .contrary-navbar .project div {
  transform: rotate(-540deg);
}
/* 图标控制 */
#navbar-ctrl li {
  pointer-events: none;
}
#navbar-ctrl li div a {
  padding-top: 15px;
  padding-right: 20px;
  pointer-events: auto;
}
.fa {
  position: absolute;
  width: 80px;
  height: 80px;
  background-size: 80px 80px;
  background-color: #fff;
  border-radius: 40px;
}
#navbar-ctrl li div a.v-link-active span {
  color: red;
}
.fa-about {
  background-image: url('../assets/me.jpg');
}
.fa-daily {
  background-image: url('../assets/nichijou.svg');
}
.fa-photo {
  background-image: url('../assets/photo.svg');
}
.fa-code {
  background-image: url('../assets/code.svg');
}
.fa-feel {
  background-image: url('../assets/feel.svg');
}
.fa-board {
  background-image: url('../assets/vsco.svg');
}
.fa-music {
  background-image: url('../assets/music.svg');
}
.fa-project {
  background-image: url('../assets/link.svg');
}
</style>