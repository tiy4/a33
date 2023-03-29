<template>
    <div id="hobbybody">
        <v-simple-table :fixed-header="true" class="elevation-1">
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-center" style="font-size: 16px;color: black;">序号</th>
                        <th class="text-center" style="font-size: 16px;color: black;">姓名</th>
                        <th class="text-center" style="font-size: 16px;color: black;">偏好星期</th>
                        <th class="text-center" style="font-size: 16px;color: black;">偏好时间</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in tableData" :key="item.name" :class="'tr-color-' + index % 2">
                        <td>{{ item.id }}</td>
                        <td>{{ item.name }}</td>
                        <td>
                            <!-- 工作星期偏好 默认全选 -->
                            <el-checkbox-group v-model="docday[item.id - 1]">
                                <el-checkbox v-for="item1 in docdayData" :label="item1.id" true-label :key="item1.id">{{
                                    item1.title
                                }}</el-checkbox>
                            </el-checkbox-group>
                        </td>
                        <td>
                            <!-- 工作时间偏好 默认全选 -->
                            <el-checkbox-group v-model="doctime[item.id - 1]">
                                <el-checkbox v-for="item2 in doctimeData" :label="item2.id" true-label :key="item2.id">{{
                                    item2.title
                                }}</el-checkbox></el-checkbox-group>
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table> <br>
        <!-- 分页 -->
        <template>
            <div class="text-center">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page.sync="paginations.page_index" :page-sizes="paginations.page_sizes"
                    :page-size="paginations.page_size" :layout="paginations.layout" :total="paginations.total">
                </el-pagination>
            </div>
        </template>
    </div>
</template>
<script>
import { get } from '@/api/config'
export default {
    created() {
        this.getdata();
    },
    methods: {
        async getdata() {
            let res = await get("/staff_hobby/findAll");
            console.log(res);
            this.allTableData = res;
            this.setPaginations();
            for (let i = 1; i < res.length; i++) { this.docday.push(res[i].workday); this.doctime.push(res[i].worktime) }
            // console.log(this.doctime[0])
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
            this.paginations.total = this.allTableData.length;
            this.paginations.page_index = 1;
            this.paginations.page_size = 10;
            //设置默认的分页数据
            this.tableData = this.allTableData.filter((item, index) => {
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
                if (this.allTableData[i]) {
                    tables.push(this.allTableData[i]);
                }
                this.tableData = tables;
            }
        },
        handleSizeChange(page_size) {
            this.paginations.page_index = 1;
            this.paginations.page_size = page_size;
            this.tableData = this.allTableData.filter((item, index) => {
                return index < page_size;
            });
        },
    },
    data() {
        return {
            tableData: [],
            allTableData: [],
            hobbyData: [],
            paginations: {
                page_index: 1,
                total: 0,
                page_size: 5,
                page_sizes: [5, 10, 15, 20],
                layout: "total, sizes, prev, pager, next, jumper", //翻页属性
            },
            //工作星期
            docday: [],
            docdayData: [
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
            //工作时间
            doctime: [],
            doctimeData: [
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
}
</script>
<style>
.tr-color-0 {
    background: oldlace;
}

/* 定义余数为 1 的行颜色 */
.tr-color-1 {
    background: #f0f9eb;
}
#hobbybody {
    background: #fff;
    margin: 0px auto;
    border-radius: 14px;
}
.text-center{
    white-space: nowrap;
    padding: 2px 5px;
    color: #303133;
    font-weight: 700;
    margin-bottom: -1px;
    padding-bottom: 15px;
}
</style>