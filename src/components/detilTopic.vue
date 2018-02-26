<template>
  <div v-if='list'>
    <div class="topic" v-for='(item, index) in list' v-if='limit ? index < limit : true'>
      <Row :gutter='24' type="flex" align="middle">
        <Col span='20'>
          <ul class="li-col li-after-cicle" v-if='isIndex'>
            <li>{{ item.author.loginname }}</li>
            <li>{{ item.tab }}</li>
            <li>{{ item.create_at }}</li>
          </ul>
          <h2>
            <router-link :to='{ name: "topic", params: { topicId: item.id}}'>{{ item.title }}</router-link>
          </h2>
          <div class="topic-icon" v-if='isIndex'>
            <span>
              <Icon type="ios-eye ivu-mar-r-xs" size='16'></Icon>
              {{ item.visit_count }}
            </span>
            <span class="border-left-no">
              <Icon type="chatbox ivu-mar-r-xs" size='14'></Icon>
              {{ item.reply_count }}
            </span>
          </div>
        </Col>
        <Col span='4'>
          <router-link :to='{ name: "author", params: { loginname: item.author.loginname}}'>
            <img class="topic-avatar-img" :src='item.author.avatar_url' alt="">
          </router-link>
        </Col>
      </Row>
    </div>
    <div v-if='!list.length' class="nodata">
      没有数据
    </div>
  </div>
</template>
<script>
  export default{
    props: {
      list: {},
      isIndex: {
        type: Boolean
      },
      limit: {
        type: Number,
        default: 0
      }
    }
  }
</script>
<style>
  .nodata {
    padding: 15px;
    text-align: center;
  }
</style>