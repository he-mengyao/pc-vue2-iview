<template>
  <div class="box">
    <div class="flex col ai-c">
      <img src="../../assets/404.jpg" alt="" />
      <p class="f30 mrtb-20">咦~页面不见了~</p>
      <a href="/" class="f28" @click="click">返回首页 mi.com</a>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {},
  data() {
    return {};
  },
  components: {},
  methods: {
    click() {
      this.$router.push('/');
    },
  },
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
</style>