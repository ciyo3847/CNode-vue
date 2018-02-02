<template>
  <div class="content">
    <div class="container">
      <Row :gutter="24">
        <Col :xs="24" :sm="17">
          <Card class="ivu-card-nopad">
            <div slot="title" class="ivu-pad-s">
              <ul class="li-col list-nav">
                <li v-for='(item, index) in tabList' :key='index' @click='opinionTab(item, index)' :class=' activeIndex == index ? "active" : "" '>
                  {{ item | tabType }}
                </li>
              </ul>
            </div>
            <div class="topic-list">
              <detilTopic :list='allList' :isIndex='true'></detilTopic>
              <div class="demo-spin-col"  v-if='loading'>
                <Spin >
                 <Icon type="load-c" size="18" class="demo-spin-icon-load"></Icon>
                  <div>Loading</div>
                </Spin>
              </div>
            </div>
          </Card>
        </Col>
        <Col :xs="24" :sm="7">
          <Card v-if='!token'>
            <Form ref="formInline" :model="formInline" :rules="ruleInline">
              <FormItem prop="token" label="账户名">
                <Input type="text" v-model="formInline.token" :placeholder="'index'">
                </Input>
              </FormItem>
                <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
              </FormItem>
            </Form>
          </Card>
          <div v-else>
            <Card class="ivu-card-base">
              <div slot="title" class="flex flex-sb">
                <span>个人信息</span>
              </div>
              <div class="ivu-center">
                <router-link :to='{ name: "author", params: { loginname: authorList.loginname}}'>
                  <img :src="authorList.avatar_url" alt="" width="40%">
                </router-link>
                <span class="ivu-mar-l-s ivu-font-l">{{authorList.loginname}}</span>
              </div>
            </Card>
            <Card class="ivu-card-base">
              <div slot="title" class="flex flex-sb">
                <span>收藏话题</span>
              </div>
              <div v-if="collectTopic.length">
                <p v-for="item in collectTopic" class="white-nowrap">
                  <router-link :to='{ name: "topic", params: { topicId: item.id}}'>{{ item.title }}</router-link>
                </p>
              </div>
              <p v-else class="ivu-center">没有数据</p>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>
  import detilTopic from '../components/detilTopic'
  // import { mapState } from 'vuex'
  export default {
    components: {
      detilTopic
    },
    data () {
      return {
        loading: true,
        tabList: {
          0: 'all',
          1: 'good',
          2: 'share',
          3: 'ask',
          4: 'job',
          5: 'dev'
        },
        token: localStorage.token,
        page: 1,
        limit: 10,
        merender: 'false',
        allList: [],
        collectTopic: [],
        authorList: {
          avatar_url: '',
          loginname: ''
        },
        // messageTip: this.$token,
        formInline: {
          token: 'index'
        },
        ruleInline: {
          token: [
            {
              required: true,
              message: '请输入token'
            }
          ]
        }
      }
    },
    filters: {
      tabType (val) {
        switch (val) {
          case 'all':
            return '全部'
          case 'good':
            return '精华'
          case 'share':
            return '分享'
          case 'ask':
            return '问答'
          case 'job':
            return '招聘'
          case 'dev':
            return '客户端测试'
        }
      }
    },
    // computed: mapState([
    //   'tab',
    //   'activeIndex'
    // ]),
    computed: {
      tab: {
        get: function () {
          return this.$store.state.tab
        },
        set: function () {
        }
      },
      activeIndex: {
        get: function () {
          return this.$store.state.activeIndex
        },
        set: function () {
        }
      }
    },
    methods: {
      opinionTab (tab, index) {
        this.$store.commit('changeTab', {
          tab: tab,
          activeIndex: index
        })
        this.allList = []
        this.activeIndex = index
        this.loading = !this.loading
        this.getData()
      },
      getData () {
        this.$http({
          url: this.Url.getTopicList,
          method: 'get',
          params: {
            tab: this.$store.state.tab,
            page: this.page,
            limit: this.limit,
            mdrender: this.merender
          }
        }).then((res) => {
          this.allList = this.allList.concat(res.data.data)
          this.loading = !this.loading
        })
      },
      getDataMore () {
        let clientH = document.documentElement.clientHeight
        let scrollT = document.documentElement.scrollTop || document.body.scrollTop
        let scrollH = document.documentElement.scrollHeight || document.body.scrollHeight
        if (clientH + scrollT >= scrollH) {
          this.page += 1
          // console.log(clientH + scrollT + '>=' + scrollH);
          this.loading = !this.loading
          this.getData()
        }
      },
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.login()
          } else {
            // this.$Message.error('Fail!')
          }
        })
      },
      login () {
        if (this.formInline.token === 'index') {
          this.formInline.token = this.$token
        }
        this.$http({
          url: this.Url.login,
          method: 'post',
          params: {
            accesstoken: this.formInline.token
          }
        }).then((res) => {
          this.$Message.success('登录成功!')
          localStorage.token = this.formInline.token
          localStorage.loginname = res.data.loginname
          localStorage.avatar_url = res.data.avatar_url
          this.authorList.loginname = localStorage.loginname
          this.authorList.avatar_url = localStorage.avatar_url
          this.token = localStorage.token
          this.getUserInfo()
        })
      },
      getUserInfo () {
        let _this = this
        this.$http({
          url: `${this.Url.userCollectTopic}${localStorage.loginname}`,
          method: 'get'
        }).then((res) => {
          res.data.data.forEach(function (item, index) {
            let obj = {}
            obj.id = item.id
            obj.title = item.title
            _this.collectTopic.push(obj)
          })
        })
      }
    },
    mounted () {
      this.getData(this.$store.state.tab)
      this.activeIndex = this.$store.state.activeIndex
      this.authorList.loginname = localStorage.loginname
      this.authorList.avatar_url = localStorage.avatar_url
      window.addEventListener('scroll', this.getDataMore)
      if (localStorage.token) {
        this.getUserInfo()
      }
    }
  }
</script>