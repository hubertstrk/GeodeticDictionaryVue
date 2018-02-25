<template lang="html">
<div class="group">
  <li class="menu-item">
    <a href="#" @click.prevent="valueChanged(data)">
      <div class="tile">
        <div class="tile-content">
          <p class="tile-title">
            <div class="form-group">
              <label class="form-switch">
                <input class="box" type="checkbox" :checked="data.active === true"/>
                <i class="form-icon"></i> {{data.title}}
              </label>
            </div>
          </p>
          <p class="title-subtitle">{{data.subTitle}}</p>
        </div>
      </div>
    </a>
  </li>
</div>
</template>

<script>


export default {
  props: ['data'],
  methods: {
    valueChanged: function (item) {
      this.$emit('valueChanged', item)
    }
  }
}
</script>

<style lang="css">
</style>