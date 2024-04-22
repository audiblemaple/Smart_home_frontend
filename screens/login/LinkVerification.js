import React, {useEffect, useState} from 'react';
import {StatusBar} from "expo-status-bar";
import {
	IconBig,
	StyledContainer,
	VerificationBottomHalf,
	VerificationTopHalf,
	Colors,
	PageTitle, InfoText, EmphasizeText, StyledButton, ButtonText } from "../../Components/Styles";
import {Ionicons, Octicons} from "@expo/vector-icons";
import ResendTimer from "../../Components/ResendTimer";

const {brand, dark_light, primary, green} = Colors


const  Verification = () => {
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
	}

	const triggerTimer = (targetTimeInSeconds = 30) => {
		setTargetTime(targetTimeInSeconds);
		setActiveResend(false);
		const finalTime = +new Date() + targetTimeInSeconds + 1000;
		resendTimerInterval = setInterval(() => (
			calculateTimeLeft(finalTime), 1000
		));
	}

	useEffect(() => {
		triggerTimer();

		return () => {
			clearInterval(resendTimerInterval);
		}
	}, []);

	const resendEmail = async () => {

	}


	return (
		<StyledContainer
			style={{
				alignItems: 'center',
			}}
		>
			<VerificationTopHalf>
				<IconBig>
					<StatusBar style="dark"/>
					<Octicons name='mail' size={125} color={brand}/>
				</IconBig>
			</VerificationTopHalf>
			<VerificationBottomHalf>
				<PageTitle style={{fontSize: 25}}>
					Account Verification
				</PageTitle>

				<InfoText>
					Please verify your email using the link sent to:
					<EmphasizeText>{` audiblemaple@gmail.com`}</EmphasizeText>
				</InfoText>

				<StyledButton
					onPress={() => {}}
					style={{backgroundColor: green, flexDirection: 'row'}}
				>
					<ButtonText>
						Proceed
					</ButtonText>
					<Ionicons name="arrow-forward-circle" size={25} color={primary}/>
				</StyledButton>

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
	);
}

export default Verification;