<template>
  <logins>
    <div class="form">
      <input
        type="text"
        class="f18 ipt mrt-20 bg-f9f9"
        placeholder="用户名"
        v-model="username"
      />
      <div class="co-red" v-if="!username && password">用户名不能为空</div>
      <input
        type="text"
        class="f18 ipt mrt-20 bg-f9f9"
        placeholder="密码"
        v-model="password"
      />
      <div class="co-red" v-if="!password && mobile">密码不能为空</div>
      <div class="ipt mrtb-20 bg-f9f9 flex ai-c">
        <div class="flex-1 col">
          国家码
          <div class="cb">+86</div>
        </div>
        <input
          type="text"
          class="bg-tran f18 flex-2"
          placeholder="手机号"
          v-model="mobile"
        />
      </div>
      <div class="co-red" v-if="flag1">
        {{ !mobile ? '手机号不能为空' : '手机号格式不正确' }}
      </div>
      <div class="ipt mrtb-20 bg-f9f9 flex">
        <input
          type="text"
          class="bg-tran f18 flex-2"
          placeholder="短信验证码"
          v-model="code"
        />
        <div
          class="flex-1"
          @click="clickCode"
          :class="num === 60 ? 'co-r' : 'co-333'"
        >
          {{ num === 60 ? '获取验证码' : `重新获取 ${num}s` }}
        </div>
      </div>
      <div class="co-red" v-if="flag2 && code.length !== 6">
        {{ '验证码不正确' }}
      </div>
      <div
        class="ipt bg-ban co-fff f18 fw center"
        :class="code.length >= 6 && mobile.length === 11 ? 'bg-r' : ''"
        @click="register"
      >
        注册
      </div>
      <div class="co-red f18 mrtb-20">收不到验证码？</div>
      <div class="co-a0a0 flex-c col f14 mrtb-20 flex ai-c">
        <div>
          <Checkbox v-model="checked"></Checkbox> 已阅读并同意小米帐号<span
            class="cb"
            >用户协议</span
          >和&nbsp; <span class="cb">隐私政策</span>
        </div>
        <div class="f18 mrtb-20">其他方式登录</div>
        <img src="../../assets/qq.png" alt="" style="width: 80%" />
      </div>
    </div>
  </logins>
</template>

<script>
import logins from '../../components/login/logins';
export default {
  name: '',
  props: {},
  data() {
    return {
      username: '',
      mobile: '',
      password: '',
      code: '',
      // 手机
      flag1: false,
      // 验证
      flag2: false,
      // 注册
      flag4: false,
      n: 0,
      // 倒计时
      num: 60,
      checked: false,
    };
  },
  components: { logins },
  methods: {
    clickCode() {
      if (
        !/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(
          this.mobile,
        )
      ) {
        this.flag1 = true;
      } else {
        // 发请求
        this.$api
          .getCode({ mobile: this.mobile })
          .then((res) => {
            if (res.code === 200) {
              this.$Message.success(res.msg);
              let timer = setInterval(() => {
                this.num--;
                if (this.num === 0) {
                  clearInterval(this.timer);
                  this.num = 60;
                }
              }, 1000);
            } else {
              this.$Message.error(res.msg);
              this.flag4 = true;
            }
          })
          .catch((err) => {
            console.log('验证码请求失败');
          });
      }
      if (!this.mobile) this.n = 1;
    },
    register() {
      if (
        this.username !== '' &&
        this.password !== '' &&
        this.mobile !== '' &&
        this.code.length == ''
      ) {
        if (!this.checked) {
          this.$Message.warning('请先勾选协议');
        } else {
          if (this.code.length !== 6) {
            this.flag2 = true;
          } else {
            this.$api
              .register({
                mobile: this.mobile,
                code: this.code,
                username: this.username,
                password: this.password,
              })
              .then((res) => {
                if (res.code === 200) {
                  this.$router.push('/login');
                  this.$Message.success(res.msg);
                } else {
                  this.$Message.error(res.msg);
                }
              })
              .catch(() => {
                console.log('注册请求失败');
              });
          }
        }
      }
    },
  },
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.ipt {
  height: 60px;
  width: 100%;
  border-radius: 5px;
  padding: 20px;
}
</style>