import { get } from '@/api/config'
export default {
    los() {
        console.log('js')
    },
    created() {
        this.getdata()
    },
    methods: {
        async getdata() {
            let res = await get('/staff/findAll');
            this.allTableData = res;
            this.setPaginations();
        },
        setPaginations() {
            //初始化
            this.paginations.total = this.allTableData.length;
            this.paginations.page_index = 1;
            this.paginations.page_size = 5;
            //设置默认的分页数据
            this.tableData = this.allTableData.filter((item, index) => {
                return index < this.paginations.page_size;
            });
            console.log(this.tableData);
        },
        //当前页发生改变时的回调
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
        //显示条数发生改变时的回调
        handleSizeChange(page_size) {
            this.paginations.page_index = 1;
            this.paginations.page_size = page_size;
            this.tableData = this.allTableData.filter((item, index) => {
                return index < page_size;
            });
        },
    }
}