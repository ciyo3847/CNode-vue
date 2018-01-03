<template>
  <div class="content">
    <div class="container">
      <div class="home">
        <div class="home-nav">
          <ul>
            <li v-for='(item, index) in tabList' :key='index' @click='opinionTab(item, index)' :class=' activeIndex == index ? "active" : "" '>
              {{ item | tabType }}
            </li>
            <!-- <li class="active" @click='opinionTab("all")'>全部</li>
            <li @click='opinionTab("good")'>精华</li>
            <li @click='opinionTab("share")'><router-link>分享</li>
            <li @click='opinionTab("ask")'>问答</li>
            <li @click='opinionTab("job")'>招聘</li> -->
          </ul>
        </div>
        <div class="home-content">
          <div class="topic" v-for='item in allList'>
            <Row :gutter='24'>
              <Col span='20'>
                <div class="topic-info">
                  <ul>
                    <li>{{ item.author.loginname }}</li>
                    <li>{{ item.tab }}</li>
                  </ul>
                </div>
                <div class="topic-title">
                  {{ item.title }}
                </div>
                <div class="topic-icon">
                  <span>
                    <Icon type="ios-eye ivu-mar-r-xs" size='16'></Icon>
                    {{ item.visit_count }}
                  </span>
                  <span>
                    <Icon type="chatbox ivu-mar-r-xs" size='14'></Icon>
                    {{ item.reply_count }}
                  </span>
                </div>
              </Col>
              <Col span='4'>
                <img class="topic-avatar-img" :src='item.author.avatar_url' alt="">
              </Col>
            </Row>
          </div>
          <div class="demo-spin-col"  v-if='loading'>
            <Spin >
             <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
              <div>Loading</div>
            </Spin>
          </div>
        </div>
      </div>
    </div>
    <BackTop></BackTop>
  </div>
</template>
<style>
  .demo-spin-col{
    padding: 12px 0;      
  }
  .demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }
</style>
<script>
  export default {
    data () {
      return {
        loading: true,
        activeIndex: 0,
        tab: '',
        tabList: {
          0: 'all',
          1: 'good',
          2: 'share',
          3: 'ask',
          4: 'job'
        },
        page: 1,
        limit: 10,
        merender: 'false',
        allList: []
      }
    },
    // watch: {
    //   loading() {
    //     console.log(this.loading)
    //   }
    // },
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
        }
      }
    },
    methods: {
      opinionTab (tab, index) {
        this.tab = tab
        this.page = 1
        this.allList = []
        this.activeIndex = index
        this.loading = !this.loading
        this.getData()
      },
      getData () {
        this.$http({
          url: this.Url.getTopics,
          method: 'get',
          params: {
            tab: this.tab,
            page: this.page,
            limit: this.limit,
            mdrender: this.merender
          }
        }).then((res) => {
          this.allList = this.allList.concat(res.data.data)
          this.loading = !this.loading
        }).catch((res) => {
          console.log('UserCom.vue: ', res)
        })
      },
      getDataMore () {
        let clientH = document.documentElement.clientHeight
        let scrollT = document.documentElement.scrollTop || document.body.scrollTop
        let scrollH = document.documentElement.scrollHeight || document.body.scrollHeight
        // console.log('clientH:' + clientH)
        // console.log('scrollT:' + scrollT)
        // console.log('scrollH:' + scrollH)
        // console.log(clientH + scrollT)
        if (clientH + scrollT >= scrollH) {
          this.page += 1
          this.loading = !this.loading
          this.getData()
        }
      }
    },
    mounted () {
      this.getData('all')
      window.addEventListener('scroll', this.getDataMore)
    }
  }
</script>