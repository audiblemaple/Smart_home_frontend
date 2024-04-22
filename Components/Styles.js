import styled from "styled-components";
import {View, Text, Image, TextInput, TouchableOpacity} from "react-native";
import Constants from "expo-constants";
const StatusBarHeight = Constants.statusBarHeight;

export const Colors = {
    primary: "#ffffff",
    secondary: "#E5E7EB",
    tertiary: "#1F2937",
    dark_light: "#9CA3AF",
    gray: "#6B7280",
    brand: "#6D28D9",
    green: "#10B981",
    red: "#EF4444",
    orange: "#ff7e00",
    transparentGreen: 'rgba(16, 185, 129, 0.1)'
}

const { primary, secondary, tertiary, dark_light, brand, green, red } = Colors;

// TODO: check what is up with the margin-vertical property for: {StyledTextInput, StyledButton, Line}

export const StyledContainer = styled.View`
    flex: 1;
    padding: ${StatusBarHeight + 30}px 25px 0 25px;
`;

export const InnerContainer = styled.View`
    flex: 1;
    width: 100%;
    align-items: center;
`;

export const WelcomeContainer = styled(InnerContainer)`
    padding: 10px 25px 25px 25px;
    justify-content: center;
`;

export const PageLogo = styled.Image`
    width: 210px;
    height: 210px;

`;

export const Avatar = styled.Image`
    width: 100px;
    height: 100px;
    margin: 10px auto 10px auto;
    border-radius: 50px;
    border-width: 2px;
    border-color: ${secondary};
`;

export const WelcomeImage = styled.Image`
    height: 50%;
    min-width: 100%;
`;

export const PageTitle = styled.Text`
    font-size: 30px;
    text-align: center;
    font-weight: bold;
    color: ${brand};
    padding: 10px 10px 0 10px;
    
    ${(props) => props.welcome && `
        font-size: 35px;
    `}
`;

export const SubTitle = styled.Text`
    font-size: 18px;
    margin-bottom: 15px;
    letter-spacing: 1px;
    font-weight: bold;
    color: ${tertiary};

    ${(props) => props.welcome && `
        margin-bottom: 5px;
        font-weight: normal;
    `}
`;

export const StyledFormArea = styled.View`
    width: 90%;
`;

export const StyledTextInput = styled.TextInput`
    background-color: ${secondary};
    text-align: left;
    padding: 15px 55px 15px 55px;
    border-radius: 5px;
    font-size: 16px;
    height: 60px;
    margin-bottom: 10px;
    color: ${tertiary};
`;

export const StyledInputLabel = styled.Text`
    color: ${tertiary};
    font-size: 14px;
    font-weight: bold;
    text-align: left;
    margin: 0 0 3px 0;
`;

export const LeftIcon = styled.View`
    left: 15px;
    top: 30px;
    position: absolute;
    z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
    right: 15px;
    top: 38px;
    position: absolute;
    z-index: 1;
`;

export const StyledButton = styled.TouchableOpacity`
    padding: 10px;
    background-color: ${brand};
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    height: 55px;
    
    ${(props) => props.google === true && `
      background-color: ${green};
      flex-direction: row;
      justify-content: center;
    `}
`;

export const ButtonText = styled.Text`
    color: ${primary};
    font-size: 16px;

    ${(props) => props.google === true && `
      padding-left: 15px;
    `}
`;

export const MsgBox = styled.Text`
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    color: ${props => props.type === "success" ? green : red};
    margin: 5px 0 5px 0;
`;

export const Line = styled.View`
    height: 1px;
    width: 100%;
    background-color: ${dark_light};
    margin: 30px 0 10px 0;
`;

export const ExtraView = styled.View`
    justify-content: center;
    flex-direction: revert;
    align-items: center;
    padding-right: 10px;
`;

export const ExtraText = styled.Text`
    justify-content: center;
    align-items: center;
    color: ${tertiary};
    font-size: 15px;
`;

export const TextLink = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
`;

export const TextLinkContent = styled.Text`
    color: ${brand};
    font-size: 15px;
    
    ${(props) => {
        const {resendStatus} = props
        
        switch (resendStatus){
            case 'Failed!':
                return `color: ${Colors.red}`;
                
            case 'Sent!':
                return `color: ${Colors.green}`
        }
    }}
    
`;

// Verification components
export const VerificationTopHalf = styled.View`
    flex: 1;
    justify-content: center;
    padding: 20px;
`;
export const IconBig = styled.View`
    width: 250px;
    height: 250px;
    background-color: ${Colors.transparentGreen};
    border-radius: 250px;
    justify-content: center;
    align-items: center;
`;

export const VerificationBottomHalf = styled(VerificationTopHalf)`
    justify-content: space-around;
`;

export const InfoText = styled.Text`
    color: ${Colors.gray};
    font-size: 15px;
    text-align: center;
`;

export const EmphasizeText = styled.Text`
    font-weight: bold;
    font-style: italic;
`;

export const InlineGroup = styled.View`
    flex-direction: row;
    padding: 10px;
    justify-content: center;
    align-items: center;
`;