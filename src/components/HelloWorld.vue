<template>
  <div>
    <sector></sector>
  </div>
</template>

<script>
import sector from '@/components/chart/sector.vue';

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

