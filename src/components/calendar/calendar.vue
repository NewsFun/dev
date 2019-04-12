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
        <li v-for="(item, i) in monthDays" :key="'d'+i" class="eday">{{item}}</li>
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
      currentYear: YEAR,
      currentMonth: MONTH,
      highlightArr: [],
      weekSign: ["S", "M", "T", "W", "T", "F", "S"],
      isNext: false,
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
  props: {
    date: {
      type: String,
      default: ''
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
    }
  }
};
</script>
