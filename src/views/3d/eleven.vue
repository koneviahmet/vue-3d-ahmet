<template>
  <div class="p-2 flex space-x-2">
    <button class="btn btn-sm" 
      v-for="(a, key) in animation_arr" 
      :key="a.uuid" 
      @click="select_anim = key">
      anim {{key + 1}}
    </button>
</div>
<Renderer ref="renderer" antialias orbit-ctrl resize="window" shadow>

  <Camera :position="{ x: 100, y: 100, z: 100 }" />
  <Scene :background="'#fff'">
    <HemisphereLight />

    <DirectionalLight
      :position="{ x: 0, y: 200, z: 100 }"
      cast-shadow :shadow-camera="{ top: 180, bottom: -120, left: -120, right: 120 }"
    />

    
    <FbxModel ref="object" src="spider.fbx" @load="onLoad" />
    


  </Scene>
</Renderer> 
</template>



<script setup>
import { AnimationMixer, Clock, Fog, GridHelper, Vector3 } from 'three';

import { Box, Camera, LambertMaterial, HemisphereLight, Renderer, Scene, FbxModel} from 'troisjs';
import {ref, onMounted, watch} from 'vue'
const renderer = ref()

const animation_arr = ref(null);


const target            = ref(new Vector3(0, 100, 0));
const select_anim       = ref(0)
const object            = ref()
const action            = ref(null)
const animation_loop    = ref(1);

watch(select_anim, (anim) => {
action.value.stop()
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
if (object?.animations) {
  let mixer = new AnimationMixer(object);
  
  console.log("mixer", mixer);

  let newAction = mixer.clipAction(object.animations[select_anim.value]);
  newAction.play();

  action.value = newAction;
  let clock = new Clock();
  renderer.value.onBeforeRender(() => {
    if (animation_loop.value <= newAction._loopCount) {
      newAction.stop();
    }
    
    mixer.update(clock.getDelta());
  });
  
}
}


</script>