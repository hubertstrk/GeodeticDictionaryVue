<template>
  <div class="centered">
    <h1>Search</h1>
    <div class="has-icon-left">
      <input class="form-input input-lg" type="text" id="input" @keyup.prevent="change" placeholder="Enter phrase..." />
    </div>
    
    <div style="margin-top:10px;" v-if="translations && translations.length > 30">
      <div class="toast toast-primary">
        The query led to a high number of results. To receive a clearer result narrow your search expression.
      </div>
    </div>

    <div style="margin-top:10px;" v-if="translations && translations.length <= 0">
      <div class="empty">
        <div class="empty-icon">
          <i class="icon icon-search"></i>
        </div>
        <h4 class="empty-title">No translation found</h4>
        <p class="empty-subtitle">Unfortunately we could not find any translation for the specified search expression.</p>
        <!-- <div class="empty-action">
          <input class="btn btn-primary" type="button" value="Send a message" onClick="window.location.href='mailto:hubert.staerk@gmail.com';" />
        </div> -->
      </div>
    </div>
    <translations v-if="searchText.length > 0" :translations="translations" :primary="primary" :subsidiary="subsidiary"></translations>
  </div>
</template>

<script>
import translations from './translations.vue'
import {createSimpleSearchUrl, getQueryOptions} from '../query-builder.js'
//const _ = require('lodash')

export default {
  name: 'search',
  components: {translations},
  data: function () {
    return {
      translations: null,
      primary: 'german',
      subsidiary: 'english',
      searchText: ''
    }
  },
  methods: {
    change: function () {
      //_.debounce(, 200, false)
      this.sendRequest()
    },
    sendRequest: function() {
      this.searchText = event.target.value
      this.$emit('changed', event.target.value)
      const url = createSimpleSearchUrl(event.target.value)
      const options = getQueryOptions()

      fetch(url, options)
        .then(this.getJson)
        .then(this.getResult)
        .catch(this.logError)
    },
    getJson: function (response) {
      return response.json()
    },
    getResult: function (result) {
      this.translations = result.value
    },
    logError: function (error) {
      console.error(error)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
