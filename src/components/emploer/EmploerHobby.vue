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
<script src="@/components/emploer/js/index.js"></script>
<style src="@/components/emploer/css/index.css"></style>