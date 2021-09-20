<template>
  <div class="bg-fff co-666">
    <div class="w">
      <div class="footer-hd flex ai-c flex-a f16 border-b">
        <div v-for="(item, index) in list" :key="index">
          <i :class="`${icons[index]}`" class="iconfont"></i>
          {{ item }}
        </div>
      </div>
      <div class="footer-m flex">
        <div class="left flex">
          <div v-for="(item, index) in serve" :key="index" class="flex-1">
            <div class="fw">{{ item.title }}</div>
            <div
              v-for="(item1, index1) in item.list"
              :key="index1"
              class="f12 mrtb-10 red"
            >
              {{ item1 }}
            </div>
          </div>
        </div>
        <div class="right f12 col-center">
          <p class="f22 co-r">400-100-5678</p>
          <p>8:00-18:00（仅收市话费）</p>
          <div class="btn center mrtb-10">
            <i class="iconfont icon-liaotian"></i>
            人工客服
          </div>
          <div class="center">
            关注小米：
            <img src="../../assets/wb.png" class="img-20" alt="" />
            <img src="../../assets/wx.png" class="img-20" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="footer-b bg-fa">
      <div class="w flex f12">
        <img src="../../assets/logo1.png" alt="" class="logo" />
        <div class="footer-r mrl-10">
          <div class="flex wrap co-333">
            <div v-for="(item, index) in link" :key="index" class="center">
              <div class="red">{{ item }}</div>
              <div class="mrrl-5">|</div>
            </div>
          </div>
          <div class="co-a0a0">
            ◎mi.com京ICP证110507号京ICP备10046444号京公网安备11010802020134号京网文[2020]0276-042号<br />
            (京)网械平台备字(2018) 第00005号<br />
            互联网药品信息服务资格证(京)-非经营性-2014-0090营业执照医疗器械质量公告<br />
            增值电信业务许可证网络食品经营备案京食药网食备202010048食品经营许可证<br />
            违法和不良信息举报电话: 171-5104-4404<br />
            知识产权侵权投诉本网站所列数据，除特殊说明，所有数据均出自我司实验室测试<br />
          </div>
          <div class="flex mrtb-10">
            <img src="../../assets/f1.png" alt="" class="link" />
            <img src="../../assets/f2.png" alt="" class="link" />
            <img src="../../assets/f3.png" alt="" class="link" />
            <img src="../../assets/f4.png" alt="" class="link" />
            <img src="../../assets/f5.png" alt="" class="link" />
          </div>
        </div>
      </div>
      <div class="w co-a0a0 ta-c f20 bom">
        让全球每个人都能享受到科技带来的美好生活
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
      icons: [
        'icon-weixiu',
        'icon-footer-7',
        'icon-15tianwuliyoutuihuo',
        'icon-baoyou',
        'icon-ditu',
      ],
      list: [
        '预约维修服务',
        '7天无理由退货',
        '15天免费换货',
        '满69包邮',
        '520余家售后网点',
      ],
      serve: [
        {
          title: '帮助中心',
          list: ['账户管理', '购物指南', '订单操作'],
        },
        {
          title: '服务支持',
          list: ['售后政策', '自助服务', '相关下载'],
        },
        {
          title: '线下门店',
          list: ['小米之家', '服务网点', '授权体验店'],
        },
        {
          title: '关于小米',
          list: [
            '了解小米',
            '加入小米',
            '投资者关系',
            '企业社会责任',
            '廉洁举报',
          ],
        },
        {
          title: '关注我们',
          list: ['新浪微博', '官方微信', '联系我们', '公益基金会'],
        },
        {
          title: '特色服务',
          list: ['F码通道', '礼物码', '防伪查询'],
        },
      ],
      link: [
        '小米商城',
        'MIUI',
        '米家',
        '米聊',
        '多看',
        '游戏',
        '政企服务',
        '小米天猫店',
        '小米集团隐私政策',
        '小米公司儿童信息保护规则',
        '小米商城隐私政策',
        '小米商城用户协议',
        '问题反馈',
        'SelectLocation',
        '北京互联网法院法律服务工作站',
        '中国消费者协会',
        '北京市消费者协会',
      ],
    };
  },
  components: {},
  methods: {},
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.footer-hd {
  height: 80px;
  padding: 27px;
}
.left {
  width: 80%;
}
.footer-m {
  padding: 40px 0;
}
.right {
  border-left: 1px solid #eeeeee;
  width: 20%;
}
.btn {
  width: 128px;
  height: 30px;
  border: 1px solid #ff6700;
  background: #fff;
  color: #ff6700;
}
.footer-b {
  padding-top: 30px;
}
.logo {
  width: 60px;
  height: 60px;
}
.footer-r {
  width: 80%;
}
.link {
  width: 80px;
  height: 28px;
}
.bom {
  padding: 40px 0;
}
</style>