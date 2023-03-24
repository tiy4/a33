<template>
    <div id="main">
        <!-- echart 显示图像 -->
        <div id="box"></div>
        <div id="calendar">
            <template>
                <v-date-picker
                v-model="picker"
                color="#3F51B5"
                :min="min"
                :max="max"
                elevation="15"
                @change="calendar_update()"
                ></v-date-picker>
            </template>
        </div>
        <div id="screeningBox">
            <!-- <template>
                <v-container fluid>
                    <v-combobox
                    v-model="model"
                    :items="items"
                    :search-input.sync="search"
                    hide-selected
                    hint="最多选择一个门店"
                    label="选择需要查看的门店"
                    multiple
                    persistent-hint
                    small-chips
                    >
                    <template v-slot:no-data>
                        <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>
                            No results matching "<strong>{{ search }}</strong>". Press <kbd>enter</kbd> to create a new one
                            </v-list-item-title>
                        </v-list-item-content>
                        </v-list-item>
                    </template>
                    </v-combobox>
                </v-container>
            </template> -->

            <template>
                <v-container fluid>
                    <v-row>
                        <v-col class="d-flex" cols="40" sm="10">
                            <v-select
                            :items="items"
                            v-model="model"
                            @change="change()"
                            label="选择你要查看的门店"
                            solo
                            ></v-select>
                        </v-col>
                    </v-row>
                </v-container>
            </template>
        </div>
    </div>
</template>
<script>
import echarts from 'echarts'
import { get } from '@/util/axios'
// 基于准备好的dom，初始化echarts实例
export default {
    data(){
        return{
            activator: null,
            // 可选日期最小值 和 最大值
            min: '',
            max: '',
            // 获取到的总数据
            Data: [],
            // 选择器 店铺选择范围 （要得到所有店铺信息）
            items: [],
            // 选中的 店铺 值
            model: '',
            // 选择器输入框的搜索值
            search: null,
            // 日历选择器 选择的值
            picker: null, // 日期格式 2023-10-23
            // 获取到的起始时间
            startdate: '',
            // 保存 店铺 -> 店铺id 的键值对
            shopdata: new Map(),
            // echarts
            option: {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { type: 'cross' }
                },
                legend: {},
                xAxis: [
                    {
                        type: 'category',
                        axisTick: {
                            alignWithLabel: true
                        },
                        // x 轴数据 换成时间段
                        data: [
                            "8:00",
                            "8:30",
                            "9:00",
                            "9:30",
                            "10:00",
                            "10:30",
                            "11:00",
                            "11:30",
                            "12:00",
                            "12:30",
                            "13:00",
                            "13:30",
                            "14:00",
                            "14:30",
                            "15:00",
                            "15:30",
                            "16:00",
                            "16:30",
                            "17:00",
                            "17:30",
                            "18:00",
                            "18:30",
                            "19:00",
                            "19:30",
                            "20:00",
                            "20:30",
                            "21:00",
                            "21:30",
                            "22:00",
                            "22:30",
                            "23:00",
                        ]
                    }
                ],
                yAxis: [
                    {
                        // 左边 柱状图 y 轴
                        type: 'value',
                        name: '客流量(柱状)',
                        min: 0,
                        max: 60, // 动态获取
                        position: 'right',
                        axisLabel: {
                            formatter: function(value){
                                return value.toFixed(2)   
                            }
                        },
                    },
                    {
                        // 右边折线图坐标轴
                        type: 'value',
                        name: '客流量 (折线)',
                        min: 0,
                        max: 60,
                        position: 'left',
                        // 实现 显示的值显示为 2位小数点的小数
                        axisLabel: {
                            formatter: function(value){
                                return value.toFixed(2)   
                            }
                        }
                    }
                ],
                series: [
                    {
                        name: '客流量(柱状)',
                        type: 'bar',
                        yAxisIndex: 0,
                        // 数据
                        data: []
                    },
                    {
                        name: '客流量(折线)',
                        type: 'line',
                        smooth: true,
                        yAxisIndex: 1,
                        // 数据
                        data: []
                    }
                ]
            }
        }
    },
    
    watch: {
        /**
         * 监听筛选框的数据变化
         * @param oldQuestion 监听前的值
         */
        model (oldQuestion) {
            // console.log(`旧值: ${oldQuestion}`);
            // pop() 获取该函数的最后一个值
            // if (oldQuestion.length > 1) {
            //     this.$nextTick(() => this.model.pop())
            // }
            
            // console.log(this.shopdata.get(`${oldQuestion}`))
            
            // console.log(oldQuestion);
            // 获取选中的 店铺值
            let shopchoice = this.shopdata.get(`${oldQuestion}`);
            if(shopchoice){ // 如果选中值不为空 则，
                // 获取

                // 渲染
                console.log(`此时渲染的门店: ${this.startdate}, ${shopchoice}`);
                this.renderer(this.startdate,shopchoice);
            }else{
                // 默认渲染最早的时间节点
                this.renderer(this.startdate);
            }

        },
    },

    methods:{
        /**
         * 初始化函数
         */
        async init(){
            // 获取 远程 人流量的所有数据
            let get_res = await get(`/passenger_flow/findAll`);
            this.Data = get_res;

            // 改成获取 那一家店的 所有数据
            // let shopid_res = this.get_shopinfo(2,)
            
            // 店铺选择器初始化
            let get_shop_info = await get('/shop/findAll');
            this.shop_data(get_shop_info);
            
            this.update_shopdata(get_res);
        },
        change(){
            console.log(this.model);
        },
        /** 
         * 日期选择器更新
         * @author guibin
         */
        async calendar_update(){
            // 获取到日期数据
            let date = await this.chart_update(this.picker);
            console.log('获取到的数据:');
            console.log(date);
            // 修改后 渲染 界面
            this.renderer(date);
        },
        /**
         * 获取选择后的日期数据
         * @param {*} date 日期数据
         * @author guibin
         */
        async chart_update(date){
            // console.log(date);
            // 将字符串剪切出月份和日期部分，再使用 split分割成数组
            date = date.split('-')
            let year = date[0]
            let month = date[1];
            let day = date[2];
            return `${year}${month}${day}`
        },
/******************************************
 * 对获取数据处理     
 * 数据格式化函数 
 */ 
        /**
         * 获取 客流量数 格式
         * @param {*} data 需要处理的数据
         * @author guibin
         */
        personal_data_format(data){
            // 将数据 转换为数组
            let arrdata = Array.from(data);
            let res = [];
            arrdata.forEach((value) => {
                res.push(parseFloat(value.forecast));
            })
            // console.log(`日期格式化: ${res}`);
            return res;
        },
        /**
         * 获取 店铺对应店铺id
         * @author guibin
         */
        shop_data(data){
            data.forEach((value) =>{
                this.items.push(value.name);
                // console.log(`${value.id}: ${value.name}`);
                this.shopdata.set(`${value.name}`,`${value.id}`);
                // console.log(this.shopdata);
            });
        },
        /**
         * 日期数据获取
         * @data 获取到的店铺人流数据
         * @return {start, end} 开始和结束 日期 'yyyy-mm-dd'
         * @author guibin
         */
        get_date(data){
            let res = {};
            res.start = data[0].date;
            res.end = data[data.length-1].date;
            res.start = `${res.start.slice(0,4)}-${res.start.slice(4,6)}-${res.start.slice(6,8)}`
            res.end = `${res.end.slice(0,4)}-${res.end.slice(4,6)}-${res.end.slice(6,8)}`
            return res;
        },
        /**
         * 获取对应门店的数据
         * 要给一个 最小的 默认 日期
         * /passenger_flow/passenger/{shopid}/{date}
         * @param {*} shopid 店铺id
         * @param {*} date 日期格式yyyymmdd
         * @return result 返回该门店对应的人流量数
         * @author guibin
         */
        async get_shopinfo(shopid,date){
            let res = await get(`/passenger_flow/passenger/${shopid}/${date}`);
            let result = this.personal_data_format(res);
            console.log('获取对应门店数据:');
            console.log(result);
            return result;
        },
        /**
         * 通过店铺 id 和 日期 渲染 echarts 表格
         * @param startdate 开始时间
         * @param shopid 需要查看的店铺 默认是 1
         * @author guibin
         */
        async renderer(startdate,shopid = 1){
            // console.log(`渲染处 拿到的值: ${shopid}`);
            // 默认是从 第一家店面开始        
            // 将数据显示上 表格
            this.option.series[0].data = await this.get_shopinfo( shopid , startdate);
            this.option.series[1].data = await this.get_shopinfo( shopid , startdate);

            // 日历数据初始化
            this.picker = (this.get_date(this.Data)).start;
            
            // console.log(`渲染处 拿到时间的值:`);
            // console.log(this.option.series[0]);
            // console.log(this.option.series[1]);
            // 表格初始化
            var myChart = echarts.init(document.getElementById('box'));
            
            // 绘制图表
            myChart.setOption(this.option);
        },
        /**
         * 更新日期选择器的取值范围
         * @param {*} data 最新的店铺数据
         */
        update_shopdata(data){
            // 日历可选值范围
            this.min = (this.get_date(data)).start;
            this.max = (this.get_date(data)).end;
        }
    },
    /**
     * 数据初始化 
     * 数据获取
     * @author guibin
     */
    async mounted(){
        // 数据初始化
        await this.init();
        
        // 先获取到客流量界面展示的默认为 最早的日期
        this.startdate = this.min.split('-').join('');
        
        // 日历数据初始化
        this.picker = (this.get_date(this.Data)).start;      

        // 表格渲染器
        this.renderer(this.startdate);
        this.model = `门店1`;
    }
}
</script>
<style>
    #main{
        display: grid;
        flex-direction: row;
        justify-content: space-evenly;
    }
    /* charts */
    #box{
        width: 980px;
        height: 560px;
        border-radius: 11px;
        box-shadow: 2px 7px 6px rgb(0 0 0 / 40%);
        grid-row: 1/3;
        grid-column: 1/2;
    }
    /* 日历 */
    #calendar{
        width: 400px;
        height: 400px;
        grid-row: 1;
        grid-column: 2;
    }
    /* 筛选框 */
    #screeningBox{
        right: 89px;
        width: 358px;
        background: rgba(255,133,76,0.8);
        height: 149px;
        border-radius: 16px;
        box-shadow: 1px 2px 6px black;
        grid-row: 2;
        grid-column: 2;
    }
</style>