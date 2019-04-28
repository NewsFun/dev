<template>
  <div class="msgbox-container" v-if="popShow">
    <div class="msgbox-cover"></div>
    <div class="msgbox-wrap">
      <div class="msgbox-head msgbox-box" v-if="showTitle">
        <span class="title">{{title}}</span>
        <span class="close" @click="close">×</span>
      </div>
      <div class="msgbox-body msgbox-box">
        <div :class="contentClass">{{content}}</div>
      </div>
      <div class="msgbox-footer">
        <span
          class="msgbox-btn"
          :class="btnClass"
          v-if="showCancelBtn"
          @click="onCancel"
        >{{cancelText}}</span>
        <span
          class="msgbox-btn"
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
    center: {
      type: Boolean,
      default: false
    },
    showCancelBtn: {
      type: Boolean,
      default: true
    },
    showConfirmBtn: {
      type: Boolean,
      default: true
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
    handleClose: {
      type: Function,
      default() {
        return () => {};
      }
    },
    btnType: {
      type: String,
      default: "normal"
    }
  },
  computed: {
    btnClass() {
      return this.btnType === "solid" ? "on" : "";
    },
    contentClass() {
      return this.center && "center";
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
    close() {
      this.popShow = false;
      this.handleClose && this.handleClose();
    },
    onCancel() {
      this.handleCancel && this.handleCancel();
    }
  }
};
</script>
<style lang="scss">
@import "./css/msg-box.scss";
</style>
