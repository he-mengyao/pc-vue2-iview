<template>
  <div>
    <categ></categ>
    <floor-1></floor-1>
    <div class="slide flex col co-a0a0">
      <div
        class="line pr"
        v-for="(item, index) in list"
        :key="index"
        :class="index === 4 ? 'last' : ''"
      >
        <i class="iconfont f24" :class="item"></i>
        <div class="right center co-666" v-if="index > 0">
          {{ list1[index] }}
        </div>
        <div class="col-center co-666 bg-fff first" v-if="index === 0">
          <img src="./../assets/code.png" alt="" class="img-80" />
          <div class="center">扫码领取新人百元礼包</div>
        </div>
      </div>
      <div class="border center arrow" v-if="show">
        <i class="iconfont icon-huidingbu f24"></i>
      </div>
    </div>
  </div>
</template>

<script>
import Categ from '../components/home/categ.vue';
import Floor1 from '../components/home/floor1.vue';
export default {
  name: '',
  props: {},
  data() {
    return {
      show: false,
      list: [
        'iconfont icon-shouji',
        'icon-yonghu',
        'icon-xiuli',
        'icon-fuwudingdanxiangqing-kefu-copy-copy',
        'icon-gouwuche',
      ],
      list1: ['', '个人中心', '售后服务', '人工客服', '购物车'],
    };
  },
  components: { Categ, Floor1 },
  methods: {
    handleScroll(e) {
      this.show = e.layerY > 1000;
    },
  },
  mounted() {
    window.addEventListener('mousewheel', this.handleScroll);
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.slide {
  position: fixed;
  left: 93.5%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  .line {
    border: 1px solid #eeeeee;
    border-bottom: 0;
    &:hover {
      .right {
        display: block;
      }
      .first {
        display: block;
      }
    }
  }
  .last {
    border-bottom: 1px solid #eeeeee;
  }
  .arrow {
    margin-top: 20px;
  }
}
.first {
  display: none;
  position: absolute;
  right: 30px;
  top: 15%;
  padding: 0 8px;
  background-color: #fff;
}
.right {
  display: none;
  position: absolute;
  right: 30px;
  top: 15%;
  padding: 0 8px;
  background-color: #fff;
  border: 1px solid #f5f5f5;
  text-align: center;
  white-space: nowrap;
  &::after {
    position: absolute;
    content: '';
    width: 0px;
    height: 0px;
    border-width: 8px 0 10px 16px;
    border-style: solid;
    border-color: transparent transparent transparent #fff;
  }
}
</style>