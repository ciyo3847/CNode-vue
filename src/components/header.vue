<template>
  <div class="header">
    <div class="container">
      <div class="nav">
        <img src="" alt="" class="logo">
        <ul>
          <li><router-link to='/'>首页</router-link></li>
          <li>发表</li>
          <!-- <li>
            <Dropdown>
              <a href="javascript:void(0)">
                英雄
                <Icon type="arrow-down-b"></Icon>
              </a>
              <DropdownMenu slot="list">
                <DropdownItem>全部英雄</DropdownItem>
                <DropdownItem><router-link to='/hero/free-hero'>本周限免英雄</router-link></DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </li> -->
          <li>消息</li>
        </ul>
      </div>
      <div class="extra">
        <a href="javascript:;"><!-- Built with Vue.js -->登录</a>
      </div>
    </div>
  </div>
</template>
<script>
  export default {

  }
</script>