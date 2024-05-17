<template>
  <div class="filter-Wrapper">
    
    <div class="filter-Wrapper__Switcher">
      <h3 class="label-for-switcher">filter by Alive:</h3>
      <label class="switch">
        <input type="checkbox" v-model="checked">
        <div class="slider"></div>
      </label>
    </div>
    
    <div class="filter-Wrapper__Filtered-by-name">
      <h3 class="label-for-switcher">filter by Name:</h3>
      <label class="switch">
        <input type="checkbox" v-model="nameChecked">
        <div class="slider"></div>
      </label>
    </div>

  </div>
</template>

<style scoped>

.filter-Wrapper{
  display: flex;
  gap: 2rem;
}

.switch {
  position: relative;
  display: inline-block;
  border-radius: 10px;
  width: 60px;
  height: 34px;
}

.switch input {display:none;}

.slider {
    border-radius: 20px;
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
    border-radius: 10px;
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: orange;
}

input:focus + .slider {
  box-shadow: 0 0 1px orange;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.label-for-switcher{
  font-size: 1.4rem;
}

</style>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    required: true,
    type: Boolean
  },
  nameModelValue:{
    required: true,
    type: Boolean
  }
})

const emit = defineEmits(['update:SwitcherModelValue', 'update:SwitcherNameModelValue'])

const checked = computed({
  get () {
    return props.modelValue
  },
  set (newChecked) {
    emit('update:SwitcherModelValue', newChecked)
  }
})

const nameChecked = computed({
  get () {
    return props.nameModelValue
  },
  set (newNameChecked) {
    emit('update:SwitcherNameModelValue', newNameChecked)
  }
})


</script>