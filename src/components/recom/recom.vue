<template>
  <div class="w">
    <Divider class="mrtb-20"
      ><div class="f28 co-666 mrtb-20">买购物车中商品的人还买了</div></Divider
    >
    <div class="floor-bd flex flex-b wrap">
      <div
        v-for="(item1, index1) in recom.slice(0, 10)"
        :key="index1"
        class="w-234 pdtb-20 bg-fff col-center mrb-20 cursor tr"
        @click="click(item1)"
      >
        <img :src="item1.cover" alt="" class="img1" />
        <p class="cb f14 mrt-20">{{ item1.name }}</p>
        <div class="co-a0a0 f12 ellipsis-one ta-c" style="width: 200px">
          {{ item1.introduction }}
        </div>
        <div class="f14 flex mrb-20">
          <div class="co-r">{{ item1.presentPrice }}元起</div>
          &nbsp;
          <div class="del co-a0a0">{{ item1.originalPrice }}元</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {},
  data() {
    return {
      recom: [],
    };
  },
  components: {},
  methods: {
    getRecommends() {
      this.$api
        .getRecommend()
        .then((res) => {
          if (res.code === 200) {
            this.recom = res.data;
            // console.log(this.recom);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    click(item) {
      this.$router.push({
        path: '/detail',
        query: {
          id: item._id,
        },
      });
    },
  },
  mounted() {
    this.getRecommends();
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.tr {
  animation: all 0.5s linear;
  &:hover {
    box-shadow: 0 15px 30px rgb(0 0 0 / 10%);
    transform: translate3d(0, -2px, 0);
  }
}
.img1 {
  width: 160px;
  height: 160px;
}
</style>