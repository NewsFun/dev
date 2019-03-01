<template>
  <div class="tot-list" :class="[{'border': border}, size]">
    <tot-item v-for="(item, i) in totList" :key="i" :title="item.title" :num-list="item.numList"></tot-item>
  </div>
</template>

<script>
import totItem from "./totItem.vue";

export default {
  components: {
    totItem
  },
  data() {
    return {};
  },
  computed: {},
  props: {
    totList: {
      type: Array,
      default() {
        return [];
      }
    },
    border: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: ""
    }
  }
};
</script>
