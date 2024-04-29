import React from 'react';
import {KeyboardAvoidingView, Modal as RNModal, ModalProps, Platform, View} from "react-native";
import KeyboardAvoidingWrapper from "./KeyboardAvoidingWrapper";
import {ModalContainer} from "./Styles";

const ModalWindow = ({isOpen, withInput, children, ...rest}) => {
	const content = withInput ? (
		<KeyboardAvoidingWrapper behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
			<ModalContainer>
				{children}
			</ModalContainer>
		</KeyboardAvoidingWrapper>
	) : (
		<ModalContainer>
			{children}
		</ModalContainer>
	);

	return (
		<RNModal
			visible={isOpen}
			transparent
			animationType="fade"
			statusBarTranslucent
			onPressOut={() => {console.log("hello world")}}
			{...rest}
		>
			{content}
		</RNModal>
	);
};

export default ModalWindow;


// import {BottomContainer, ModalContainer, PageTitle} from "./Styles";
// import {Button} from "react-native";
//
// const ModalWindow = ({isShowModal, modalTitle, setMenuBarVisible, setIsShowModal}) => {
//
// 	const closeModal = () => {
// 		setMenuBarVisible(true);
// 		setIsShowModal(false);
// 		console.log("closing");
// 	}
//
// 	return (
// 		 isShowModal ? (
// 			<ModalContainer>
// 				<PageTitle color="black" >{modalTitle}</PageTitle>
//
// 				<BottomContainer>
// 					<Button title="Close"	onPress={ closeModal } ></Button>
// 					<Button title="OK"		onPress={ closeModal } ></Button>
// 				</BottomContainer>
// 			</ModalContainer>
// 		) : null
// 	);
// };
//
// export default ModalWindow;