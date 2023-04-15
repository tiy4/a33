<template>
    <div><v-app-bar id="top" app>
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
            <label for="openSidebarMenu" class="sidebarIconToggle" @mouseenter="expandSidebar"
                @mouseleave="collapseSidebar">
                <div class="spinner diagonal part-1"></div>
                <!-- <div class="spinner horizontal"></div>
                <div class="spinner diagonal part-2"></div> -->
            </label>
            <!-- 用v-show来展开，默认不展开，鼠标移入div也展开 -->
            <div id="sidebarMenu" v-show="sidebarExpanded" @mouseenter="expandSidebar" @mouseleave="collapseSidebar">
                <ul class="sidebarMenuInner">
                    <li>侧边栏功能<span>以下点击可跳转</span></li>
                    <li><router-link active-class="active" to="/ShopRule">门店信息
                        </router-link></li>
                    <li><router-link active-class="active" to="/StaffAll">员工信息</router-link></li>
                </ul>
            </div>
        </v-main>
    </div>
</template>
<script>
export default {
    data() {
        return {
            //定时器，按钮延迟收缩
            timerId: null,
            //侧边栏是否展开
            sidebarExpanded: false,
        }
    },
    methods: {
        //展开函数
        expandSidebar() {
            //清除时间，展开不延迟
            clearTimeout(this.timerId);
            this.sidebarExpanded = true;
        },
        //收缩函数，延迟300ms收缩
        collapseSidebar() {
            this.timerId = setTimeout(() => {
                this.sidebarExpanded = false;
            }, 300)
        },
    }

}

</script>