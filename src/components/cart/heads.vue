<template>
  <div>
    <div class="head bg-fff">
      <div class="w bw-center h-100">
        <div class="center">
          <img
            src="../../assets/logo1.png"
            alt=""
            class="img-48"
            style="margin-right: 50px"
          />
          <div v-if="this.$route.path === '/cart'">
            <span class="f28 mrr-20">我的购物车</span>
            <span class="f12 co-333"
              >温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span
            >
          </div>
          <span class="f28 mrr-20" v-if="this.$route.path === '/settle'"
            >确认订单</span
          >
        </div>
        <!-- 右边 -->
        <div class="co-666 flex ai-c f12">
          <drop>
            <template #drop>
              <div>
                {{ user ? JSON.parse(user).username : '去登录'
                }}<i class="iconfont icon-arrow"></i>
              </div>
            </template>
          </drop>
          <div class="mrrl-20">|</div>
          <div @click="goOrder">我的订单</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Drop from '../../components/drop/drop.vue';
export default {
  name: '',
  props: {},
  data() {
    return {};
  },
  components: { Drop },
  methods: {
    // 订单
    goOrder() {
      this.$router.push('order');
    },
  },
  mounted() {},
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  watch: {},
};
</script>

<style lang='scss' scoped>
.head {
  height: 100px;
  border-bottom: 2px solid #ff6700;
}
</style>