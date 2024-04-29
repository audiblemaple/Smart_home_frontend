import styled from "styled-components";
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
    transparentGreen: 'rgba(16, 185, 129, 0.1)',
    transparentGray: 'rgba(154,154,154,0.52)',
    transparentWhite: 'rgba(217,217,217,0.75)'
}

const {
    primary,
    secondary,
    tertiary,
    dark_light,
    gray,
    brand,
    green,
    red,
    orange,
    transparentGreen,
    transparentGray,
    transparentWhite
} = Colors;

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

export const DatetimeContainer = styled(InnerContainer)`
    background-color: ${primary};
    position: absolute;
    bottom: -5%;
    z-index: 1;
    border-radius: 30px;
    padding: 5px;
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
    
    ${(props) => props.color && `
        color: ${props.color}
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
    margin: 0 0 5px 0;
`;

export const LeftIcon = styled.View`
    left: 15px;
    top: 36px;
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

export const ClickableText = styled.Text`
    flex: 1;
    text-align: center;
    border-radius: 20px;
    margin: 0 5px 0 5px;
    height: 30px;
    width: 20px;
    color: #3f3fff;
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
    margin: 20px 0 5px 0;
    color: ${Colors.gray};
    font-size: 15px;
    text-align: center;
`;

export const EmphasizeText = styled.Text`
    font-weight: bold;
    font-style: italic;
`;

export const InlineGroup = styled.View`
    flex-direction: column;
    padding: 10px;
    justify-content: center;
    align-items: center;
`;

// MenuBar styles
export const MenuBarContainerSmall = styled.View`
    position: absolute;
    left: 5%;
    bottom: 40px;
    width: 90%;    
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    border-radius: 20px;
    background-color: ${transparentGray};
    padding: 5px;
    border: solid black 2px;
`;

export const MenuBarContainerFull = styled(MenuBarContainerSmall)`
    border-radius: 0 20px 20px 0;
    width: 13%;
`;

export const MenuBarButton = styled.TouchableOpacity`
    padding: 10px;
    background-color: transparent;
    align-items: center;
    border-radius: 10px;
`;


// Modal window
export const ModalContainer = styled.View`
    position: absolute;
    padding: 5px 20px 5px 20px;
    border-radius: 30px;
    bottom: 2%;
    left: 5%;
    right: 5%;
    flex: 1;
    height: auto;
    justify-items: center;
    justify-content: center;
    background-color: #e1e1e1;
`;


export const BottomContainer = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    gap: 30px;
    margin: 20px 0 0 0;
`;

export const GridView = styled.View`
    flex: 1;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 5px;
    justify-content: center;
    gap: 30px;
`;

export const GridItem = styled.View`
    width: 60px;
    height: 60px;
    padding: 5px;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    background-color: ${gray};
    z-index: 1;
`;