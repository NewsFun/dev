<template>
  <div>
    <!-- <button @click="popupShow">show</button> -->
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
      console.log("pop show");
      this.popShow = true;
    },
    popupClose() {
      this.popShow = false;
    }
  }
};
</script>
