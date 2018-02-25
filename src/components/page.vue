<template>
  <div :class=getActiveClass>
    <div class="container">
      <div class="columns">
        <div class="column col-12">
          <menubar @themeChanged="themeChanged"></menubar>
        </div>
      </div>
      <div class="columns">
        <div class="centered column col-6">
          <search></search>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from './navbar'
import search from './search'
import menubar from './menubar'

export default {
  components: {
    navbar, search, menubar
  },
  methods: {
    themeChanged: function (value) {
      this.activeClass = value
    }
  },
  computed: {
    getActiveClass: function () {
      return this.activeClass
    }
  },
  data: function () {
    return {
      activeClass: 'default'
    }
  }
}
</script>

<style lang="css">
.page{
  padding: 5px;
}
</style>
