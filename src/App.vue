<template>
  <div id="app">    
    <page></page>
  </div>
</template>

<script>
import page from './components/page'

require('spectre.css/docs/dist/spectre.min.css')
require('spectre.css/docs/dist/spectre-icons.min.css')
require('./css/theme-vintage.css')
require('./css/theme-space.css')
require('./css/theme-hamii.css')
require('./css/theme-yrsite.css')
require('./css/theme-quietcry.css')

export default {
  name: 'app',
  components: {
    page
  }
}
</script>

<style scoped>
div {
  margin-top:10px;
}
</style>
