<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat color="white">
          <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
            Today
          </v-btn>
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
              <!-- <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item> -->
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
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
        </v-toolbar>
      </v-sheet>

      <v-sheet height="750">
        <!-- 
          :interval-style="intervalStyle" 
          :event-color="getEventColor"

          @change="updateRange"
        -->
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
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
            min-width="400px"
            min-height="200px"
            overlay-opacity="2"
            flat
          >
            <v-toolbar
              :color="selectedEvent.color"
              dark
            >
              <!-- v-toolbar 编辑栏 -->
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title><br>
            </v-toolbar>
            <!-- 点击打开的编辑栏 -->
            <v-card-text>
              <span v-html="selectedEvent.details"></span>

              <el-form ref="form" :model="event" label-width="80px" size="mini">
                
                <el-form-item label="值班人">
                  <el-input v-model="event.name"></el-input>
                </el-form-item>
                
                <el-form-item label="值班门店">
                  <el-input v-model="event.shopid"></el-input>
                </el-form-item>

                <el-form-item label="值班日期">
                  <el-col :span="11">
                    <el-date-picker 
                      type="date" 
                      placeholder="选择日期" 
                      v-model="this.event.start" 
                      style="width: 100%;"
                      disabled>
                    </el-date-picker>
                  </el-col>
                </el-form-item>

                <el-form-item label="开始时间">
                  <el-col :span="11">
                    <select class="start" v-model="startTime">
                        <!-- <option>{{ startTime }}</option> -->
                        <option :value="item" :key="item" v-for="item in dateRule">{{ item }}</option>
                    </select>
                  </el-col>
                  </el-form-item>
                <el-form-item label="结束时间">
                  <el-col>
                    <select class="end" v-model="endTime">
                        <!-- <option >{{ endTime }}</option> -->
                        <option :value="item" :key="item" v-for="item in dateRule">{{ item }}</option>
                    </select>
                  </el-col>
                </el-form-item>
                <!--  -->
                <el-form-item size="large">
                  <el-button type="primary" @click="onSubmit(event)">立即创建</el-button>
                  <el-button @click="onDelete(event)">删除</el-button>
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

<script src="@/components/paiban/js/index.js"></script>