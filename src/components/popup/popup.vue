<template>
  <div class="popup-container" v-show="popShow">
    <div class="popup-cover"></div>
    <transition name="popup" @after-leave="afterLeave">
      <div class="popup-wrap" v-show="contentShow">
        <div class="popup-close">
          <a class="icon-close" @click="close">×</a>
        </div>
        <div class="popup-head popup-box">
          <span class="title">{{title}}</span>
        </div>
        <div class="popup-body popup-box">
          <slot name="content"></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import "./popup.scss";
import { setTimeout } from "timers";

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
    },
    afterLeave(e) {
      this.popShow = false;
      this.handleClose && this.handleClose();
    }
  }
};
</script>

