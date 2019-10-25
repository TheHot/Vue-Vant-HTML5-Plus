<template>
  <div class="xinhe">
    <van-nav-bar
      title="信盒接码"
    >
      <van-icon @click="$router.push('/home')" color="#fff" size="1.3em" slot="left" name="arrow-left" />
      <van-icon @click="logOut" color="#fff" slot="right" name="cross" size="1.3em" />
    </van-nav-bar>
    <!-- 登录表单 -->
    <div class="loginForm" v-if="!isLogin">
      <van-cell-group>
        <van-field
          v-model="user.username"
          required
          clearable
          label="账号"
          placeholder="请输入账号（API）"
        />
        <van-field
          v-model="user.password"
          required
          clearable
          type="password"
          label="密码"
          placeholder="请输入密码"
        />
      </van-cell-group>
      <div class="btn">
        <van-button @click="logIn()">点击登录</van-button>
      </div>
    </div>
    <!-- /登录表单 -->

    <!-- 操作窗口 -->
    <div class="operate" v-else>
      <van-cell-group>
        <van-cell>{{ '账号：' + user.username }}</van-cell>
        <van-cell>
          <span slot="title">{{ '余额：' + user.summary.money }}</span>
          <van-icon slot="default" name="replay" @click="getSummary()"/>
        </van-cell>
        <van-cell>
          <span slot="title">延迟：<van-field style="padding:0;display:table-cell;" v-model="timeout" placeholder="获取手机号码延迟（秒）" /></span>
        </van-cell>
      </van-cell-group>
      <div class="btn">
        <van-button @click="onCheck">{{ isCheck ? '停止检测' : '开始检测' }}</van-button>
      </div>
      <div class="info" ref="infoBox">
        <van-cell
          v-for="(item,index) in results"
          :key="index"
        >
          <div slot="default">
            <span>>>> </span>
            <span :style="item.code == '11120' ? 'color:green;' : 'color:red'">
              {{ item.mobile }}----{{ item.code == '11120' ? '未注册' : '已注册' }}
            </span>
          </div>
        </van-cell>
      </div>
    </div>
    <!-- /操作窗口 -->
  </div>
</template>

<script>
import { logIn as xLogin, getSummary, getPhone, addBlacklist } from '@/api/xinhe'
import { setItem, getItem, rmItem } from '@/utils/localstorage'
import { resFormatter } from '@/utils/resformatter'
import { chushou } from '@/api/chushou'
import { onPlusReady } from '@/utils/h5+'

export default {
  name: 'XinHe',
  data () {
    return {
      isLogin: getItem('x-token') ? 'true' : false,
      isCheck: false,
      timer: '',
      user: {
        username: getItem('user') ? getItem('user').username : null,
        password: getItem('user') ? getItem('user').password : null,
        summary: {}
      },
      allPhone: [],
      currentPhone: '',
      results: [],
      timeout: 2000
    }
  },
  created () {
    // token 有可能过期，所以路由跳转后先检测token是否过期
    this.getSummary()
  },
  methods: {
    // 退出登录
    logOut () {
      // 移除本地 Token
      rmItem('x-token')
      // 移除本地 User
      rmItem('user')
      this.isLogin = false
    },
    async logIn () {
      try {
        let { data } = await xLogin(this.user)
        if (!data) {
          throw { code: 101, data: '未获取到任何返回值！' } // eslint-disable-line
        }
        const res = resFormatter(data)
        // 将 token 值存入本地
        setItem('x-token', res)
        // 获取用户信息
        this.getSummary()
        // 将用户信息存入本地
        setItem('user', this.user)
        // 隐藏登录表单
        this.isLogin = true
      } catch (error) {
        // 这里处理错误信息
        console.log(error)
      }
    },
    async getSummary () {
      try {
        if (!getItem('x-token')) {
          throw '用户未登录！' // eslint-disable-line
        }
        let { data } = await getSummary()
        data = data.split('|', 5)
        if (data[0] === '0') {
          throw '用户Token已过期！' // eslint-disable-line
        }
        this.user.summary = {
          code: data[0],
          money: data[1]
        }
      } catch (error) {
        this.isLogin = false
      }
    },
    // 检测手机号
    onCheck () {
      // 获取手机号
      this.isCheck = !this.isCheck
      // 在 data 内记录定时器 id ，判断控制按钮，停止检测则清除定时器
      if (this.isCheck) {
        this.timer = setInterval(async () => {
          let { data } = await getPhone()
          data = resFormatter(data)
          this.allPhone.push(data.data)
          if (data.code === '1') {
            // 更新当前手机号，触发watch监听
            this.currentPhone = data.data
            addBlacklist(data.data)
          }
        }, this.timeout)
      } else {
        // 清除定时器
        clearInterval(this.timer)
      }
    }
  },
  watch: {
    async currentPhone (value) {
      try {
        const { data } = await chushou(this.currentPhone)
        data.mobile = this.currentPhone
        this.results.push(data)
        // 当 infoBox 列表溢出时滚动到底部
        const infoBoxList = this.$refs.infoBox
        this.$nextTick(() => {
          infoBoxList.scrollTop = infoBoxList.scrollHeight
        })
        // data.code === 11120 时手机号未注册
        if (data.code === 11120) {
          // 这里存储手机号 this.currentPhone 到本地
          onPlusReady(this.currentPhone)
        } else {
          // 手机号已注册，拉黑
          addBlacklist(this.currentPhone)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.xinhe {
  .van-nav-bar {
    background-color: #5ca9e0;
    .van-nav-bar__title {
      color: #fff;
    }
  }
  .btn {
    padding: 10px 15px;
    .van-button {
      width: 100%;
      color: #fff;
      background-color: #5ca9e0;
    }
  }
  .info {
    height: 300px;
    margin: 0 15px;
    padding: 0 5px;
    border: 1px solid #ccc;
    // 数据溢出生成滚动条
    overflow: auto;
    .van-cell {
      padding: 0;
      border-bottom: 1px solid #eee;
    }
  }
}
</style>
