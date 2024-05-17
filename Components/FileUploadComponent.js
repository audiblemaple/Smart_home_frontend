import React from 'react';
import * as DocumentPicker from 'expo-document-picker';
import {ButtonText, StyledButton, TopPaddedText} from "./Styles";
import {Alert} from "react-native";
import {Octicons} from "@expo/vector-icons";

const DocumentPickerComponent = ({ setFile }) => {
	const [fileName, setFileName] = React.useState("");

	const handleDocumentPick = async () => {
		try {
			const result = await DocumentPicker.getDocumentAsync({
				// type: ['model/obj',' */*'],
				type: ['*/*'],
			});

			const assets = result.assets;
			if (!assets) return console.log("No file...");
			const file = assets[0];
			const model = {
				name: file.name,
				uri: file.uri,
				type: file.mimeType,
				size: file.size,
			};

			console.log(model.name);

			if (model.name.includes('glb') || model.name.includes('obj') || model.name.includes('gltf')) {
				setFile(model);
				setFileName(model.name);
			}
			else {
				Alert.alert('Error', 'Invalid file type.\nSupported File extensions:\n\".glb\"', [
					{
						text: 'Cancel',
						onPress: () => console.log('Cancel Pressed'),
						style: 'cancel',
					},
					{text: 'OK', onPress: () => console.log('OK Pressed')},
				]);
			}
		} catch (error) {
			console.error('Error picking a document: ', error);
		}
	};

	return (
		<>
			<StyledButton onPress={handleDocumentPick}>
				<ButtonText>Pick a Document</ButtonText>
			</StyledButton>
			{ fileName &&  <TopPaddedText> <Octicons name="file" size={20} /> {fileName}</TopPaddedText>}
		</>
	);
};

export default DocumentPickerComponent;