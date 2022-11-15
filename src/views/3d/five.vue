<template>
  <div class="p-2 flex space-x-2">
    <button class="btn btn-sm" @click="scene_background = '#cccccc'">Color 1</button>
    <button class="btn btn-sm" @click="scene_background = '#a0a0a0'">Color 2</button>
    <button class="btn btn-sm" @click="scene_background = '#e9290f'">Color 3</button>

    <button class="btn btn-sm" v-for="(a, key) in animation_arr" :key="a.uuid" @click="select_anim = key">
      anim {{key + 1}}
    </button>
  </div>
  <Renderer ref="renderer" antialias :orbit-ctrl="{ enableDamping: true, target }" resize="window" shadow>
    <Camera :position="{ x: 100, y: 200, z: 300 }" />
    <Scene ref="scene" :background="scene_background">
      <HemisphereLight />

      <DirectionalLight
        :position="{ x: 0, y: 200, z: 100 }"
        cast-shadow :shadow-camera="{ top: 180, bottom: -120, left: -120, right: 120 }"
      />

      <Plane :width="2000" :height="2000" :rotation="{ x: -Math.PI / 2 }" receive-shadow>
        <PhongMaterial :color="scene_background" :props="{ depthWrite: false }" />
      </Plane>

      <FbxModel src="dancing.fbx" @load="onLoad" v-if="!animation_loading"/>
    </Scene>
  </Renderer>
</template>


<script setup>

import {ref, onMounted, watch} from 'vue'

// Model from mixamo.com
import { AnimationMixer, Clock, Fog, GridHelper, Vector3 } from 'three';
import { AmbientLight, Camera, DirectionalLight, FbxModel, GltfModel, HemisphereLight, Renderer, PhongMaterial, Plane, Scene} from 'troisjs';

const animation_arr = ref(null);
const scene_background = ref("#a0a0a0");
const target    = ref(new Vector3(0, 100, 0));
const renderer  = ref();
const scene     = ref();
const mixer     = ref(null);
const action    = ref(null);
const clock     = ref(null);
const select_anim = ref(1)
const animation_loading = ref(false)

onMounted(() => {
  let newScene = scene.value.scene
  newScene.fog = new Fog(0xa0a0a0, 200, 1000);
  
  let grid = new GridHelper(2000, 20, 0x000000, 0x000000)
  grid.material.opacity = 0.2;
  grid.material.transparent = true;
  newScene.add(grid);
  
  scene.value = newScene;
})


watch(select_anim, () => {
  animation_loading.value = true
  setTimeout(() => animation_loading.value = false, 100);
})

    

const onLoad = (object) => {
  if (object?.animations) {
    animation_arr.value = object?.animations
    mixer.value = new AnimationMixer(object);
    action.value = mixer.value.clipAction(object.animations[select_anim.value]);
    action.value.play();
    object.traverse(function (child) {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    clock.value = new Clock();
    renderer.value.onBeforeRender(updateMixer);
  }
}


const updateMixer = () => {
  mixer.value.update(clock.value.getDelta());
}

const clickFNC = () => {
  console.log("çalışıyor");
}

</script> 