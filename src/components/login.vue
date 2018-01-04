<template>
  <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
        <FormItem prop="token" :label="messageTip">
            <Input type="text" v-model="formInline.token" :placeholder="messageTip">
            </Input>
        </FormItem>
            <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
        </FormItem>
    </Form>
</template>
<script>
  export default {
    data () {
      return {
        authorList: [],
        messageTip: this.$token,
        formInline: {
          token: this.$token
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
    methods: {
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
        this.$http({
          url: this.Url.login,
          method: 'post',
          params: {
            accesstoken: this.formInline.token
          }
        }).then((res) => {
          this.authorList = res.data
          sessionStorage.token = this.formInline.token
          this.$Message.success('Success!')
          this.$router.push({name : "home"})
        }).catch((res) => {
          console.log('UserCom.vue: ', res)
        })
      }
    }
  }
</script>