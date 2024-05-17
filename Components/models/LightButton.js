import React, { useState } from "react";
import { useSpring, animated } from '@react-spring/three';
import {Pressable, Text, Vibration} from "react-native";
import {CenteredText, GridItem, GridView} from "../Styles";
import {Octicons} from "@expo/vector-icons";

const LightButton = ({ initialIsOn, scale, position, intensity, distance, openModal}) => {
	const [isOn, setIsOn] = useState(initialIsOn);

	const [props, set] = useSpring(() => ({
		scale: [scale, scale, scale],
		config: { duration: 100 }
	}));

	const [shouldToggle, setShouldToggle] = useState(false);

	let pressTimer = null; // To handle the timer for long press

	const handlePress = () => {
		setIsOn(!isOn);
		// Trigger the animation
		set.start({
			to: async (next) => {
				await next({ scale: [scale * 1.1, scale * 1.1, scale * 1.1] });
				await next({ scale: [scale * 0.8, scale * 0.8, scale * 0.8] });
				await next({ scale: [scale		, scale		 , scale] });
			}
		});
	};

	const lightOptions = (
		<GridView>
			<GridItem >
				<Pressable onPress={() => {console.log("clicked")}} onPressIn={() => {console.log("clicked")}} >
					<Octicons name="clock" size={50}></Octicons>
					<CenteredText>timer</CenteredText>
				</Pressable>
			</GridItem>
			<GridItem >
				<Pressable onPress={() => {console.log("clicked")}} onPressIn={() => {console.log("clicked")}} >
					<Octicons name="info" size={50}></Octicons>
					<CenteredText>info</CenteredText>
				</Pressable>
			</GridItem>
		</GridView>
	);

	const startPress = () => {
		// Start the timer to detect long press
		pressTimer = window.setTimeout(() => {
			setShouldToggle(false);
			console.log(shouldToggle);

			// TODO: change the vibration style to be quicker and more aggressive to indicate that something happens
			Vibration.vibrate([10, 20]);
			openModal("Light settings", lightOptions);  // TODO: here maybe add: "name of the button" settings
		}, 500); // XXX ms for long press threshold
	};

	const cancelPress = () => {
		// Clear the timer if the press is released before 500 ms
		clearTimeout(pressTimer);
		setShouldToggle(true);
	};

	return (
		<animated.mesh
			scale={props.scale}
			position={position}
			onPointerDown={() => {
				startPress(); // Start the timer on press
			}}
			onPointerUp={() => {
				cancelPress(); // Cancel the timer on release
				if (shouldToggle)
					handlePress(); // Trigger the normal press functionality
			}}
			onPointerLeave={cancelPress} // Also cancel on pointer leaving the element
		>
			<sphereGeometry args={[0.5, 32, 32]} />

			<meshPhongMaterial
				color={isOn ? "yellow" : "#e10606"}
				emissive={isOn ? "yellow" : ""}
				opacity={0.7}
				transparent={true}
				emissiveIntensity={isOn ? 1 : 0}
			/>
			<pointLight
				intensity={isOn ? intensity : 0}
				distance={distance}
			/>
		</animated.mesh>
	);
};

export default LightButton;



// import React, {useState} from "react";
// import { useSpring, animated } from '@react-spring/three';
//
// const LightButton = ({ initialIsOn, scale, position, intensity, distance, setIsShowModal }) => {
// 	const [isOn, setIsOn] = useState(initialIsOn);
//
// 	const [props, set] = useSpring(() => ({
// 		scale: [scale, scale, scale],
// 		config: { duration: 140 }
// 	}));
//
// 	const toggleLight = () => {
// 		setIsOn(!isOn);
// 		// Trigger the animation
// 		console.log(position);
// 		set.start({
// 			to: async (next) => {
// 				await next({ scale: [scale * 1.1, scale * 1.1, scale * 1.1] });
// 				await next({ position: [position[0], position[1] + 0.2, position[2]] });
// 				await next({ scale: [scale * 0.8, scale * 0.8, scale * 0.8] });
// 				await next({ position: [position[0], position[1], position[2]] });
// 				await next({ scale: [scale, scale, scale] });
// 			}
// 		});
// 	};
//
// 	return (
// 		<animated.mesh
// 			scale={props.scale}
// 			position={props.position}
// 			onPointerDown={toggleLight}
// 			on
// 		>
// 			<sphereGeometry args={[0.5, 32, 32]} />
//
// 			<meshPhongMaterial
// 				color={isOn ? "yellow" : "gray"}
// 				emissive={isOn ? "yellow" : "black"}
// 				opacity={0.5}
// 				transparent={true}
// 				emissiveIntensity={isOn ? 1 : 0}
// 			/>
// 			<pointLight
// 				position={[0, 0, 0]}
// 				intensity={isOn ? intensity : 0}
// 				distance={distance}
// 				// castShadow
// 				// shadow-mapSize-width={1024}
// 				// shadow-mapSize-height={1024}
// 				// shadow-radius={5}
// 			/>
// 		</animated.mesh>
// 	);
// };
//
// export default LightButton;












// import React, { useState } from "react";
// import { useSpring, animated } from '@react-spring/three';
//
// const LightButton = ({ initialIsOn, scale, position, intensity, distance }) => {
// 	const [isOn, setIsOn] = useState(initialIsOn);
//
// 	const [props, set] = useSpring(() => ({
// 		scale: [scale, scale, scale],
// 		config: { duration: 100 }
// 	}));
//
// 	const toggleLight = () => {
// 		setIsOn(!isOn);
// 		// Trigger the animation
// 		set.start({
// 			to: async (next) => {
// 				await next({ scale: [scale * 1.2, scale * 1.2, scale * 1.2] });
// 				await next({ scale: [scale * 0.8, scale * 0.8, scale * 0.8] });
// 				await next({ scale: [scale, scale, scale] });
// 			}
// 		});
// 	};
//
// 	return (
// 		<animated.mesh
// 			scale={props.scale}
// 			position={position}
// 			onPointerDown={toggleLight}
// 		>
// 			<sphereGeometry args={[0.5, 32, 32]} />
// 			<meshPhongMaterial
// 				color={isOn ? "yellow" : "gray"}
// 				emissive={isOn ? "yellow" : "black"}
// 				opacity={0.5}
// 				transparent={true}
// 				emissiveIntensity={isOn ? 1 : 0}
// 			/>
// 			<pointLight
// 				position={[0, 0, 0]}
// 				intensity={isOn ? intensity : 0}
// 				distance={distance}
// 				// castShadow
// 				// shadow-mapSize-width={1024}
// 				// shadow-mapSize-height={1024}
// 				// shadow-radius={5}
// 			/>
// 		</animated.mesh>
// 	);
// };
//
// export default LightButton;
