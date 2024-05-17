import React, {useState} from "react";
import {StatusBar} from "expo-status-bar";

// icons
import {Octicons} from '@expo/vector-icons';

import {
	StyledContainer,
	InnerContainer,
	PageLogo,
	PageTitle,
	SubTitle,
	StyledFormArea,
	Colors,
	Line,
	ExtraView,
	TextLink,
	TextLinkContent,
	GridItem,
	GridView,
	CenteredText,
	MsgBox,
	StyledButton,
	ButtonText
} from "../../Components/Styles";
import {Pressable, Linking, ActivityIndicator} from "react-native";

const { dark_light, brandDisabled, primary} = Colors

// keyboard
import KeyboardAvoidingWrapper from "../../Components/KeyboardAvoidingWrapper";
import TextInput from "../../Components/TextInput";
import {Formik} from "formik";
import axios from "axios";

const Settings = ({navigation, route}) => {
	const [message, setMessage] = useState();
	const [messageType, setMessageType] = useState('');
	const [wasChanged, setWasChanged] = useState(false);
	const {email, name} = route.params;

	const loadInBrowser = (url) => {
		Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
	}

	/**
	 * Displays a message to the user.
	 *
	 * @param {string} message - The message to be displayed.
	 * @param {string} type - The type of message (default is "fail").
	 */
	const handleMessage = (message, type = "fail") => {
		setMessage(message);
		setMessageType(type);
		setTimeout(() => {
			setMessage('');
			setMessageType('');
		}, 7000);
	}

	const handleUserDataUpdate = (credentials, setSubmitting) => {
		handleMessage(null);

		// const url = "https://smart-home-backend-rc94.onrender.com/api/v1/user/"
		const url = `${process.env.BASE_URL}/api/v1/user/`

		axios
			.post(url, credentials )
			.then((response) => {
				const result = response.data;
				const {message, status, user} = result;
				handleMessage(message, status);
				setSubmitting(false);

				if (! (message && status && user) )
					return;

				if ( !user.verified )
					return navigation.navigate('Verification', {...user});
				navigation.navigate('Welcome', {...user});

			})
			.catch(error => {
				setSubmitting(false);
				const errorResult = error.response.data;
				const {message, status} = errorResult;
				if (! (message && status))
					return handleMessage("An error occurred\nPlease check your network and try again");

				handleMessage(message, status);
			});
	}

	const checkChanged = (values) => {
		if (values.name !== name) {
			setWasChanged(true);
			console.log("changed");

			return;
		}
		if (values.email !== email) {
			setWasChanged(true);
			console.log("changed");
			return;
		}

		console.log("reset");
		setWasChanged(false);
	}

	return (
		<KeyboardAvoidingWrapper>
			<StyledContainer>
				<StatusBar style="dark"/>
				<InnerContainer>
					<PageLogo resizeMode="cover" source={require('../../assets/badge.png')} />
					<PageTitle>Smart home</PageTitle>
					<SubTitle>Settings</SubTitle>

					<Formik
						initialValues={{email: email, name: name, }}
						onSubmit={(values, {setSubmitting}) => {
							if (values.name === '') {
								handleMessage("name field cannot be empty");
								setSubmitting(false);
								return;
							}
							if (values.email === '') {
								handleMessage("Email field cannot be empty");
								setSubmitting(false);
								return;
							}
							handleUserDataUpdate(values, setSubmitting);
						}}
					>
						{({handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
							<StyledFormArea>
								<TextInput
									label="Full name"
									icon="person"
									placeholder="John Doe"
									placeholderTextColor={dark_light}
									onChangeText={handleChange('name')}
									onBlur={handleBlur('name')}
									value={values.name}
									onChange={ checkChanged(values) }
								/>
								<TextInput
									label="Email address"
									icon="mail"
									placeholder="your-email@email.com"
									placeholderTextColor={dark_light}
									onChangeText={handleChange('email')}
									onBlur={handleBlur('email')}
									value={values.email}
									keyboardType="email-address"
									onChange={ checkChanged(values) }
								/>

								<MsgBox type={messageType}>{message}</MsgBox>


								{!wasChanged  && !isSubmitting &&
									<StyledButton disabled={true} style={{backgroundColor: brandDisabled }} onPress={handleSubmit}>
										<ButtonText>Update</ButtonText>
									</StyledButton>
								}

								{wasChanged && !isSubmitting &&
									<StyledButton onPress={handleSubmit}>
										<ButtonText>Update</ButtonText>
									</StyledButton>
								}
								{isSubmitting &&
									<StyledButton disabled={true}>
										<ActivityIndicator size="large" color={primary}/>
									</StyledButton>
								}
								<Line/>
							</StyledFormArea>

						)}
					</Formik>

					<ExtraView>
						<TextLink onPress={ () => navigation.navigate("forgotPassword")} >
							<TextLinkContent> Change password </TextLinkContent>
						</TextLink>
					</ExtraView>

					<ExtraView>
						<GridView>
							<GridItem >
								<Pressable onPress={() => {loadInBrowser("https://github.com/audiblemaple/Smart_home_frontend")}} onPressIn={() => {loadInBrowser("https://github.com/audiblemaple/Smart_home_frontend")}} >
									<Octicons name="logo-github" size={50}></Octicons>
								</Pressable>
								<CenteredText> Frontend </CenteredText>
							</GridItem >

							<GridItem >
								<Pressable onPress={() => {loadInBrowser("https://github.com/audiblemaple/smart_home_backend")}} onPressIn={() => {loadInBrowser("https://github.com/audiblemaple/smart_home_backend")}} >
									<Octicons name="logo-github" size={50}></Octicons>
								</Pressable>
								<CenteredText> Backend </CenteredText>
							</GridItem >
						</GridView>
					</ExtraView>
				</InnerContainer>
			</StyledContainer>
		</KeyboardAvoidingWrapper>
	);
};

export default Settings