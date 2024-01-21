<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'app',
  computed:{
    ...mapState(['userInfo'])
  }
}
</script>

<style lang="stylus">
.myul{
  display flex
  flex-wrap wrap
  >li{
    margin-left: 10px
    margin-bottom: 10px
  }
}
</style>
