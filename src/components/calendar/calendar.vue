<template>
  <div class="calendar-wrap bgwhite radius2px shadow">
    <div class="calendar">
      <div class="calendar-title">
        <div
          class="prevMouth"
          @click="prevMonth"
          :style="isPrev ? prevMonthIconActive :prevMonthIcon"
        ></div>
        <span class="currentDate">
          <i>{{ monthSign[currentMonth-1] }}</i>
          {{ currentYear }}
        </span>
        <div
          class="nextMouth"
          @click="nextMonth"
          :style="isNext ? nextMonthIconActive :nextMonthIcon"
        ></div>
      </div>
      <div class="calendar-body">
        <ul class="week">
          <li v-for="(item,index) in weekSign" :key="index">{{item}}</li>
        </ul>
        <ul class="day" v-html="currentDay"></ul>
      </div>
    </div>
  </div>
</template>

<script>
import "./css/calendar.scss";

export default {
  data() {
    return {
      currentYear: new Date().getFullYear(),
      currentMonth: new Date().getMonth() + 1,
      highlightArr: [],
      TueDayCount: 0,
      month_days: [
        31,
        28 + this.TueDayCount,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31
      ],
      weekSign: ["S", "M", "T", "W", "T", "F", "S"],
      monthSign: [
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
      ],
      firstDay: 0, //0-6 0周日
      isNext: false,
      isPrev: true,
      currentDay: "",
      nextMonthIcon:
        "background:url(" +
        require("./img/right_arrow.png") +
        ") no-repeat 0px 7px",
      nextMonthIconActive:
        "background:url(" +
        require("./img/right_arrow_active.png") +
        ") no-repeat 0px 7px",
      prevMonthIcon:
        "background:url(" +
        require("./img/left_arrow.png") +
        ") no-repeat 14px 7px",
      prevMonthIconActive:
        "background:url(" +
        require("./img/left_arrow_active.png") +
        ") no-repeat 14px 7px",
      totalSignDay: 0,
      continueSignDay: 0,
      isSign: false,
      isTodaySign: {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        day: new Date().getDate()
      }
    };
  },
  created() {
    this.TueDayCount = this.is_leap();
    this.firstDay = this.getFirstDay();
    this.dateFill();
  },
  methods: {
    dateFill() {
      //填充day
      var str = "";
      var tempArr = this.highlightArr;
      for (var i = 0; i < this.month_days[this.currentMonth - 1]; i++) {
        if (this.highlightArr[0] === i + 1) {
          if (i + 1 <= 9) {
            str += '<li class="center"><i>' + (i + 1) + "</i></li>";
          } else {
            str += '<li class="right"><i>' + (i + 1) + "</i></li>";
          }
          tempArr.shift();
        } else {
          str += "<li><i>" + (i + 1) + "</i></li>";
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
        !((this.month_days[this.currentMonth - 1] + this.firstDay) % 7 === 0)
      ) {
        var mod = (this.month_days[this.currentMonth - 1] + this.firstDay) % 7;
        var int = (this.month_days[this.currentMonth - 1] + this.firstDay) / 7;
        mod = 7 - mod;
        for (var i = 0; i < mod; i++) {
          endStr += "<li></li>";
        }
      }
      str = str + endStr;
      this.currentDay = str;
    },
    is_leap() {
      return this.currentYear % 100 === 0
        ? this.currentYear % 400 === 0
          ? 1
          : 0
        : this.currentYear % 4 === 0
        ? 1
        : 0;
    },
    getFirstDay() {
      return new Date(this.currentYear, this.currentMonth - 1, 1).getDay();
    },
    nextMonth() {
      if (this.isNext) {
        if (this.currentMonth === 12) {
          this.currentYear = this.currentYear + 1;
          this.currentMonth = 1;
          this.TueDayCount = this.is_leap();
          this.month_days = [
            31,
            28 + this.TueDayCount,
            31,
            30,
            31,
            30,
            31,
            31,
            30,
            31,
            30,
            31
          ];
          this.firstDay = new Date(
            this.currentYear,
            this.currentMonth - 1,
            1
          ).getDay();
        } else {
          this.currentMonth = this.currentMonth + 1;
          this.firstDay = new Date(
            this.currentYear,
            this.currentMonth - 1,
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
          this.TueDayCount = this.is_leap();
          this.month_days = [
            31,
            28 + this.TueDayCount,
            31,
            30,
            31,
            30,
            31,
            31,
            30,
            31,
            30,
            31
          ];
          this.firstDay = new Date(
            this.currentYear,
            this.currentMonth - 1,
            1
          ).getDay();
        } else {
          this.currentMonth = this.currentMonth - 1;
          this.firstDay = new Date(
            this.currentYear,
            this.currentMonth - 1,
            1
          ).getDay();
        }
      }
      this.isPrevFun();
    },
    isNextFun() {
      // 判断还有没有下个月
      if (this.currentYear >= new Date().getFullYear()) {
        if (this.currentMonth - 1 === new Date().getMonth()) {
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
