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
	TextLinkContent
} from "../../Components/Styles";
import {View, TouchableOpacity, ActivityIndicator} from "react-native";

// keyboard
import KeyboardAvoidingWrapper from "../../Components/KeyboardAvoidingWrapper";

// API client
import axios from "axios";
import DocumentPickerComponent from "../../Components/FileUploadComponent";

import TextInput from "../../Components/TextInput";

const {brand, dark_light, primary} = Colors

const Signup = ({navigation}) => {
	const [message, setMessage] = useState();
	const [messageType, setMessageType] = useState();
	const [hidePassword, setHidePassword] = useState(true);
	const [isOTP, setIsOTP] = useState(false);
	const [savedUserEmail, setSavedUserEmail] = useState("");


	// This runs when new passwords are chosen
	const handlePasswordChange = (credentials, setSubmitting) => {
		handleMessage(null);
		const url = "https://smart-home-backend-rc94.onrender.com/api/v1/forgot_password/reset"
		// const url = "http://192.168.0.233:5000/api/v1/forgot_password/reset"

		const data = {
			email: savedUserEmail,
			otp: credentials.otp,
			newPassword: credentials.password
		}
		axios
			.post(url, data )
			.then((response) => {
				const result = response.data;
				console.log(response.data);
				const {status, message} = result;
				handleMessage(message, status);
				if (! (message && status) )
					return setSubmitting(false);


				navigation.navigate('Login', {...data});
				setSubmitting(false);
			})
			.catch(error => {
				setSubmitting(false);
				const errorResult = error.response.data;
				console.log(error.response.data);
				const { status, message } = errorResult;
				if (! ( status && message )){
					handleMessage("An error occurred\nPlease check your network and try again");
					return;
				}
				handleMessage(message, status);
			});
	};

	// This runs when email is entered to generate OTP.
	const handlePasswordNewOTP = (credentials, setSubmitting) => {
		handleMessage(null);
		const url = "https://smart-home-backend-rc94.onrender.com/api/v1/forgot_password/"
		// const url = "http://192.168.0.233:5000/api/v1/forgot_password/"

		axios
			.post(url, credentials )
			.then((response) => {
				const result = response.data;
				const {message, status, data} = result;

				handleMessage(message, status);
				if (! (message && status && data) )
					return;

				setSavedUserEmail(data.email);
				setSubmitting(false);
				setIsOTP(true);
			})
			.catch(error => {
				setSubmitting(false);
				const errorResult = error.response.data;
				const {message, status} = errorResult;
				if (! (message && status))
					return handleMessage("An error occurred\nPlease check your network and try again");

				handleMessage(message, status);
			});
	};

	const handleMessage = (message, type = "fail") => {
		setMessage(message);
		setMessageType(type);
		setTimeout(() => {
			setMessage('');
			setMessageType('');
		}, 7000);
	}

	return (
		<KeyboardAvoidingWrapper>
			<StyledContainer>
				<StatusBar style="dark"/>
				<InnerContainer>
					<PageLogo resizeMode="cover" source={require('../../assets/badge.png')} />
					<PageTitle>Smart home</PageTitle>
					<SubTitle> Forgot password</SubTitle>

					{!isOTP && (
						<Formik
							initialValues={
								{
									email: '',
								}
							}
							onSubmit={(values, {setSubmitting}) =>
							{
								if (values.password === '') {
									handleMessage("Password field cannot be empty");
									setSubmitting(false);
									return;
								}

								if (values.confirmPassword === '') {
									handleMessage("Confirm password field cannot be empty");
									setSubmitting(false);
									return;
								}
								if (values.password !== values.confirmPassword){
									handleMessage("Passwords do not match");
									setSubmitting(false);
									return;
								}

								handlePasswordNewOTP(values, setSubmitting);
							}}
						>
							{({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (
								<StyledFormArea>

									<TextInput
										label="Email address"
										icon="mail"
										placeholder="your-email@email.com"
										placeholderTextColor={dark_light}
										onChangeText={handleChange('email')}
										onBlur={handleBlur('email')}
										value={values.email}
										keyboardType="email-address"
									/>

									<MsgBox type={messageType}>{message}</MsgBox>

									{!isSubmitting &&
										<StyledButton onPress={handleSubmit}>
											<ButtonText>Change password</ButtonText>
										</StyledButton>
									}
									{isSubmitting &&
										<StyledButton disabled={true}>
											<ActivityIndicator size="large" color={primary}/>
										</StyledButton>
									}

									<Line/>

									<ExtraView>
										<ExtraText>Remembered your password?</ExtraText>
										<TextLink onPress={ () => navigation.navigate("Login")} >
											<TextLinkContent> Login </TextLinkContent>
										</TextLink>
									</ExtraView>

								</StyledFormArea>
							)}
						</Formik>
					)}

					{isOTP && (
						<Formik
							initialValues={
								{
									otp:"",
									password: '',
									confirmPassword: ''
								}
							}
							onSubmit={(values, {setSubmitting}) =>
							{
								if (values.otp === '') {
									handleMessage("OTP not provided");
									setSubmitting(false);
									return;
								}
								if (values.otp.length < 4) {
									handleMessage("OTP too short");
									setSubmitting(false);
									return;
								}
								if (values.password === '') {
									handleMessage("Password field cannot be empty");
									setSubmitting(false);
									return;
								}
								if (values.confirmPassword === '') {
									handleMessage("Confirm password field cannot be empty");
									setSubmitting(false);
									return;
								}
								if (values.password !== values.confirmPassword){
									handleMessage("Passwords do not match");
									return;
								}

								handlePasswordChange(values, setSubmitting);
							}}
						>
							{({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (
								<StyledFormArea>

									<TextInput
										label="OTP code"
										icon="shield-check"
										placeholder="OTP code here"
										placeholderTextColor={dark_light}
										onChangeText={handleChange('otp')}
										onBlur={handleBlur('otp')}
										value={values.otp}
										keyboardType="number-pad"
									/>

									<TextInput
										label="New Password"
										icon="lock"
										placeholder="* * * * * * *"
										placeholderTextColor={dark_light}
										onChangeText={handleChange('password')}
										onBlur={handleBlur('password')}
										value={values.password}
										secureTextEntry={hidePassword}
										isPassword={true}
										hidePassword={hidePassword}
										setHidePassword={setHidePassword}
									/>

									<TextInput
										label="Confirm New Password"
										icon="lock"
										placeholder="* * * * * * *"
										placeholderTextColor={dark_light}
										onChangeText={handleChange('confirmPassword')}
										onBlur={handleBlur('confirmPassword')}
										value={values.confirmPassword}
										secureTextEntry={hidePassword}
										isPassword={true}
										hidePassword={hidePassword}
										setHidePassword={setHidePassword}
									/>

									<MsgBox type={messageType}>{message}</MsgBox>

									{!isSubmitting &&
										<StyledButton onPress={handleSubmit}>
											<ButtonText>Change password</ButtonText>
										</StyledButton>
									}
									{isSubmitting &&
										<StyledButton disabled={true}>
											<ActivityIndicator size="large" color={primary}/>
										</StyledButton>
									}

									<Line/>

									<ExtraView>
										<ExtraText>Remembered your password?</ExtraText>
										<TextLink onPress={ () => navigation.navigate("Login")} >
											<TextLinkContent> Login </TextLinkContent>
										</TextLink>
									</ExtraView>

								</StyledFormArea>
							)}
						</Formik>
					)}

				</InnerContainer>
			</StyledContainer>
		</KeyboardAvoidingWrapper>
	);
};

export default Signup