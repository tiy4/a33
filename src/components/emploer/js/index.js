import { get } from '@/api/config'
export default {
    created() {
        this.getdata();
    },
    methods: {
        async getdata() {
            let res = await get("/staff_hobby/findAll");
            // console.log(res);
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