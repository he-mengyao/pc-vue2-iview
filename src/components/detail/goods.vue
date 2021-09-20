<template>
  <div class="bg-fff" v-if="goods">
    <div class="w flex detail">
      <div class="left flex-1 center" style="width: 560px; height: 560px">
        <Carousel autoplay loop class="h-100 w-100" :autoplay-speed="5000">
          <CarouselItem v-for="(item, index) in goods.pic" :key="index">
            <img :src="item" alt="" class="h-100 w-100" />
          </CarouselItem>
        </Carousel>
      </div>
      <div class="right w-100 flex-1">
        <div class="f24">{{ goods.name }}</div>
        <div class="f14 mrtb-10">
          <span class="co-r">{{
            goods.sellDesc[0] === '。' ? '' : goods.sellDesc[0]
          }}</span>
          <span class="co-a0a0">{{ goods.introduction }}</span>
        </div>
        <!-- 小米自营 -->
        <div class="co-r">
          小米自营
          <div class="f18">
            <span class="fw">{{ goods.presentPrice }}</span
            >元
            <span class="del co-a0a0 mrl-10">{{
              goods.presentPrice === goods.originalPrice
                ? ''
                : goods.originalPrice
            }}</span>
          </div>
        </div>
        <div class="border-b mrt-20"></div>
        <!-- 地址 -->
        <div
          class="border address mrtb-20 f14 co-333 flex bg-fa"
          id="container"
        >
          <i class="iconfont icon-ditu co-a0a0 mrr-10"></i>
          <div>
            {{ address ? address : '定位中' }}
            <span class="co-r">修改</span>
            <div class="co-r">有现货</div>
          </div>
        </div>
        <!-- 规格 -->
        <div>
          <div v-for="(item, index) in goods.spec" :key="index" class="mrt-20">
            <div class="f18 c0-333">选择{{ item.name }}</div>
            <div class="flex wrap flex-b">
              <div
                v-for="(item1, index1) in item.checked"
                :key="index1"
                class="border center spec pd-10 mrtb-10 f16 cursor"
                :class="item.showFlag === index1 ? 'spec_active' : ''"
                @click="click(item, item1, index, index1)"
              >
                <div class="center" v-if="item1">
                  {{ item1 }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 结算 -->
        <div class="settle bg-fa co-666">
          <div class="bw-center">
            <span>{{ goods.name }}</span>
            <span>{{ goods.presentPrice }}元</span>
          </div>
          <div class="f24 co-r mrt-20">总计：{{ goods.presentPrice }}元</div>
        </div>
        <!-- 加入购物车 -->
        <div class="flex cart co-fff f16">
          <div class="add bg-r center mrr-10" @click="add">
            {{ user ? '加入购物车' : '登录后购买' }}
          </div>
          <div class="like bg-b0 center">
            <i class="iconfont icon-xihuan"></i>喜欢
          </div>
        </div>
        <!-- 7天无理由 -->
        <div class="flex wrap mrtb-20">
          <div
            v-for="(item, index) in goods.params"
            :key="index"
            class="center mrr-20 co-b0b0"
          >
            <img :src="item.url" alt="" class="img-20" />&nbsp;
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    detail: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      address: '',
      goods: null,
    };
  },
  components: {},
  methods: {
    getLocation() {
      let that = this;
      AMap.plugin('AMap.Geolocation', function () {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
          // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
          buttonOffset: new AMap.Pixel(10, 20),
          //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          zoomToAccuracy: true,
          //  定位按钮的排放位置,  RB表示右下
          buttonPosition: 'RB',
        });

        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, 'complete', onComplete);
        AMap.event.addListener(geolocation, 'error', onError);

        function onComplete(data) {
          // data是具体的定位信息
          // console.log(data);
          that.address =
            data.addressComponent.province +
            ' ' +
            data.addressComponent.city +
            ' ' +
            data.addressComponent.district +
            ' ' +
            data.addressComponent.street;
          // that.$store.commit('setCity', data.addressComponent.city);
          localStorage.setItem('city', that.address);
        }

        function onError(data) {
          // 定位出错
          Message.error('定位失败，请手动选择城市');
        }
      });
    },
    // 点击规格
    click(item, item1, index, index1) {
      item.showFlag = index1;
      this.goods.specList[index] = {
        name: item.name,
        checked: item1,
      };
      // console.log(this.detail);
    },
    // 加入购物车
    add() {
      if (this.user) {
        // 请求
        this.$api
          .addCart({
            user_id: JSON.parse(this.user)._id,
            count: 1,
            goods: this.goods,
            spec: this.goods.specList,
          })
          .then((res) => {
            if (res.code === 200) {
              this.$Message.success(res.msg);
              this.$router.push({
                path: 'success',
                query: {
                  goods: JSON.stringify(this.goods),
                },
              });
            } else {
              this.$Message.error(res.msg);
            }
          });
      } else {
        this.$router.push('/login');
        localStorage.setItem('buy', 1);
      }
    },
  },
  mounted() {
    this.getLocation();
    this.goods = this.detail;
    let arr = [];
    this.goods.spec.map((i) => {
      i.checked.filter((q) => {
        return q !== '';
      });
      this.$set(i, 'showFlag', 0);
      arr.push({
        name: i.name,
        checked: i.checked[0],
      });
    });
    this.$set(this.goods, 'specList', arr);
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
.detail {
  padding: 30px;
  .address {
    height: 104px;
    padding: 30px 50px;
  }
  .spec {
    width: 48%;
    &:hover {
      border: 1px solid #ff6700;
      color: #ff6700;
    }
  }
  .settle {
    padding: 30px;
    margin: 20px 0;
  }
  .cart {
    height: 54px;
    .add {
      width: 300px;
    }
    .like {
      width: 142px;
    }
  }
}
</style>