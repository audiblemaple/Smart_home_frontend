import React, {useMemo} from "react";

// gltf file loader
import { useGLTF } from "@react-three/drei/native";
import {ButtonText, StyledButton} from "../Styles";

const House = ({angle}) => {
	// const model = useGLTF("https://smart-home-bucket-lior.s3.eu-north-1.amazonaws.com/shorashim.glb");
	const model = useGLTF(require("../../assets/shorashim.glb"));

	// model.scene.traverse((child) => {
	// 	if (child.isMesh && (child.name.includes("wall") || child.name.includes("floor"))) {
	// 		child.castShadow = true;
	// 		child.receiveShadow = true;
	// 	}
	// });

	useMemo(() => {
		model.scene.traverse((child) => {
			if (child.isMesh && (child.name.includes("wall") || child.name.includes("floor"))) {
				child.castShadow = true;
				child.receiveShadow = true;
			}
		});
	}, [model]);


	return (
		<primitive
			object={model.scene}
			position={[0, 0, 0]}
			scale={0.4}
			// rotation={[0, 270 * Math.PI / 180, 0]}
			rotation={[0, angle, 0]}

			castShadow={true}
			receiveShadow={true}
		/>
	);
};

export default House;