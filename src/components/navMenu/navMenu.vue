<template>
  <ul :class="typeClass">
    <li
      class="orz-nav-item"
      v-for="(item, i) in navList"
      :key="i"
      :class="activeClass(item)"
      @click="onItemClick(item)"
    >
      <div class="orz-nav-text">{{item.label}}</div>
    </li>
  </ul>
</template>

<script>
import "./navMenu.scss";

export default {
  data() {
    return {
      activeName: ""
    };
  },
  computed: {
    typeClass() {
      return "orz-nav-" + this.type;
    }
  },
  props: {
    navList: {
      type: Array,
      default() {
        return [];
      }
    },
    activeItem: {
      type: String,
      default: ""
    },
    handleItemChange: {
      type: Function,
      default() {
        return () => {};
      }
    },
    type: {
      type: String,
      default: "row"
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
    onItemClick(item) {
      if (this.activeName !== item.name) {
        this.activeName = item.name;
        this.handleItemChange(item);
      }
    },
    activeClass(item) {
      return this.activeName === item.name ? "on" : "";
    }
  }
};
</script>
