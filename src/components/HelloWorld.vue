<template>
  <div>
    <sector></sector>
  </div>
</template>

<script>
import sector from "@/components/calendar/calendar.vue";

export default {
  name: "HelloWorld",
  components: {
    sector
  },
  data() {
    return {
      popShow: false,
      msg: "Welcome to Your Vue.js App"
    };
  },
  methods: {
    popupShow() {
      this.popShow = true;
    },
    popupClose() {
      this.popShow = false;
    }
  }
};
</script>
