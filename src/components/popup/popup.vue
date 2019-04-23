<template>
  <div class="popup-container" v-show="popShow">
    <div class="popup-cover"></div>
    <transition name="popup" @after-leave="afterLeave">
      <div class="popup-wrap popup-enter-active" v-show="contentShow">
        <div class="popup-close">
          <div class="icon-close" @click="close">×</div>
        </div>
        <div class="popup-head popup-box">
          <span class="title">{{title}}</span>
        </div>
        <div class="popup-body">
          <div class="popup-box">
            <slot></slot>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "popup",
  data() {
    return {
      popShow: false,
      contentShow: true
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "提示"
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    handleClose: {
      type: Function,
      default() {
        return () => {};
      }
    }
  },
  watch: {
    show(val) {
      this.popShow = val;
      this.contentShow = val;
    }
  },
  mounted() {
    this.popShow = this.show;
    // this.contentShow = this.show;
  },
  methods: {
    close() {
      this.contentShow = false;
      // this.afterLeave();
    },
    afterLeave(e) {
      this.popShow = false;
      this.handleClose && this.handleClose();
    }
  }
};
</script>
<style lang="scss">
@import "./css/popup.scss";
</style>


