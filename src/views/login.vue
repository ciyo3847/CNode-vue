<template>
  <div class="content">
    <div class="container">
      <Card>
        <Form ref="formInline" :model="formInline" :rules="ruleInline">
          <FormItem prop="token" label="账户名">
            <Input type="text" v-model="formInline.token" :placeholder="'index'">
            </Input>
          </FormItem>
            <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
          </FormItem>
        </Form>
      </Card>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
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
          if (this.$route.query.redirect) {
            this.$router.push({
              path: this.$route.query.redirect
            })
          } else {
            this.$router.go(-1)
          }
        })
      }
    }
  }
</script>