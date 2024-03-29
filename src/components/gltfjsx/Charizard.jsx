/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.15 public/models/Charizard.glb -o src/components/CharizarGLB.jsx 
* 火焰效果小火龙
*GLb模型渲染 
*尾巴着色片段设置颜色 
*尾巴scale useFrams控制
*/

import React, { useRef, useEffect } from "react";
import {
  useGLTF,
  useTexture,
  shaderMaterial,
  useAnimations,
} from "@react-three/drei";
import * as THREE from "three";
import { extend, useFrame, useLoader } from "@react-three/fiber";
export function Charizard({ hovered, ...props }) {
  const { nodes, materials, animations } = useGLTF(
    "../../public/models/Charizard.glb"
  );
  const group = useRef();
  const { actions } = useAnimations(animations, group);
  const sRef = useRef();
  const sGeoRef = useRef();
  const cRef = useRef();
  const cGeoRef = useRef();

  const alphaMapTextureS = useTexture("../../public/textures/pm0006_00_FireStenA1.png");
  const alphaMapTextureC = useTexture("../../public/textures/pm0006_00_FireCoreA1.png");

  useFrame((state, delta) => {
    if (sRef.current) {
      //层火焰闪烁
      const scaleSpeed = 0.0001; // 调整这个值来改变速度
      const time = state.clock.elapsedTime;
      const randomS = 0.5 + Math.random() * 0.5;
      const scaleFactor = randomS + Math.sin(time) * 0.1; // 根据需要调整
      sGeoRef.current.scale.x = scaleFactor;
      sGeoRef.current.scale.y = scaleFactor;
      return (sRef.current.uniforms.uTime.value += time * scaleSpeed);
    }
  });
  useFrame((state, delta) => {
    if (cRef.current) {
      const time = state.clock.elapsedTime;
      const randomS = 0.7 + Math.random() * 0.5;
      const scaleFactor = randomS + Math.sin(time) * 0.1; // 根据需要调整
      cGeoRef.current.scale.x = scaleFactor;
      cGeoRef.current.scale.y = scaleFactor;
      return (cRef.current.uniforms.uTime.value += delta);
    }
  });
  useEffect(() => {
    const anim = hovered ? "Fly" : "Idle";
    if (actions[anim]) actions[anim].reset().fadeIn(0.5).play();
    return () => (actions[anim] ? actions[anim].fadeOut(0.5) : null);
  }, [hovered]);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Charizard" rotation={[Math.PI / 2, 0, 0]} scale={0.025}>
          <primitive object={nodes.pm0006_00} />
          <group name="Charizard002">
            <skinnedMesh
              name="Charizard_1"
              geometry={nodes.Charizard_1.geometry}
              material={materials["Material #12.002"]}
              skeleton={nodes.Charizard_1.skeleton}
            />
            <skinnedMesh
              name="Charizard_2"
              geometry={nodes.Charizard_2.geometry}
              material={materials["Material #13.002"]}
              skeleton={nodes.Charizard_2.skeleton}
            />
            <skinnedMesh
              name="Charizard_3"
              geometry={nodes.Charizard_3.geometry}
              material={materials["Material #14.001"]}
              skeleton={nodes.Charizard_3.skeleton}
            />
            {/* <skinnedMesh
              name="Charizard_4"
              geometry={nodes.Charizard_4.geometry}
              material={materials["Material #15.001"]}
              skeleton={nodes.Charizard_4.skeleton}
            />
            <skinnedMesh
              name="Charizard_5"
              geometry={nodes.Charizard_5.geometry}
              material={materials["Material #16.001"]}
              skeleton={nodes.Charizard_5.skeleton}
            /> */}
          </group>
        </group>
        <skinnedMesh
          name="Charizard_4"
          ref={cGeoRef}
          geometry={nodes.Charizard_4.geometry}
          // material={materials["Material #15"]}
          skeleton={nodes.Charizard_4.skeleton}
        >
          <tailCMaterial
            ref={cRef}
            uAlphaMap={alphaMapTextureC}
            side={THREE.DoubleSide}
          />
        </skinnedMesh>
        <skinnedMesh
          ref={sGeoRef}
          name="Charizard_5"
          geometry={nodes.Charizard_5.geometry}
          // material={materials["Material #16"]}
          skeleton={nodes.Charizard_5.skeleton}
          // renderOrder={1} // 递增的值，根据需要调整
        >
          <tailSMaterial
            ref={sRef}
            uAlphaMap={alphaMapTextureS}
            side={THREE.DoubleSide}
          />
        </skinnedMesh>
      </group>
    </group>
  );
}

useGLTF.preload("../../public/models/Charizard.glb");

export const TailSMaterial = shaderMaterial(
  {
    uTime: 0.0,
    uColor: new THREE.Color(1, 0.5, 0.0),
    uAlphaMap: null,
  },
  // vertex shader
  /*glsl*/ `
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // 根据 y 高度调整 sin 波动的幅度
    float frequency = 200.0 + modelPosition.y * 1.0; // 调整频率
    float amplitude = 0.04 + modelPosition.y * 0.05;   // 调整振幅
    // 使用sin函数来修改X和Z轴的位置
    float heightFactor = modelPosition.y / 10.0; // 通过适当的缩放调整范围
    float sinFrequency = mix(20.0, 50.0, heightFactor);

    modelPosition.x += sin(modelPosition.y* sinFrequency + uTime*10.0) * 0.01;
    modelPosition.z += sin(modelPosition.y* sinFrequency + uTime*10.0) * 0.01;
    // modelPosition.x += sin(modelPosition.y * frequency * 20.0 + uTime * 10.0) * amplitude;
    // modelPosition.z += sin(modelPosition.y * frequency * 20.0 + uTime * 10.0) * amplitude;
    // modelPosition.y +=1.0;
     
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;
    gl_Position = projectionPosition;
    vUv = uv;
  }
  `,
  // fragment shader
  /*glsl*/ `
  uniform float uTime;
  uniform vec3 uColor;
  uniform sampler2D uAlphaMap;
  varying vec2 vUv;

  void main() {
     // Sample the alpha map
     vec3 alphaColor = texture2D(uAlphaMap, vUv).rgb;

     // Set a threshold to determine where black becomes transparent
     float threshold = 0.25; // You may need to adjust this value
 
     // If the alphaColor is close to black, discard the pixel (make it transparent) , length() is light strengthen
     if (length(alphaColor) < threshold) {
         discard;
     }

    // 在这里根据 position.y 和 uTime 设置 alpha 值
    float alpha = 0.8 + 0.5 * sin(vUv.y * 10.0 + uTime * 2.0);

    gl_FragColor = vec4(uColor, alpha);
     // Output the final color (non-transparent part)
      //  gl_FragColor.rgb += yWave;
  }
  `
);
export const TailCMaterial = shaderMaterial(
  {
    uTime: 0.0,
    uColor: new THREE.Color(1, 0.5, 0.0),
    uGradientColor: new THREE.Color(1, 0, 0),
    uAlphaMap: null,
  },
  // vertex shader
  /*glsl*/ `
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // 根据 y 高度调整 sin 波动的幅度
    float frequency = 200.0 + modelPosition.y * 1.0; // 调整频率
    float amplitude = 0.04 + modelPosition.y * 0.05;   // 调整振幅
    // 使用sin函数来修改X和Z轴的位置
    float heightFactor = modelPosition.y / 10.0; // 通过适当的缩放调整范围
    float sinFrequency = mix(20.0, 50.0, heightFactor);

    // modelPosition.x += -sin(modelPosition.y* sinFrequency + uTime*10.0) * 0.01;
    // modelPosition.z += -sin(modelPosition.y* sinFrequency + uTime*10.0) * 0.01;
    modelPosition.x += sin(modelPosition.y * frequency * 20.0 + uTime * 10.0) * amplitude;
    modelPosition.z += sin(modelPosition.y * frequency * 20.0 + uTime * 10.0) * amplitude;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;
    gl_Position = projectionPosition;
    vUv = uv;
  }
  `,
  // fragment shader
  /*glsl*/ `
  uniform float uTime;
  uniform vec3 uColor;
  uniform vec3 uGradientColor;
  uniform sampler2D uAlphaMap;
  varying vec2 vUv;

  void main() {
     // Sample the alpha map
     vec3 alphaColor = texture2D(uAlphaMap, vUv).rgb;

     // Set a threshold to determine where black becomes transparent
     float threshold = 0.1; // You may need to adjust this value
 
     // Define the color for the non-transparent part (orange)
     vec3 nonTransparentColor = mix(uColor, uGradientColor, vUv.y);;
     
     // If the alphaColor is close to black, discard the pixel (make it transparent) , length() is light strengthen
     if (length(alphaColor) < threshold) {
         discard;
     }

     // Output the final color (non-transparent part)
     gl_FragColor = vec4(nonTransparentColor, 1.0);
   
  }
  `
);
extend({ TailCMaterial, TailSMaterial });
