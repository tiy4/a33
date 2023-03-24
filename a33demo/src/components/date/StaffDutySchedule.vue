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
          <v-calendar
            ref="calendar"
            v-model="focus"
            color="primary"
            :events="events"
            :event-color="getEventColor"
            :type="type"
            @click:event="showEvent"
            @click:more="viewDay"
            @click:date="viewDay"
            @change="updateRange"
          ></v-calendar>

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
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                <v-spacer></v-spacer>
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
                      <el-date-picker type="date" placeholder="选择日期" v-model="this.event.start" style="width: 100%;"></el-date-picker>
                    </el-col>
                  </el-form-item>

                  <el-form-item label="值班时间">
                    <el-col :span="11">
                      <el-time-picker placeholder="选择时间" v-model="this.event.start" style="width: 100%;"></el-time-picker>
                    </el-col>
                    <el-col class="line" :span="2"> —— </el-col>
                    <el-col :span="11">
                      <el-time-picker placeholder="选择时间" v-model="this.event.end" style="width: 100%;"></el-time-picker>
                    </el-col>
                  </el-form-item>

                  <el-form-item size="large">
                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    <el-button>取消</el-button>
                  </el-form-item>
                </el-form>
                
              </v-card-text>
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
    export default {
      data: () => ({
        drawer: false,
        direction: 'rtl',
        focus: '',
        // event 用于获取该事件的对象值
        event: {},
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
        events: [],
        colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
        names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
      }),
      mounted () {
        this.$refs.calendar.checkChange()
      },
      methods: {
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
            console.log(nativeEvent);
            console.log(nativeEvent.target);
            console.log(event);
            this.event = event;
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
        // 更新随机数据
        updateRange ({ start, end }) {
          const events = []
  
          const min = new Date(`${start.date}T00:00:00`)
          const max = new Date(`${end.date}T23:59:59`)
          const days = (max.getTime() - min.getTime()) / 86400000
          const eventCount = this.rnd(days, days + 20)
  
          for (let i = 0; i < eventCount; i++) {
            const allDay = this.rnd(0, 3) === 0
            const firstTimestamp = this.rnd(min.getTime(), max.getTime())
            const first = new Date(firstTimestamp - (firstTimestamp % 900000))
            const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
            const second = new Date(first.getTime() + secondTimestamp)
  
            events.push({
              name: this.names[this.rnd(0, this.names.length - 1)],
              start: first,
              end: second,
              color: this.colors[this.rnd(0, this.colors.length - 1)],
              timed: !allDay,
            })
          }
          
          console.log(events[0].name);
          this.events = events
        },
        rnd (a, b) {
          return Math.floor((b - a + 1) * Math.random()) + a
        },
      },
    }
  </script>