<template>
    <div>
        <v-simple-table :fixed-header="true" class="elevation-1">
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-center" style="font-size: 16px;color: black;">门店规则</th>
                        <th class=" text-center" style="font-size: 16px;color: black;">时间备注</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- tr是行，td是行内的格 -->
                    <tr v-for=" (item, index) in desserts" :key="item" :class="'tr-color-' + index % 2">
                        <td><el-checkbox>{{ item.name }}
                            </el-checkbox></td>
                        <td>
                            <v-container>
                                <v-row>
                                    <v-col cols="24" sm="6" v-for="item2 in item.times" :key="item2">
                                        <v-select v-model="select" :items="items" chips label="请选择" multiple
                                            solo></v-select>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
    </div>
</template>
<script>
export default {
    methods: {
        // tableRowClassName({ rowIndex }) {
        //     if (rowIndex % 2 === 0) {
        //         return 'warning-row';
        //     } else if (rowIndex % 2 === 1) {
        //         return 'success-row';
        //     }
        //     return '';
        // },
    },
    data() {
        return {
            // height: 500,
            select: ['0.5h'],
            items: [
                '0.5h',
                '1h',
                '1.5h',
                '2h',
            ],
            desserts: [
                {
                    name: '每天开店搞卫生的提前时间：',
                    times: 1,
                },
                {
                    name: '每天关店搞卫生的时间：',
                    times: 1,
                },
                {
                    name: '客流量为0时安排一个员工',
                    times: null,
                },
                {
                    name: '员工生日当天不工作',
                    times: null,
                },
                {
                    name: '关店经理/副经理必须在',
                    times: null,
                },

            ],
            // options: [{
            //     value: '选项1',
            //     label: '0.5h'
            // }, {
            //     value: '选项2',
            //     label: '1h'
            // }, {
            //     value: '选项3',
            //     label: '1.5h'
            // }, {
            //     value: '选项4',
            //     label: '2h'
            // }],
            value: ''
        };

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
