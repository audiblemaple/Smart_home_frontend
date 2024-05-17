import React, { useState } from 'react';
import {
	MenuBarContainerFull,
	MenuBarButton,
	MenuBarContainerSmall,
	GridView,
	GridItem,
	CenteredText
} from "./Styles";
import {Ionicons, Octicons} from "@expo/vector-icons";
import {Pressable} from "react-native";
import DocumentPickerComponent from "./FileUploadComponent";

const MenuBar = ({ menuBarVisible, navigation, openModal, user }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [position, setPosition] = useState("-1%");
	const [setFile] = useState(null);

	const { email, models} = user;

	const handleClickOpen = () => {
		setPosition("5%");
		setIsOpen(true);
	};

	const handleClickClose = () => {
		setPosition("-1%");
		setIsOpen(false);
	};

	const modelSettings = (
		<GridView>
			<GridItem >
				<Pressable onPress={() => {console.log("clicked")}} onPressIn={() => {console.log("clicked")}} >
					<Ionicons name="close-outline" size={50}></Ionicons>
				</Pressable>
				<CenteredText> Remove </CenteredText>
			</GridItem>
			<GridItem >
				<Pressable onPress={() => { showModal("rotateModel")}} onPressIn={() => { showModal("rotateModel")}} >
					<Ionicons name="refresh-outline" size={50} />
				</Pressable>
				<CenteredText> Rotate </CenteredText>
			</GridItem>
			<GridItem >
				<Pressable onPress={() => { showModal("rotateModel")}} onPressIn={() => { showModal("rotateModel")}} >
					<Ionicons name="pencil-outline" size={50}/>
				</Pressable>
				<CenteredText> select </CenteredText>
			</GridItem>
			<GridItem >
				<Pressable onPress={() => {showModal("modelUploadButtons")}} onPressIn={() => {showModal("modelUploadButtons")}} >
					<Ionicons name="add-outline" size={50}></Ionicons>
				</Pressable>
				<CenteredText> Upload </CenteredText>
			</GridItem>
		</GridView>
	);

	const rotationButtons = (
		<GridView>
			<GridItem >
				<Pressable onPress={() => {console.log("dddd")}} onPressIn={() => {console.log("dddd")}} >
					<Ionicons name="arrow-undo-outline" size={50}></Ionicons>
				</Pressable>
				<CenteredText> Rotate left </CenteredText>
			</GridItem>
			<GridItem >
				<Pressable onPress={() => { console.log("clicked") }} onPressIn={() => { console.log("clicked")}} >
					<Ionicons name="arrow-redo-outline" size={50}></Ionicons>
				</Pressable>
				<CenteredText> Rotate right </CenteredText>
			</GridItem>
		</GridView>
	);

	const modelUploadButtons = (
		<DocumentPickerComponent setFile={setFile} ></DocumentPickerComponent>
	);

	const showModal = (type) => {
		switch (type) {
			case "modelSettings":
				openModal("Model settings", modelSettings);
				setIsOpen(false);
				break;

			case "rotateModel":
				openModal("Model settings", rotationButtons);
				setIsOpen(false);
				break;

			case "modelUploadButtons":
				openModal("Model upload", modelUploadButtons);
				setIsOpen(false);
				break;

			default:
				console.log(type + " not implemented yet");
				break;
		}
		handleClickClose();
	};

	const navigateToSettings = () => {
		navigation.navigate('Settings', user);
	};

	return (
		<>
			{menuBarVisible && isOpen && (
				<MenuBarContainerFull style={{ left: position }}>
					<MenuBarButton onPress={navigateToSettings} onPressIn={navigateToSettings}>
						<Octicons name="gear" 	size={40} />
					</MenuBarButton>
					<MenuBarButton onPress={() => {showModal("modelSettings")}} onPressIn={() => {showModal("modelSettings")}}>
						<Octicons name="home" 			size={40} />
					</MenuBarButton>
					<MenuBarButton onPress={showModal} onPressIn={showModal}>
						<Ionicons name="funnel-outline" size={40} />
					</MenuBarButton>
					<MenuBarButton onPress={handleClickClose} onPressIn={handleClickClose}>
						<Octicons name="chevron-left" 	size={40} />
					</MenuBarButton>
				</MenuBarContainerFull>
			)}
			{menuBarVisible && !isOpen && (
				<MenuBarContainerSmall style={{ left: position }}>
					<MenuBarButton onPress={handleClickOpen} onPressIn={handleClickOpen}>
						<Octicons name="chevron-right" size={40} />
					</MenuBarButton>
				</MenuBarContainerSmall>
			)}
		</>
	);
};

export default MenuBar;
