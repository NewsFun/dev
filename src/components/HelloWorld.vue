<template>
  <sector :show="true"></sector>
</template>

<script>
import sector from '@/components/popup/popup.vue';

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
