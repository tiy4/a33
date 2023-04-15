<template>
    <div>
        <v-simple-table :fixed-header="true" class="elevation-1">
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left" style="font-size: 16px;color: black;">门店规则</th>
                        <th class=" text-left" style="font-size: 16px;color: black;">时间备注</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- tr是行，td是行内的格 -->
                    <tr v-for=" (item, index) in desserts" :key="item" :class="'tr-color-' + index % 2">
                        <td>
                            <!-- 前两个规则默认选中 -->
                            <el-checkbox v-model="item.checked">{{ item.name }}
                            </el-checkbox>
                        </td>
                        <td>
                            <v-container>
                                <v-row>
                                    <!-- 循环desserts数组里的times，有值则显示，循环第一轮item.times是1，下面绑定的也是1，循环第二轮是3 -->
                                    <v-col cols="24" sm="6" v-for="item2 in item.times" :key="item2">
                                        <!-- 绑定item.times，两个值不一样，所以两个对应label不会同时被选中，顺便绑定默认的打扫时间 -->
                                        <el-radio v-model="item.times" label="0">0.5h</el-radio>
                                        <el-radio v-model="item.times" label="1">1h</el-radio>
                                        <el-radio v-model="item.times" label="2">1.5h</el-radio>
                                        <el-radio v-model="item.times" label="3">2h</el-radio>
                                    </v-col>
                                </v-row>
                            </v-container>

                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
        <el-button type="primary" @click="submit()" style="width: 100%;margin-top: 10px;">提交</el-button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            desserts: [
                {
                    name: '每天开店搞卫生的提前时间：',
                    times: "1",
                    checked: true,
                },
                {
                    name: '每天关店搞卫生的时间：',
                    times: "3",
                    checked: true,
                },
                {
                    name: '客流量为0时安排一个员工',
                    times: null,
                    checked: false,
                },
                {
                    name: '员工生日当天不工作',
                    times: null,
                    checked: false,
                },
                {
                    name: '关店经理/副经理必须在',
                    times: null,
                    checked: false,
                },

            ],
        };
    },
    methods: {
        //提交
        submit() {
            //提交后能获取到选中的对象
            console.log(this.desserts);
            this.$message({
                message: '提交成功！',
                type: 'success'
            });

        },
    },
}
</script>
<style>
.tr-color-0 {
    background: oldlace;
    /* background: #b696eb; */
}

/* 定义余数为 1 的行颜色 */
.tr-color-1 {
    background: #f0f9eb;
}

.container {
    padding: 6px;
}

.v-text-field.v-text-field--enclosed .v-text-field__details {
    padding-top: 0px;
    /* margin-bottom: 8px; */
    visibility: hidden;
    display: none
}

.theme--light.v-messages {
    visibility: hidden;
    display: none
}
</style>
