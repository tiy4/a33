<template>
  <div>
    <h1>Home</h1>
    <button @click="GetPaiBan_Data()">获取排版规则数据</button>
    <!-- <br>
    <p>store_id</p>
    <input type="text" v-model="insert_data.store_id"><br>
    <p>time</p>
    <input type="text" v-model="insert_data.time"><br>
    <p>flowing_person</p>
    <input type="text" v-model="insert_data.flowing_person"><br>
    <p>start_time</p>
    <input type="text" v-model="insert_data.start_time"><br>
    <p>end_time</p>
    <input type="text" v-model="insert_data.end_time"><br>
    <button @click="InsertData()">insert</button> -->
  </div>
</template>
<script>
import { get,post } from '@/util/axios'
export default{
  data(){
    return {
      // 插入数据
      insert_data:{
        store_id: '', 
        time: '', 
        flowing_person: '',
        start_time: '',
        end_time: '',
      },
    }
  }, 
  methods:{
    GetPaiBan_Data(){
      console.log('data');
      let res1 = get('/paiban_rule/findAll')
      console.log(res1);
    },
    InsertData(){
      post('/insertdata', 
        this.insert_data)
    }
  }
}
</script>