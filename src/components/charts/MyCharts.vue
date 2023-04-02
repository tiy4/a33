<template>
    <div id="main">
        <!-- echart 客流量图像 -->
        <div id="box"></div>
        <!-- 日期选择器 -->
        <div id="calendar">
            <template>
                <v-date-picker
                v-model="picker"
                color="#3F51B5"
                :min="min"
                :max="max"
                elevation="15"
                @change="calendar_update()"
                ></v-date-picker>
            </template>
        </div>
        <!-- 店面选择器 -->
        <div id="screeningBox">
            <template>
                <v-container fluid>
                    <v-row>
                        <v-col class="d-flex" cols="70">
                            <v-select
                            :items="items"
                            v-model="model"
                            label="选择你要查看的门店"
                            solo
                            ></v-select>
                        </v-col>
                    </v-row>
                </v-container>
            </template>
        </div>
    </div>
</template>
<script src="@/components/charts/js/index.js"></script>
<style src="@/components/charts/css/index.css"></style>