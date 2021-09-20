<template>
  <div class="bg-fa">
    <!-- 顶部 -->
    <heads></heads>
    <!-- 商品 -->
    <cart></cart>
    <!-- 推荐商品 -->
    <recom></recom>
    <!-- 底部 -->
    <footers></footers>
  </div>
</template>

<script>
import heads from '../../components/cart/heads.vue';
import cart from '../../components/cart/cart.vue';
import recom from '../../components/recom/recom.vue';
import footers from '../../components/layout/footers.vue';
export default {
  name: '',
  props: {},
  data() {
    return {};
  },
  components: { heads, cart, recom, footers },
  methods: {},
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
</style>