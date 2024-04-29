import React, {useState} from 'react';
import {MenuBarContainerSmall, Colors, MenuBarButton, MenuBarContainerFull} from "./Styles";
import {Octicons} from "@expo/vector-icons";

// colors
const {primary, green, orange} = Colors

const MenuBar = ({menuBarVisible, setIsShowModal, setMenuBarVisible}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [position, setPosition] = useState("-1%");

	const handleClickOpen = () => {
		setPosition("4%");
		setIsOpen(true);
	}

	const handleClickClose = () => {
		setPosition("-1%");
		setIsOpen(false);
	}

	const openModal = () => {
		handleClickClose();
		setIsOpen(false);
		setIsShowModal(true);
		setMenuBarVisible(false);
	}

	return (
		<>
			{ menuBarVisible && isOpen &&
				<MenuBarContainerSmall style={{left: position}}>
					<MenuBarButton onPress={openModal} onPressIn={openModal} >
						<Octicons name="home" 		size={40} ></Octicons>
					</MenuBarButton>
					<MenuBarButton onPress={openModal} onPressIn={openModal} >
						<Octicons name="clock" 		size={40} ></Octicons>
					</MenuBarButton>
					<MenuBarButton onPress={openModal} onPressIn={openModal}>
						<Octicons name="circle" 	size={40} ></Octicons>
					</MenuBarButton>
					<MenuBarButton onPress={openModal} onPressIn={openModal}>
						<Octicons name="location" 	size={40} ></Octicons>
					</MenuBarButton>
				</MenuBarContainerSmall>
			}
			{ menuBarVisible && !isOpen &&
				<MenuBarContainerFull style={{left: position}}>
					<MenuBarButton onPress={handleClickOpen} onPressIn={handleClickOpen}>
						<Octicons name="chevron-right" size={40} ></Octicons>
					</MenuBarButton>
				</MenuBarContainerFull>
			}
		</>
	);
};

export default MenuBar;