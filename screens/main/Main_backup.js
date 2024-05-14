// import React from "react";
// import {StatusBar} from "expo-status-bar";
//
// // icons
// import {Octicons, Ionicons} from '@expo/vector-icons';
//
// import {
//     StyledContainer,
//     InnerContainer,
//     PageLogo,
//     PageTitle,
//     SubTitle,
//     StyledFormArea,
//     LeftIcon,
//     StyledInputLabel,
//     StyledTextInput,
//     RightIcon,
//     StyledButton,
//     ButtonText,
//     Line,
//     WelcomeContainer,
//     WelcomeImage,
//     Avatar
// } from "../../Components/Styles";
// import {View} from "react-native";
//
// const Main = ({ navigation, route }) => {
//     const {name, email} = route.params;
//     return (
//         <>
//             <StatusBar style="light"/>
//             <InnerContainer>
//                 <WelcomeImage resizeMode="cover" source={require('../../assets/leaves-6975462_1920.png')} />
//                 <WelcomeContainer>
//                     <PageTitle welcome={true}>Welcome back</PageTitle>
//                     <SubTitle welcome={true}> {name || "John Doe"} </SubTitle>
//                     <SubTitle welcome={true}> {email || "empty@email.com"} </SubTitle>
//                     <StyledFormArea>
//
//                         <Avatar resizeMode="cover" source={require('../../assets/download.jpeg')} ></Avatar>
//                         <Line/>
//                         <StyledButton onPress={() => {navigation.navigate("Login")}}>
//                             <ButtonText>Logout</ButtonText>
//                         </StyledButton>
//
//                     </StyledFormArea>
//                 </WelcomeContainer>
//             </InnerContainer>
//         </>
//     );
// };
//
//
// // remove this
// const TextInput = ({label, icon, isPassword, hidePassword, setHidePassword, ...props}) => {
//     return (
//         <View>
//             <LeftIcon>
//                 <Octicons name={icon} size={30} color={brand} />
//             </LeftIcon>
//             <StyledInputLabel>{label}</StyledInputLabel>
//             <StyledTextInput {...props} />
//             {isPassword &&
//                 <RightIcon onPress={ () => setHidePassword(!hidePassword)}>
//                     <Ionicons name={hidePassword ? 'eye-off' : 'eye' } size={30} color={darklight}/>
//                 </RightIcon>}
//         </View>
//     );
// }
//
// export default Main