<template>
  <div>
    <!-- 侧边栏导航结束 -->
    <div id='center' class="main center">
      <div class="mainInner">
        <div>城市喧嚣<br>效率要高</div>
      </div>
      <div class="jumplink">
        <el-button type="info" plain>
          <router-link to="MianMiddle">了解更多</router-link>
        </el-button>
      </div>
    </div>
  </div>
</template>
<style>
.mainInner {
  width: 100%;
  height: 100%;
  margin-top: 10%;
  color: white;
}

.jumplink {
  text-align: center;
}

.jumplink a {
  text-decoration: none;
}
</style>