<template>
<div id="app">
<v-app>
  <!-- 顶部 top -->
  <v-app-bar id="top" height="75px" app>
    <!-- 头部导航条开始 -->
      <ul id="nav">
        <li>
          <router-link to="/home">首页</router-link>
        </li>
        <li>
          <router-link to="/shoprule">门店规则</router-link>
        </li>
        <li>
          <router-link to="/emploerhobby">员工偏好</router-link>
        </li>
        <li>
          <router-link to="/date">排班表</router-link>
        </li>
        <li>
          <router-link to="/chart">客流量</router-link>
        </li>
        <li>
          <a href="javascript:">关于我们</a>
        </li>
        <li>
          <router-link to="/mytest">test</router-link>
        </li>
      </ul>
  </v-app-bar>
      
  <!-- main 容器 -->
  <v-main>
  
    <!-- 侧边栏导航开始 -->
    <input type="checkbox" class="openSidebarMenu" id="openSidebarMenu">
    <!-- 隐藏checkbox里的内容，设置label for和input的类名相同 -->
    <label for="openSidebarMenu" class="sidebarIconToggle">
      <div class="spinner diagonal part-1"></div>
      <div class="spinner horizontal"></div>
      <div class="spinner diagonal part-2"></div>
    </label>
    <div id="sidebarMenu">
      <ul class="sidebarMenuInner">
        <li>侧边栏功能<span>以下点击可跳转</span></li>
        <li><router-link active-class="active" to="/ShopRule">门店信息
          </router-link></li>
        <li><a href="https://instagram.com/plavookac" target="_blank">员工信息</a></li>
        <li><a href="https://twitter.com/plavookac" target="_blank">论坛</a></li>
        <li><a href="https://www.youtube.com/channel/UCDfZM0IK6RBgud8HYGFXAJg" target="_blank">联系</a></li>
        <li><a href="https://www.linkedin.com/in/plavookac/" target="_blank">更多</a></li>
      </ul>
    </div>
    
    <!-- 主要内容 -->
    <v-container fluid>
      <router-view/>
    </v-container>

  </v-main>

</v-app>
</div>
</template>
<style>
@import url('./assets/css/HelloWorld.css');
@import url('./assets/css/app.css');
</style>