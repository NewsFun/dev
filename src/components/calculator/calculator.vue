<template>
  <div class="calculator" v-if="showCalculator">
    <div class="change-btn">
      <p class="close el-icon-close" @click="closeCalculator"></p>
    </div>
    <div class="jumbotron">
      <div class="display">
        <div class="screen">
          <p class="pull-left" v-show="showM">M</p>
          <p class="pull-right">
            <span class="result">{{result}}</span>
            <!-- <span class="result">{{result|addComma|toFixed|addDecimal}}</span> -->
          </p>
        </div>
      </div>
    </div>
    <div class="buttons" style="display:inline-block;">
      <calc-button
        v-for="(item, i) in calculateConfig"
        :key="i"
        :item-data="item"
        :handle-click="onBtnClick"
      ></calc-button>
      <!-- <button
        class="btn"
        v-for="(item, i) in calculateConfig"
        :key="i"
        :class="item.style"
        @click="onBtnClick(item)"
      >{{item.label}}</button>-->
      <!-- <div class="btn-group-justified">
        <button class="btn memory" @click="showMemory">MR</button>
        <button class="btn memory" @click="clearMemory">MC</button>
        <button class="btn memory" @click="addMemory">M+</button>
        <button
          class="btn symbol"
          :class="{'disabled':bracesStatus==='right'}"
          @click="leftBraces"
        >(</button>
        <button
          class="btn symbol"
          :class="{'disabled':bracesStatus==='left'}"
          @click="rightBraces"
        >)</button>
      </div>
      <div class="btn-group-justified">
        <button class="btn number" @click="selectNum('7')">7</button>
        <button class="btn number" @click="selectNum('8')">8</button>
        <button class="btn number" @click="selectNum('9')">9</button>
        <button class="btn symbol" @click="calculate('/')">÷</button>
        <button class="btn clear" @click="clearAll">C</button>
      </div>
      <div class="btn-group-justified">
        <button class="btn number" @click="selectNum('4')">4</button>
        <button class="btn number" @click="selectNum('5')">5</button>
        <button class="btn number" @click="selectNum('6')">6</button>
        <button class="btn symbol" @click="calculate('*')">×</button>
        <button class="btn clear" @click="clearPart">CE</button>
      </div>
      <div class="btn-group-justified">
        <button class="btn number" @click="selectNum('1')">1</button>
        <button class="btn number" @click="selectNum('2')">2</button>
        <button class="btn number" @click="selectNum('3')">3</button>
        <button class="btn symbol" @click="calculate('-')">−</button>
        <button class="btn symbol" @click="sqrt">√</button>
      </div>
      <div class="btn-group-justified">
        <button class="btn symbol" @click="plusMinus">
          <div class="btn-plus-minus"></div>
        </button>
        <button class="btn number" @click="selectNum('0')">0</button>
        <button class="btn number" @click="selectNum('.')">
          <strong>.</strong>
        </button>
        <button class="btn symbol" @click="calculate('+')">+</button>
        <button class="btn memory" @click="equal">=</button>
      </div>-->
    </div>
    <div class="transfer">
      <!-- <div
        class="transfer-btn"
        :class="{'active':transferActive}"
        @click="transfer"
      >Transfer Display</div> -->
      <div class="transfer-btn">Transfer Display</div>
    </div>
  </div>
</template>

<script>
import { CALCULATOR } from "./js/config.js";
import calcButton from "./calculateBtn";

export default {
  components: {
    calcButton
  },
  data() {
    return {
      calculateConfig: CALCULATOR,
      expression: '',
      isEnd: false,
      result: '0',
      showM: false
    };
  },
  props: {
    transferActive: {
      // 控制transfer按钮激活状态
      type: Boolean,
      default: false
    },
    showCalculator: {
      // 控制计算器的显示状态
      type: Boolean,
      default: true
    },
    boundingElement: {
      type: HTMLDivElement
    }
  },
  methods: {
    onBtnClick(item) {
      let callback = this[item.callback];
      callback && callback(item);
    },
    delExpression(item) {
      let len = this.expression.length
      this.expression = this.expression.substring(0, len - 1)
      this.result = this.result.substring(0, len - 1)
    },
    addExpression(item) {
      if (this.isEnd) {
        this.result = item.label
        this.expression = item.value || item.label
      } else {
        this.result += item.label
        this.expression += item.value || item.label
      }
      this.isEnd = false
    },
    equal() {
      if (!this.expression) return
      try {
        let result = eval(this.expression)
        this.result = result
        this.expression = ''
      } catch (e) {
        this.result = 'ERROR'
      }
      this.isEnd = true
    },
    closeCalculator() {
      this.$emit("close");
    }
  }
};
</script>

<style lang="scss">
@import "./css/calculator.scss";
</style>
