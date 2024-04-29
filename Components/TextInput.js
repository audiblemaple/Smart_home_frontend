import React from "react";
import {View} from "react-native";
import {LeftIcon, RightIcon, StyledInputLabel, StyledTextInput} from "./Styles";
import {Ionicons, Octicons} from "@expo/vector-icons";

import { Colors } from "./Styles";
const {brand, dark_light} = Colors;
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
				</RightIcon>
			}
		</View>
	);
}

export default TextInput;