<template>
  <div class="dialog-container" v-if="popShow">
    <div class="dialog-cover"></div>
    <div class="dialog-wrap">
      <div class="dialog-head dialog-box" v-if="showTitle">
        <span class="title">{{title}}</span>
        <span class="close" @click="onClose">×</span>
      </div>
      <div class="dialog-body">
        <slot></slot>
      </div>
      <div class="dialog-footer">
        <span
          class="dialog-btn"
          :class="btnClass"
          v-if="showCancelBtn"
          @click="onCancel"
        >{{cancelText}}</span>
        <span
          class="dialog-btn"
          :class="btnClass"
          v-if="showConfirmBtn"
          @click="handleConfirm"
        >{{confirmText}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "messageBox",
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
    showTitle: {
      type: Boolean,
      default: true
    },
    cancelText: {
      type: String,
      default: "取消"
    },
    confirmText: {
      type: String,
      default: "确认"
    },
    content: {
      type: String,
      default: ""
    },
    showCancelBtn: {
      type: Boolean,
      default: true
    },
    showConfirmBtn: {
      type: Boolean,
      default: true
    },
    handleClose: {
      type: Function,
      default() {
        return () => {};
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
    },
    buttonType: {
      type: String,
      default: "normal"
    }
  },
  computed: {
    btnClass() {
      return this.buttonType === "solid" ? "on" : "";
    }
  },
  watch: {
    show(val) {
      this.popShow = val;
    }
  },
  mounted() {
    this.popShow = this.show;
  },
  methods: {
    onClose() {
      this.popShow = false;
      this.handleClose && this.handleClose();
    },
    onCancel() {
      this.popShow = false;
      this.handleCancel && this.handleCancel();
    }
  }
};
</script>
<style lang="scss">
@import "./css/dialog-box.scss";
</style>
