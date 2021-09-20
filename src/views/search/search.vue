<template>
  <div class="bg-fa">
    <div class="w">
      <div class="pdtb-10 co-666 f12">首页 > 全部结果 > {{ query }}</div>
      <div class="flex pdl-20 ai-c mrtb-20">
        <div class="res flex ai-c" v-for="(item, index) in nav" :key="index">
          {{ item }}
          <div class="mrrl-20 co-eee">|</div>
        </div>
      </div>
      <!-- 商品 -->
      <div class="flex wrap co-666">
        <div
          v-for="(item, index) in list"
          :key="index"
          class="col-center bg-fff mrr-10 mrb-10"
          style="padding: 48px"
          @click="click(item)"
        >
          <img :src="item.cover" alt="" class="img" />
          <div class="red">{{ item.name }}</div>
          <div class="co-r mrtb-10">{{ item.presentPrice }}元</div>
          <div class="flex ai-c">
            <div
              v-for="(item1, index1) in item.pic"
              :key="index1"
              class="mrr-5"
            >
              <img :src="item1" alt="" class="img-30 border-o" />
            </div>
          </div>
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
      query: '',
      list: [],
      nav: ['综合', '新品', '销量', '价格'],
    };
  },
  components: {},
  methods: {
    getData() {
      this.$api
        .search({
          current: 1,
          pageSize: 99,
          query: this.query,
        })
        .then((res) => {
          if (res.code === 200) this.list = res.data;
          // console.log(this.list);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    click(item) {
      this.query = '';
      this.$router.push({
        path: '/detail',
        query: {
          id: item._id,
        },
      });
    },
  },
  mounted() {
    this.query = localStorage.getItem('query');
    this.getData();
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.img {
  height: 200px;
  width: 200px;
}
</style>