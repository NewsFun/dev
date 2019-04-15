<template>
  <div class="gc-breadcrumb">
    <ul class="gc-breadcrumb-wrapper">
      <li class="breadcrumb-item" v-for="(item, i) in links" :key="i">
        <span :class="linkClass(item.link)" @click="jumpPage(item.link)">{{item.text}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "breadCrumb",
  props: {
    links: {
      type: Array,
      default() {
        return [];
      }
    },
    handleBeforeJump: {
      type: Function,
      default() {
        return () => {};
      }
    }
  },
  methods: {
    linkClass(link) {
      if (link) return "link";
      return "";
    },
    jumpPage(item) {
      let jump = this.handleBeforeJump && this.handleBeforeJump(item);
      if (jump) {
        let link = item.link;
        if (link) location.href = link;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./bread-crumb.scss";
</style>
