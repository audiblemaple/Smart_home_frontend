import React, {useState} from "react";
import {StatusBar} from "expo-status-bar";

// formik
import {Formik} from "formik";

// icons
import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons';

import {
	StyledContainer,
	InnerContainer,
	PageLogo,
	PageTitle,
	SubTitle,
	StyledFormArea,
	LeftIcon,
	StyledInputLabel,
	StyledTextInput,
	RightIcon,
	StyledButton,
	ButtonText,
	Colors,
	MsgBox,
	Line,
	ExtraView,
	ExtraText,
	TextLink,
	TextLinkContent, BottomContainer
} from "../../Components/Styles";
import {View, ActivityIndicator, Text, Pressable, Button, Platform} from "react-native";

const { dark_light, primary} = Colors

// keyboard
import KeyboardAvoidingWrapper from "../../Components/KeyboardAvoidingWrapper";
import TextInput from "../../Components/TextInput";
// API client
import axios from "axios";

const Settings = ({navigation}) => {

	const [hidePassword, setHidePassword] = useState(true)
	const [message, setMessage] = useState();
	const [messageType, setMessageType] = useState('');
	const [googleSubmitting, setGoogleSubmitting] = useState(false);


	return (
		<KeyboardAvoidingWrapper>
			<StyledContainer>
				<StatusBar style="dark"/>
				<InnerContainer>
					<PageLogo resizeMode="cover" source={require('../../assets/badge.png')} />
					<PageTitle>Smart home</PageTitle>
					<SubTitle>Settings</SubTitle>
					<StyledFormArea>
						<TextInput
							label="Name"
							icon="person"
							placeholder="** Full name **"
							placeholderTextColor={dark_light}
							keyboardType="email-address"
							editable={false}
						/>
						<TextInput
							label="Username"
							icon="person"
							placeholder="** Username **"
							placeholderTextColor={dark_light}
							keyboardType="email-address"
							editable={false}
						/>
						<TextInput
							label="Email address"
							icon="mail"
							placeholder="** your-email@email.com **"
							placeholderTextColor={dark_light}
							keyboardType="email-address"
							editable={false}
						/>
						<TextInput
							label="Dont know what to put here yet..."
							icon="mail"
							placeholder="your-email@email.com"
							placeholderTextColor={dark_light}
							keyboardType="email-address"
							editable={false}
						/>
						<TextLink style={{alignItems: "left"}} onPress={ () => navigation.navigate("forgotPassword")} >
						</TextLink>
					</StyledFormArea>

					<Line/>

					<ExtraView>
						<TextLink onPress={ () => navigation.navigate("forgotPassword")} >
							<TextLinkContent> Change password </TextLinkContent>
						</TextLink>
					</ExtraView>
				</InnerContainer>
			</StyledContainer>
		</KeyboardAvoidingWrapper>
	);
};

export default Settings