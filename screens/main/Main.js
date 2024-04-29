/**
 * Represents the main component for a 3D scene with interactive light buttons.
 * This component initializes the light buttons at specific positions and handles their rotation
 * around a central point.
 *
 * @returns {JSX.Element} The rendered component containing the 3D scene with light buttons and controls.
 */

import React, {Suspense, useCallback, useEffect, useRef, useState} from "react";
import {StatusBar} from "expo-status-bar";
import {Button, Modal, Pressable, Text, View} from "react-native";

// three
import {Canvas, useThree} from "@react-three/fiber/native";
import useControls from 'r3f-native-orbitcontrols'

// colors
import {
    BottomContainer,
    ButtonText, ClickableText,
    Colors, GridItem,
    GridView,
    gridView,
    PageTitle,
    StyledButton
} from "../../Components/Styles";

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
import MenuBar from "../../Components/MenuBar";
import ModalWindow from "../../Components/ModalWindow";
import {Fontisto, Octicons} from "@expo/vector-icons";


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

    const [menuBarVisible, setMenuBarVisible] = useState(true);

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

    const [isShowModal, setIsShowModal] = useState(false);

    const showModal = () => {
        setIsShowModal(true);
    }

    const closeModal = () => {
        setIsShowModal(false);
        setMenuBarVisible(true);
    }
    return (
        <>
            <StatusBar style="dark"/>

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
                        minZoom={4}
                        maxZoom={6.5}
                        rotateSpeed={0.8}
                        dampingFactor={0.02}
                        minPolarAngle={zeroDegrees}
                        maxPolarAngle={sixtyDegrees}
                        // target={new Vector3(0,0,0)}
                    />
                    <ambientLight intensity={0.1}/>

                    <LightButton
                        initialIsOn={true}
                        scale={0.3}
                        position={[rotatedPositions.bathroom.x, 1.1, rotatedPositions.bathroom.z]}
                        intensity={2}
                        distance={1.4}
                    />

                    <LightButton
                        initialIsOn={false}
                        scale={0.3}
                        position={[rotatedPositions.room.x, 1.1, rotatedPositions.room.z]}
                        intensity={2}
                        distance={1.4}
                    />

                    <LightButton
                        initialIsOn={true}
                        scale={0.3}
                        position={[rotatedPositions.livingRoom.x, 1.1, rotatedPositions.livingRoom.z]}
                        intensity={2}
                        distance={1.4}
                    />

                    <LightButton
                        initialIsOn={false}
                        scale={0.3}
                        position={[rotatedPositions.kitchen.x, 1.1, rotatedPositions.kitchen.z]}
                        intensity={2}
                        distance={1.4}
                    />

                    <LightButton
                        initialIsOn={false}
                        scale={0.3}
                        position={[rotatedPositions.entrance.x, 1.1, rotatedPositions.entrance.z]}
                        intensity={2}
                        distance={1.4}
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

                {
                    isShowModal &&
                    <ModalWindow isOpen={isShowModal} >
                        <>
                            <PageTitle>Modal title</PageTitle>

                            <GridView>
                                <GridItem >
                                    <Pressable onPress={() => {console.log("clicked")}} onPressIn={() => {console.log("clicked")}} >
                                        <Octicons name="home" size={50}></Octicons>
                                    </Pressable>
                                </GridItem>
                                <GridItem >
                                    <Pressable onPress={() => {console.log("clicked")}} onPressIn={() => {console.log("clicked")}} >
                                        <Octicons name="home" size={50}></Octicons>
                                    </Pressable>
                                </GridItem>
                                <GridItem >
                                    <Pressable onPress={() => {console.log("clicked")}} onPressIn={() => {console.log("clicked")}} >
                                        <Octicons name="home" size={50}></Octicons>
                                    </Pressable>
                                </GridItem>
                                <GridItem >
                                    <Pressable onPress={() => {console.log("clicked")}} onPressIn={() => {console.log("clicked")}} >
                                        <Octicons name="home" size={50}></Octicons>
                                    </Pressable>
                                </GridItem>
                                <GridItem >
                                    <Pressable onPress={() => {console.log("clicked")}} onPressIn={() => {console.log("clicked")}} >
                                        <Octicons name="home" size={50}></Octicons>
                                    </Pressable>
                                </GridItem>
                                <GridItem >
                                    <Pressable onPress={() => {console.log("clicked")}} onPressIn={() => {console.log("clicked")}} >
                                        <Octicons name="home" size={50}></Octicons>
                                    </Pressable>
                                </GridItem>
                            </GridView>

                            <BottomContainer>
                                <ClickableText onPress={closeModal} onPressIn={closeModal}>Close</ClickableText>
                                <ClickableText onPress={closeModal} onPressIn={closeModal}>Confirm</ClickableText>
                            </BottomContainer>
                        </>
                    </ModalWindow>
                }

                <MenuBar menuBarVisible={menuBarVisible} setIsShowModal={setIsShowModal} setMenuBarVisible={setMenuBarVisible} />

            </View>
        </>
    );
};

export default Main;