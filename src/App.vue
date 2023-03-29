<template>
  <div id="app">
    <v-app>
      <!-- 顶部 top -->
      <div class="firstviewall">
        <HeaderView></HeaderView>
      </div>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-app>
  </div>
</template>
<script>
import HeaderView from '@/components/home/HeaderView.vue';
export default {
    components: { HeaderView }
}
</script>
<style>
@import url('@/assets/css/SidebarMenu.css');
@import url('@/assets/css/MianApp.css');
</style>