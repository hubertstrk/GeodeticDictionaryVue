<template lang="html">
  <div v-if="translations && translations.length > 0">
    <div class="container">
      <div class="columns">
        <div class="column col-12">
          <div class="result-content">
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>{{primaryLanguage}}</th>
                  <th>{{subsidiaryLanguage}}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) of this.bins[selectedIndex]">
                  <td>{{currStart+index+1}}</td>
                  <td>{{getPrimaryTranslation(item)}}</td>
                  <td>{{getSubsidiaryTranslation(item)}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column col-6">
          <ul class="pagination float-left">
            <li class="page-item"><a>Displaying {{currStart}} to {{currStart + binSize}} of {{translations.length}} items</a></li>
          </ul>
        </div>
        <div class="column col-6">
          <ul class="pagination float-right">
            <li class="page-item">
              <a href="#" @click="decreaseSelectedIndex()" tabindex="-1">Previous</a>
            </li>
            <template v-for="(n, i) in bins.length">
              <li class="page-item" :class="{ 'active': selectedIndex == i}">
                <a href="#" @click="setSelectedIndex(n-1)" tabindex="-1">{{n}}</a>
              </li>
            </template>
            <li class="page-item">
              <a href="#" @click="increaseSelectedIndex()" tabindex="-1">Next</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getPrimaryLanguage, getSubsidiaryLanguage} from '../settings.js'

export default {
  props: ['translations', 'primary', 'subsidiary'],
  data: function () {
    return {
      selectedIndex: 0,
      currStart: 0,
      bins: [],
      binSize: 10
    }
  },
  methods: {
    getPrimaryTranslation: function (item) {
      const primaryLanguage = getPrimaryLanguage()
      const result = primaryLanguage === 'german' ? item.german : item.english
      return result
    },
    getSubsidiaryTranslation: function (item) {
      const subsidiaryLanguage = getSubsidiaryLanguage()
      const result = subsidiaryLanguage === 'german' ? item.german : item.english
      return result
    },
    setSelectedIndex: function (value) {
      this.selectedIndex = value
      this.currStart = this.selectedIndex * this.binSize
    },
    decreaseSelectedIndex: function () {
      if (this.selectedIndex === 0) {
        return
      }
      this.setSelectedIndex(this.selectedIndex - 1)
    },
    increaseSelectedIndex: function () {
      if (this.selectedIndex + 1 === this.bins.length) {
        return
      }
      this.setSelectedIndex(this.selectedIndex + 1)
    },
    dist: function () {
      if ( !this.translations ) {
        return
      }
      const copy = this.translations.slice()
      while (copy.length > 0) {
        const binItems = copy.splice(0, this.binSize) // items are nuked
        this.bins.push(binItems)
      }
    }
  },
  computed: {
    getTranslations: function () {
      if (!this.translations) {
        return
      }
      return this.translations.getItemsByIndex(this.selectedIndex)
    },
    primaryLanguage: function () {
      return getPrimaryLanguage()
    },
    subsidiaryLanguage: function () {
      return getSubsidiaryLanguage()
    }
  },
  watch: {
    translations: function () {
      this.bins = []
      this.selectedIndex = 0
      this.dist()
    }
  }
}
</script>

<style lang="css" scoped>
.result-content{
  margin-top: 10px;
}
</style>
