<template>
  <div class="koo-result">
    <div
      v-if="hasControlBtn"
      style="margin-right: 10px"
      :class="getPaginationClass(hasPrev)"
      :disabled="hasPrev"
      @click="onPrev"
    >
      <span class="el-icon-arrow-left"></span>
    </div>
    <ul class="koo-result-box" :class="multiStyle">
      <li v-for="(item, i) in btnList" :key="i" :class="getAnswerClass(item)">
        <a @click="handleItemClick(item)">{{item.no}}</a>
      </li>
    </ul>
    <div
      v-if="hasControlBtn"
      style="margin-left: 10px"
      :class="getPaginationClass(hasNext)"
      :disabled="hasNext"
      @click="onNext"
    >
      <span class="el-icon-arrow-right"></span>
    </div>
  </div>
</template>

<script>
import "./resultList.scss";

export default {
  data() {
    return {
      pageNum: 0,
      hasPrev: true,
      hasNext: false
    };
  },
  computed: {
    // 分页样式
    multiStyle() {
      return this.hasControlBtn ? "isSingleLine" : "";
    },
    // 总页数
    total() {
      let len = this.resultList.length;
      return Math.ceil(len / this.pageSize);
    },
    // 分页返回分页数组，否则默认数组
    btnList() {
      if (this.hasControlBtn) return this.pagnList;
      return this.resultList;
    },
    // 分页数组(二维)
    pagnList() {
      let btnList = [];
      const len = this.resultList.length;
      if ((this.pageNum + 1) * this.pageSize > len) {
        btnList = this.resultList.slice(0 - this.pageSize);
      } else {
        btnList = this.resultList.slice(
          this.pageNum * this.pageSize,
          (this.pageNum + 1) * this.pageSize
        );
      }
      return btnList;
    }
  },
  watch: {
    pageNum(val) {
      this.hasPrev = val < 1;
      this.hasNext = val > this.total - 2;
    }
  },
  props: {
    // 是否有翻页按钮
    hasControlBtn: {
      type: Boolean,
      default: true
    },
    // 答案列表
    resultList: {
      type: Array,
      default() {
        return [];
      }
    },
    // 分页长度
    pageSize: {
      type: Number,
      default: 20
    },
    // 答案点击回调方法
    handleItemClick: {
      type: Function,
      default() {
        return () => {};
      }
    },
    // 是否显示答案状态
    showResult: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    // 答案状态样式
    getAnswerClass(item) {
      return this.showResult ? this.showAnswerClass(item) : this.hideAnswerClass(item);
    },
    // 分页按钮状态样式
    getPaginationClass(state) {
      let pagn = state ? "-light" : "-dark";
      return "koo-btn-pagn" + pagn;
    },
    // 上一页
    onPrev() {
      if (this.pageNum > 0) this.pageNum--;
    },
    // 下一页
    onNext() {
      if (this.pageNum < this.total - 1) this.pageNum++;
    },
    // 显示答案状态样式
    showAnswerClass(item) {
      let className = "koo-btn-result";
      if (item.answerStatus === 1) {
        className += item.correctStatus ? "-right" : "-wrong";
      } else if (item.answerStatus === 2) {
        className += "-wrong";
      }
      return className;
    },
    // 隐藏答案状态样式
    hideAnswerClass(item) {
      let className = "koo-btn-result";
      if (item.answerStatus === 1) {
        className += "-right";
      }
      return [className, "hide-answer"];
    }
  }
};
</script>
