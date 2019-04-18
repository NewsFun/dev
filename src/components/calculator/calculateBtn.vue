<template>
  <button class="btn" :class="style" @click="onBtnClick">{{label}}</button>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    style() {
      return this.itemData.style;
    },
    label() {
      return this.itemData.label;
    },
    btnValue() {
      return this.itemData.value;
    }
  },
  props: {
    itemData: {
      type: Object,
      default() {
        return {
          label: "",
          style: "",
          callback: ""
        };
      }
    },
    handleClick: {
      type: Function,
      default() {
        return () => {};
      }
    }
  },
  methods: {
    onBtnClick() {
      this.handleClick && this.handleClick(this.itemData);
    }
  }
};
</script>

