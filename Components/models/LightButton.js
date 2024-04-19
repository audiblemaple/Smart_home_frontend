import React, { useState } from "react";
import { useThree } from "@react-three/fiber/native";
import { useSpring, animated } from '@react-spring/three';

const LightButton = ({ initialIsOn, scale, position, intensity, distance }) => {
	const { gl, scene, camera } = useThree();
	const [isOn, setIsOn] = useState(initialIsOn);

	const [props, set] = useSpring(() => ({
		scale: [scale, scale, scale],
		config: { duration: 100 }
	}));

	const toggleLight = () => {
		setIsOn(!isOn);
		// Trigger the animation
		set.start({
			to: async (next) => {
				await next({ scale: [scale * 1.2, scale * 1.2, scale * 1.2] });
				await next({ scale: [scale * 0.8, scale * 0.8, scale * 0.8] });
				await next({ scale: [scale, scale, scale] });
			}
		});
	};

	return (
		<animated.mesh
			scale={props.scale}
			position={position}
			onPointerDown={toggleLight}
		>
			<sphereGeometry args={[0.5, 32, 32]} />
			<meshPhongMaterial
				color={isOn ? "yellow" : "gray"}
				emissive={isOn ? "yellow" : "black"}
				opacity={0.5}
				transparent={true}
				emissiveIntensity={isOn ? 1 : 0}
			/>
			<pointLight
				position={[0, 0, 0]}
				intensity={isOn ? intensity : 0}
				distance={distance}
				// castShadow
				// shadow-mapSize-width={1024}
				// shadow-mapSize-height={1024}
				// shadow-radius={5}
			/>
		</animated.mesh>
	);
};

export default LightButton;




// import React, {useState} from "react";
// import { useThree } from "@react-three/fiber/native";
//
// const LightButton = ({ isOn, scale, position, intensity, distance }) => {
// 	const { gl, scene, camera } = useThree();
// 	const [isOnState, setIsOnState] = useState(isOn);
//
// 	const handleLightButtonClick = () => {
// 		console.log("Light button was clicked");
// 	};
//
// 	const handlePointerDown = (event) => {
// 		// Prevent default handling
// 		event.stopPropagation();
// 		handleLightButtonClick && handleLightButtonClick();
// 		setIsOnState(!isOnState);
// 	};
//
// 	return (
// 		<mesh
// 			scale={scale}
// 			position={position}
// 			onPointerDown={handlePointerDown}
// 		>
// 			<sphereGeometry args={[0.5, 32, 32]} />
// 			<meshStandardMaterial color={isOnState ? "yellow" : "gray"} />
// 			<pointLight position={position} intensity={isOnState ? intensity : 0} distance={distance} />
// 		</mesh>
// 	);
// };
//
// export default LightButton;



// import React from "react";
//
// const LightButton = ({ isOn, scale, position, intensity, distance }) => {
// 	return (
// 		<>
// 			<pointLight position={position} intensity={intensity ? isOn : 0} distance={distance}/>
// 			<mesh scale={scale} position={position}>
// 				<sphereGeometry/>
// 			</mesh>
// 		</>
// 	);
// };
//
// export default LightButton;