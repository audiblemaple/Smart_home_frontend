import React, { useState } from 'react';
import { MenuBarContainerFull, Colors, MenuBarButton, MenuBarContainerSmall } from "./Styles";
import { Octicons } from "@expo/vector-icons";

// colors
const { primary, green, orange } = Colors;

const MenuBar = ({ menuBarVisible, setIsShowModal, setMenuBarVisible, navigation }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [position, setPosition] = useState("-1%");

	const handleClickOpen = () => {
		setPosition("5%");
		setIsOpen(true);
	};

	const handleClickClose = () => {
		setPosition("-1%");
		setIsOpen(false);
	};

	const openModal = () => {
		handleClickClose();
		setIsOpen(false);
		setIsShowModal(true);
		setMenuBarVisible(false);
	};

	const navigateToSettings = () => {
		navigation.navigate('Settings');
	};

	return (
		<>
			{menuBarVisible && isOpen && (
				<MenuBarContainerFull style={{ left: position }}>
					<MenuBarButton onPress={navigateToSettings} onPressIn={navigateToSettings}>
						<Octicons name="gear" size={40} />
					</MenuBarButton>
					<MenuBarButton onPress={openModal} onPressIn={openModal}>
						<Octicons name="clock" size={40} />
					</MenuBarButton>
					<MenuBarButton onPress={openModal} onPressIn={openModal}>
						<Octicons name="circle" size={40} />
					</MenuBarButton>
					<MenuBarButton onPress={openModal} onPressIn={openModal}>
						<Octicons name="home" size={40} />
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
