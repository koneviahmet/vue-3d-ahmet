<template>
  <div class="flex space-x-2 p-2">
    <button class="btn btn-sm" :class="tab == 'one' && 'btn-primary'" @click="tab = 'one'">1</button>
    <button class="btn btn-sm" :class="tab == 'two' && 'btn-primary'" @click="tab = 'two'">2</button>
    <button class="btn btn-sm" :class="tab == 'three' && 'btn-primary'" @click="tab = 'three'">3</button>
    <button class="btn btn-sm" :class="tab == 'four' && 'btn-primary'" @click="tab = 'four'">4</button>
    <button class="btn btn-sm" :class="tab == 'five' && 'btn-primary'" @click="tab = 'five'">5</button>
    <button class="btn btn-sm" :class="tab == 'six' && 'btn-primary'" @click="tab = 'six'">6</button>
    <button class="btn btn-sm" :class="tab == 'seven' && 'btn-primary'" @click="tab = 'seven'">7</button>
    <button class="btn btn-sm" :class="tab == 'eight' && 'btn-primary'" @click="tab = 'eight'">8</button>
    <button class="btn btn-sm" :class="tab == 'nine' && 'btn-primary'" @click="tab = 'nine'">9</button>
    <button class="btn btn-sm" :class="tab == 'ten' && 'btn-primary'" @click="tab = 'ten'">10</button>
    <button class="btn btn-sm" :class="tab == 'eleven' && 'btn-primary'" @click="tab = 'eleven'">11</button>
    <button class="btn btn-sm" :class="tab == 'twelve' && 'btn-primary'" @click="tab = 'twelve'">Abaküs</button>
    <button class="btn btn-sm" :class="tab == 'on2' && 'btn-primary'" @click="tab = 'on2'">Ampül</button>
    <button class="btn btn-sm" :class="tab == 'on3' && 'btn-primary'" @click="tab = 'on3'">Serbes</button>
  </div>
  <One v-if="tab == 'one'"/>
  <Two v-if="tab == 'two'"/>
  <Three v-if="tab == 'three'"/>
  <Four v-if="tab == 'four'"/>
  <Five v-if="tab == 'five'"/>
  <Six v-if="tab == 'six'"/>
  <Seven v-if="tab == 'seven'"/>
  <Eight v-if="tab == 'eight'"/>
  <Nine v-if="tab == 'nine'"/>
  <Ten v-if="tab == 'ten'"/>
  <Eleven v-if="tab == 'eleven'"/>
  <Twelve v-if="tab == 'twelve'"/>
  <On2 v-if="tab == 'on2'"/>
  <On3 v-if="tab == 'on3'"/>
</template>



<script setup>
import One from './3d/one.vue'
import Two from './3d/two.vue'
import Three from './3d/three.vue'
import Four from './3d/four.vue'
import Five from './3d/five.vue'
import Six from './3d/six.vue'
import Seven from './3d/seven.vue'
import Eight from './3d/eight.vue'
import Nine from './3d/nine.vue'
import Ten from './3d/ten.vue'
import Eleven from './3d/eleven.vue'
import Twelve from './3d/twelve.vue'
import On2 from './3d/on2.vue'
import On3 from './3d/on3.vue'


import {ref} from "vue"

const tab = ref('on3')





</script>