<template>
  <div class="bg-fa">
    <div class="nav">
      <div class="w bw-center h-100" v-if="detail">
        <div class="f18">{{ detail.name }}</div>
        <div class="center">
          <div
            v-for="(item, index) in rightList"
            :key="index"
            class="mrr-10 red"
          >
            {{ item }}
          </div>
        </div>
      </div>
    </div>
    <div class="w">
      <div class="mrtb-20 center" v-if="!user && visible">
        {{ '为方便您购买，请提前登录' }}
        <span class="mrrl-20 co-r" @click="login">立即登录 </span>
        <i class="iconfont icon-del" @click="close"></i>
      </div>
    </div>
    <goods :detail="detail" v-if="detail"></goods>
    <!-- 价格说明 -->
    <div class="bg-fa pd-20">
      <div class="w">
        <div class="f22">价格说明</div>
        <img src="../../assets/price.jpeg" alt="" class="mrtb-20" />
      </div>
    </div>
  </div>
</template>

<script>
import goods from '../../components/detail/goods.vue';
export default {
  name: '',
  props: {},
  data() {
    return {
      id: '',
      detail: null,
      rightList: [
        '概述页',
        '|',
        '参数页',
        '|',
        'F码通道',
        '|',
        '咨询客服',
        '|',
        '用户评价',
      ],
      visible: true,
    };
  },
  components: { goods },
  methods: {
    goodsDetails(id) {
      this.$api
        .goodsDetail(id)
        .then((res) => {
          if (res.code === 200) {
            this.detail = res.data;
            let arr = [];
            this.detail.spec.map((i) => {
              if (i !== null) arr.push(i);
            });
            this.detail.spec = arr;
          }
        })
        .catch(() => {
          console.log('商品详情请求失败');
        });
    },
    login() {
      this.$router.push('login');
    },
    close() {
      this.visible = false;
    },
  },
  mounted() {
    this.id = localStorage.getItem('id');
    this.goodsDetails(this.id);
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  watch: {},
};
</script>

<style lang='scss' scoped>
.nav {
  height: 65px;
  background-color: #ffffff;
}
</style>