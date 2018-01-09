<template>
  <div class="content">
    <div class="container">
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
    </div>
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
  import detilTopic from '../components/detilTopic'
  export default {
    components: {
      detilTopic
    },
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
          4: 'job',
          5: 'dev'
        },
        page: 1,
        limit: 10,
        merender: 'false',
        allList: []
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
          url: this.Url.getTopicList,
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
        if (clientH + scrollT >= scrollH) {
          this.page += 1
          // console.log(clientH + scrollT + '>=' + scrollH);
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