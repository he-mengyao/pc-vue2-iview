<template>
  <div>
    <div class="header">
      <div class="w flex ai-c flex-b co-b0b0 h-100 f12">
        <div class="flex ai-c">
          <div v-for="(item, index) in leftList" :key="index" class="center">
            <div class="mr-10">{{ item }}</div>
            <div style="color: #424242" v-if="index !== leftList.length - 1">
              |
            </div>
          </div>
        </div>
        <div class="flex ai-c">
          <div class="center notice" v-if="!user" @click="login">
            <div class="mr-10">登录</div>
          </div>
          <div class="center user" v-if="user">
            <drop>
              <template #drop>
                <div
                  class="mr-10 name center active"
                  style="width: 100px; height: 40px"
                >
                  {{ user.username }}
                  <i class="iconfont icon-arrow"></i>
                </div>
              </template>
            </drop>
          </div>
          <div style="color: #424242">|</div>
          <div class="center" v-if="!user">
            <div class="mr-5 notice" @click="register">注册</div>
            <div style="color: #424242">|</div>
          </div>
          <div class="pd-10 notice">消息通知</div>
          <div style="color: #424242">|</div>
          <div class="center notice">
            <div class="mr-5">我的订单</div>
          </div>
          <div class="car center f14">
            <i class="iconfont icon-ziyuan mrr-5 f14"></i>
            购物车<span class="f12">（{{ num }}）</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Drop from '../drop/drop.vue';
export default {
  name: '',
  props: {},
  data() {
    return {
      leftList: [
        '小米商城',
        'MIUI',
        'loT',
        '云服务',
        '天星数科',
        '有品',
        '小爱开放平台',
        '企业团购',
        '资质证照',
        '协议规则下载app',
        '智能生活',
        'SelectLocation',
      ],
      num: this.$store.state.carNum,
    };
  },
  components: { Drop },
  methods: {
    login() {
      this.$router.push('/login');
    },
    register() {
      this.$router.push('/register');
    },
  },
  mounted() {},
  computed: {
    user() {
      let a = this.$store.state.user;
      if (a) {
        return JSON.parse(a);
      }
    },
  },
  watch: {},
};
</script>

<style lang='scss' scoped>
.header {
  height: 40px;
  background-color: #333;
}
.car {
  background-color: #424242;
  width: 120px;
  height: 40px;
  &:hover {
    background-color: #fff;
    color: #ed702e;
  }
}
.notice:hover {
  color: #ffffff;
}
.active:hover {
  background-color: #fff;
  color: #333;
}
.user-p {
  position: absolute;
  top: 40px;
  left: 0;
  right: 0;
  height: 180px;
  background-color: #fff;
}
</style>