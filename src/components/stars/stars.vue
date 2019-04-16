<template>
  <div class="c-star">
    <ul class="c-star-wrapper" :class="starType">
      <li class="star" v-for="(item, i) in totalStars" :class="getActive(i)" :key="i"></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "stars",
  data() {
    return {
      starNum: 0
    }
  },
  props: {
    totalStars: {
      type: Number,
      default: 5
    },
    starType: {
      type: String,
      default: "light"
    },
    grade: {
      type: Number,
      default: 0
    }
  },
  methods: {
    getActive(index) {
      if (index < this.grade) return "on";
      return "";
    }
  }
};
</script>

<style lang="scss">
@import "./stars.scss";
</style>
