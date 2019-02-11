<template>
  <div class="tot-item">
    <div class="tot-item-title">{{title}}</div>
    <ul class="tot-item-vals">
      <li class="tot-item-val" v-for="(item, i) in numList" :key="i">
        <span class="tot-item-key" :style="computeStyle(item, 0)">{{item.value}}</span>
        <span v-if="item.unit" class="tot-item-unit" :style="computeStyle(item, 1)">{{item.unit}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import "./tot.scss";

export default {
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    numList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    computeStyle(item, index) {
      let c = false;
      let color = item.color;
      if (color && color[index]) c = color[index];

      return {
        color: c
      };
    }
  }
};
</script>
