import React, {Suspense} from "react";
import {StatusBar} from "expo-status-bar";

// three
import {Canvas} from "@react-three/fiber";

// colors
import {Colors, MsgBox} from "../../Components/Styles";
const {
    orange
} = Colors

// view
import {View} from "react-native";

// icons
import {Octicons, Ionicons} from '@expo/vector-icons';


// house (import later...)


import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { useGLTF } from "@react-three/drei";
// import { useLoader } from '@react-three/fiber';

const House = () => {
    const model = useGLTF("https://smart-home-bucket-lior.s3.eu-north-1.amazonaws.com/shorashim.glb");
    return <primitive object={model.scene} scale={0.5} />;
};

// const House = () => {
//     const model = useLoader(OBJLoader, require("./SingerMachine.obj"));
//     return <primitive object={model} scale={0.5} />;
// };


const Main = ({ navigation, route }) => {
    return (
        <>
            <StatusBar style="light"/>
            <Canvas>
                <ambientLight intensity={0.1}/>
                <pointLight position={[2, 1, 4]} decay={0.5} intensity={0.5}/>
                <Suspense fallback={null}>
                    <House/>
                </Suspense>
            </Canvas>
        </>
    );
};

export default Main