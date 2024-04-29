import React, {useState} from "react";
import {StatusBar} from "expo-status-bar";

// Datetimepicker
import DateTimePicker from '@react-native-community/datetimepicker';

// formik
import {Formik} from "formik";

// icons
import {Octicons, Ionicons} from '@expo/vector-icons';

// styled components
import {
    StyledContainer,
    InnerContainer,
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
    TextLinkContent, DatetimeContainer
} from "../../Components/Styles";
import {View, TouchableOpacity, ActivityIndicator, Button, Platform} from "react-native";

// keyboard
import KeyboardAvoidingWrapper from "../../Components/KeyboardAvoidingWrapper";

// API client
import axios, {Cancel} from "axios";

import DocumentPickerComponent from "../../Components/FileUploadComponent";
import ModalWindow from "../../Components/ModalWindow";

const {brand, dark_light, primary} = Colors

const Signup = ({navigation}) => {
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const [hidePassword, setHidePassword] = useState(true);
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date(2000, 0 ,1));
    // user date
    const [userDate, setUserDate] = useState(new Date());
    const [file, setFile] = useState(null);


    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        if (Platform.OS === "android")
            setShow(false);
        setDate(currentDate);
        setUserDate(currentDate);
    }

    const closeDate = () => {
        setShow(false);
    }

    const showDatePicker = () => { setShow(true); }

    const handleSignup = (credentials, setSubmitting) => {
        handleMessage(null);
        const url = "https://smart-home-backend-rc94.onrender.com/api/v1/user/signup"
        // const url = "http://192.168.0.233:5000/api/v1/user/UploadModel" // debug
        // const url = "http://192.168.0.233:5000/api/v1/user/signup"
        // const url = "http://100.64.100.6:5000/api/v1/user/signup"

        // Creating FormData to include file and other data
        const formData = new FormData();
        formData.append('name', credentials.name);
        formData.append('email', credentials.email);
        formData.append('password', credentials.password);
        formData.append('confirmPassword', credentials.confirmPassword);
        formData.append('dateOfBirth', credentials.dateOfBirth.toISOString().slice(0, 24));

        // Append file if it exists
        if (credentials.file)
            formData.append('file', file);

        axios
            .post(url, formData, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data",
                },
            } )
            .then((response) => {
                const result = response.data;
                const {message, status, data} = result;

                handleMessage(message, status);
                if (! (message && status && data) ){
                    setSubmitting(false);
                    console.log(result);
                    return handleMessage("an error occurred");
                }

                navigation.navigate('Verification', {...data});
                setSubmitting(false);
            })
            .catch(error => {
                setSubmitting(false);
                const errorResult = error.response.data;
                const {message, status} = errorResult;
                if (! (message && status)){
                    handleMessage("An error occurred\nPlease check your network and try again");
                    return;
                }
                handleMessage(message, status);
            });
    }

    const handleMessage = (message, type = "fail") => {
        setMessage(message);
        setMessageType(type);
    }

    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style="dark"/>
                <InnerContainer>
                    <PageTitle>Smart home</PageTitle>
                    <SubTitle> Account Signup</SubTitle>

                    {/*TODO: Fix this on IOS it doesnt display the date time picker menu!!*/}
                    { Platform.OS === "android" && show &&
                        <DateTimePicker
                            testID='dateTimePicker'
                            value={date}
                            mode='date'
                            is24Hour={true}
                            display="spinner"
                            onChange={onDateChange}
                        />
                    }
                    { Platform.OS === "ios" && show &&
                        <DatetimeContainer>
                            <DateTimePicker
                                testID='dateTimePicker'
                                value={date}
                                mode='date'
                                is24Hour={true}
                                display="spinner"
                                onChange={onDateChange}
                                minimumDate={new Date(1924, 4, 1)}
                                maximumDate={new Date()}
                            />
                            <Button title="Confirm" onPress={closeDate} ></Button>

                        </DatetimeContainer>
                    }

                    <Formik
                        initialValues={{ name: '', email: '', dateOfBirth: '', password: '', confirmPassword: '' }
                    }
                        onSubmit={(values, {setSubmitting}) =>
                        {
                            values = { ...values, dateOfBirth: userDate, file: file }
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
                            if (values.dateOfBirth === '') {
                                handleMessage("Date of birth field cannot be empty");
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

                            handleSignup(values, setSubmitting);
                        }}
                    >
                        {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (
                            <StyledFormArea>
                                <TextInput
                                    label="Full name"
                                    icon="person"
                                    placeholder="John Doe"
                                    placeholderTextColor={dark_light}
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                    value={values.name}
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
                                />

                                <TextInput
                                    label="Date of Birth"
                                    icon="calendar"
                                    placeholder="YYY - MM - DD"
                                    placeholderTextColor={dark_light}
                                    onChangeText={handleChange('dateOfBirth')}
                                    onBlur={handleBlur('dateOfBirth')}
                                    value={userDate ? userDate.toDateString() : ''}
                                    isDate={true}
                                    editable={false}
                                    showDatePicker={showDatePicker}
                                    onPressIn={showDatePicker}
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

                                <TextInput
                                    label="Confirm Password"
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

                                <DocumentPickerComponent setFile={setFile}/>

                                <MsgBox type={messageType}>{message}</MsgBox>

                                {!isSubmitting &&
                                    <StyledButton onPress={handleSubmit}>
                                        <ButtonText>Sign up</ButtonText>
                                    </StyledButton>
                                }
                                {isSubmitting &&
                                    <StyledButton disabled={true}>
                                        <ActivityIndicator size="large" color={primary}/>
                                    </StyledButton>
                                }

                                <Line/>

                                <ExtraView>
                                    <ExtraText>Already have an account?</ExtraText>
                                    <TextLink onPress={ () => navigation.navigate("Login")} >
                                        <TextLinkContent> Login </TextLinkContent>
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

const TextInput = ({label, icon, isPassword, hidePassword, setHidePassword,isDate, showDatePicker, ...props}) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            {!isDate && <StyledTextInput {...props}/>}
            {isDate && <TouchableOpacity onPress={showDatePicker} >
                <StyledTextInput {...props}/>
            </TouchableOpacity>}
            {isPassword &&
                <RightIcon onPress={ () => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'eye-off' : 'eye' } size={30} color={dark_light}/>
                </RightIcon>}
        </View>
    );
}

export default Signup