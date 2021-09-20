<template>
  <div class="w">
    <div class="flex main pr cursor">
      <div
        class="left h-100 flex col pdtb-20"
        ref="main"
        @mouseleave="mouseleave"
      >
        <div
          v-for="(item, index) in categ"
          :key="index"
          class="flex-1 pdrl-20 flex flex-b ai-c co-fff fw b_red"
          @mouseenter="mouseenter(item)"
        >
          {{ item.name }}
          <i class="iconfont icon-icon-xiangyou"></i>
        </div>
        <div
          class="prop flex col wrap bg-fff"
          v-if="visible"
          @mouseleave="mouseleave"
        >
          <div
            class="flex goods red"
            v-for="(item, index) in goods.concat(goods)"
            :key="index"
            @click="click(item)"
          >
            <img :src="item.cover" alt="" class="img-50 mrr-10" />
            <div class="ellipsis-one">{{ item.name }}</div>
          </div>
        </div>
      </div>
      <div class="right h-100 w-100">
        <Carousel autoplay loop :autoplay-speed="5000" radius-dot>
          <CarouselItem v-for="(item, index) in carousel" :key="index">
            <img :src="item.url" alt="" class="w-100 h-100" />
          </CarouselItem>
        </Carousel>
      </div>
    </div>
    <div class="mrtb-20 flex flex-b">
      <img src="../../assets/l.png" alt="" class="w-234" />
      <img src="../../assets/l1.jpeg" alt="" class="w-316" />
      <img src="../../assets/l2.jpeg" alt="" class="w-316" />
      <img src="../../assets/l3.png" alt="" class="w-316" />
    </div>
  </div>
</template>

<script>
// import chunk from 'lodash/chunk' 
export default {
  name: '',
  props: {},
  data() {
    return {
      categ: [],
      carousel: [],
      visible: false,
      goods: [],
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
            // let arr = 
            // console.log(this.categ);
          }
        })
        .catch((err) => {
          console.log('分类请求失败');
        });
    },
    getCarousel() {
      this.$api
        .getBanner()
        .then((res) => {
          if (res.code === 200) {
            this.carousel = res.data;
          }
        })
        .catch((err) => {
          console.log('轮播请求失败');
        });
    },
    mouseenter(item) {
      this.visible = true;
      this.goods = Object.values(item.list[0].list[0])[0];
    },
    mouseleave(e) {
      this.visible = false;
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
    this.getCarousel();
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.main {
  height: 460px;
  .left {
    position: absolute;
    left: 0;
    top: 0;
    width: 234px;
    background-color: rgba(105, 101, 101, 0.6);
    z-index: 3;
  }
  .prop {
    position: absolute;
    left: 234px;
    top: 0;
    height: 100%;
    // box-shadow: 0 8px 16px rgb(0 0 0 / 18%);
    .goods {
      padding: 18px 20px;
      height: 92px;
      line-height: 40px;
      width: 260px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      background-color: #fff;
    }
  }
}
.ivu-carousel-dots-inside {
  bottom: 20px !important;
  width: 200px !important;
  right: 53px !important;
}

.ivu-carousel .left {
  left: 239px !important;
}
</style>