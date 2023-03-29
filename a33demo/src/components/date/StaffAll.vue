<template>
  <div id="staffall">
    <el-table v-if="tableData.length > 0" height="500px" :data="tableData" style="width: 100%;text-align: center;"
      :row-class-name="tableRowClassName">
      <el-table-column prop="id" label="序号" width="100"><template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column prop="name" label="名字 " width="250"><template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="150"><template slot-scope="scope">{{ scope.row.email }}</template>
      </el-table-column>
      <el-table-column prop="position" label="职务" width="170"><template slot-scope="scope">{{ scope.row.position
      }}</template>
      </el-table-column>
      <el-table-column label="所属门店" prop="shopID"><template slot-scope="scope">{{
        scope.row.shopID }}</template></el-table-column>
      <el-table-column label="操作" prop="op">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" plain icon="el-icon-edit"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" plain
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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
// import api from '@/api/staff.js';
import { get } from '@/api/config'
export default {
  created() {
    this.getdata()
  },
  methods: {
    async getdata() {
      let res = await get('/staff/findAll');
      this.allTableData = res;
      // console.log(this.allTableData);
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
      // console.log(this.tableData);
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
    tableRowClassName({ rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'warning-row';
      } else if (rowIndex % 2 === 1) {
        return 'success-row';
      }
      return '';
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  },
  data() {
    return {
      tableData: [],
      allTableData: [],
      paginations: {
        page_index: 1, //当前位于哪页
        total: 0, //数据总数
        page_size: 10, //一页显示多少条
        page_sizes: [5, 10, 15, 20], //每页显示多少条
        layout: "total, sizes, prev, pager, next, jumper", //翻页属性
      },
    }
  }
}
</script>
<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
#staffall{
  background: #fff;
  border-radius: 10px;
}
</style>