<template>
  <div class="content">
    <div class="container">
      <Form
        :model="publish"
        :rules="rule"
        ref="publish"
        inline
        :label-width="120"
        label-position="left">
        <FormItem prop="tabs" label="请选择板块">
          <Select v-model="publish.tabs" style="width:200px">
              <Option v-for="item in tab" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="title" label="标题 (不少于10字)">
          <Input v-model="publish.title" style="width:250px"></Input>
        </FormItem>
        <Button class="float-right" type="primary" @click="handleSubmit('publish')">发表</Button>
      </Form>
      <mavon-editor :ishljs = "true" v-model="publishContent"></mavon-editor>
    </div>
  </div>
</template>
<script>
  export default{
    data () {
      const validateTab = (rule, value, callback) => {
        if (value !== 'dev') {
          callback(new Error('请选择客户端测试板块'))
        }
        callback()
      }
      return {
        publishContent: '',
        tab: [
          {
            value: 'ask',
            label: '问答'
          },
          {
            value: 'share',
            label: '分享'
          },
          {
            value: 'job',
            label: '招聘'
          },
          {
            value: 'dev',
            label: '客户端测试'
          }
        ],
        publish: {
          tabs: '',
          title: ''
        },
        rule: {
          tabs: [
            { required: true, type: 'string', message: '请选择板块', trigger: 'blur' },
            { validator: validateTab, trigger: 'blur' }
          ],
          title: [
            { required: true, type: 'string', message: '请输入标题', trigger: 'blur' },
            { min: 10, message: '标题不少于10字', trigger: 'change' }
          ]
        }
      }
    },
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            if (!this.publishContent) {
              this.$Message.error('内容为空!')
            } else {
              this.publishTopic()
            }
          } else {
            this.$Message.error('Fail!')
          }
        })
      },
      publishTopic () {
        this.$http({
          url: this.Url.publishTopic,
          method: 'post',
          data: {
            accesstoken: this.$token,
            title: this.publish.title,
            tab: this.publish.tabs,
            content: this.publishContent
          }
        }).then((res) => {
          this.$Message.success('成功')
          this.$router.push({name: 'topic', params: {topicId: res.data.topic_id}})
        })
      }
    },
    mounted () {

    }
  }
</script>