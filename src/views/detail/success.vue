<template>
  <div class="bg-fa" v-if="detail">
    <div class="w success">
      <div class="bw-center">
        <div class="flex ai-c">
          <img src="../../assets/success.png" alt="" class="img mrr-20" />
          <div class="f24">
            已成功加入购物车
            <div class="co-333 f14">
              {{ detail.name
              }}{{
                detail.specList
                  .map((i) => {
                    return i.checked;
                  })
                  .join(' ')
              }}
            </div>
          </div>
        </div>
        <div class="flex ai-c">
          <div
            class="btn border center pd-10 co-b0b0 mrr-20 cursor"
            @click="back"
          >
            返回上一级
          </div>
          <div
            class="btn border center pd-10 bg-r co-fff cursor"
            @click="goCart"
          >
            去购物车结算
          </div>
        </div>
      </div>
      <Divider />
      <recom></recom>
    </div>
  </div>
</template>

<script>
import recom from '../../components/recom/recom.vue';
export default {
  name: '',
  props: {},
  data() {
    return {
      detail: null,
      recom: [],
    };
  },
  components: { recom },
  methods: {
    back() {
      this.$router.back();
    },
    goCart() {
      if (this.user) {
        this.$router.push('cart');
      } else {
        this.$router.push('/login');
      }
    },
  },
  mounted() {
    this.detail = JSON.parse(this.$route.query.goods);
    // console.log(this.detail);
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
.success {
  padding: 30px 0;
  .img {
    width: 64px;
    height: 64px;
  }
  .btn {
    width: 180px;
  }
}
</style>