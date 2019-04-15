<template>
  <div class="c-stars">
    <div class="c-star">
      <ul class="c-star-wrapper" v-if="starType==='light'">
        <li class="star" :class="{'active':item}" v-for="(item,index) in gradeArr" :key="index"></li>
      </ul>
      <ul class="c-star-wrapper" v-if="starType==='dark'">
        <li class="dark-star" :class="{'active':item}" v-for="(item,index) in gradeArr" :key="index"></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
    name: 'stars',
    props: {
        starType: {
            type: String,
            default: 'light'
        },
        grade: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            // gradeArr: []
        }
    },
    computed: {
        gradeArr() {
            let list = []
            for (let i = 0; i < 5; i++) {
                if (i + 1 <= this.grade) {
                    list[i] = true
                } else {
                    list[i] = false
                }
            }
            return list
        }
    },
    created() {
        // for (let i = 0; i < 5; i++) {
        //     if (i + 1 <= this.grade) {
        //         this.gradeArr[i] = true
        //     } else {
        //         this.gradeArr[i] = false
        //     }
        // }
    }
}
</script>

<style lang="scss" scoped>
  .c-stars {
    .c-star {
      .c-star-wrapper {
        display: flex;
        .star {
          margin-right: 4px;
          width: setSize(30px);
          height: setSize(30px);
          background: url("./img/star.png") center no-repeat;
          background-size: 90%;
          &.active {
            background: url("./img/star-active.png") center no-repeat;
            background-size: 90%;
          }
        }
        .dark-star {
          margin-right: 4px;
          width: setSize(30px);
          height: setSize(30px);
          background: url("./img/lose.png") center no-repeat;
          background-size: 90%;
          &.active {
            background: url("./img/lose-active.png") center no-repeat;
            background-size: 90%;
          }
        }
      }
    }
  }
</style>
