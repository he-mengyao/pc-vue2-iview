<template>
  <div>
    <Dropdown @on-click="clickDrop">
      <slot name="drop"></slot>
      <DropdownMenu slot="list">
        <DropdownItem
          v-for="(item, index) in dropList"
          :key="index"
          class="red"
          :name="item"
        >
          {{ item }}
        </DropdownItem>
        <DropdownItem class="red" :name="user ? '退出登录' : '去登录'">
          {{ user ? '退出登录' : '去登录' }}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
export default {
  name: '',
  props: {},
  data() {
    return {
      dropList: ['个人中心', '评价晒单', '我的喜欢', '小米账户'],
    };
  },
  components: {},
  methods: {
    clickDrop(e) {
      if (e === '退出登录') {
        localStorage.removeItem('user');
        this.$store.commit('setUser', null);
        localStorage.removeItem('token');
      } else if (e === '去登录') {
        this.$router.push('/login');
      }
    },
  },
  mounted() {},
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  watch: {},
};
</script>

<style lang='scss' scoped>
</style>