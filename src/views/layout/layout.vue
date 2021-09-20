<template>
  <div>
    <!-- 头部 -->
    <headers></headers>
    <!-- 导航 -->
    <navs></navs>
    <router-view></router-view>
    <!-- 底部 -->
    <footers></footers>
  </div>
</template>

<script>
import Footers from '../../components/layout/footers.vue';
import Headers from '../../components/layout/headers.vue';
import Navs from '../../components/layout/navs.vue';
export default {
  name: '',
  props: {},
  data() {
    return {};
  },
  components: { Headers, Footers, Navs },
  methods: {},
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
</style>