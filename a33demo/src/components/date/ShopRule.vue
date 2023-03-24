<template>
    <div>
        <v-simple-table :dense="dense" :fixed-header="fixedHeader" :height="height" show-select :items-per-page="5"
            class="elevation-1">
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">门店规则</th>
                        <th class="text-left">时间备注</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in desserts" :key="item.name">
                        <td> <el-checkbox>{{ item.name }}
                            </el-checkbox></td>
                        <td>
                            <el-checkbox-group v-model="checkedtimes" :min="0" :max="1">
                                <el-checkbox v-for="item2 in times" :label="item2" :key="item2">{{ item2 }}h</el-checkbox>
                            </el-checkbox-group>
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
        <v-row>
            <v-col cols="12" md="6">
                <v-text-field v-model="height" class="mx-4" label="Height - px" max="500" min="1" step="1"
                    style="width: 125px" type="number" @keydown="false"></v-text-field>
            </v-col>
            <v-col cols="6" md="3">
                <v-switch v-model="dense" label="Toggle dense" class="mx-4"></v-switch>
            </v-col>
            <v-col cols="6" md="3">
                <v-switch v-model="fixedHeader" label="Toggle fixed-header" class="mx-4"></v-switch>
            </v-col>
        </v-row>
    </div>
</template>
<script>
const time = [0.5, 1, 1.5, 2];
export default {
    data() {
        return {
            checkedtimes: [0.5],
            times: time,
            dense: false,
            fixedHeader: false,
            height: 300,
            desserts: [
                {
                    name: '每天开店搞卫生的提前时间：',
                    // times: time,
                },
                {
                    name: '每天关店搞卫生的时间：',
                    // times: time,
                },
                {
                    name: '客流量为0时安排一个员工',
                    // times: null,
                },
                {
                    name: '员工生日当天不工作',
                    // times: null,
                },
                {
                    name: '关店经理/副经理必须在',
                    // times: null,
                },
                {
                    name: 'Jelly bean',
                    // times: null,
                },
                {
                    name: 'Lollipop',
                    // times: null,
                },
                {
                    name: 'Honeycomb',
                    // times: null,
                },
                {
                    name: 'Donut',
                    // times: null,
                },
                {
                    name: 'KitKat',
                    // times: null,
                },
            ],
        };

    },
}
</script>
