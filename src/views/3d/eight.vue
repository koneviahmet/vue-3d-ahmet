<template>
    <div class="p-2 flex space-x-2">
      <button class="btn btn-sm" 
        v-for="(a, key) in animation_arr" 
        :key="a.uuid" 
        @click="select_anim = key">
        anim {{key + 1}}
      </button>
      
      <button class="btn btn-sm" 
        v-for="m in meshes" 
        :key="m"
        @click="setVisible(m)"
        :class="visible.includes(m) && 'btn-primary'"
        >
        mesh {{m}}
      </button>
  </div>


  <Renderer ref="renderer" antialias :orbit-ctrl="{ enableDamping: true, target }" resize="window" shadow>

    <Camera :position="{ x: 200, y: 200, z: 200 }" />
    <Scene :background="'#fff'">
      <HemisphereLight />

      <DirectionalLight
        :position="{ x: 0, y: 200, z: 100 }"
        cast-shadow :shadow-camera="{ top: 180, bottom: -120, left: -120, right: 120 }"
      />

    
      <FbxModel ref="object" src="dancing.fbx" @load="onLoad" />
      
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
const meshes            = ref([])
const visible           = ref([])



watch(select_anim, () => {
  action.value.stop()
  
  setTimeout(() => {
    setAnimation(object.value.o3d)
  }, 100);
})


watch(visible, () => {
  action.value.stop()
  console.log("değişti");
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
    action.value = mixer.clipAction(object.animations[select_anim.value]);
    action.value.play();

   
    object.traverse((child) => {
      if (child.isMesh) {
        if (!meshes.value.includes(child.ID)) {
          meshes.value.push(child.ID)
        }

        child.visible = true
        if (visible.value.includes(child.ID)) {
          child.visible = false
        }       

      }
    });


    let clock = new Clock();
    renderer.value.onBeforeRender(() => {
      mixer.update(clock.getDelta());
    });
    
  }
}



const setVisible = (mesh) => {
  console.log("mesh", mesh);
  if(visible.value.includes(mesh)){
    visible.value =  [...visible.value.filter(i => i != mesh)]
  }else{
    visible.value.push(mesh)
  }
}

</script>