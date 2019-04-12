<template>
  <div class="calendar-wrap">
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
          <li v-for="(item,index) in weekSign" :key="index">{{item}}</li>
        </ul>
        <ul class="day" v-html="currentDay"></ul>
        <!-- <ul class="day">
          <li v-for="(item, i) in monthDays" :key="i">{{item}}</li>
        </ul> -->
      </div>
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
      currentYear: YEAR,
      currentMonth: MONTH,
      highlightArr: [],
      weekSign: ["S", "M", "T", "W", "T", "F", "S"],
      isNext: false,
      isPrev: true,
      currentDay: "",
      totalSignDay: 0,
      continueSignDay: 0,
      isSign: false,
      isTodaySign: {
        year: YEAR,
        month: MONTH,
        day: DAY
      }
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
    monthSign() {
      return MONTH_SIGN[this.currentMonth];
    },
    monthDays() {
      return new Date(this.currentYear, this.currentMonth, 0).getDate();
    },
    firstDay() {
      return new Date(this.currentYear, this.currentMonth, 1).getDay();
    }
  },
  created() {
    this.firstDay = this.getFirstDay();
    this.dateFill();
  },
  methods: {
    dateFill() {
      //填充day
      var str = "";
      var tempArr = this.highlightArr;
      for (var i = 0; i < this.monthDays; i++) {
        if (this.highlightArr[0] === i + 1) {
          if (i + 1 <= 9) {
            str += '<li class="center"><span>' + (i + 1) + "</span></li>";
          } else {
            str += '<li class="right"><span>' + (i + 1) + "</span></li>";
          }
          tempArr.shift();
        } else {
          str += "<li><span>" + (i + 1) + "</span></li>";
        }
      }
      //补充前边位置
      var frontStr = "";
      if (this.firstDay > 0) {
        for (var j = 0; j < this.firstDay; j++) {
          frontStr += "<li></li>";
        }
      }
      str = frontStr + str;
      //补充后边位置
      var endStr = "";
      if (
        !((this.monthDays + this.firstDay) % 7 === 0)
      ) {
        var mod = (this.monthDays + this.firstDay) % 7;
        var int = (this.monthDays + this.firstDay) / 7;
        mod = 7 - mod;
        for (var i = 0; i < mod; i++) {
          endStr += "<li></li>";
        }
      }
      str = str + endStr;
      this.currentDay = str;
    },
    getFirstDay() {
      return new Date(this.currentYear, this.currentMonth, 1).getDay();
    },
    nextMonth() {
      if (this.isNext) {
        if (this.currentMonth === 12) {
          this.currentYear = this.currentYear + 1;
          this.currentMonth = 1;
          this.firstDay = new Date(
            this.currentYear,
            this.currentMonth,
            1
          ).getDay();
        } else {
          this.currentMonth = this.currentMonth + 1;
          this.firstDay = new Date(
            this.currentYear,
            this.currentMonth,
            1
          ).getDay();
        }
      }
      this.isNextFun();
    },
    prevMonth() {
      if (this.isPrev) {
        if (this.currentMonth === 1) {
          this.currentYear = this.currentYear - 1;
          this.currentMonth = 12;
          this.firstDay = new Date(
            this.currentYear,
            this.currentMonth,
            1
          ).getDay();
        } else {
          this.currentMonth = this.currentMonth - 1;
          this.firstDay = new Date(
            this.currentYear,
            this.currentMonth,
            1
          ).getDay();
        }
      }
      this.isPrevFun();
    },
    isNextFun() {
      // 判断还有没有下个月
      if (this.currentYear >= new Date().getFullYear()) {
        if (this.currentMonth === new Date().getMonth()) {
          this.isNext = false;
          this.isPrev = true;
        }
      } else {
        this.isNext = true;
        this.isPrev = true;
      }
    },
    isPrevFun() {
      // 判断还有没有上个月
      if (this.currentYear === 2017 && this.currentMonth === 8) {
        this.isPrev = false;
        this.isNext = true;
      } else {
        this.isPrev = true;
        this.isNext = true;
      }
    }
  }
};
</script>
