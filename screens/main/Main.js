/**
 * Represents the main component for a 3D scene with interactive light buttons.
 * This component initializes the light buttons at specific positions and handles their rotation
 * around a central point.
 *
 * @returns {JSX.Element} The rendered component containing the 3D scene with light buttons and controls.
 */

import React, {Suspense, useCallback, useEffect, useRef, useState} from "react";
import {StatusBar} from "expo-status-bar";
import {Text, View} from "react-native";
import DocumentPickerComponent from "../../Components/under_test/FileUploadComponent";

// three
import {Canvas, useThree} from "@react-three/fiber/native";
import useControls from 'r3f-native-orbitcontrols'

// colors
import {ButtonText, Colors, StyledButton} from "../../Components/Styles";

const {
    orange
} = Colors;

// Predefined rotation angles
import {Angles} from "../../Components/Angles";
const {
    zeroDegrees,
    oneDegree,
    fiveDegrees,
    thirtyDegrees,
    fortyFiveDegrees,
    sixtyDegrees,
    eightyDegrees,
    ninetyDegrees,
    oneHundredDegrees,
    oneHundredTwentyDegrees,
    oneHundredThirtyFiveDegrees,
    oneHundredFiftyDegrees,
    oneHundredEightyDegrees,
    twoHundredSeventyDegrees,
    twoHundredNinetyDegrees,
    threeHundredThirtyDegrees
} = Angles;


// 3D models
import House from "../../Components/models/House";
import LightButton from "../../Components/models/LightButton";


/**
 * Main component responsible for rendering the 3D scene with interactive elements.
 * Manages rotation and positioning of the house model and light buttons.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.navigation - Navigation object provided by the navigation context.
 * @param {Object} props.route - Route object with route-specific parameters.
 * @returns {React.Component} - Returns a React component that renders a 3D scene.
 */
const Main = ({ navigation, route }) => {
    const [OrbitControls, events] = useControls();
    const [angle, setAngle] = useState(zeroDegrees);
    const [isRotating, setIsRotating] = useState(false);
    const { name, email, models, selectedModelIndex } = route.params;
    const {URL} = models[selectedModelIndex];
    /**
     * Rotates the model to the right by increasing the current angle by 10 degrees.
     */
    const rotate_model_right = useCallback(() => {
        console.log("rotating model right");
        if (isRotating)
            return;
        setIsRotating(true);
        let step = 0;
        const intervalId = setInterval(() => {
            if (step < 10) {
                console.log("rotating model right");
                // setAngle(prevAngle => (prevAngle + oneDegree) % Math.PI);
                setAngle(prevAngle => (prevAngle + oneDegree));
                step++;
            } else {
                clearInterval(intervalId);
                setIsRotating(false);
            }
        }, 5);
    }, [isRotating, setAngle, setIsRotating]);

    /**
     * Rotates the model to the left by decreasing the current angle by 10 degrees.
     */
    const rotate_model_left = useCallback(() => {
        console.log("rotating model right");
        if (isRotating)
            return;
        setIsRotating(true);
        let step = 0;
        const intervalId = setInterval(() => {
            if (step < 10) {
                console.log("rotating model right");
                // setAngle(prevAngle => (prevAngle - oneDegree + Math.PI) % Math.PI);
                setAngle(prevAngle => (prevAngle - oneDegree));
                step++;
            } else {
                clearInterval(intervalId);
                setIsRotating(false);
            }
        }, 5);
    }, [isRotating, setAngle, setIsRotating]);


    // Define initial positions
    const lightPositions = {
        bathroom:   { x: 0.7, z: 0.8 },
        room:       { x: -0.5, z: 0.7 },
        livingRoom: { x: -0.6, z: -0.5 },
        kitchen:    { x: 0.6, z: -0.5 },
        entrance:   { x: 0.65, z: 0.2}
    };


    /**
     * Rotates a position around the origin (0,0,0) by a given angle.
     *
     * @param {Object} position - The original position object with `x` and `z` coordinates.
     * @param {number} angle - The angle in radians to rotate the position.
     * @returns {Object} The new position object with `x` and `z` coordinates after rotation.
     */
    function rotatePosition(position, angle) {
        const { x, z } = position;
        const rotatedX = x * Math.cos(angle) + z * Math.sin(angle);
        const rotatedZ = -x * Math.sin(angle) + z * Math.cos(angle);
        return { x: rotatedX, z: rotatedZ };
    }

    // Calculate new positions for each light button after rotation.
    const rotatedPositions = {};
    Object.keys(lightPositions).forEach(key => {
        rotatedPositions[key] = rotatePosition(lightPositions[key], angle);
    });

    const [cameraPosition, setCameraPosition] = useState([0, 2, 5]);
    const move_camera = useCallback((position) => {
        console.log("updating camera");
        setCameraPosition(position);
    }, [setCameraPosition]);

    return (
        <>
            <StatusBar style="light"/>
            <View style={{flex: 1}} {...events}>

                {URL !== "noModel" &&
                <Canvas
                    key={cameraPosition.join(',')}
                    shadows={true}
                    // gl={{antialias: true}}
                    camera={{ position: cameraPosition, fov: 75 }}
                >
                    <OrbitControls
                        enablePan={false}
                        zoomSpeed={0.3}
                        minZoom={4.5}
                        maxZoom={6.5}
                        rotateSpeed={0.7}
                        dampingFactor={0.02}
                        minPolarAngle={zeroDegrees}
                        maxPolarAngle={sixtyDegrees}
                        // target={new Vector3(0,0,0)}
                    />
                    <ambientLight intensity={0.2}/>

                    <LightButton
                        initialIsOn={true}
                        scale={0.3}
                        position={[rotatedPositions.bathroom.x, 0.9, rotatedPositions.bathroom.z]}
                        intensity={2}
                        distance={1.3}
                    />

                    <LightButton
                        initialIsOn={false}
                        scale={0.3}
                        position={[rotatedPositions.room.x, 0.9, rotatedPositions.room.z]}
                        intensity={2}
                        distance={1.3}
                    />

                    <LightButton
                        initialIsOn={true}
                        scale={0.3}
                        position={[rotatedPositions.livingRoom.x, 0.9, rotatedPositions.livingRoom.z]}
                        intensity={2}
                        distance={1.3}
                    />

                    <LightButton
                        initialIsOn={false}
                        scale={0.3}
                        position={[rotatedPositions.kitchen.x, 0.9, rotatedPositions.kitchen.z]}
                        intensity={2}
                        distance={1.3}
                    />

                    <LightButton
                        initialIsOn={false}
                        scale={0.3}
                        position={[rotatedPositions.entrance.x, 0.9, rotatedPositions.entrance.z]}
                        intensity={2}
                        distance={1.3}
                    />

                    <Suspense fallback={null}>
                        <House angle={angle} setAngle={setAngle} models={models} selectedModelIndex={selectedModelIndex} />
                    </Suspense>
                </Canvas>
                }
                {URL === "noModel" &&
                    <View>
                        <Text>
                            hello world
                        </Text>
                    </View>
                }



                {/*TODO: the buttons dont work on Android*/}
                <StyledButton onPress={() => { move_camera([0, 2, 5]) }}>
                    <ButtonText>regular view</ButtonText>
                </StyledButton>
                <StyledButton onPress={() => { move_camera([0, 5, 0]) }}>
                    <ButtonText>top view</ButtonText>
                </StyledButton>
                <StyledButton onPress={rotate_model_right}>
                    <ButtonText>Rotate right</ButtonText>
                </StyledButton>
                <StyledButton onPress={rotate_model_left}>
                    <ButtonText>Rotate left</ButtonText>
                </StyledButton>

            </View>
        </>
    );
};

export default Main;





// import React, {Suspense, useState} from "react";
// import {StatusBar} from "expo-status-bar";
// import {Text, View} from "react-native";
//
// // three
// import {Canvas} from "@react-three/fiber/native";
// import useControls from 'r3f-native-orbitcontrols'
//
// // colors
// import {ButtonText, Colors, StyledButton} from "../../Components/Styles";
//
// const {
//     orange
// } = Colors;
//
// import {Angles} from "../../Components/Angles";
// const {
//     zeroDegrees,
//     thirtyDegrees,
//     fortyFiveDegrees,
//     sixtyDegrees,
//     eightyDegrees,
//     ninetyDegrees,
//     oneHundredDegrees,
//     oneHundredTwentyDegrees,
//     oneHundredThirtyFiveDegrees,
//     oneHundredFiftyDegrees,
//     oneHundredEightyDegrees,
//     twoHundredSeventyDegrees,
//     twoHundredNinetyDegrees,
//     threeHundredThirtyDegrees
// } = Angles;
//
//
// // house model
// import House from "../../Components/models/House";
// import LightButton from "../../Components/models/LightButton";
//
// const Main = ({ navigation, route }) => {
//     const [OrbitControls, events] = useControls();
//     const [angle, setAngle] = useState(zeroDegrees);
//
//     const rotate_model_right = () => {
//         setAngle(prevAngle => {
//             const newAngle = prevAngle + (5 * Math.PI / 180);
//             console.log(`Rotating model to ${newAngle} radians`); // Should print updated angle in radians
//             return newAngle;
//         });
//     };
//     const rotate_model_left = () => {
//         setAngle(prevAngle => {
//             const newAngle = prevAngle - (5 * Math.PI / 180);
//             console.log(`Rotating model to ${newAngle} radians`); // Should print updated angle in radians
//             return newAngle;
//         });
//     };
//
//
//     return (
//         <>
//             <StatusBar style="light"/>
//             <View style={{flex: 1}} {...events}>
//                 <Canvas
//                     shadows={true}
//                     gl={{ antialias: true }}
//                 >
//                     <OrbitControls
//                         // pan options
//                         enablePan={false}
//
//                         // zoom options
//                         zoomSpeed={0.3}
//                         minZoom={3}
//                         maxZoom={8}
//
//                         // rotation options
//                         rotateSpeed={0.6}
//                         minPolarAngle={zeroDegrees}
//                         maxPolarAngle={sixtyDegrees}
//
//                         minAzimuthAngle={threeHundredThirtyDegrees}
//                         maxAzimuthAngle={sixtyDegrees}
//
//                     />
//                     {/*general light*/}
//                     {/*<pointLight position={[0, 10, 0]} decay={0} intensity={0.15}/>*/}
//                     <ambientLight intensity={0.2} />
//
//                     {/*bathroom*/}
//                     <LightButton
//                         initialIsOn={true}
//                         scale={0.3}
//                         position={[-0.9, 0.9, 0.8]}
//                         intensity={2}
//                         distance={1.3}
//                     />
//
//                     {/*room*/}
//                     <LightButton
//                         initialIsOn={false}
//                         scale={0.3}
//                         position={[-0.8, 0.9, -0.5]}
//                         intensity={2}
//                         distance={1.3}
//                     />
//
//                     {/*living room*/}
//                     <LightButton
//                         initialIsOn={true}
//                         scale={0.3}
//                         position={[ 0.6, 0.9, -0.5]}
//                         intensity={2}
//                         distance={1.3}
//                     />
//
//                     {/*kitchen*/}
//                     <LightButton
//                         initialIsOn={false}
//                         scale={0.3}
//                         position={[-0.2, 0.9, 0.5]}
//                         intensity={2}
//                         distance={1.3}
//                     />
//
//                     {/*entrance*/}
//                     <LightButton
//                         initialIsOn={false}
//                         scale={0.3}
//                         position={[0.6, 0.9, 0.5]}
//                         intensity={2}
//                         distance={1.3}
//                     />
//
//                     {/*load model*/}
//                     <Suspense fallback={null}>
//                         <House angle={angle}/>
//                     </Suspense>
//                 </Canvas>
//
//                 <StyledButton onPress={rotate_model_right}>
//                     <ButtonText>Rotate right</ButtonText>
//                 </StyledButton>
//                 <StyledButton onPress={rotate_model_left}>
//                     <ButtonText>Rotate right</ButtonText>
//                 </StyledButton>
//
//             </View>
//         </>
//     );
// };
//
// export default Main