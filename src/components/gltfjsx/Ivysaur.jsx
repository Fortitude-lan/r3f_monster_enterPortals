/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.15 public/models/Ivysaur.glb -o src/components/Ivysaur.jsx 
*/

import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export function Ivysaur({ hovered, ...props }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("../../public/models/Ivysaur.glb");
  const { actions } = useAnimations(animations, group);
  useEffect(() => {
    console.log("妙蛙", actions);
    const anim = hovered ? "openMouth" : null;
    if (actions[anim]) actions[anim].reset().fadeIn(0.5).play();
    return () => (actions[anim] ? actions[anim].fadeOut(0.5) : null);
  }, [hovered]);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Ivysour">
          <primitive object={nodes.pm0002_00} />
          <group name="Ivysaur">
            <skinnedMesh
              name="Ivysaur_1"
              geometry={nodes.Ivysaur_1.geometry}
              material={materials["Material #46"]}
              skeleton={nodes.Ivysaur_1.skeleton}
            />
            <skinnedMesh
              name="Ivysaur_2"
              geometry={nodes.Ivysaur_2.geometry}
              material={materials["Material #47"]}
              skeleton={nodes.Ivysaur_2.skeleton}
            />
            <skinnedMesh
              name="Ivysaur_3"
              geometry={nodes.Ivysaur_3.geometry}
              material={materials["Material #48"]}
              skeleton={nodes.Ivysaur_3.skeleton}
            />
            <skinnedMesh
              name="Ivysaur_4"
              geometry={nodes.Ivysaur_4.geometry}
              material={materials["Material #49"]}
              skeleton={nodes.Ivysaur_4.skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("../../public/models/Ivysaur.glb");