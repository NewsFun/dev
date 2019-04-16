<template>
  <div class="orz-tag-list">
    <div v-if="label" class="orz-tag-labels" :style="labelStyle">
      <span class="orz-tag-label">{{label}}</span>
      <span class="orz-tag-separator">{{separator}}</span>
    </div>
    <div class="orz-tag-box">
      <a
        class="orz-tag"
        :class="activeClass(item)"
        v-for="(item, i) in tagList"
        :key="i"
        @click="onTagClick(item)"
      >{{item.label}}</a>
    </div>
  </div>
</template>

<script>
import "./tagList.scss";

export default {
  data() {
    return {
      activeName: ""
    };
  },
  computed: {
    labelStyle() {
      let style = {
        width: false
      };
      if (this.labelWidth) style.width = this.labelWidth + "px";
      return style;
    }
  },
  props: {
    tagList: {
      type: Array,
      default() {
        return [];
      }
    },
    activeItem: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    labelWidth: {
      type: Number,
      default: null
    },
    handleTagChange: {
      type: Function,
      default() {
        return () => {};
      }
    },
    separator: {
      type: String,
      default: "|"
    }
  },
  watch: {
    activeItem(val) {
      this.activeName = val;
    }
  },
  mounted() {
    this.activeName = this.activeItem;
  },
  methods: {
    onTagClick(item) {
      if (this.activeName !== item.name) {
        this.activeName = item.name;
        this.handleTagChange(item);
      }
    },
    activeClass(item) {
      return this.activeName === item.name ? "on" : "";
    }
  }
};
</script>
