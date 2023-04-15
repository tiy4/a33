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
            // 通过 店铺 id 获取的数据
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
                        data: [],
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
         * @param oldQuestion 监听的值
         */
        model (oldQuestion) {
            // 获取选中的 店铺值
            let shopchoice = this.shopdata.get(`${oldQuestion}`);
            if(shopchoice){ // 如果选中值不为空 则，
                // 获取

                // 渲染
                this.renderer(this.startdate,shopchoice);
                // 更新店铺日期选择范围
                this.update_shopdata(this.Data);
                // 日历数据初始化
                this.picker = this.min;
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
            // let get_res = await get(`/passenger_flow/findAll`);

            // 默认第一个门店
            let get_res = await this.get_shopinfo_fromid();
            this.Data = get_res;
            
            // 日历数据初始化
            this.picker = (this.get_date(this.Data)).start;

            // 店铺选择器初始化
            let get_shop_info = await get('/shop/findAll');
            this.shop_data(get_shop_info);
            
            // 更新店铺日期范围
            this.update_shopdata(get_res);
        },
        /** 
         * 日期选择器更新
         * @author guibin
         */
        async calendar_update(){
            // 获取到日期数据
            let date = await this.chart_update(this.picker);
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
     *          对获取数据处理     
     *          数据格式化函数 
     ******************************************/ 
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
            return res;
        },
        /**
         * 获取 店铺对应店铺id
         * @author guibin
         */
        shop_data(data){
            data.forEach((value) =>{
                this.items.push(value.name);
                this.shopdata.set(`${value.name}`,`${value.id}`);
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
            return result;
        },
        /**
         * 获取对应门店的数据
         * 要给一个 最小的 默认 日期
         * /passenger_flow/passenger/{shopid}/{date}
         * @param {*} shopid 店铺id
         * @return result 返回该门店对应的人流量数
         * @author guibin
         */
        async get_shopinfo_fromid(shopid = 1){
            let res = await get(`/passenger_flow/passenger/${shopid}`);
            return res;
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
            let res;
            if(startdate){
                res = await this.get_shopinfo(shopid,startdate);
            }else{
                console.log('默认渲染数据');
                res = await this.get_shopinfo_fromid( shopid );
                res = this.personal_data_format(res);
            }
            // let format_res =  await this.personal_data_format(res);
            
            this.option.series[0].data = res;
            this.option.series[1].data = res;
            
            // // 日历数据初始化
            // this.picker = (this.get_date(this.Data)).start;

            // console.log('获取日期选择器的默认值:');
            // console.log((this.get_date(this.Data)).start);

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
            console.log(data);
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