import React from 'react';
import {ActivityIndicator, View} from "react-native";
import {EmphasizeText, InfoText, InlineGroup, TextLink, TextLinkContent, Colors} from "./Styles";

const {brand} = Colors;

const ResendTimer = ({	activeResend, resendingEmail, resendStatus, timeLeft, targetTime, resendEmail,}) => {
	return (
		<View>
			<InlineGroup>
				<InfoText>Didnt receive the email? </InfoText>

				{!resendingEmail && (
					<TextLink
						style={{opacity: !activeResend && 0.5}}
						disabled={!activeResend}
						onPress={() => {}}
					>
						<TextLinkContent
							resendStatus={resendStatus}
							style={{textDecorationLine: 'underline'}}>
							{resendStatus}
						</TextLinkContent>
					</TextLink>
				)}

				{resendingEmail && (
					<TextLink
						disabled
					>
						<TextLinkContent>
							<ActivityIndicator color={brand}/>
						</TextLinkContent>
					</TextLink>
				)}
			</InlineGroup>

			{!activeResend && (
				<InfoText>
					in <EmphasizeText>{timeLeft || targetTime}</EmphasizeText> seconds(s)
				</InfoText>
			)}
		</View>
	);
};

export default ResendTimer;