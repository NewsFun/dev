<template>
  <div class="gc-breadcrumb">
    <ul class="gc-breadcrumb-wrapper">
      <li class="breadcrumb-item" v-for="(item, i) in links" :key="i">
        <a v-if="item.link" :href="item.link">{{item.text}}</a>
        <span v-else>{{item.text}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
    name: 'breadCrumb',
    computed: {
      lastIndex() {
        return this.links.length - 1
      }
    },
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
  @import "./bread-crumb.scss";
</style>
