<template>
  <div class="appuser">
    <div style="margin: 20px;"></div>
    <el-form :label-position="labelPosition" label-width="150px" :model="formLabelAlign">
      <el-form-item label="请输入你的姓名" prop="name">
        <el-input class="inputwith" v-model="formLabelAlign.name"></el-input>
      </el-form-item>
      <el-form-item label="请输入你的电话" prop="iphone">
        <el-input class="inputwith" v-model="formLabelAlign.iphone"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('formLabelAlign')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  beforeMount() {
  },
  name: "user",
  data() {
    return {
      price: this.$route.params.price,
      place: this.$route.params.place,
      selectFoods: this.$route.params.selectFoods,
      visible: false,
      labelPosition: 'right',
      formLabelAlign: {
        name: '',
        iphone: '',
      }
    }
  },
  methods: {
    submitForm() {
      console.log(this.selectFoods)
      const that = this;
      that.$axios.get('http://192.168.8.243:8080/smdc/buyer/orderpay/pay', {
        params: {
          place: this.place,
          price: this.price,
          selectFoods: this.selectFoods,
          name: this.formLabelAlign.name,
          iphone: this.formLabelAlign.iphone
        }
      }).then(function (response) {
        if (response.data.code == "200") {
          let routerData = that.$router.resolve({path: '/payGateWay', query: {htmlData: response.data.data.payUrl}})
          // 打开新页面
          window.open(routerData.href, '_blank')
        }
      })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
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
  .inputwith{
    width: 80%;
  }
</style>
