<template>
  <div class="calculator" v-if="showCalculator">
    <div class="change-btn" :ref="handleId">
      <p class="close el-icon-close" @click="closeCalculator"></p>
    </div>
    <div class="jumbotron">
      <div class="display">
        <div class="screen">
          <p class="pull-left" v-show="showM">M</p>
          <p class="pull-right">
            <span class="result">{{result|addComma|toFixed|addDecimal}}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="buttons" style="display:inline-block;">
      <div class="btn-group-justified">
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
      </div>
    </div>
    <div class="transfer">
      <div
        class="transfer-btn"
        :class="{'active':transferActive}"
        @click="transfer"
      >Transfer Display</div>
    </div>
  </div>
</template>

<script>
export default {
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
  watch: {
    showCalculator(val) {
      if (!val) this.clearAll();
      if (this.showCalculator) {
        this.draggableValue.boundingElement = this.boundingElement;
      }
    }
  },
  mounted() {
    this.draggableValue.handle = this.$refs[this.handleId];
  },
  filters: {
    addDecimal(value) {
      if (value === "ERROR" || value === "(") return value;
      const val =
        value.indexOf(".") > -1 ? value.toString() : value.toString() + ".";
      return val;
    },
    toFixed(value) {
      if (value === "ERROR" || value === "(") return value;
      if (value.indexOf(".") > -1) {
        let arr = value.split(".");
        const len = arr[0].replace(/\D/g, "").length;
        const dot = arr[1].slice(0, 8 - len);
        value = arr[0] + "." + dot;
      }
      return value;
    },
    addComma(value) {
      if (value === "ERROR" || value === "(") return value;
      let val = value.indexOf(".") > -1 ? value.split(".")[0] : value;
      let decimals = value.split(".")[1] || "";
      let plusMinus = value.indexOf("-") > -1 ? "-" : "";
      val = Math.abs(val).toString();
      let n =
        val.length % 3 === 0
          ? Math.floor(val.length / 3) - 1
          : Math.floor(val.length / 3);
      let arr = [];
      for (let i = n; i > 0; i--) {
        arr.push(val.substr(-3 * i, 3));
      }
      const yu = val.length % 3 || 3;
      arr.unshift(val.substr(0, yu));
      return `${plusMinus}${arr.join(",")}.${decimals}`;
    }
  },
  created() {
    math.config({
      number: "BigNumber"
    });
  },
  data() {
    return {
      handleId: "handle-id",
      draggableValue: { handle: undefined },
      showM: false,
      memory: "0",
      firstParams: "", // 保存的旧参数
      calculateType: null, // 运算符号
      lastParams: "", // 新输入参数
      result: "0", // 运算结果 = (保存的旧参数 运算符号 新输入的参数)
      bracesStatus: "left", // 控制左右括号可点击状态
      calString: "", // 用于计算的字符串
      bracesString: "", // 括号内的字符串
      bracesCalculateType: null,
      addResult: true, // 计算结果时是否能够拼接当前result
      addPlusMinus: true, // 能否添加负号的控制
      openLeftBraces: false
    };
  },
  methods: {
    selectNum(num) {
      if (this.result === "ERROR") return;
      const limit = this.result.indexOf(".") > -1 ? 9 : 8;
      if (this.lastParams.length >= limit) return;
      if (num === "." && this.lastParams.indexOf(".") > -1) return;
      this.addResult = true;
      this.addPlusMinus = true;
      this.calculateType = null;
      this.bracesCalculateType = null;
      this.lastParams += num;
      if (this.lastParams[0] === ".") this.lastParams = "0" + this.lastParams;
      this.result = this.lastParams;
    },
    calculate(type) {
      if (this.result === "ERROR" || this.result === "(") return;
      this.lastParams = "";
      this.addPlusMinus = false;
      this.addResult = false;
      if (this.openLeftBraces) {
        if (!this.bracesCalculateType) {
          this.bracesString += this.result;
          if (type === "*" || type === "/") {
            if (
              this.bracesString.indexOf("+") === -1 &&
              this.bracesString.indexOf("-") === -1
            ) {
              this.result = math
                .parser()
                .eval(this.bracesString)
                .toString();
            }
          }
        } else {
          this.bracesString = this.bracesString.substr(
            0,
            this.bracesString.length - 1
          );
        }
        this.bracesString += type;
        this.bracesCalculateType = type;
        // console.log(this.bracesString);
        return;
      }
      if (!this.calculateType) {
        this.calString += this.result;
      } else {
        this.calString = this.calString.substr(0, this.calString.length - 1);
        if (type === "+" || type === "-") {
          this.result = math
            .parser()
            .eval(this.calString)
            .toString();
        } else if (type === "*" || type === "/") {
          this.calString = this.result;
        }
        this.firstParams = this.result;
        this.calString += type;
        this.calculateType = type;
        return;
      }
      if (this.firstParams && (type === "+" || type === "-")) {
        this.result = math
          .parser()
          .eval(this.calString)
          .toString();
        this.calString = this.result;
        this.firstParams = this.result;
      } else if (this.firstParams && (type === "*" || type === "/")) {
        if (
          this.calString.indexOf("+") === -1 &&
          this.calString.indexOf("-") === -1
        ) {
          this.result = math
            .parser()
            .eval(this.calString)
            .toString();
        } else {
          const num =
            this.calString.indexOf("-") > -1
              ? this.calString.indexOf("-")
              : this.calString.indexOf("+");
          const str = this.calString.substr(num + 1, this.calString.length);
          this.result = math
            .parser()
            .eval(str)
            .toString();
        }
      }
      // console.log(this.calString);
      this.firstParams = this.result;
      this.calString += type;
      this.calculateType = type;
    },
    equal() {
      if (this.result === "ERROR" || this.result === "(") return;
      this.lastParams = "";
      this.calculateType = null;
      if (this.openLeftBraces) {
        this.bracesString = this.addResult
          ? (this.bracesString += this.result)
          : this.bracesString.substr(0, this.bracesString.length - 1);
        this.bracesString = math.parser().eval(this.bracesString);
        this.calString += this.bracesString;
        const result = math
          .parser()
          .eval(this.calString)
          .toString();
        this.result = this.checkValid(result);
        this.bracesStatus = "left";
        this.openLeftBraces = false;
        this.bracesString = "";
        this.calString = "";
        this.addResult = true;
        this.addPlusMinus = true;
        return;
      }
      if (this.addResult) this.calString += this.result;
      // console.log(this.calString);
      if (
        this.calString.endsWith("*") ||
        this.calString.endsWith("/") ||
        this.calString.endsWith("+") ||
        this.calString.endsWith("-")
      ) {
        this.calString = this.calString.substr(0, this.calString.length - 1);
      }
      const result =
        this.calString === ""
          ? "0"
          : math
              .parser()
              .eval(this.calString)
              .toString();
      this.result = this.checkValid(result);
      this.calString = "";
      this.addResult = true;
      this.addPlusMinus = true;
    },
    // 左括号
    leftBraces() {
      if (this.result === "ERROR" || this.bracesStatus === "right") return;
      this.bracesStatus = "right";
      this.openLeftBraces = true;
      this.lastParams = "";
      this.result = "(";
    },
    // 右括号
    rightBraces() {
      if (this.result === "ERROR" || this.bracesStatus === "left") return;
      this.bracesStatus = "left";
      this.lastParams = "";
      this.openLeftBraces = false;
      if (this.result === "(") return (this.result = "0");
      if (this.addResult) this.bracesString += this.result;
      if (
        this.bracesString.endsWith("*") ||
        this.bracesString.endsWith("/") ||
        this.bracesString.endsWith("+") ||
        this.bracesString.endsWith("-")
      ) {
        this.bracesString = this.bracesString.substr(
          0,
          this.bracesString.length - 1
        );
      }
      const result = math
        .parser()
        .eval(this.bracesString)
        .toString();
      this.result = this.checkValid(result);
      this.bracesString = "";
    },
    // 修改正负号
    plusMinus() {
      if (
        this.result === "ERROR" ||
        !parseFloat(this.result) ||
        !this.addPlusMinus
      )
        return;
      this.result = (0 - parseFloat(this.result)).toString();
      this.lastParams = (0 - parseFloat(this.lastParams)).toString() || "";
    },
    // 开根号
    sqrt() {
      if (this.result === "ERROR") return;
      if (parseFloat(this.result) < 0) return (this.result = "ERROR");
      const result = Math.sqrt(parseFloat(this.result)).toString();
      this.result = this.checkValid(result);
    },
    checkValid(val) {
      if (parseFloat(val) >= 100000000) return "ERROR";
      if (parseFloat(val) > -0.0000001 && parseFloat(val) < 0.0000001)
        return "0";
      return val;
    },
    showMemory() {
      if (!this.showM) return;
      this.addResult = false;
      this.lastParams = "";
      if (this.openLeftBraces) {
        this.bracesString += this.memory;
      } else {
        this.calString += this.memory;
      }
      this.result = this.memory.toString();
    },
    clearMemory() {
      this.addResult = true;
      this.showM = false;
      this.memory = "0";
    },
    addMemory() {
      this.showM = true;
      this.lastParams = "";
      this.memory = math.parser().eval(this.result + "+" + this.memory);
    },
    // 清空输入数字
    clearPart() {
      if (
        this.result === "ERROR" ||
        this.calculateType ||
        this.bracesCalculateType
      )
        return;
      this.lastParams = "";
      this.result = "0";
      this.addResult = false;
    },
    // 初始化计算器
    clearAll() {
      this.firstParams = "";
      this.lastParams = "";
      this.result = "0";
      this.calculateType = null;
      this.bracesStatus = "left";
      this.calString = "";
      this.addResult = true;
      this.addPlusMinus = true;
      this.openLeftBraces = false;
      this.bracesString = "";
      this.bracesCalculateType = null;
    },
    transfer() {
      if (!this.transferActive) return;
      this.$emit("transfer", parseFloat(this.result));
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
