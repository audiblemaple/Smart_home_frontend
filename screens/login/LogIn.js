import React, {useState} from "react";
import {StatusBar} from "expo-status-bar";

// formik
import {Formik} from "formik";

// icons
import {Fontisto} from '@expo/vector-icons';

import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea,
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
import {ActivityIndicator} from "react-native";

const { dark_light, primary} = Colors

// keyboard
import KeyboardAvoidingWrapper from "../../Components/KeyboardAvoidingWrapper";
import TextInput from "../../Components/TextInput";
// API client
import axios from "axios";

// google
import * as Google from 'expo-google-app-auth'


/**
 * Main component responsible for rendering the login screen.
 * Manages user authentication through email/password and Google login.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.navigation - Navigation object provided by the navigation context.
 * @returns {React.Component} - Returns a React component that renders the login screen.
 */
const LogIn = ({navigation}) => {

    const [hidePassword, setHidePassword] = useState(true)
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState('');
    const [googleSubmitting, setGoogleSubmitting] = useState(false);


    /**
     * Handles the login process with email and password.
     *
     * @param {Object} credentials - User credentials containing email and password.
     * @param {Function} setSubmitting - Formik function to handle form submission state.
     */
    const handleLogin = (credentials, setSubmitting) => {
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


    /**
     * Handles the login process using Google authentication.
     */
    const handleGoogleLogin = () => {
        setGoogleSubmitting(true);

        const config = {
            iosClientId: "641573898796-nmu4bhib20v229i12cvqisr63mi5aut5.apps.googleusercontent.com",
            androidClientId: "641573898796-pok1kbb3ui1hcso6ks0vse9u8bou3irj.apps.googleusercontent.com",
            scopes: ['profile', 'email']
        };

        // TODO: fix google Sign in, to use the not deprecated version.
        Google
            .logInAsync(config)
            .then((result) => {
                const {type, user} = result;
                if (type !== 'success'){
                    handleMessage("Google Login failed.");
                    return setGoogleSubmitting(false);
                }

                const { email, name, photoUrl } = user;

                handleMessage("Google Login successful", 'success');
                setTimeout(() => navigation.navigate('Welcome', {email, name, photoUrl}), 1000);

            })
            .catch(error => {
                console.log(error);
                handleMessage("An error occurred\ncheck your network and try again");
                setGoogleSubmitting(false);
            });
    }

    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style="dark"/>
                <InnerContainer>
                    <PageLogo resizeMode="cover" source={require('../../assets/badge.png')} />
                    <PageTitle>Smart home</PageTitle>
                    <SubTitle> Account login</SubTitle>
                    <Formik
                        initialValues={{email: '', password: ''}}
                        onSubmit={(values, {setSubmitting}) => {
                            if (values.email === '') {
                                handleMessage("Email field cannot be empty");
                                setSubmitting(false);
                                return;
                            }

                            if (values.password === '') {
                                handleMessage("Password field cannot be empty");
                                setSubmitting(false);
                                return;
                            }

                            handleLogin(values, setSubmitting);
                        }}

                        validateOnChange={(values, {setSubmitting}) => {
                            if (values.email === '') {
                                handleMessage("Email field cannot be empty");
                                setSubmitting(false);
                                return;
                            }

                            if (values.password === '') {
                                handleMessage("Password field cannot be empty");
                                setSubmitting(false);
                                return;
                            }
                        }}

                    >
                        {({handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
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

                                <TextInput
                                    label="Password"
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
                                <TextLink style={{alignItems: "left"}} onPress={ () => navigation.navigate("forgotPassword")} >
                                    <TextLinkContent> Forgot password </TextLinkContent>
                                </TextLink>

                                <MsgBox type={messageType}>{message}</MsgBox>

                                {!isSubmitting &&
                                    <StyledButton onPress={handleSubmit}>
                                        <ButtonText>Login</ButtonText>
                                    </StyledButton>
                                }
                                {isSubmitting &&
                                    <StyledButton disabled={true}>
                                        <ActivityIndicator size="large" color={primary}/>
                                    </StyledButton>
                                }

                                <Line/>

                                {!googleSubmitting &&
                                    <StyledButton google={true} onPress={handleGoogleLogin}>
                                        <Fontisto name="google" color={primary} size={25}/>
                                        <ButtonText google={true} onPress={handleSubmit} >Sign in with google</ButtonText>
                                    </StyledButton>
                                }

                                {googleSubmitting &&
                                    <StyledButton google={true} disabled={true}>
                                        <ActivityIndicator size="Large" color={primary}/>
                                    </StyledButton>
                                }

                                <ExtraView>
                                    <ExtraText>Don't have an account?</ExtraText>
                                    <TextLink onPress={ () => navigation.navigate("Signup")} >
                                        <TextLinkContent> Signup </TextLinkContent>
                                    </TextLink>

                                </ExtraView>

                            </StyledFormArea>
                        )}
                    </Formik>
                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
};

export default LogIn