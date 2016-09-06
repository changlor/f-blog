<template>
<div id="navbar-wrap">
  <ul v-bind:class="[isContrary ? 'contrary-navbar' : 'navbar']" id="navbar-ctrl">
    <li class="about">
      <div>
        <a v-link="{ path: 'about' }">
          <i v-link="{ path: 'about' }" class="fa fa-about"></i>
          <span>关于</span>
        </a>
      </div>
    </li>
    <li class="daily">
      <div>
        <a v-link="{ path: 'daily' }">
          <i v-link="{ path: 'daily' }" class="fa fa-daily"></i>
          <span>日常</span>
        </a>
      </div>
    </li>
    <li class="photo">
      <div>
        <a v-link="{ path: 'photo' }">
          <i v-link="{ path: 'photo' }" class="fa fa-photo"></i>
          <span>照片</span>
        </a>
      </div>
    </li>
    <li class="coding">
      <div>
        <a v-link="{ path: 'code' }">
          <i v-link="{ path: 'code' }" class="fa fa-code"></i>
          <span>代码</span>
        </a>
      </div>
    </li>
    <li class="feel">
      <div>
        <a v-link="{ path: 'feel' }">
          <i v-link="{ path: 'feel' }" class="fa fa-feel"></i>
          <span>随感</span>
        </a>
      </div>
    </li>
    <li class="board">
      <div>
        <a  v-link="{ path: 'board' }">
          <i v-link="{ path: 'board' }" class="fa fa-board"></i>
          <span>留言</span>
        </a>
      </div>
    </li>
    <li class="music">
      <div>
        <a v-link="{ path: 'music' }">
          <i v-link="{ path: 'music' }" class="fa fa-music"></i>
          <span>音乐</span>
        </a>
      </div>
    </li>
    <li class="project">
      <div>
        <a v-link="{ path: 'project' }">
          <i v-link="{ path: 'project' }" class="fa fa-project"></i>
          <span>作品</span>
        </a>
      </div>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  data () {
    return {
      isContrary: false,
    }
  },
  ready () {
    let $this = this;
    const scrollFunc = function(e) {
      e = e || window.event;
      e.wheelDelta < 0 ? $this.isContrary = false : $this.isContrary = true;
    }
    //document.getElementById('navbar-ctrl').addEventListener('onmousewheel', scrollFunc, false); 
    document.getElementById('navbar-wrap').onmousewheel = scrollFunc;
  } 
}
</script>

<style scoped>
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