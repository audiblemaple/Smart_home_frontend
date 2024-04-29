import React, {useEffect, useState} from 'react';
import {StatusBar} from "expo-status-bar";
import {
	IconBig,
	StyledContainer,
	VerificationBottomHalf,
	VerificationTopHalf,
	Colors,
	PageTitle,
	InfoText,
	EmphasizeText,
	StyledButton,
	ButtonText,
	StyledFormArea,
	MsgBox,
	LeftIcon,
	StyledInputLabel,
	StyledTextInput,
	RightIcon
	} from "../../Components/Styles";
import {Ionicons, Octicons} from "@expo/vector-icons";
import ResendTimer from "../../Components/ResendTimer";
import KeyboardAvoidingWrapper from "../../Components/KeyboardAvoidingWrapper";
import {ActivityIndicator, View} from "react-native";
import {Formik} from "formik";
import axios from "axios";

const {brand, dark_light, primary, green} = Colors


const  Verification = ({navigation, route}) => {
	const { email } = route.params;
	const [message, setMessage] = useState();
	const [messageType, setMessageType] = useState('');

	const [resendingEmail, setResendingEmail] = useState(false);
	const [resendStatus, setResendStatus] = useState('Resend');

	const [timeLeft, setTimeLeft] = useState(null);
	const [targetTime, setTargetTime] = useState(null);
	const [activeResend, setActiveResend] = useState(false);
	let resendTimerInterval;

	const calculateTimeLeft = (finalTime) => {
		const difference = finalTime - +new Date();
		if (difference >= 0){
			setTimeLeft(Math.round(difference / 1000));
		}else {
			setTimeLeft(null);
			clearInterval(resendTimerInterval);
			setActiveResend(true);
		}
	};

	const triggerTimer = (targetTimeInSeconds = 30) => {
		setTargetTime(targetTimeInSeconds);
		setActiveResend(false);
		const finalTime = +new Date() + targetTimeInSeconds + 1000;
		resendTimerInterval = setInterval(() => (
			calculateTimeLeft(finalTime), 1000
		));
	};

	useEffect(() => {
		triggerTimer();

		return () => {
			clearInterval(resendTimerInterval);
		}
	}, []);

	const resendEmail = async () => {

	};

	const handleMessage = (message, type = "fail") => {
		setMessage(message);
		setMessageType(type);
		setTimeout(() => {
			setMessage('');
			setMessageType('');
		}, 7000);
	};

	const handleVerify = (credentials, setSubmitting) => {
		credentials.email = email;
		handleMessage(null);
		const url = "https://smart-home-backend-rc94.onrender.com/api/v1/email_verification/verify"
		// const url = "http://192.168.0.233:5000/api/v1/email_verification/verify"

		axios
			.post(url, credentials )
			.then((response) => {
				const result = response.data;
				console.log("obj");
				console.log(response.data);
				console.log("obj");

				const {message, status} = result;

				handleMessage(message, status);
				// if (! (message && status) )
				// 	return;

				navigation.navigate('Login');
				setSubmitting(false);

			})
			.catch(error => {
				setSubmitting(false);
				const errorResult = error.response.data;
				const {message, status} = errorResult;
				if (errorResult === "No OTP records found")
					return handleMessage(errorResult);

				if (! (message && status))
					return handleMessage("An error occurred\nPlease check your network and try again");

				handleMessage(message, status);
			});
	};

	return (
		<KeyboardAvoidingWrapper>
			<StyledContainer
				style={{
					alignItems: 'center',
				}}
			>
				<VerificationTopHalf>
					<IconBig>
						<StatusBar style="dark"/>
						<Octicons name='shield-lock' size={125} color={brand}/>
					</IconBig>

				</VerificationTopHalf>
				<VerificationBottomHalf>
					<PageTitle style={{fontSize: 25}}>
						Account Verification
					</PageTitle>

					<Formik
						initialValues={{otp: ''}}
						onSubmit={(values, {setSubmitting}) => {
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
							console.log(values);
							handleVerify(values, setSubmitting);
						}}
					>
						{({handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
							<StyledFormArea>
								<TextInput
									label=""
									icon="lock"
									placeholder="OTP code here"
									placeholderTextColor={dark_light}
									onChangeText={handleChange('otp')}
									onBlur={handleBlur('otp')}
									value={values.otp}
									keyboardType="number-pad"
								/>

								<MsgBox type={messageType}>{message}</MsgBox>

								<InfoText>
									Please verify your email using the link sent to:
									<EmphasizeText>{` audiblemaple@gmail.com`}</EmphasizeText>
								</InfoText>

								<StyledButton
									onPress={handleSubmit}
									style={{backgroundColor: green, flexDirection: 'row'}}
								>
									<ButtonText>
										Proceed
									</ButtonText>
									<Ionicons name="arrow-forward-circle" size={25} color={primary}/>
								</StyledButton>
							</StyledFormArea>
						)}
					</Formik>

					<ResendTimer
						activeResend={activeResend}
						resendingEmail={resendingEmail}
						resendStatus={resendStatus}
						timeLeft={timeLeft}
						targetTime={targetTime}
						resendEmail={resendEmail}
					/>

				</VerificationBottomHalf>
			</StyledContainer>
		</KeyboardAvoidingWrapper>
	);
}

const TextInput = ({label, icon, isPassword, hidePassword, setHidePassword, ...props}) => {
	return (
		<View>
			<LeftIcon>
				<Octicons name={icon} size={30} color={brand} />
			</LeftIcon>
			<StyledInputLabel>{label}</StyledInputLabel>
			<StyledTextInput {...props} />
			{isPassword &&
				<RightIcon onPress={ () => setHidePassword(!hidePassword)}>
					<Ionicons name={hidePassword ? 'eye-off' : 'eye' } size={30} color={dark_light}/>
				</RightIcon>}
		</View>
	);
}

export default Verification;