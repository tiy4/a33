<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat color="white">
          <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
            Today
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>
          <!-- 日历头部 月份位置 -->
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                outlined
                color="grey darken-2"
                v-bind="attrs"
                v-on="on"
              >
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 days</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>

      <v-sheet height="600">
        <!-- 
          :interval-style="intervalStyle" 
        -->
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :type="type"
          :dark="dark"
          :event-overlap-mode="mode"
          :first-interval="intervals.first"
          :interval-minutes="intervals.minutes"
          :interval-count="intervals.count"
          :interval-height="intervals.height"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
          ></v-calendar>
          <!-- hide-header -->

          
          <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
          >
        <!-- 生成卡片 -->
          <v-card
            color="grey lighten-4"
            min-width="350px"
            min-height="200px"
            flat
          >
            <v-toolbar
              :color="selectedEvent.color"
              dark
            >
            <!-- 编辑 -->
              <v-btn icon>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <!-- v-toolbar 编辑栏 -->
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title><br>
              <!-- <v-toolbar-title v-html="selectedEvent.start"></v-toolbar-title><br>
              <v-toolbar-title v-html="selectedEvent.end"></v-toolbar-title> -->
              <!-- <v-spacer></v-spacer> -->
              <!-- 爱心按钮 -->
              <!-- <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn> -->
              <!-- 更多按钮 -->
              <!-- <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn> -->
            </v-toolbar>
            <v-card-text>
              <span v-html="selectedEvent.details"></span>

              <el-form ref="form" :model="event" label-width="80px" size="mini">
                
                <el-form-item label="值班人">
                  <el-input v-model="event.name"></el-input>
                </el-form-item>

                <el-form-item label="值班日期">
                  <el-col :span="11">
                    <el-date-picker 
                      type="date" 
                      placeholder="选择日期" 
                      v-model="this.event.start" 
                      style="width: 100%;">
                    </el-date-picker>
                  </el-col>
                </el-form-item>

                <el-form-item label="值班时间">
                  <el-col :span="11">
                    <el-time-picker 
                      placeholder="选择时间" 
                      v-model="this.event.start" 
                      style="width: 100%;">
                    </el-time-picker>
                  </el-col>
                  <el-col class="line" :span="2">&nbsp;——&nbsp;</el-col>
                  <el-col :span="11">
                    <el-time-picker 
                      placeholder="选择时间" 
                      v-model="this.event.end" 
                      style="width: 100%;">
                    </el-time-picker>
                  </el-col>
                </el-form-item>
                <!--  -->
                <el-form-item size="large">
                  <el-button type="primary" @click="onSubmit">立即创建</el-button>
                  <el-button>取消</el-button>
                </el-form-item>
              </el-form>
              
            </v-card-text>
            <!-- 取消 -->
            <v-card-actions>
              <v-btn
                text
                color="secondary"
                @click="selectedOpen = false"
              >
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>

      </v-sheet>
      
    </v-col>
  </v-row>
</template>

<script>
// import staff from '@/api/staff';
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
    // 早上 8点 到 晚上 11点
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
        // console.log(nativeEvent);
        // console.log(nativeEvent.target);
        // console.log(event);

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
     * 排班 日期格式处理  需要整理好每次的 event
     * @param id 该次班的员工id  例如 1
     * @param date 传入排班数据  例如 000011010100111100000001000000
     * @param workDate 该员工排班日期 例如 2023-05-10
     * @return { events } 返回需要排班的员工的基本排班信息
     */
    paiban_date_format(id,date,workDate){
      // console.log(this.names);
      let date_res = Array.from(date);
      // 该员工的当日所有排班事件
      let events = [];
      // 单个排班事件
      let event = {
        name: '',
        start: '',
        end: '',
        color: `rgb(${this.getRandomArbitrary(0,255)},
        ${this.getRandomArbitrary(0,255)},
        ${this.getRandomArbitrary(0,255)}
        )`,
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
     * 更新随机数据
     */
    async updateRange () {

      // 排班时间 早上9点 到 晚上 10 点
      let res = get('/Shift/selectByStoreId/1');
      let res_paiban = await res.then(val => {
        return val;
      })
      // 排版信息解析格式
      // console.log(this.paiban_format(res_paiban));
      
      // 获取所有员工姓名
      this.names = await this.get_staff_data();
      
      // 排班信息格式处理  id  排班信息   排班日期yyyymmdd
      this.paiban_data
      = this.paiban_date_format( 1,
        res_paiban[1].shiftScheduling,
        res_paiban[1].workDate);
        
      console.log(this.paiban_data);
      
      this.events = this.paiban_data;
      console.log(this.events);
    },
    rnd (a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
    // 获取随机数
    getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }
  },
}
</script>