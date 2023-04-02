<template>
    <div>
        <v-app-bar id="top" app>
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
                    <router-link to="/paiban">排班表</router-link>
                </li>
                <li>
                    <router-link to="/chart">客流量</router-link>
                </li>
                <li>
                    <router-link to="/aboutme">关于我们</router-link>
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
                    <li><router-link active-class="active" to="/StaffAll">员工信息</router-link></li>
                    <li><router-link active-class="active" to="/HelloHome">动态图片</router-link></li>
                    <li><a href="https://www.youtube.com/channel/UCDfZM0IK6RBgud8HYGFXAJg" target="_blank">联系</a></li>
                    <li><a href="https://www.linkedin.com/in/plavookac/" target="_blank">更多</a></li>
                </ul>
            </div>
        </v-main>
    </div>
</template>