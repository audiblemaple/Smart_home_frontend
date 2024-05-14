import React from 'react';
import {Modal as RNModal, Platform} from "react-native";
import KeyboardAvoidingWrapper from "./KeyboardAvoidingWrapper";
import {BottomContainer, ClickableText, ModalContainer, PageTitle} from "./Styles";

const ModalWindow = ({isOpen, title, closeModal, withInput, children, ...rest}) => {
	const content = withInput ? (
		<KeyboardAvoidingWrapper behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
			<ModalContainer>
				<PageTitle>{title}</PageTitle>
				{children}
				<BottomContainer>
					<ClickableText onPress={closeModal} onPressIn={closeModal}>Close</ClickableText>
					{/*<ClickableText onPress={closeModal} onPressIn={closeModal}>Confirm</ClickableText>*/}
				</BottomContainer>
			</ModalContainer>
		</KeyboardAvoidingWrapper>
	) : (
		<ModalContainer>
			<PageTitle>{title}</PageTitle>
			{children}
			<BottomContainer>
				<ClickableText onPress={closeModal} onPressIn={closeModal}>Close</ClickableText>
				{/*<ClickableText onPress={closeModal} onPressIn={closeModal}>Confirm</ClickableText>*/}
			</BottomContainer>
		</ModalContainer>
	);

	return (
		<RNModal
			visible={isOpen}
			transparent
			animationType="fade"
			statusBarTranslucent
			{...rest}
		>
			{content}
		</RNModal>
	);
};

export default ModalWindow;