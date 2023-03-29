<template>
  <div>
    <h1>Home</h1>
    <button @click="GetData()">获取数据</button>
    <br>
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
    <button @click="InsertData()">insert</button>
  </div>
</template>
<script>
import axios from 'axios'
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
    async get(way){
      let result;
      let PORT = window.location.port;
      await axios.get(`http://localhost:${PORT}${way}`).then((res)=>{
        result = res.data;
      }).catch(err=>{
        console.log(err);
      })
      return result;
    },
    async post(way,data){
      let PORT = window.location.port;
      await axios.post(`http://localhost:${PORT}${way}`,
        data
      ).then((res)=>{
        console.log(res);
      }).catch(err=>{
        console.log(err);
      })
    },
    GetData(){
      this.get('/getdata')
    },
    InsertData(){
      this.post('/insertdata', 
        this.insert_data)
    }
  }
}
</script>