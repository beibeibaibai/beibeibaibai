<template>
  <div class="manage">
    <!--遮罩 -->
    <!-- 弹窗 -->
    <el-dialog
      :title="operateType === 'add' ? '新增用户' : '更新用户'"
      :visible.sync="isShow"
    >
      <!-- 组件form -->
      <common-form
        :formLabel="operateFormLabel"
        :form="operayeFrom"
        :inline="true"
        ref="form"
      >
      </common-form>
      <!-- 插槽自定义底部 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = !isShow">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>

    <div class="manage-header">
      <el-button type="primary" @click="addUser">+新增</el-button>
      <!-- 复用 -->
      <common-form
        :formLabel="formLabel"
        :form="searchFrom"
        :inline="true"
        ref="form"
      >
        <el-button type="primary" @click="getList(searchFrom.keyword)">搜索</el-button>
      </common-form>
    </div>
    <common-table
        :tableData="tableData"
        :tableLabel="tableLabel"
        :config="config"
        @changePage="getList()"
        @edit="editUser"
        @del="delUser"
    >

    </common-table>
  </div>
</template>

<script>
import CommonForm from "../../components/Commonform";
import CommonTable from '../../components/CommonTable'
import{getUser}  from '../../api/data'
export default {
  components: {
    CommonForm,
    CommonTable
  },
  created() {
    this.getList()
  },
  methods: {
      confirm(){
        if(this.operateType === 'edit'){
          this.$http.post('/user/edit',this.operayeFrom).then((result) => {
            this.isShow = false
            this.getList()
          })
        }else{
           this.$http.post('/user/add',this.operayeFrom).then((result) => {
            this.isShow = false
            this.getList()
          })
        }
      },
      addUser(){
          this.isShow = true
          this.operateType = 'add' 
          this.operayeFrom = {
                  name:'',
                  addr:'',
                  age:'',
                  birth:'',
                  sex:''
          }
      },
      editUser(row){
        this.operateType = 'edit'
        this.isShow = true
        this.operayeFrom = row

      },
      delUser(row){
        this.$confirm("自操作永久删除改文件 是否继续？","提示",{
            confirmButtonText:'确认',
            cancelButtonText:'取消',
            type:'warning'
        }).then(()=>{
           const id = row.id
           this.$http.delete("/user/del",{
             params:{id}
           }).then(() =>{
             this.$message({
               type:'success',
               message:'删除成功'
             })
             this.getList()
           })
        })
      },
      getList(name = ''){
          this.config.loading = true
          name ?(this.config.page = 1) :''
        getUser({
          page:this.config.page,
          name
        }).then(({data:res}) => {
          this.tableData = res.list.map(item =>{
            item.sexLabel = item.sex === 0 ? '女' : '男'
            return item
          })
          this.config.total = res.count
          this.config.loading = false
        })
      },
  },
  data() {
    return {
      operateType: "add",
      isShow: false,
      operateFormLabel: [
        {
          model: "name",
          label: "姓名",
          type: "input",
        },
        {
          model: "age",
          label: "年龄",
          type: "input",
        },
        {
          model: "sex",
          label: "性别",
          type: "select",
          opts: [
            {
              label: "男",
              value: 1,
            },
            {
              label: "女",
              value: 0,
            },
          ],
        },
        {
          model: "birth",
          label: "出生日期",
          type: "date",
        },
        {
          model: "addr",
          label: "地址",
          type: "input",
        },
      ],
      operayeFrom:{
          name:'',
          addr:'',
          age:'',
          birth:'',
          sex:''
      },
      formLabel:[
          {
              model:'keyword',
              label:'',
              type:'input'
          }
      ],
      searchFrom:{
          keyword:''
      },
      tableData:[],
      tableLabel:[
         {
           prop:"name",
           label:"姓名"
         },
         {
           prop:"age",
           label:"年龄"
         },
         {
           prop:"sexLabel",
           label:"性别"
         },
         {
           prop:"birth",
           label:"出生日期",
           width:200
         },
         {
           prop:"addr",
           label:"地址",
           width:320
         },
      ],
      config:{
        page:1,
        total:30
      }
    };
  },
};
</script>

<style lang="less" scoped>
.manage-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>