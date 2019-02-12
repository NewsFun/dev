<template>
  <div class="popup-container" v-if="popShow">
    <div class="popup-cover"></div>
    <div class="popup-wrap">
      <div class="popup-head popup-box">
        <span class="title">{{title}}</span>
      </div>
      <div class="popup-body">
        <slot name="content"></slot>
      </div>
      <div class="popup-footer">
        <span class="btn cancel" v-if="showCancelBtn" @click="onCancel">{{cancelText}}</span>
        <span class="btn" v-if="showConfirmBtn" @click="handleConfirm">{{confirmText}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import "./popup.scss";

export default {
  name: "popup",
  data() {
    return {
      popShow: false
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
    popupInfo: {
      type: Object,
      default() {
        return {
          content: [],
          cancelText: "Cancel",
          confirmText: "Continue",
          showCancelBtn: true,
          showConfirmBtn: true
        };
      }
    },
    handleCancel: {
      type: Function,
      default() {
        return () => {};
      }
    },
    handleConfirm: {
      type: Function,
      default() {
        return () => {};
      }
    }
  },
  computed: {
    content() {
      return this.popupInfo.content;
    },
    cancelText() {
      return this.popupInfo.cancelText || "Cancel";
    },
    confirmText() {
      return this.popupInfo.confirmText || "Continue";
    },
    showCancelBtn() {
      return this.popupInfo.showCancelBtn;
    },
    showConfirmBtn() {
      return this.popupInfo.showConfirmBtn;
    }
  },
  watch: {
    popupInfo(val) {}
  },
  mounted() {
    this.popShow = this.show;
  },
  methods: {
    close() {
      this.popShow = false;
    },
    onCancel() {
      this.popShow = false;
      this.handleCancel && this.handleCancel();
    }
  }
};
</script>

