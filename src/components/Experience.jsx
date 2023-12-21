import { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import {
  CameraControls,
  Environment,
  MeshPortalMaterial,
  RoundedBox,
  useTexture,
  Text,
  useCursor,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";
import { Charizard } from "./gltfjsx/Charizard";
import { Ivysaur } from "./gltfjsx/Ivysaur";
import { Piplup } from "./gltfjsx/Piplup";
export const Experience = () => {
  const [active, setactive] = useState(null);
  const [hovered, setHovered] = useState(null);
  const controlsRef = useRef();
  const scene = useThree((state) => state.scene);
  const names = {
    Charizard: "Charizard",
    Ivysaur: "Ivysaur",
    Piplup: "Piplup",
  };
  useCursor(hovered);

  useEffect(() => {
    if (active) {
      const targetPOsition = new THREE.Vector3();
      scene.getObjectByName(active).getWorldPosition(targetPOsition);
      controlsRef.current.setLookAt(
        0,
        0,
        5,
        targetPOsition.x,
        targetPOsition.y,
        targetPOsition.z,
        true
      );
    } else {
      controlsRef.current.setLookAt(0, 0, 10, 0, 0, 0, true);
    }
  }, [active]);
  return (
    <>
      <ambientLight intensity={1} />
      <Environment preset={null} files={"/textures/venice_sunset_1k.hdr"} />
      <CameraControls
        ref={controlsRef}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 6}
      />
      <MonsterStage
        color={"#e08d47"}
        name={names.Charizard}
        texture={"/textures/lava_pokemo_world.jpg"}
        active={active}
        setactive={setactive}
        hovered={hovered}
        setHovered={setHovered}
        position-z={-0.5}
      >
        <Charizard
          scale={0.5}
          position={[0, -1, 0]}
          hovered={hovered === names.Charizard}
        />
      </MonsterStage>
      <MonsterStage
        color={"#77a17a"}
        name={names.Ivysaur}
        texture={"/textures/cactus_pokemo_forest.jpg"}
        position-x={-2.5}
        rotation-y={Math.PI / 8}
        active={active}
        setactive={setactive}
        hovered={hovered}
        setHovered={setHovered}
      >
        <Ivysaur
          scale={3}
          position={[0, -1, 0]}
          hovered={hovered === names.Ivysaur}
        />
      </MonsterStage>
      <MonsterStage
        color={"#0066ab"}
        name={names.Piplup}
        texture={"/textures/water_pokemon_environ.jpg"}
        position-x={2.5}
        rotation-y={-Math.PI / 8}
        active={active}
        setactive={setactive}
        hovered={hovered}
        setHovered={setHovered}
      >
        <Piplup
          scale={2.3}
          position={[0, -1, 0]}
          hovered={hovered === names.Piplup}
        />
      </MonsterStage>
    </>
  );
};
export const MonsterStage = ({
  children,
  color = "salmon",
  name,
  texture,
  active,
  setactive,
  hovered,
  setHovered,
  ...props
}) => {
  const bgMap = texture ? useTexture(texture) : null;
  const portalMaterial = useRef();
  useFrame((state, delta) => {
    const worldOpen = active === name;
    easing.damp(portalMaterial.current, "blend", worldOpen ? 1 : 0, 0.2, delta);
  });
  console.log(portalMaterial.current ? portalMaterial.current.blend : "none");
  return (
    <group {...props}>
      <Text
        font="/fonts/RubikBubbles-Regular.ttf"
        fontSize={0.25}
        // color="salmon"
        position={[0, -1.4, 0.051]}
        maxWidth={2}
        textAlign="center"
        anchorY={"bottom"}
      >
        {name}
        <meshBasicMaterial color={color} toneMapped={false} />
      </Text>
      <RoundedBox
        name={name}
        args={[2, 3, 0.1]}
        onDoubleClick={() => {
          console.log("DDD");
          setactive(active === name ? null : name);
        }}
        onPointerEnter={() => setHovered(name)}
        onPointerLeave={() => setHovered(null)}
      >
        <MeshPortalMaterial ref={portalMaterial} side={THREE.DoubleSide}>
          <ambientLight intencity={1} />
          <Environment
            preset={null}
            files={"/textures/venice_sunset_1k.hdr"}
            onPointerEnter={() => {}}
            onPointerLeave={() => {}}
          />

          {children}
          <mesh>
            <sphereGeometry args={[5, 64, 64]} />
            <meshStandardMaterial map={bgMap} side={THREE.BackSide} />
          </mesh>
        </MeshPortalMaterial>
      </RoundedBox>
    </group>
  );
};
