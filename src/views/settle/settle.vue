<template>
  <div class="set">
    <heads></heads>
    <div class="bg-fa box1" v-if="list">
      <div class="w bg-fff content">
        <div class="f18 mrtb-20">收货地址</div>
        <!-- 地址 -->
        <div class="flex wrap">
          <!-- 有地址 -->
          <div
            class="address border pd-30 co-666 f14 mrr-20 pr cursor"
            @click="click(index, item)"
            v-for="(item, index) in addressList"
            :key="index"
            :class="index === num ? 'active' : ''"
          >
            <div class="f16 co-333">{{ item.username }}</div>
            <div>
              {{ item.mobile.slice(0, 4) + '****' + item.mobile.slice(8, 12) }}
            </div>
            <div>{{ item.address }}</div>
            <div>{{ item.detailAddress }}</div>
            <div class="xiu co-r" @click.stop="updata">修改</div>
          </div>
          <div
            class="address border pd-30 co-b0b0 col-center f14"
            @click="visible1 = true"
          >
            <i class="iconfont icon-add-fill-copy f30"></i>
            <div>添加新地址</div>
          </div>
        </div>
        <div class="f18 mrtb-20">商品及优惠券</div>
        <!-- 商品 -->
        <div>
          <div
            v-for="(item, index) in list"
            :key="index"
            class="flex ai-c mrtb-20"
          >
            <div class="flex flex-3">
              <img :src="item.goods.cover" alt="" class="img-40" />
              <div class="mrl-20">{{ item.goods.name }}</div>
            </div>
            <div class="flex-1">
              {{ item.goods.presentPrice }}元×{{ item.count }}
            </div>
            <div class="co-r flex-1 flex-r flex">
              {{ item.goods.presentPrice * item.count }}元
            </div>
          </div>
        </div>
        <Divider />
        <!-- 配送 -->
        <div class="f18 mrtb-20 flex ai-c">
          <div style="width: 150px">配送</div>
          <div class="f14 co-r">包邮</div>
        </div>
        <Divider />
        <!-- 发票 -->
        <div class="f18 mrtb-20 flex ai-c">
          <div style="width: 150px">发票</div>
          <div class="f14 co-r flex ai-c">
            <div>电子普通发票</div>
            <div class="mrrl-20">个人</div>
            <div>商品明细</div>
            <div class="mrl-20">修改></div>
          </div>
        </div>
        <!-- 价格明细 -->
        <div class="pdrl-20 bw-center co-666">
          <div>
            <div class="red flex ai-c">
              <i class="iconfont icon-add-fill-copy f30 co-r mrr-20"></i
              >使用优惠券
            </div>
            <div class="red flex ai-c">
              <i class="iconfont icon-add-fill-copy f30 co-r mrr-20"></i
              >使用小米礼品卡
            </div>
          </div>
          <div>
            <div class="flex ai-c mrb-10">
              <div class="price">商品件数：</div>
              <div class="price co-r">{{ list.length }}件</div>
            </div>
            <div class="flex ai-c mrb-10">
              <div class="price">商品总价：</div>
              <div class="price co-r">{{ total }}元</div>
            </div>
            <div class="flex ai-c mrb-10">
              <div class="price">活动优惠：</div>
              <div class="price co-r">-0元</div>
            </div>
            <div class="flex ai-c mrb-10">
              <div class="price">优惠券抵扣：</div>
              <div class="price co-r">-0元</div>
            </div>
            <div class="flex ai-c mrb-10">
              <div class="price">运费：</div>
              <div class="price co-r">0元</div>
            </div>
            <div class="flex ai-c mrb-10">
              <div class="price">应付总额：</div>
              <div class="price co-r">
                <span class="f30">{{ total }}</span
                >元
              </div>
            </div>
          </div>
        </div>
        <Divider />
        <!-- 结算 -->
        <div class="flex flex-b">
          <div>
            <div v-if="address" class="co-666">
              <div>
                {{ address.username }}&nbsp;{{
                  address.mobile.slice(0, 4) +
                  '****' +
                  address.mobile.slice(8, 12)
                }}
              </div>
              <div>{{ address.address }}&nbsp;{{ address.detailAddress }}</div>
            </div>
          </div>
          <div class="flex ai-c">
            <div class="btn border co-b0b0 center" @click="back">
              返回购物车
            </div>
            <div class="btn bg-r co-fff center" @click="settle">
              {{ address ? '立即下单' : '去结算' }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 提示输入地址 -->
    <Modal v-model="visible">
      <div class="tip f26 center co-666">请选择地址</div>
      <div slot="footer" class="center">
        <div class="w-160 center bg-r co-fff" @click="visible = false">
          确定
        </div>
      </div>
    </Modal>
    <!-- 新增地址弹框 -->
    <Modal v-model="visible1" title="添加收货地址" style="width: 400px">
      <Form
        ref="formValidate"
        :model="formValidate"
        :rules="ruleValidate"
        :label-width="0"
      >
        <div class="flex">
          <FormItem prop="username" class="w-100 mrr-20">
            <Input v-model="formValidate.username" placeholder="姓名" />
          </FormItem>
          <FormItem prop="mobile" class="w-100">
            <Input v-model="formValidate.mobile" placeholder="手机号" />
          </FormItem>
        </div>
        <!-- 选择地区 -->
        <FormItem prop="address1">
          <Cascader :data="cityList" v-model="formValidate.address1"></Cascader>
        </FormItem>
        <FormItem prop="detailAddress">
          <Input
            v-model="formValidate.detailAddress"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 5 }"
            placeholder="详细地址"
          />
        </FormItem>
      </Form>
      <div slot="footer" class="center ai-c co-fff f16">
        <div class="flex ai-c">
          <div class="bg-r w-160 center" @click="confirm">确定</div>
          <div class="bg-b0 w-160 mrl-20 center" @click="visible1 = false">
            取消
          </div>
        </div>
      </div>
    </Modal>
    <!-- 底部 -->
    <footers></footers>
  </div>
</template>

<script>
import Heads from '../../components/cart/heads.vue';
import Footers from '../../components/layout/footers.vue';
import area from '../../lib/area';
export default {
  name: '',
  props: {},
  data() {
    let vMobile = (rule, val, callback) => {
      if (
        !/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(
          val,
        )
      ) {
        return callback(new Error('电话格式不正确'));
      } else {
        callback();
      }
    };
    return {
      list: null,
      addressList: [],
      cityList: [],
      address: null,
      total: 0,
      visible: false,
      // 判断地址边框
      num: -1,
      // 新增地址显示
      visible1: false,
      user_id: this.$store.state.user
        ? JSON.parse(this.$store.state.user)._id
        : '',
      formValidate: {
        username: '',
        mobile: '',
        address1: undefined,
        detailAddress: '',
      },
      ruleValidate: {
        username: [
          {
            required: true,
            message: '姓名不能为空',
            trigger: 'blur',
          },
        ],
        mobile: [
          {
            required: true,
            message: '电话不能为空',
            trigger: 'blur',
          },
          {
            validator: vMobile,
            message: '电话格式不正确',
            trigger: 'blur',
          },
        ],
        address1: [
          {
            transform: (value) => String(value),
            required: true,
            message: '地址不能为空',
            trigger: 'blur',
          },
        ],
        detailAddress: [
          {
            required: true,
            message: '详细地址不能为空',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  components: { Heads, Footers },
  methods: {
    // 获取地址
    getData() {
      this.$api
        .getAppAddress(JSON.parse(this.user)._id)
        .then((res) => {
          if (res.code === 200) {
            this.addressList = res.data;
            // console.log(this.addressList);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 返回购物车
    back() {
      this.$router.push('/cart');
    },
    // 去结算
    settle() {
      if (this.address) {
        this.$api
          .addOrder({
            user_id: JSON.parse(this.user)._id,
            price: this.total,
            address: this.address.address + ' ' + this.address.detailAddress,
            count: this.list.length,
            pay_time: Date.now(),
            goods_list: this.list,
            mobile: this.address.mobile,
          })
          .then((res) => {
            if (res.code === 200) {
              this.$Message.success('结算成功');
              this.$router.push('/cart');
            } else {
              this.$Message.error(res.msg);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.visible = true;
      }
    },
    // 确定新增
    confirm() {
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          this.$api
            .addAddress({
              user_id: JSON.parse(this.user)._id,
              username: this.formValidate.username,
              mobile: this.formValidate.mobile,
              address: this.formValidate.address1.join(' '),
              detailAddress: this.formValidate.detailAddress,
              isDefault: true,
            })
            .then((res) => {
              if (res.code === 200) {
                this.$Message.success(res.msg);
                this.visible1 = false;
                this.getData();
              } else {
                this.$Message.error(res.msg);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },
    // 编辑
    updata() {
      this.$Message.error('暂无此功能');
    },
    // 点击地址
    click(index, item) {
      this.num = index;
      this.address = item;
    },
  },
  mounted() {
    this.list = localStorage.getItem('order')
      ? JSON.parse(localStorage.getItem('order'))
      : [];
    // console.log(this.list);
    this.list.map((i) => {
      this.total += i.count * i.goods.presentPrice;
    });
    this.getData();
    // 地区处理
    let arr = [];
    Object.keys(area.province_list).map((item, index) => {
      let city = [];
      Object.keys(area.city_list).map((item1, index1) => {
        // console.log(q);
        if (item1.substring(0, 2) === item.substring(0, 2)) {
          let county = [];
          Object.keys(area.county_list).map((item2, index2) => {
            if (item1.substring(0, 4) === item2.substring(0, 4)) {
              county.push({
                value: Object.values(area.county_list)[index2],
                label: Object.values(area.county_list)[index2],
              });
            }
          });
          city.push({
            label: Object.values(area.city_list)[index1],
            value: Object.values(area.city_list)[index1],
            children: county,
          });
        }
      });
      arr.push({
        label: Object.values(area.province_list)[index],
        value: Object.values(area.province_list)[index],
        children: city,
      });
    });
    this.cityList = arr;
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
.box1 {
  padding: 40px 0;
}
.content {
  padding: 20px;
  .address {
    width: 270px;
    height: 180px;
  }
  .price {
    width: 100px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .btn {
    width: 160px;
    height: 40px;
    margin-left: 30px;
  }
}
.tip {
  height: 160px;
}
.xiu {
  display: none;
  position: absolute;
  right: 30px;
  bottom: 20px;
}
.address:hover {
  .xiu {
    display: block;
  }
}
.active {
  border: 1px solid #ff6700;
}
</style>