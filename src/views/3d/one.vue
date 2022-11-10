<template>
    <Renderer resize="window" ref="renderer" orbit-ctrl>
      <Camera :position="{ z: 10 }" />
      <Scene :background="'#fff'">
        <PointLight :position="{ y: 50, z: 50 }" />
        <Box ref="box" :rotation="{ y: Math.PI / 4, z: Math.PI / 4 }">
          <LambertMaterial />
        </Box>
      </Scene>
    </Renderer> 
  </template>
  
  
  
  <script setup>
  import { Box, Camera, LambertMaterial, PointLight, Renderer, Scene } from 'troisjs';
  import {ref, onMounted} from 'vue'
  const renderer = ref()
  const box = ref()
  
  
  onMounted(() => {
    renderer.value?.onBeforeRender(() => {
      //box.value?.mash?.rotation?.x += 0.01;
    });
  })
  
  
  </script>