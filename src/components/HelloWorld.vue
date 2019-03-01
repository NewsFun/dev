<template>
  <div>
    <button @click="popupShow">show</button>
    <sector :show="popShow" :handle-close="popupClose">
      <ul slot="content">
        <li v-for="item in 5" :key="item">{{item}}</li>
      </ul>
    </sector>
  </div>
</template>

<script>
import sector from "@/components/popup/popup.vue";

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
