
<template>
    <v-simple-table fixed-header height="300px" :row-class-name="tableRowClassName">
        <template v-slot:default>
            <thead>
                <tr>
                    <th class="text-left">姓名</th>
                    <th class="text-left">生日</th>
                    <th class="text-left">偏好星期</th>
                    <th class="text-left">偏好时间</th>

                </tr>
            </thead>
            <tbody>
                <tr v-for="item in desserts" :key="item.name">
                    <td>{{ item.name }}</td>
                    <td>{{ item.calories }}</td>
                    <td>
                        <el-checkbox-group :min="1" :max="7">
                            <el-checkbox v-for="item2 in item.week" :key="item2">{{ item2 }}</el-checkbox>
                        </el-checkbox-group>
                    </td>
                    <td>
                        <el-checkbox-group :min="1" :max="4">
                            <el-checkbox v-for="item2 in item.day" :key="item2">{{ item2 }}</el-checkbox>
                        </el-checkbox-group>
                    </td>
                </tr>
            </tbody>
        </template>
    </v-simple-table>
<!-- <v-row>
        <v-col cols="12" md="6">
            <v-text-field v-model="height" class="mx-4" label="Height - px" max="500" min="1" step="1" style="width: 125px"
                type="number" @keydown="false"></v-text-field>
        </v-col>
        <v-col cols="6" md="3">
            <v-switch v-model="dense" label="Toggle dense" class="mx-4"></v-switch>
        </v-col>
        <v-col cols="6" md="3">
            <v-switch v-model="fixedHeader" label="Toggle fixed-header" class="mx-4"></v-switch>
        </v-col>
                                                            </v-row> -->
</template>
  
<script>
const weeks = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
const days = ['8:00-12:00', '12:00-16:00', '16:00-20:00', '20:00-23:00']
export default {
    methods: {
        tableRowClassName({ rowIndex }) {
            if (rowIndex === 1) {
                return 'warning-row';
            } else if (rowIndex === 3) {
                return 'success-row';
            }
            return '';
        }
    },
    data() {

        return {
            desserts: [
                {
                    name: 'Frozen Yogurt',
                    calories: 159,
                    week: weeks,
                    day: days
                },
                {
                    name: 'Ice cream sandwich',
                    calories: 237,
                    week: weeks,
                    day: days
                },
                {
                    name: 'Eclair',
                    calories: 262,
                    week: weeks,
                    day: days
                },
                {
                    name: 'Cupcake',
                    calories: 305,
                    week: weeks,
                    day: days
                },
                {
                    name: 'Gingerbread',
                    calories: 356,
                    week: weeks,
                    day: days
                },
                {
                    name: 'Jelly bean',
                    calories: 375,
                    week: weeks,
                    day: days
                },
                {
                    name: 'Lollipop',
                    calories: 392,
                    week: weeks,
                    day: days
                },
                {
                    name: 'Honeycomb',
                    calories: 408,
                    week: weeks,
                    day: days
                },
                {
                    name: 'Donut',
                    calories: 452,
                    week: weeks,
                    day: days
                },
                {
                    name: 'KitKat',
                    calories: 518,
                    week: weeks,
                    day: days
                },
            ],
        }
    },

}
</script>
<style>
.v-simple-table .warning-row {
    background: oldlace;
}

.v-simple-table .success-row {
    background: #f0f9eb;
}
</style>