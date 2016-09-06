<template>
<div class="sidebar">
    <div class="cover-img"></div>
    <div class="bottom-block">
        <a>因雨而生</a>
    </div>
</div>
</template>

<script>
</script>

<style scoped>
.sidebar {
  bottom:0px;
  box-sizing:border-box;
  color:rgb(85, 85, 85);
  display:block;
  float:none;
  font-family:"Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma, "Hiragino Sans GB", "Microsoft Yahei", sans-serif;
  font-size:14px;
  height:100%;
  left: 0;
  line-height:20px;
  margin-left:0px;
  min-height:30px;
  position:fixed;
  right:0px;
  top:0px;
  width:300px;
  z-index: 1;
}
.cover-img {
  background-image:url("../assets/defaultBg.jpg");
  background-position:50% 50%;
  background-size:cover;
  color:rgb(85, 85, 85);
  display:block;
  font-family:"Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma, "Hiragino Sans GB", "Microsoft Yahei", sans-serif;
  font-size:14px;
  height:100%;
  left:0px;
  line-height:20px;
  position:absolute;
  top:0px;
  width:300px;
}
.bottom-block {
  bottom:0px;
  color:rgb(255, 255, 255);
  display:block;
  font-family:"Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma, "Hiragino Sans GB", "Microsoft Yahei", sans-serif;
  font-size:14px;
  height:91.5px;
  line-height:20px;
  padding-bottom:30px;
  padding-left:0px;
  padding-right:0px;
  padding-top:30px;
  position:absolute;
  text-align:center;
  width:220px;
}
.bottom-block a {
  font-size: 20px;
}
</style>
