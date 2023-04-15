<template>
    <div style="background-color: white;padding-bottom: 20px;">
        <v-simple-table :fixed-header="true" class="elevation-1" id="tab">
            <template v-slot:default>
                <!-- 表头 -->
                <thead>
                    <tr>
                        <th class="text-left" style="font-size: 16px;color: black;">序号</th>
                        <th class="text-left" style="font-size: 16px;color: black;">姓名</th>
                        <th class="text-left" style="font-size: 16px;color: black;">偏好星期</th>
                        <th class="text-left" style="font-size: 16px;color: black;">偏好时间</th>
                        <th class="text-left" style="font-size: 16px;color: black;">操作</th>
                    </tr>
                </thead>
                <!-- 表格内容 -->
                <tbody>
                    <tr v-for="(item, index) in hobbyTableData" :key="item.name" :class="'tr-color-' + index % 2">
                        <td>{{ item.id }}</td>
                        <td>{{ item.name }}</td>
                        <td>
                            <!-- 工作星期偏好 默认全选 -->
                            <!-- 用v-model绑定选中workday的值 -->
                            <el-checkbox-group v-model="docDay[item.id - 1]">
                                <!-- 循环星期一到星期日，数据存放在docDayData -->
                                <el-checkbox v-for="item1 in docDayData" :label="item1.id" true-label :key="item1.id">{{
                                    item1.title
                                }}</el-checkbox>
                            </el-checkbox-group>
                        </td>
                        <td>
                            <!-- 工作时间偏好 默认全选 -->
                            <!-- 用v-model绑定选中worktime的值 -->
                            <el-checkbox-group v-model="docTime[item.id - 1]">
                                <!-- 循环四个工作时间段，数据存放在docTimeData -->
                                <el-checkbox v-for="item2 in docTimeData" :label="item2.id" true-label :key="item2.id">{{
                                    item2.title
                                }}</el-checkbox></el-checkbox-group>
                        </td>
                        <td>
                            <!-- 将本行的数据传值，item就是一行的数据 -->
                            <!-- <el-button @click="handleEditHobby(item)">提交</el-button> -->
                            <el-button type="primary" :plain="true" @click="submit(item)">提交</el-button>
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table> <br>
        <!--分页 -->
        <template>
            <div class=" text-center">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page.sync="paginations.page_index" :page-sizes="paginations.page_sizes"
                    :page-size="paginations.page_size" :layout="paginations.layout" :total="paginations.total">
                </el-pagination>
            </div>
        </template>
        <!-- 操作修改的弹窗 -->
        <!-- <el-dialog style="width: 1000px;height: 1000px;" title="员工偏好" @change="change()" :visible.sync="zdydialog">
            <el-form :model="tableData">
                <el-form-item label="序号" width="80px">
                    <el-input class="dialog_input" v-model="tableData.id"></el-input> -->
        <!-- <input type="text" style="border: 1px solid black;" v-model="formid"> -->
        <!-- </el-form-item>
                <el-form-item label="姓名" width="80px">
                    <el-input class="dialog_input" v-model="tableData.name"></el-input>
                </el-form-item>
                <el-tabs type="border-card">
                    <el-tab-pane label="选择星期偏好">
                        <el-form-item label="偏好星期" width="80px">
                            <el-checkbox v-for="item1 in docDayData" :key="item1.id" :label="item1.id" true-label
                                v-model="tableData.workday">
                                {{ item1.title }}</el-checkbox>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="选择时间偏好">
                        <el-form-item label="偏好时间" width="80px">
                            <el-checkbox v-for="item2 in docTimeData" :label="item2.id" true-label :key="item2.id"
                                v-model="tableData.worktime">{{
                                    item2.title
                                }}</el-checkbox>
                        </el-form-item>
                    </el-tab-pane>
                </el-tabs>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel()">取 消</el-button>
                <el-button type="primary" @click="submit()">确
                    定</el-button>
            </div>
        </el-dialog> -->
        <!-- 弹窗结束 -->
    </div>
</template>
<script type="text/javascript">
import { get } from '@/api/config'
export default {
    created() {
        this.getdata();
    },
    data() {
        return {

            //弹窗绑定的数据
            tableData: {},
            // 员工数据
            emploerData: {
                id: 0,
                workday: [],
                worktime: []
            },
            //判断弹窗是否出现
            zdydialog: false,
            //AllTableData过滤后的数据
            hobbyTableData: [],
            //后端获取的所有数据
            hobbyAllTableData: [],
            //分页的数据
            paginations: {
                page_index: 1,
                total: 0,
                page_size: 5,
                page_sizes: [5, 10, 15, 20],
                layout: "total, sizes, prev, pager, next, jumper", //翻页属性
            },
            //工作星期，相当于数据库workday的值
            docDay: [],
            docDayData: [
                {
                    value: "a1",
                    title: "星期一",
                    id: 0
                },
                {
                    value: "a2",
                    title: "星期二",
                    id: 1
                },
                {
                    value: "a3",
                    title: "星期三",
                    id: 2
                },
                {
                    value: "b1",
                    title: "星期四",
                    id: 3
                },
                {
                    value: "b2",
                    title: "星期五",
                    id: 4
                },
                {
                    value: "b3",
                    title: "星期六",
                    id: 5
                },
                {
                    value: "c1",
                    title: "星期日",
                    id: 6
                },
            ],
            indexday: {
                "a1": 0,
                "a2": 1,
                "a3": 2,
                "b1": 3,
                "b2": 4,
                "b3": 5,
                "c1": 6,
            },
            //工作时间，相当于数据库worktime的值
            docTime: [],
            docTimeData: [
                {
                    value: "b1",
                    title: "8:00-12:00",
                    id: 0
                },
                {
                    value: "b2",
                    title: "12:00-16:00",
                    id: 1
                },
                {
                    value: "b3",
                    title: "16:00-20:00",
                    id: 2
                },
                {
                    value: "c1",
                    title: "20:00-23:00",
                    id: 3
                },
            ],
            indextime: {
                'b1': 0,
                'b2': 1,
                'b3': 2,
                'c1': 3,
            }
        };
    },
    methods: {
        //获取员工偏好数据
        async getdata() {
            let res = await get("/staff_hobby/findAll");
            // console.log(res);
            this.hobbyAllTableData = res;
            this.setPaginations();
            for (let i = 0; i < res.length; i++) {
                this.docDay.push(res[i].workday);
                this.docTime.push(res[i].worktime)
            }
            // console.log(this.hobbyTableData[0])
        },

        // 获取下标push
        stepDoc(index) {
            this.idx = index;
            let arr = [];
            const item = this.hislist[index];
            this.dochisarr = item.zzsj.split(",");
            item.zzsj.split(",").forEach((val) => {
                arr.push(this.indexzc[val]);
            });
            this.doctime = arr;
        },
        //设置分页属性
        setPaginations() {
            //初始化
            this.paginations.total = this.hobbyAllTableData.length;
            this.paginations.page_index = 1;
            this.paginations.page_size = 5;
            //设置默认的分页数据
            this.hobbyTableData = this.hobbyAllTableData.filter((item, index) => {
                return index < this.paginations.page_size;
            });
        },
        //分页方法
        handleCurrentChange(page) {
            //获取当前页
            let index = this.paginations.page_size * (page - 1);
            //获取数据总数
            let nums = this.paginations.page_size * page;
            //容器
            let tables = [];
            for (let i = index; i < nums; i++) {
                if (this.hobbyAllTableData[i]) {
                    tables.push(this.hobbyAllTableData[i]);
                }
                this.hobbyTableData = tables;
            }
        },
        // 当分页数量改变时
        handleSizeChange(page_size) {
            this.paginations.page_index = 1;
            this.paginations.page_size = page_size;
            this.hobbyTableData = this.hobbyAllTableData.filter((item, index) => {
                return index < page_size;
            });
        },
        submit(row) {
            //新建变量params存放已选中的workday,worktime
            const params = {};
            params.day = this.docDay;
            params.time = this.docTime;
            // console.log(params.day[0]);
            //将点击后的workday,worktime数据更新到hobbyTableData
            this.hobbyTableData[row.id] = params.day[row.id]
            this.hobbyTableData[row.id] = params.time[row.id]
            //提交后能获取到页面选中的值
            console.log(params.time[row.id - 1]);
            console.log(params.day[row.id - 1]);
            //提示提交成功
            this.$message({
                message: '提交成功！',
                type: 'success'
            });

        },
        cancel() {
            this.zdydialog = false
        },
    },

}
</script>
<style>
/* 表格颜色 */
.tr-color-0 {
    background: oldlace;
}

/* 定义余数为 1 的行颜色 */
.tr-color-1 {
    background: #f0f9eb;
}
</style>