<template>
  <div class="bg-fff">
    <div class="border-b pr" @mouseleave="mouseleave">
      <div class="w flex flex-b ai-c nav">
        <img src="../../assets/logo1.png" alt="" class="img-56" @click="load" />
        <div v-if="recom" class="center f16 co-333">
          <div
            v-for="(item, index) in recom"
            :key="index"
            class="mrr-20 red"
            @mouseenter="mouseover(item)"
          >
            <div>{{ item.name }}</div>
          </div>
        </div>
        <div class="flex ai-c co-666 pr">
          <input
            class="border ipt"
            :placeholder="text"
            :class="query ? 'border-o' : ''"
            v-model="query"
            @input="input"
            @keydown="keydown"
          />
          <div
            class="search center"
            style="border-left: 0"
            :class="query ? 'border-o' : 'border'"
          >
            <i class="iconfont icon-sousuo" @click="search1"></i>
          </div>
          <!-- 搜索列表 -->
          <div
            class="list border-o flex col flex-b f12 co-333"
            v-if="searchList.length > 0 && query"
          >
            <div
              v-for="(item, index) in searchList.slice(0, 10)"
              :key="index"
              @click="click(item)"
              v-html="
                item.name.replace(
                  query,
                  `<span style='color:#ff6700'>${query}</span>`,
                )
              "
            ></div>
          </div>
        </div>
      </div>
      <!-- 下拉框 -->
      <div class="item-children" v-if="visible" ref="main">
        <div class="w flex">
          <div
            v-for="(item1, index1) in goods.slice(0, 6)"
            :key="index1"
            class="col-center item"
            @click="click(item1)"
          >
            <img
              :src="item1.cover"
              alt=""
              style="width: 100px; height: 110px"
            />
            <div class="f14 ellipsis-one">
              {{ item1.name }}
            </div>
            <div class="f12 co-r">{{ item1.presentPrice }}元起</div>
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
      hots: [],
      text: '手机',
      recom: [],
      goods: [],
      visible: false,
      searchList: [],
    };
  },
  components: {},
  methods: {
    // 点击logo
    load() {
      if (this.$route.path === '/') {
        location.reload();
      } else {
        this.$router.push('/');
      }
    },
    getHots() {
      this.$api.getSearchWords().then((res) => {
        if (res.code === 200) {
          this.hots = res.data;
          // console.log(this.hots);
        }
      });
    },
    getRecom() {
      this.$api.getRecommendNav().then((res) => {
        if (res.code === 200) {
          this.recom = [...res.data, ...[{ name: '服务' }, { name: '社区' }]];
          // console.log(this.recom);
        }
      });
    },
    mouseover(item) {
      if (item._id) {
        this.visible = true;
        this.$api.getNavGoods({ id: item._id }).then((res) => {
          if (res.code === 200) {
            this.goods = res.data;
          }
        });
      }
    },
    // 输入框enter事件
    keydown(e) {
      if (e.key === 'Enter') {
        this.search1();
      }
    },
    mouseleave(e) {
      this.visible = false;
    },
    input() {
      this.$api
        .search({
          current: 1,
          pageSize: 99,
          query: this.query,
        })
        .then((res) => {
          if (res.code === 200) {
            this.searchList = res.data;
          }
          console.log(this.searchList);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 点击
    click(item) {
      this.visible = false;
      this.query = '';
      localStorage.setItem('id', item._id);
      if (this.$route.path === '/detail') {
        location.reload();
      } else {
        this.$router.push('/detail');
      }
    },
    // 搜索
    search1() {
      if (this.$route.path === '/search') {
        location.reload();
      } else {
        this.$router.push('search');
      }
      localStorage.setItem('query', this.query);
      this.query = '';
    },
  },
  mounted() {
    this.getHots();
    this.getRecom();
  },
  computed: {},
  watch: {
    hots(val) {
      if (val) {
        let n = val.length - 1;
        setInterval(() => {
          this.text = val[n].name;
          n--;
          if (n === 0) {
            n = val.length - 1;
          }
        }, 5000);
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.nav {
  height: 100px;
}
.item-children {
  position: absolute;
  top: 101px;
  left: 0;
  width: 100%;
  background-color: #fff;
  z-index: 99;
  box-shadow: 0 5px 5px rgb(0 0 0 / 1.5%);
}
.item {
  width: 20%;
  padding: 20px 20px 20px 0;
  border-right: 1px solid #eeeeee;
  &:hover {
    cursor: pointer;
  }
  &:last-child {
    border: 0;
  }
}
.ipt {
  width: 245px;
  height: 50px;
  padding-left: 20px;
}
.search {
  width: 50px;
  height: 50px;
}
.list {
  position: absolute;
  left: 0;
  top: 50px;
  width: 245px;
  border-top: 0;
  background-color: #fff;
  padding: 10px;
  z-index: 999;
}
</style>