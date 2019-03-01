<template>
  <div>
    <div class="chart-sector" :style="circleStyle">
      <div class="chart-deg" :style="percentStyle"></div>
      <div class="chart-deg" :style="deg"></div>
      <div class="sector-legend-wrap" :style="legendStyle">
        <div class="sector-legend-list">
          <div class="sector-legend">
            <slot></slot>
          </div>
          <div v-if="subLegend" class="sector-legend-sub mg-10">{{subLegend}}</div>
        </div>
      </div>
    </div>
    <div class="chart-title mg-20">{{title}}</div>
  </div>
</template>

<script>
import "./sector.scss";

export default {
  data() {
    return {};
  },
  computed: {
    colorTotal() {
      return this.color[0];
    },
    colorValue() {
      return this.color[1];
    },
    legendStyle() {
      return {
        backgroundColor: this.bgColor
      };
    },
    circleStyle() {
      return {
        backgroundColor: this.colorTotal
      };
    },
    percentStyle() {
      return {
        backgroundColor: this.colorValue
      };
    },
    value() {
      return this.sectorParams.value;
    },
    total() {
      return this.sectorParams.total;
    },
    deg() {
      let transform = false;
      let backgroundColor = this.colorTotal;
      let deg = this.detal - 180;

      if (this.overhalf) {
        deg = this.detal;
        backgroundColor = this.colorValue;
      }
      transform = `rotate(${deg}deg)`;

      return {
        transform,
        backgroundColor
      };
    },
    overhalf() {
      return this.value > this.total / 2;
    },
    detal() {
      if (this.total > 0) {
        let detal = Math.round((this.value * 360) / this.total);
        return detal;
      }
      return 0;
    }
  },
  watch: {
    deg(val) {},
    sectorParams(val) {}
  },
  props: {
    sectorParams: {
      type: Object,
      default() {
        return {
          // 分子
          value: 2,
          // 分母
          total: 10
        };
      }
    },
    // 中心的背景颜色，默认透明
    bgColor: {
      type: String,
      default: ""
    },
    // 环形百分比的颜色，0:底色，1:百分比颜色
    color: {
      type: Array,
      default() {
        return ["#E5C8D6", "#89305C"];
      }
    },
    // 一级标注(圆心里的文字)
    legend: {
      type: String,
      default: ""
    },
    // 二级标注
    subLegend: {
      type: String,
      default: ""
    },
    // 下标题
    title: {
      type: String,
      default: ""
    },
    // 类型(默认扇形)
    type: {
      type: String,
      default: "sector"
    }
  }
};
</script>
