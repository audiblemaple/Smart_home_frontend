import React from 'react';
import * as DocumentPicker from 'expo-document-picker';
import {ButtonText, StyledButton} from "./Styles";

const DocumentPickerComponent = ({ setFile }) => {
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
			setFile(model);

		} catch (error) {
			console.error('Error picking a document: ', error);
		}
	};

	return (
		<StyledButton onPress={handleDocumentPick}>
			<ButtonText>Pick a Document</ButtonText>
		</StyledButton>
	);
};

export default DocumentPickerComponent;