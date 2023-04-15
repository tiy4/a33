import { get } from '@/util/axios';
export default {
  // // 30 个 半小时 早上 8点 到 晚上 11点
  // 0000 0000 0000 0000 0000 0000 0000 00
  data: () => ({
    // 黑暗模式
    dark: false,
    // 日期焦点
    focus: '',
    // event 用于获取该事件的对象值
    event: {},
    // 日期选择器的开始结束时间
    startTime: '',
    endTime: '',
    // 设置排班表格样式
    mode: 'column',
    modeOptions: [
      { text: 'Stack', value: 'stack' },
      { text: 'Column', value: 'column' },
    ],
    // 显示类型
    type: 'month',
    typeToLabel: {
      month: 'Month',
      week: 'Week',
      day: 'Day',
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    // 所有事件
    /*
    name: this.names[this.rnd(0, this.names.length - 1)],
    shopid: 店铺id
    // 开始时间
    start: first,
    // 结束时间
    end: second,
    // 使用颜色
    color: this.colors[this.rnd(0, this.colors.length - 1)],
    // 是否全天事件 true 不是 false 是
    timed: !allDay,
    */
    events: [],
    // colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
    // 所有员工 姓名 首位为空
    names: [''],
    // 店铺 日程排班时间表 
    // 早上 8点 到 晚上 12点
    dateRule: [
      '08:00:00',
      '08:30:00',
      '09:00:00',
      '09:30:00',
      '10:00:00',
      '10:30:00',
      '11:00:00',
      '11:30:00',
      '12:00:00',
      '12:30:00',
      '13:00:00',
      '13:30:00',
      '14:00:00',
      '14:30:00',
      '15:00:00',
      '15:30:00',
      '16:00:00',
      '16:30:00',
      '17:00:00',
      '17:30:00',
      '18:00:00',
      '18:30:00',
      '19:00:00',
      '19:30:00',
      '20:00:00',
      '20:30:00',
      '21:00:00',
      '21:30:00',
      '22:00:00',
      '22:30:00',
      '23:00:00',
      '23:30:00',
      '00:00:00',
    ],
    // 日历单日 时长
    intervals: {
      // 15 是 8点 开始
      first: 15, 
      // 每一格 的 占用 多少分钟
      minutes: 30,
      // 时间段 的 总数量 
      count: 38,
      // 高度 
      height: 48 
    },
    // 排班数据 (单人)
    paiban_data:[],
    // 所有排班数据 
    // 保存所有修改后的格式的排班数据
    all_paiban_data: [],
  }),
  mounted () {
    this.$refs.calendar.checkChange()
    // 更新数据
    this.updateRange();
  },
  methods: {
    /**
     * 获取所有员工信息 
     * @return staff_data 获取到所有员工的信息
     */
    async get_staff_data(){
      // 所有门店员工信息
      let staff_data = await get('/staff/findAll');
      let res_data_staff = [];
      staff_data.forEach((value)=>{
        res_data_staff.push(value.name);
      });
      return res_data_staff;
    },
    /**
     * 提交编辑表的数据
     * @param {*} event 该编辑数据的所有信息 
     */
    async onSubmit(event){
        // console.log('==========');
        // console.log(event.name);

        // 员工id 转换 + 1 是因为 员工id 数据库 从 1 开始
        let staff_id = this.names.indexOf(event.name)+1;
        // console.log(this.names);
        // 开始结束时间转换
        let start_origin_time = this.get_Date(event.start)
        let end_origin_time = this.get_Date(event.end)
        let date = start_origin_time.date;
        // 将 时间数据转换成下标表示
        // console.log('原始的数据:');
        // console.log(start_origin_time);
        // console.log(end_origin_time);

        start_origin_time = this.dateRule.indexOf(start_origin_time.time);
        end_origin_time = this.dateRule.indexOf(end_origin_time.time);

        // 转换后的
        // console.log(this.dateRule[start_origin_time]);
        // console.log(this.dateRule[end_origin_time]);

        let changeStart = this.dateRule.indexOf(this.startTime);
        let changeEnd = this.dateRule.indexOf(this.endTime);      

        // console.log('修改后的：'+this.startTime);
        // console.log('修改后的：'+this.endTime);
        // console.log('修改后的：'+changeStart);
        // console.log('修改后的：'+changeEnd);

        // 最后的请求数据
        let query_data = {
          // 员工id
          staff_id:staff_id,
          // 店铺id
          shopid: event.shopid,
          // 日期
          date: date,
          // 修改前的 开始时间
          origin_start: start_origin_time,
          // 修改前的 结束时间
          origin_end: end_origin_time,
          // 需要修改成的 开始时间
          start: changeStart,
          // 需要修改后的 结束时间
          end: changeEnd-1,
        }
        // console.log('/Shift/updateEmptyStaffSchedulingByBeginAndEnd/'+
        //           query_data.staff_id+'/'+
        //           query_data.shopid+'/'+
        //           query_data.date+'/'+
        //           query_data.start+'/'+
        //           query_data.end+'/'+
        //           query_data.origin_start+'/'+
        //           query_data.origin_end
        //           );
        await get(
          '/Shift/updateEmptyStaffSchedulingByBeginAndEnd/'+
                  query_data.staff_id+'/'+
                  query_data.shopid+'/'+
                  query_data.date+'/'+
                  query_data.start+'/'+
                  query_data.end+'/'+
                  query_data.origin_start+'/'+
                  query_data.origin_end
        );
        // console.log(res);
        
        // 更新页面数据
        this.updateRange();
    },
    /**
     * 删除该排班表事件
     */
    async onDelete(event){
        // 删除后需要重新渲染
        // 员工id 转换 + 1 是因为 员工id 数据库 从 1 开始
        let staff_id = this.names.indexOf(event.name)+1;
        // 开始结束时间转换
        let start_origin_time = this.get_Date(event.start)
        let end_origin_time = this.get_Date(event.end)
        let date = start_origin_time.date;
        // 将 时间数据转换成下标表示
        start_origin_time = this.dateRule.indexOf(start_origin_time.time);
        end_origin_time = this.dateRule.indexOf(end_origin_time.time);

        let changeStart = this.dateRule.indexOf(this.startTime);
        let changeEnd = this.dateRule.indexOf(this.endTime);      

        // 最后的请求数据
        let query_data = {
          // 员工id
          staff_id:staff_id,
          // 店铺id
          shopid: event.shopid,
          // 日期
          date: date,
          // 修改前的 开始时间
          origin_start: start_origin_time,
          // 修改前的 结束时间
          origin_end: end_origin_time,
          // 需要修改成的 开始时间
          start: changeStart,
          // 需要修改后的 结束时间
          end: changeEnd-1,
        }
        await get(
          '/Shift/updateEmptyStaffSchedulingByBeginAndEnd/'+
                  query_data.staff_id+'/'+
                  query_data.shopid+'/'+
                  query_data.date+'/'+
                  query_data.start+'/'+
                  query_data.end
        );
        // 更新页面数据
        this.updateRange();
    },
    /**
     * 解析 获取到的日期
     * @return {year,month,day,hour,minutes,second}
     */
    get_Date(date){
        /* 
            toLocaleString();
            返回日期格式 yyyy/mm/dd hh:mm:ss
            按空格分割字符串
        */ 
        let datearr = date.toLocaleString().split(' ');
        // 将原始 / 分隔 替换为 - 分隔
        let reg = /\//g;
        return {
            date: datearr[0].replace(reg,'-'),
            time: datearr[1],
        }
    },
    /**
     * 排班日期修改转换
     * @param start 需要修改的时间段开始时间 
     * @param end   需要修改的时间段的结束时间
     * @return { res } 返回修改数据当天的所有排班数据 
     */
    paiban_datetransform(){

    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    // 显示当天数据
    viewDay ({ date }) {
        // console.log(date);
        this.focus = date
        this.type = 'day'
    },
    // 获取事件颜色
    getEventColor (event) {
        return event.color
    },
    // 跳转到今天
    setToday () {
        this.focus = ''
    },
    // 上一页
    prev () {
        this.$refs.calendar.prev()
    },
    // 下一页
    next () {
      this.$refs.calendar.next()
    },
    /**
     * 点击排班表显示事件
     * @param {nativeEvent, event} event 获取到的事件
     * nativeEvent 是获取到的元素
     */
    showEvent ({ nativeEvent, event }) {
        this.event = event;
        // console.log(event);
        // console.log(nativeEvent);
        // 点击后将获取到的日历数据赋值到日期选择器上
        this.startTime = (this.event.start.toLocaleString().split(' '))[1];
        this.endTime = (this.event.end.toLocaleString().split(' '))[1];
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          setTimeout(() => this.selectedOpen = true, 10)
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          setTimeout(open, 10)
        } else {
          open()
        }

      /**
       * stopPropagation()
       * Event 接口的stopPropagation() 方法
       * 阻止捕获和冒泡阶段中当前事件的进一步传播。
       */
        nativeEvent.stopPropagation()
    },
    /**
     * 根据日期所做的排班整理
     * 排班 日期格式处理  需要整理好每次的 event
     * @param id 该次班的员工id  例如 1
     * @param shopid 店铺id
     * @param date 传入排班数据  例如 0000 1101 0100 1111 0000 0001 0000 00
     * @param workDate 该员工排班日期 例如 2023-05-10
     * @param color 该员工演示的颜色
     * @return { events } 返回需要排班的员工的基本排班信息
     */
    paiban_date_format(id,shopid,date,workDate,color){
      // console.log(this.names);
      let date_res = Array.from(date);
      // 该员工的当日所有排班事件
      let events = [];
      // 单个排班事件
      let event = {
        name: '',
        shopid: shopid,
        start: '',
        end: '',
        color: color,
        timed: true,
      };

      // 员工姓名
      event.name = this.names[--id];

      for(let i=0; i<date_res.length; i++){
        // 如果找到一个 1 则向后找 有几个连续的 1 记下开始和结束的下标
        if(date_res[i] === '1'){
          // 第一个 1 保存 start
          event.start = new Date(`${workDate} ${this.dateRule[i]}`);
          // console.log(`开始保存: ${i}`);
          for(let j = i; j<date_res.length; j++){
            if(date_res[j] === '1'){
              continue;
            }else{
              // 当没有 1 时候 将结果保存 end
              event.end = new Date(`${workDate} ${this.dateRule[j]}`);
              // 将结果保存
              // 跳过 已经查询过的地方 
              // 注意 深拷贝 浅拷贝 问题
              // console.log(event);
              let res = this.deepClone(event);
              events.push(res);
              i = j;
              break;
            }
          }
        }
      }
      return events;
    },
    /**
     * 深拷贝
     * @param {target} target 需要深拷贝的目标
     * @return { target } 返回深拷贝好的目标
     */
    deepClone(target) {
      // 将结果 由JSON 转换为 obj 格式
      target = JSON.stringify(target);
      target = JSON.parse(target);
      target.start = new Date(target.start);
      target.end = new Date(target.end);
      return target;
    },
    /**
     * 获取所有门店
     * @return { res } 返回所有门店信息
     */
    async get_allshop(){
      let res = await get('/shop/findAll')
      return res;
    },
    /**
     * 更新排班数据
     */
    async updateRange () {
      // 获取所有员工信息
      let shops = await this.get_allshop();

      // 获取所有员工姓名
      this.names = await this.get_staff_data();

      // 将所有数据处理成可以显示的格式
      for(let i=1; i<=shops.length; i++){
        // 排班时间 早上 8 点 到 晚上 12 点
        let res = get(`/Shift/findAllByStoreId/${i}`);
        let res_paiban = await res.then(val => {
          return val;
        })
        // console.log(res_paiban);
        // 排班信息格式处理  id  排班信息   排班日期yyyymmdd
        res_paiban.forEach((val)=>{
          let paiban = this.paiban_date_format(
            // 员工id
            val.staffId,
            // 门店id
            i,
            // 门店排班数据 
            val.shiftScheduling,
            // 排班日期
            val.workDate,
            // 对应颜色 不用 0 到 255 是因为 防止出现浅色背景
            `rgb(${this.getRandomArbitrary(50,100)},
            ${this.getRandomArbitrary(50,100)},
            ${this.getRandomArbitrary(50,100)}
            )`);
            
            // 处理好的数据插入  
            // ... 数组解构 变成对象
            // console.log(...paiban);
            this.paiban_data.push(...paiban);
        });
      }
      this.events = this.paiban_data;
      //  每次使用完后清空数据防止影响下一次的数据
      this.paiban_data = [];
    },
    // 获取随机数
    getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }
  },
}