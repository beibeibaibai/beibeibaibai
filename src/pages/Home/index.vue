<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
      <!-- 用户卡片 -->
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImg" />
          <div class="userinfo">
            <p class="name">Admin</p>
            <p class="access">超级VIP</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录事件: <span>2022-5-6</span></p>
          <p>上次登录地点: <span>非洲大草原</span></p>
        </div>
      </el-card>
      <div style="margin-top: 20px">
        <el-cord>
          <el-table :data="tableDate">
            <el-table-column
              v-for="(val, key) in tableLabel"
              :key="key"
              :prop="key"
              :label="val"
            >
            </el-table-column>
          </el-table>
        </el-cord>
      </div>
    </el-col>
    <el-col style="margin-top: 20px" :span="16">
      <div class="num">
        <el-card
          v-for="item in CountDate"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <p class="num">￥{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <!-- 折线图  -->
      <el-card style="height: 280px">
        <Echart :chartData="echartData.order" style="height: 280px" />
      </el-card>
      <div class="graph">
        <el-card style="height: 260px">
          <Echart :chartData="echartData.user" style="height: 240px" />
        </el-card>
        <el-card style="height: 260px">
          <Echart
            :chartData="echartData.video"
            :isAxisChart="false"
            style="height: 240px"
          />
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getData } from "../../api/data";

// 引入封装好的echart组件
import Echart from "../../components/Echarts.vue";
export default {
  components: {
    Echart,
  },
  data() {
    return {
      userImg: require("../../assets/images/user.png"),
      tableDate: [],
      tableLabel: {
        name: "手机",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      CountDate: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
      echartData: {
        order: {
          xData: [],
          series: [],
        },
        user: {
          xData: [],
          series: [],
        },
        video: {
          series: [],
        },
      },
    };
  },
  mounted() {
    getData().then((res) => {
      const { code, data } = res.data;
      if (code === 20000) {
        // 获取表格值
        this.tableDate = data.tableData;

        // 获取折线图value
        const order = data.orderData;
        // X轴
        const xData = order.date;
        // oredr 的第一部分
        const keyArray = Object.keys(order.data[0]);
        // 空数组
        const series = [];
        keyArray.forEach((key) => {
          series.push({
            name: key,
            data: order.data.map((item) => item[key]),
            type: "line",
          });
        });
        // 配置echarts折线图
        // const option = {
        //   xAxis:{
        //     data:xData
        //   },
        //   yAxis:{},
        //   legend:{
        //     data:keyArray
        //   },
        //    // 提示框
        //   tooltip: {
        //     trigger: "axis",
        //   },
        //   series
        // }
        this.echartData.order.xData = xData;
        this.echartData.order.series = series;

        // // 实例化echarts
        // const E =  echarts.init(this.$refs.echarts)
        // // 绘图
        // E.setOption(option)

        // 用户树状图
        // const userOption = {
        //   legend: {
        //     // 图例文字颜色
        //     textStyle: {
        //       color: "#333",
        //     },
        //   },
        //   grid: {
        //     left: "20%",
        //   },
        //   // 提示框
        //   tooltip: {
        //     trigger: "axis",
        //   },
        //   xAxis: {
        //     type: "category", // 类目轴
        //     data: data.userData.map(item =>item.date),
        //     axisLine: {
        //       lineStyle: {
        //         color: "#17b3a3",
        //       },
        //     },
        //     axisLabel: {
        //       interval: 0,
        //       color: "#333",
        //     },
        //   },
        //   yAxis: [
        //     {
        //       type: "value",
        //       axisLine: {
        //         lineStyle: {
        //           color: "#17b3a3",
        //         },
        //       },
        //     },
        //   ],
        //   color: ["#2ec7c9", "#b6a2de"],
        //   series: [
        //     {
        //       name:'新增用户',
        //       data:data.userData.map(item =>item.new),
        //       type:'bar'
        //     },
        //     {
        //       name:'活跃用户',
        //       data:data.userData.map(item =>item.active),
        //       type:'bar'
        //     }
        //   ],
        // }

        this.echartData.user.xData = data.userData.map((item) => item.date);
        this.echartData.user.series = [
          {
            name: "新增用户",
            data: data.userData.map((item) => item.new),
            type: "bar",
          },
          {
            name: "活跃用户",
            data: data.userData.map((item) => item.active),
            type: "bar",
          },
        ];

        // const U = echarts.init(this.$refs.userEcharts)
        // U.setOption(userOption)

        // 扇形图
        // const videoOption = {
        //       tooltip: {
        //         trigger: "item",
        //       },
        //       color: [
        //         "#0f78f4",
        //         "#dd536b",
        //         "#9462e5",
        //         "#a6a6a6",
        //         "#e1bb22",
        //         "#39c362",
        //         "#3ed1cf",
        //       ],
        //       series: [
        //         {
        //           data:data.videoData,
        //           type:'pie'
        //         }
        //       ],
        // }
        // const V = echarts.init(this.$refs.videoEcharts)
        // V.setOption(videoOption)
        this.echartData.video.series = [
          {
            data: data.videoData,
            type: "pie",
          },
        ];
      }
    });
  },
};
</script>

<style>
</style>