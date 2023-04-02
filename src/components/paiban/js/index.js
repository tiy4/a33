import { get } from '@/util/axios';
export default {
  // // 30 个 半小时 早上 8点 到 晚上 11点
  // 0000 0000 0000 0000 0000 0000 0000 00
  data: () => ({
    dark: false,
    drawer: false,
    direction: 'rtl',
    focus: '',
    // event 用于获取该事件的对象值
    event: {},
    // 设置排班表格样式
    mode: 'column',
    modeOptions: [
      { text: 'Stack', value: 'stack' },
      { text: 'Column', value: 'column' },
    ],
    type: 'month',
    typeToLabel: {
      month: 'Month',
      week: 'Week',
      day: 'Day',
      '4day': '4 Days',
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    // 事件
    // name: this.names[this.rnd(0, this.names.length - 1)],
    // shopid: 店铺id
    // // 开始时间
    // start: first,
    // // 结束时间
    // end: second,
    // // 使用颜色
    // color: this.colors[this.rnd(0, this.colors.length - 1)],
    // // 
    // timed: !allDay,
    events: [],
    colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
    // 所有员工 姓名
    names: [],
    // 店铺 日程排班时间表 
    // 早上 8点 到 晚上 12点
    dateRule: [
      '8:00',
      '8:30',
      '9:00',
      '9:30',
      '10:00',
      '10:30',
      '11:00',
      '11:30',
      '12:00',
      '12:30',
      '13:00',
      '13:30',
      '14:00',
      '14:30',
      '15:00',
      '15:30',
      '16:00',
      '16:30',
      '17:00',
      '17:30',
      '18:00',
      '18:30',
      '19:00',
      '19:30',
      '20:00',
      '20:30',
      '21:00',
      '21:30',
      '22:00',
      '22:30',
      '23:00',
      '23:30',
      '00:00',
    ],
    // 日历单日 时长
    intervals: {
      // 15 是 8点 开始
      first: 15, 
      // 每一格 的 占用 多少分钟
      minutes: 30,
      // 总数量
      count: 32,
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
    // 提交数据
    onSubmit(){
      console.log('提交');
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
    // 显示事件
    showEvent ({ nativeEvent, event }) {
        this.event = event;
        // console.log(this.event);
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
      event.name = this.names[id];

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
     * 更新随机数据
     */
    async updateRange () {
      // 获取所有员工信息
      let shops = await this.get_allshop();
      
      // 获取所有员工姓名
      this.names = await this.get_staff_data();

      // 将所有数据处理成可以显示的格式
      for(let i=1; i<=shops.length; i++){
        // 排班时间 早上 8 点 到 晚上 12 点
        // let res = get(`/Shift/selectByStoreId/${i}`);
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
            `rgb(${this.getRandomArbitrary(0,100)},
            ${this.getRandomArbitrary(0,100)},
            ${this.getRandomArbitrary(0,100)}
            )`);
            
            // 处理好的数据插入  
            // ... 数组解构 变成对象
            // console.log(...paiban);
            this.paiban_data.push(...paiban);
        });
      }
      this.events = this.paiban_data;
    },
    // 获取随机数
    getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }
  },
}