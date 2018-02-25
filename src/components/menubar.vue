<template>
  <div>
    <header class="navbar">
      <section class="navbar-section">
        <!--b><a href="#" class="menu-item mr-10">Geodetic Dictionary</a></b-->
        <div class="dropdown">
          <a href="#" class="btn btn-link dropdown-toggle" tabindex="0">
            Language <i class="icon icon-caret"></i>
          </a>
          <ul class="menu">
            <checkbox :data="languageData[0]" @valueChanged="onLanguageChanged"></checkbox>
            <checkbox :data="languageData[1]" @valueChanged="onLanguageChanged"></checkbox>
          </ul>
        </div>
        <div class="dropdown">
          <a href="#" class="btn btn-link dropdown-toggle" tabindex="0">
            Options <i class="icon icon-caret"></i>
          </a>
          <ul class="menu">
            <checkbox :data="optionData[0]" @valueChanged="onOptionChanged"></checkbox>
            <checkbox :data="optionData[1]" @valueChanged="onOptionChanged"></checkbox>
          </ul>
        </div>
      </section>
      <section class="navbar-center">
        <figure class="avatar avatar-xm mr-10" data-initial="gd"></figure>
        <div class="text-large"><a href="#" class="menu-item mr-10">Geodetic Dictionary</a></div>
      </section>
      <section class="navbar-section">
        <div class="dropdown">
          <a href="#" class="btn btn-link dropdown-toggle" tabindex="0">
            Theme <i class="icon icon-caret"></i>
          </a>
          <ul class="menu">
            <div class="form-group">
              <li class="menu-item">
                <a href="#" @click="onThemeChanged('spectre')">
                <label class="form-radio">
                  <input type="radio" name="theme" checked/>
                  <i class="form-icon"></i> Spectre
                </label>
                </a>
              </li>
              <li class="menu-item">
                <a href="#" @click="onThemeChanged('hamii')">
                <label class="form-radio">
                  <input type="radio" name="theme" />
                  <i class="form-icon"></i> Hamii
                </label>
                </a>
              </li>
              <li class="menu-item">
                <a href="#" @click="onThemeChanged('quietcry')">
                <label class="form-radio">
                  <input type="radio" name="theme" />
                  <i class="form-icon"></i> Quiet Cry
                </label>
                </a>
              </li>
              <li class="menu-item">
                <a href="#" @click="onThemeChanged('vintage')">
                <label class="form-radio">
                  <input type="radio" name="theme" />
                  <i class="form-icon"></i> Vintage
                </label>
                </a>
              </li>
              <li class="menu-item">
                <a href="#" @click="onThemeChanged('space')">
                <label class="form-radio">
                  <input type="radio" name="theme" />
                  <i class="form-icon"></i> Space
                </label>
                </a>
              </li>
              <li class="menu-item">
                <a href="#" @click="onThemeChanged('yrsite')">
                <label class="form-radio">
                  <input type="radio" name="theme" />
                  <i class="form-icon"></i> YR Site
                </label>
                </a>
              </li>
            </div>
          </ul>
        </div>
        <a href="#" class="btn btn-link">
          <span class="badge" data-badge="0">
            Translations
          </span>
        </a>
        <!--a href="#" class="btn btn-link">Login</a-->
      </section>
    </header>
  </div>
</template>

<script>
import {getPrimaryLanguage, setPrimaryLanguage, getOption, setOption, getCookies} from '../settings.js'
import {createCountUrl, getQueryOptions} from '../query-builder.js'
import checkbox from './checkbox.vue'
import _ from 'lodash'

export default {
  data: function() {
    return { languageData: [
        { title: 'German', subTitle: 'Select to reach German matches and English translations.', value: 'german', active: true },
        { title: 'English', subTitle: 'Select to reach English matches and German translations.', value: 'english', active: false },      
      ],
      optionData: [
        { title: 'Exact Match', subTitle: 'Select this option to reach translations matching the whole search expression.', value: 'exact', active: false },
        { title: 'Loose Match', subTitle: 'Select this option to reach translations matching the whole search expression and parts of the search expression.', value: 'loose', active: true },
      ],
      translationsCount: 0
    }
  },
  methods: {
    onLanguageChanged: function (item) {
      setPrimaryLanguage(item.value)
      this.languageData[1].active = !this.languageData[1].active
      this.languageData[0].active = !this.languageData[0].active
    },
    onOptionChanged: function(item) {
      setOption(item.value)
      this.optionData[1].active = !this.optionData[1].active
      this.optionData[0].active = !this.optionData[0].active
    },
    onThemeChanged: function(value) {
      this.$emit('themeChanged', value)  
    },
    getJson: function (response) {
      return response.json()
    },
    getResult: function (result) {
      const badge = document.querySelector('.badge')
      badge.setAttribute('data-badge', result)
    },
    logError: function (error) {
      console.log(error)
      // this is a comment
    },
    setDataLanguage: function() {
      const primaryLanguage = getPrimaryLanguage()
      const obj = _.filter(this.languageData, (item) => item.value === primaryLanguage)
      const other = _.filter(this.languageData, (item) => item.value !== primaryLanguage)
      obj[0].active = true
      other[0].active = false
    },
    setDataOption: function() {
      const option = getOption()
      const obj = _.filter(this.optionData, (item) => item.value === option)
      const other = _.filter(this.optionData, (item) => item.value !== option)
      obj[0].active = true
      other[0].active = false
    },
    setThemeData: function() {

    }
  },
  mounted: function() {
    const url = createCountUrl()
    const options = getQueryOptions()

    fetch(url, options)
      .then(this.getJson)
      .then(this.getResult)
      .catch(this.logError)
  },
  created: function() { 
    getCookies()
    this.setDataLanguage() 
    this.setDataOption()
  },
  components: {
    'checkbox': checkbox
  }
}
</script>

<style lang="css" scoped>
.menu{
  width: 300px;
}
.toggle-active{
  left: 1.2rem;
}
.toggle-inactive{
  left: 1.2rem;
}
</style>
