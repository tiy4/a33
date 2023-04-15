<template>
  <div>
    <!-- 表格 -->
    <el-table v-if="stafftableData.length > 0" height="500px" :data="stafftableData"
      style="width: 100%;text-align: center;" :row-class-name="tableRowClassName">
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
    <!-- 底部分页 -->
    <template>
      <div class="text-center">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page.sync="paginations.page_index" :page-sizes="paginations.page_sizes"
          :page-size="paginations.page_size" :layout="paginations.layout" :total="paginations.total">
        </el-pagination>
      </div>
    </template>
    <!-- 编辑弹窗 -->
    <el-dialog style="width: 1000px;height: 1000px;" title="员工信息" :visible.sync="zdydialog">
      <el-form :model="tableData">
        <el-form-item label="序号" width="80px">
          <el-input class="dialog_input" v-model="tableData.id"></el-input>
        </el-form-item>
        <el-form-item label="姓名" width="80px">
          <el-input class="dialog_input" v-model="tableData.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" width="80px">
          <el-input class="dialog_input" v-model="tableData.email"></el-input>
        </el-form-item>
        <el-form-item label="所属门店" width="80px">
          <el-input class="dialog_input" v-model="tableData.shopID"></el-input>
        </el-form-item>
        <el-form-item label="职位" width="80px">
          <el-select class="dialog_input" v-model="tableData.position" placeholder="选择职位">
            <el-option label="门店经理" value="门店经理"></el-option>
            <el-option label="副经理" value="副经理"></el-option>
            <el-option label="小组长" value="小组长"></el-option>
            <el-option label="收银" value="收银"></el-option>
            <el-option label="导购" value="导购"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 弹窗结束 -->
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
    //获取员工数据
    async getdata() {
      let res = await get('/staff/findAll');
      this.staffallTableData = res;
      // console.log(this.allTableData);
      this.setPaginations();
    },
    setPaginations() {
      //初始化
      this.paginations.total = this.staffallTableData.length;
      this.paginations.page_index = 1;
      this.paginations.page_size = 5;
      //设置默认的分页数据
      this.stafftableData = this.staffallTableData.filter((item, index) => {
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
        if (this.staffallTableData[i]) {
          tables.push(this.staffallTableData[i]);
        }
        this.stafftableData = tables;
      }
    },
    //显示条数发生改变时的回调
    handleSizeChange(page_size) {
      this.paginations.page_index = 1;
      this.paginations.page_size = page_size;
      this.stafftableData = this.staffallTableData.filter((item, index) => {
        return index < page_size;
      });
    },
    //利用下表修改表格颜色
    tableRowClassName({ rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'warning-row';
      } else if (rowIndex % 2 === 1) {
        return 'success-row';
      }
      return '';
    },
    //编辑函数
    handleEdit(index, row) {
      this.tableData = row     //将该行对象数据直接赋给form
      this.zdydialog = true //自定义对话框展示
      console.log(index, row);
    },
    //删除函数
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.stafftableData.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
      console.log(index, row);
    },
    //弹窗提交函数
    submit() {
      this.zdydialog = false
      this.stafftableData.replace(this.tableData) //向tableData中添加数据
      //自定义对话框隐藏
    },
    //弹窗取消函数
    cancel() {
      this.zdydialog = false
    },
  },
  data() {
    return {
      //判断弹窗是否显示
      zdydialog: false,
      // 弹窗里的内容
      tableData: {},
      //staffallTableData过滤后的数据
      stafftableData: [],
      //后端获取员工信息的数据
      staffallTableData: [],
      //分页的数据
      paginations: {
        page_index: 1, //当前位于哪页
        total: 0, //数据总数
        page_size: 5, //一页显示多少条
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
</style>