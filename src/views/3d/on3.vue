<template>
  <div class="p-2 flex space-x-2">
    <button class="btn btn-sm" 
      v-for="(a, key) in animation_arr" 
      :key="a.uuid" 
      @click="select_anim = key">
      anim {{key + 1}}
    </button>
    
    <button class="btn btn-sm" 
      v-for="(m,k) in meshes" 
      :key="m"
      @click="visible = m"
      :class="visible == m && 'btn-primary'"
      >
      m-{{k}}
    </button>
    <button class="btn btn-sm" 
      @click="visible = null"
      >
      clear
    </button> 
    <div>{{progress}}</div>
</div>


<Renderer ref="renderer" antialias orbit-ctrl resize="window" shadow>
  <Camera :position="{   z: 10}"  />

  <Scene :background="'#333'">
     <!--      <HemisphereLight /> -->

     <DirectionalLight
        :intensity="0.5"
        color="#fff"
        :position="{ x: 200, y: 100, z: 50 }"
        cast-shadow 
      />
      


      <Box v-for="i in 5" :position="{ x: -6 + i * 2 }" :key="i">
        <LambertMaterial/>
      </Box>

  </Scene>
</Renderer> 
</template>



<script setup>
import { AnimationMixer, Clock, Fog, GridHelper, Vector3 } from 'three';

// import { Box, Camera, DirectionalLight, Renderer, Scene, FbxModel, GltfModel, HemisphereLight} from 'troisjs';
import {ref, onMounted, watch} from 'vue'
const renderer = ref()

const animation_arr = ref(null);
const target            = ref(new Vector3(0, 100, 0));
const select_anim       = ref(0)
const object            = ref()
const action            = ref(null)
const meshes            = ref([])
const visible           = ref(null)
const progress          = ref(0)

watch(select_anim, () => {
if (action.value) {
  action.value.stop()
}



setTimeout(() => {
  setAnimation(object.value.o3d)
}, 100);
})


watch(visible, () => {
if (action.value) {
  action.value.stop()
}

setTimeout(() => {
  setAnimation(object.value.o3d)
}, 100);
})


const onLoad = (object) => {
if (!animation_arr.value) {
  animation_arr.value =  object?.animations
}

setAnimation(object);
}



const setAnimation = (object) => {

if (object?.animations && object?.animations.length > 0) {
  let mixer = new AnimationMixer(object);
  action.value = mixer.clipAction(object.animations[select_anim.value]);
  action.value.play();

  let clock = new Clock();
  renderer.value.onBeforeRender(() => {
    mixer.update(clock.getDelta());
  });    
}


if (object?.traverse && object?.traverse.length > 0) {
  object.traverse((child) => {
    if (child.isMesh) {
      if (!meshes.value.includes(child.ID)) {
        meshes.value.push(child.ID)
      }

      child.visible = true
      if (visible.value == child.ID) {
        child.visible = false
      }       

    }
  });
}


}


const setProgress = (e) => {
  progress.value = ((e.loaded*100) / e.total).toFixed(2)
} 

</script>