<template>
  <div class="koo-bar" :class="size">
    <div class="koo-bar-label" :class="labelAlign" :style="labelStyle">{{ label }}</div>
    <div class="koo-bar-box" :style="lineStyle">
      <div class="koo-bar-chart" :style="chartStyle">
        <div v-if="type==='cursor'" class="koo-bar-line">
          <div class="koo-bar-cursor-title">Your Scaled Score:</div>
        </div>
        <div class="koo-bar-tips" :class="tipsPosition">{{ shownVal }}</div>
      </div>
    </div>
    <div v-if="showMax" class="koo-bar-max">{{ max + unit }}</div>
  </div>
</template>

<script>
import "./resultBar.scss";

export default {
  data() {
    return {
      showNum: 0,
      showWidth: 0,
      state: ["Unfinished", "DONE"],
      timer: null
    };
  },
  computed: {
    labelStyle() {
      return this.labelWidth ? `flex: 0 1 ${this.labelWidth}px` : "";
    },
    lineStyle() {
      let style = {
        backgroundColor: false
      };
      if (this.type) style.backgroundColor = this.color;
      return style;
    },
    chartStyle() {
      let width = "1px";
      if (this.chartWidth) width = this.showWidth + "%";
      return {
        width,
        backgroundColor: this.color
      };
    },
    chartWidth() {
      if (this.type === "state") return 50;
      let minVal = Math.min(this.value, this.max);
      let value = Math.max(this.min, minVal);

      let delta = value - this.min;
      return Math.round((delta * 100) / this.length);
    },
    valueStep() {
      let vstep = this.value / 60;
      return Math.max(0.1, vstep);
    },
    widthStep() {
      let wstep = this.chartWidth / 60;
      return Math.max(0.1, wstep);
    },
    length() {
      return Math.abs(this.max - this.min);
    },
    shownVal() {
      let sv = this.showNum + this.unit;
      return this.showValue || sv;
    }
  },
  props: {
    color: {
      type: String,
      default: "#78287c"
    },
    hasAnimate: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ""
    },
    labelWidth: {
      type: Number,
      default: 0
    },
    labelAlign: {
      type: String,
      default: ""
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    showMax: {
      type: Boolean,
      default: false
    },
    showValue: {
      type: String,
      default: ""
    },
    size: {
      type: String,
      default: ""
    },
    tipsPosition: {
      type: String,
      default: "right"
    },
    time: {
      type: Number,
      default: 1000
    },
    type: {
      type: String,
      default: ""
    },
    unit: {
      type: String,
      default: ""
    },
    value: {
      type: Number,
      default: 50
    }
  },
  watch:{
    value(val) {
      this.setShownValue();
    }
  },
  mounted() {
    this.initChart();
  },
  methods: {
    animate() {
      if (this.showWidth < this.chartWidth) {
        this.update();
      } else {
        this.setShownValue();
        cancelAnimationFrame(this.timer);
        return false;
      }
      this.timer = requestAnimationFrame(this.animate);
    },
    update() {
      this.showNum = Math.ceil(this.showNum + this.valueStep);
      this.showWidth = Math.ceil(this.showWidth + this.widthStep);
    },
    initChart() {
      if (this.hasAnimate && this.chartWidth > 2) {
        this.animate();
      } else {
        this.setShownValue();
      }
    },
    setShownValue() {
      this.showNum =
        this.type === "state" ? this.state[this.value] : this.value;
      this.showWidth = this.chartWidth;
    }
  }
};
</script>
