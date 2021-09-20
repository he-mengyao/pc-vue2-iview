<template>
  <div class="cart" v-if="user">
    <div class="w bg-fff" v-if="list.length > 0">
      <!-- 顶部 -->
      <div class="hd flex ai-c pdrl-20">
        <div class="" style="width: 100px">
          <Checkbox v-model="checkAll" @on-change="handleCheckAll"
            >全选</Checkbox
          >
        </div>
        <div class="flex-2 center">商品名称</div>
        <div class="flex-1 center">单价</div>
        <div class="flex-1 center">数量</div>
        <div class="flex-1 center">小计</div>
        <div class="flex-1 center">操作</div>
      </div>
      <div class="border-b"></div>
      <!-- 商品 -->
      <div class="mr-20">
        <div v-for="(item, index) in list" :key="index" class="flex col">
          <div class="flex ai-c">
            <div class="" style="width: 100px">
              <Checkbox v-model="item.checked" @on-change="handleCheck(item)">
              </Checkbox>
            </div>
            <div class="flex-2 flex ai-c f18">
              <img :src="item.goods.cover" alt="" class="img-80 mrr-20" />
              {{ item.goods.name }}
            </div>
            <div class="flex-1 center f16">{{ item.goods.presentPrice }}</div>
            <div class="flex-1 center">
              <InputNumber
                v-model="item.count"
                controls-outside
                @on-change="change(item)"
                :min="1"
              ></InputNumber>
            </div>
            <div class="flex-1 center f16 co-r">
              {{ item.goods.presentPrice * item.count }}元
            </div>
            <div class="flex-1 center" @click="del(item)">×</div>
          </div>
          <div class="border-b mrtb-20"></div>
        </div>
      </div>
      <!-- 底部 -->
      <Affix :offset-bottom="0">
        <div class="h-50 footer co-666 flex ai-c flex-b">
          <div class="flex">
            继续购物
            <span class="mrrl-20 co-eee">|</span>
            共&nbsp;<span class="co-r">{{ list.length }}</span>
            &nbsp;件商品，已选择&nbsp;<span class="co-r">{{
              num ? num : 0
            }}</span
            >&nbsp;件
          </div>
          <div class="co-r flex ai-c">
            <div class="center">
              合计：<span class="f30"> {{ total ? total : 0 }} </span>元
            </div>
            <div
              class="co-fff f18 center h-100"
              style="width: 202px; margin-left: 50px; height: 50px"
              @click="settle"
              :class="num ? 'bg-r' : 'bg-e0'"
            >
              去结算
            </div>
          </div>
        </div>
      </Affix>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {},
  data() {
    return {
      checkAll: false,
      list: [],
    };
  },
  components: {},
  methods: {
    // 全选
    handleCheckAll() {
      this.list.map((i) => {
        i.checked = this.checkAll;
      });
    },
    // 单选
    handleCheck(item) {
      this.checkAll = this.list.every((i) => {
        return i.checked === true;
      });
    },
    // 获取列表
    getData() {
      this.$api
        .getCart(JSON.parse(this.user)._id)
        .then((res) => {
          if (res.code === 200) {
            this.list = res.data;
            this.list.map((i) => {
              this.$set(i, 'checked', false);
            });
            // console.log(this.list);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 结算
    settle() {
      let arr = this.list.filter((i) => {
        return i.checked === true;
      });
      this.$router.push('/settle');
      localStorage.setItem('order', JSON.stringify(arr));
    },
    // 删除
    del(item) {
      console.log(item);
      this.$api
        .delCart({
          user_id: JSON.parse(this.user)._id,
          id: item._id,
        })
        .then((res) => {
          if (res.code === 200) {
            this.$Message.success(res.msg);
            this.getData();
          } else {
            this.$Message.error(res.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 改变商品数量
    change(item) {
      this.$api
        .updateCart({
          id: item._id,
          // 用户id
          user_id: JSON.parse(this.user)._id,
          count: item.count,
        })
        .then((res) => {
          if (res.code === 200) {
            this.$Message.success(res.msg);
            this.getData();
          } else {
            this.$Message.error(res.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    if (this.user) {
      this.getData();
    }
  },
  computed: {
    num() {
      return this.list.filter((i) => {
        return i.checked === true;
      }).length;
    },
    total() {
      let sum = 0;
      this.list.map((i) => {
        if (i.checked === true) {
          sum += i.count * i.goods.presentPrice;
        }
      });
      return sum;
    },
    user() {
      return this.$store.state.user;
    },
  },
  watch: {},
};
</script>

<style lang='scss' scoped>
.cart {
  margin: 40px 0;
  height: 100%;
  .hd {
    height: 70px;
  }
  .footer {
    padding-left: 50px;
  }
}
</style>