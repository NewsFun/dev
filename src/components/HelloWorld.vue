<template>
  <div>
    <sector></sector>
  </div>
</template>

<script>
import sector from '@/components/totUp/totList.vue';

export default {
  name: 'HelloWorld',
  components: {
    sector
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
