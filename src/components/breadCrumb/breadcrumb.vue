<template>
  <div class="gc-breadcrumb">
    <ul class="gc-breadcrumb-wrapper">
      <li class="breadcrumb-item" v-for="(item,index) in links" :key="index">
        <a :href="item.link" v-if="index<links.length-1">{{item.text}}</a>
        <span v-if="index===links.length-1">{{item.text}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
    name: 'breadcrumb',
    props: {
        links: {
            type: Array,
            default() {
                return []
            }
        }
    }
}
</script>

<style lang="scss" scoped>
  .gc-breadcrumb {
    line-height: 16px;
    font-size: 12px;
    color: #B1B2B2;
    .breadcrumb-item {
      position: relative;
      margin-left: 5px;
      padding-right: 15px;
      display: inline-block;
      a, span {
        text-decoration: none;
        color: #B1B2B2;
      }
      a {
        &:hover {
          color: #09D198;
        }
      }
      &:after {
        content: '';
        position: absolute;
        transform: translate(0, -50%);
        top: 50%;
        right: 0;
        width: 10px;
        height: 1px;
        background: #B1B2B2;
      }
      &:first-child {
        margin-left: 0;
      }
      &:last-child {
        &:after {
          display: none;
        }
      }
    }
  }
</style>
