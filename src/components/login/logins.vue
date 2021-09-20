<template>
  <div class="flex">
    <div class="left">
      <img src="../../assets/register.jpeg" alt="" class="img" />
    </div>
    <div class="right w-100 pd-20 scrollY" style="height: 660px">
      <div class="hd flex ai-c flex-b">
        <div class="l flex f26">
          <img src="../../assets/logo1.png" alt="" class="img-40 mrr-20" />
          小米账号
        </div>
        <div class="r flex ai-c co-666">
          <div v-for="(item, index) in list" :key="index" class="mrr-20 cursor">
            {{ item }}
          </div>
        </div>
      </div>
      <div class="bd center">
        <div class="form border pd-30">
          <div class="flex ai-c f22">
            <div
              v-for="(item, index) in list1"
              :key="index"
              class="col-center mrr-20 cursor"
              @click="click(index)"
            >
              <div>{{ item }}</div>
              <div
                class="line"
                :class="index === currentIndex ? 'bg-r' : 'bg-tran'"
              ></div>
            </div>
          </div>
          <div class="center">
            <slot></slot>
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
      list: ['用户协议', '隐私政策', '帮助中心', '|', '‎中文(简体)‎ '],
      list1: ['登录', '注册'],
      currentIndex: this.$route.path === '/login' ? 0 : 1,
    };
  },
  components: {},
  methods: {
    click(index) {
      this.currentIndex = index;
      if (index === 0) {
        if (this.$route.path !== '/login') this.$router.push('/login');
      } else if (index === 1) {
        if (this.$route.path !== '/register') this.$router.push('/register');
      }
    },
  },
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.img {
  width: 375px;
  height: 100vh;
}
.bd {
  margin: 50px 0 20px;
  .form {
    width: 450px;
  }
  .line {
    width: 45px;
    height: 4px;
    border-radius: 3px;
  }
}
</style>