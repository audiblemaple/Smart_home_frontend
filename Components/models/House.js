import { useEffect, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';

const House = ({ angle, setAngle, models, selectedModelIndex }) => {
	const {initialRotationVal, URL} = models[selectedModelIndex];
	const {scene} = useGLTF(URL);

	useEffect(() => {
		// This effect will run only once when the component mounts,
		// or if initialRotationVal changes.
		setAngle(initialRotationVal);
	}, [initialRotationVal, setAngle]);

	useMemo(() => {
		if (scene) {
			// Traverse and set properties on the scene graph once,
			// when scene loads or changes. This does not involve any state changes.
			scene.traverse((child) => {
				if (child.isMesh && (child.name.includes("wall") || child.name.includes("floor"))) {
					child.castShadow = true;
					child.receiveShadow = true;
				}
			});
		}
	}, [scene]);

	return (
		<primitive
			object={scene}
			position={[0, 0, 0]}
			scale={0.4}
			rotation={[0, angle, 0]}
			castShadow={true}
			receiveShadow={true}
		/>
	);
};

export default House;



// import React, { useMemo } from "react";
// import { useGLTF } from "@react-three/drei/native";
//
// const House = ({ angle, setAngle, models, selectedModelIndex }) => {
// 	// Always call hooks at the top level
// 	const {initialRotationVal, URL } = models[selectedModelIndex]
// 	const { scene } = useGLTF(URL);
//
// 	useMemo(() => {
// 		if (scene) {
// 			setAngle(initialRotationVal); // Assume this is meant to set state outside of rendering
// 			scene.traverse((child) => {
// 				if (child.isMesh && (child.name.includes("wall") || child.name.includes("floor"))) {
// 					child.castShadow = true;
// 					child.receiveShadow = true;
// 				}
// 			});
// 		}
// 	}, [scene, initialRotationVal, setAngle]);
//
// 	return (
// 		<primitive
// 			object={scene}
// 			position={[0, 0, 0]}
// 			scale={0.4}
// 			rotation={[0, angle, 0]}
// 			castShadow={true}
// 			receiveShadow={true}
// 		/>
// 	);
// };
//
// export default House;



// import React, {useMemo} from "react";
//
// // gltf file loader
// import { useGLTF } from "@react-three/drei/native";
//
// const House = ({angle, setAngle, models, selectedModelIndex}) => {
// 	const model = models[selectedModelIndex];
// 	const houseModel = useGLTF(model.URL);
//
// 	useMemo(() => {
// 		setAngle(model.initialRotationVal)
// 		houseModel.scene.traverse((child) => {
// 			if (child.isMesh && (child.name.includes("wall") || child.name.includes("floor"))) {
// 				child.castShadow = true;
// 				child.receiveShadow = true;
// 			}
// 		});
// 	}, [houseModel]);
//
//
// 	return (
// 		<primitive
// 			object={houseModel.scene}
// 			position={[0, 0, 0]}
// 			scale={0.4}
// 			rotation={[0, angle, 0]}
//
// 			castShadow={true}
// 			receiveShadow={true}
// 		/>
// 	);
// };
//
// export default House;