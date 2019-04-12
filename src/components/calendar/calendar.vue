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
        <ul class="day">
          <li v-for="i in firstDay" :key="i"></li>
          <li v-for="(item, j) in monthDays" :key="j">{{item}}</li>
        </ul>
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
    // this.dateFill();
  },
  methods: {
    nextMonth() {
      if (this.isNext) {
        if (this.currentMonth > 10) {
          this.currentYear++;
          this.currentMonth = 0;
        } else {
          this.currentMonth++;
        }
      }
      this.isNextFun();
    },
    prevMonth() {
      if (this.isPrev) {
        if (this.currentMonth < 1) {
          this.currentYear--;
          this.currentMonth = 11;
        } else {
          this.currentMonth--;
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
