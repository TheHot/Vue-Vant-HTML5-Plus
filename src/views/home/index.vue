<template>
  <div class="home">
    <van-nav-bar
      title="触手检测"
    >
      <van-icon @click="$router.push('/xinhe')" color="#fff" size="1.3em" slot="right" name="user-o" />
    </van-nav-bar>
    <span style="color:red;display:block;textAlign:center;margin: 10px 0;">
      * 请勿用于非法用途
    </span>
    <van-cell-group>
      <van-cell>
        <template slot="title">
          <van-field
            v-model="mobile"
            required
            clearable
            label="手机号"
            placeholder="请输入手机号"
          />
        </template>
      </van-cell>
    </van-cell-group>
    <div class="btn">
      <van-button @click="checkMobile()">点击检测</van-button>
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
</template>

<script>
import { chushou } from '@/api/chushou'
// 似乎 HTML5+ API 不能写在 methods 方法中
import { showToast } from '@/utils/h5+'
export default {
  data () {
    return {
      loading: false,
      mobile: '',
      results: []
    }
  },
  created () {
  },
  methods: {
    async checkMobile () {
      // 检测手机号是否正确
      if (!/^\d{11}$/.test(this.mobile)) {
        showToast('手机号不正确！')
        return
      }
      try {
        const { data } = await chushou(this.mobile)
        data.mobile = this.mobile
        this.results.push(data)
        // 当 infoBox 列表溢出时滚动到底部
        const infoBoxList = this.$refs.infoBox
        this.$nextTick(() => {
          infoBoxList.scrollTop = infoBoxList.scrollHeight
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.home {
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
