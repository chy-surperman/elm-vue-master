<template>
  <div class="appuser">
    <div style="margin: 20px;"></div>
    <el-form :label-position="labelPosition" label-width="120px" :model="formLabelAlign">
      <el-form-item label="请输入你的姓名" prop="name">
        <el-input v-model="formLabelAlign.name"></el-input>
      </el-form-item>
      <el-form-item label="请输入你的电话" prop="iphone">
        <el-input v-model="formLabelAlign.iphone"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('formLabelAlign')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  beforeMount(){
    alert(this.price1)
  },
  name: "user",
  data() {
    return {
      price1: this.$route.params.price,
      place1: this.$route.params.place,
      time: this.$route.params.time,
      visible: false,
      labelPosition: 'right',
      formLabelAlign: {
        name: '',
        iphone: '',
      }
    }
  },
  methods:{
      submitForm(){
        alert(this.formLabelAlign.iphone)
        alert(this.formLabelAlign.name)
        alert(this.price1)
        alert(this.place1)
        alert(this.time)
      },
  },
}
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 10px;
    background-color: #f9fafc;
  }
</style>
