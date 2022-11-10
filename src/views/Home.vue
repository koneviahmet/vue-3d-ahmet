<template>
  <div class="flex space-x-2 p-2">
    <button class="btn btn-sm" :class="tab == 'one' && 'btn-primary'" @click="tab = 'one'">1</button>
    <button class="btn btn-sm" :class="tab == 'two' && 'btn-primary'" @click="tab = 'two'">2</button>
    <button class="btn btn-sm" :class="tab == 'three' && 'btn-primary'" @click="tab = 'three'">3</button>
    <button class="btn btn-sm" :class="tab == 'four' && 'btn-primary'" @click="tab = 'four'">4</button>
    <button class="btn btn-sm" :class="tab == 'five' && 'btn-primary'" @click="tab = 'five'">5</button>
  </div>
  <One v-if="tab == 'one'"/>
  <Two v-if="tab == 'two'"/>
  <Three v-if="tab == 'three'"/>
  <Four v-if="tab == 'four'"/>
  <Five v-if="tab == 'five'"/>
</template>



<script setup>
import One from './3d/one.vue'
import Two from './3d/two.vue'
import Three from './3d/three.vue'
import Four from './3d/four.vue'
import Five from './3d/five.vue'
import {ref} from "vue"

const tab = ref('five')


</script>