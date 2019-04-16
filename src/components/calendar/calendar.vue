<template>
  <div class="calendar">
    <div class="calendar-title">
      <div class="prevMouth" :class="isNextClass" @click="prevMonth"></div>
      <span class="currentDate">
        <span>{{ monthSign }}</span>
        {{ currentYear }}
      </span>
      <div class="nextMouth" :class="isPrevClass" @click="nextMonth"></div>
    </div>
    <div class="calendar-body">
      <ul class="week">
        <li v-for="(item, i) in weekSign" :key="i" class="eday">{{item}}</li>
      </ul>
      <ul class="day">
        <li v-for="i in firstDay" :key="i" class="eday"></li>
        <li
          v-for="(item, i) in monthDays"
          :key="'d'+i"
          class="eday"
          @click="onChangeDate(item)"
        >{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import "./css/calendar.scss";

const MONTH_SIGN = [
  "Jan.",
  "Feb.",
  "Mar.",
  "Apr.",
  "May.",
  "Jun.",
  "Jul.",
  "Aug.",
  "Sep.",
  "Oct.",
  "Nov.",
  "Dec."
];
const DATE = new Date();
const YEAR = DATE.getFullYear();
const MONTH = DATE.getMonth();
const DAY = DATE.getDate();

export default {
  data() {
    return {
      // 当前年份
      currentYear: YEAR,
      // 当前月份
      currentMonth: MONTH,
      // 当前日期
      currentDate: 1,
      // 一周标示
      weekSign: ["S", "M", "T", "W", "T", "F", "S"],
      // 是否下一页
      isNext: false,
      // 是否上一页
      isPrev: true
    };
  },
  computed: {
    isNextClass() {
      if (this.isNext) return "";
      return "off";
    },
    isPrevClass() {
      if (this.isPrev) return "";
      return "off";
    },
    // 月份标示，默认英文标
    monthSign() {
      return MONTH_SIGN[this.currentMonth];
    },
    // 一个月的天数
    monthDays() {
      return new Date(this.currentYear, this.currentMonth, 0).getDate();
    },
    // 当月第一天的礼拜数
    firstDay() {
      return new Date(this.currentYear, this.currentMonth, 1).getDay();
    },
    // 当前日期
    resultDate() {
      let result = [this.currentYear, this.currentMonth + 1, this.currentDate];
      if (this.connectType) return result.join(this.connectType)
      return result
    }
  },
  props: {
    date: {
      type: String,
      default: ""
    },
    connectType: {
      type: String,
      default: ""
    },
    handleChangeDate: {
      type: Function,
      default() {
        return () => {};
      }
    }
  },
  watch: {
    resultDate(val) {
      this.handleChangeDate && this.handleChangeDate(val);
    }
  },
  methods: {
    nextMonth() {
      if (this.currentMonth > 10) {
        this.currentYear++;
        this.currentMonth = 0;
      } else {
        this.currentMonth++;
      }
    },
    prevMonth() {
      if (this.currentMonth < 1) {
        this.currentYear--;
        this.currentMonth = 11;
      } else {
        this.currentMonth--;
      }
    },
    onChangeDate(date) {
      this.currentDate = date;
    }
  }
};
</script>
