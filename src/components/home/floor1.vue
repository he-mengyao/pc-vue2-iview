<template>
  <div class="bg-fa">
    <div class="w">
      <img
        src="../../assets/bd1.webp"
        alt=""
        class="fl1 mrtb-20 w-100 cursor"
      />
      <div v-for="(item, index) in categ" :key="index">
        <div class="floor-hd">
          <div class="f22">{{ item.name }}</div>
          <div class="co-b0b0 f16 center cursor red">
            查看更多
            <i class="iconfont icon-yuanquanyoujiantou- mrl-10"></i>
          </div>
        </div>
        <div class="floor-bd flex flex-b wrap">
          <div
            v-for="(item1, index1) in Object.values(item.list[0].list[0])[0]"
            :key="index1"
            class="w-234 pdtb-20 bg-fff col-center mrb-20 cursor as"
            @click="click(item1)"
          >
            <img :src="item1.cover" alt="" class="img" />
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
      <img src="../../assets/bd2.webp" alt="" class="fl1 mrb-20 w-100 cursor" />
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {},
  data() {
    return {
      categ: [],
    };
  },
  components: {},
  methods: {
    getCateg() {
      this.$api
        .getCategory()
        .then((res) => {
          if (res.code === 200) {
            this.categ = res.data;
            // console.log(this.categ);
          }
        })
        .catch((err) => {
          console.log('分类请求失败');
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
    this.getCateg();
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.img {
  width: 160px;
  height: 160px;
}
</style>