import React from 'react';
import { Alert } from 'react-native';

const InvalidFileAlert = ({ onDismiss }) => {
	React.useEffect(() => {
		Alert.alert(
			'Error',
			'Invalid file type.\nSupported File extensions:\n".glb", ".obj", ".gltf"',
			[
				{
					text: 'Cancel',
					onPress: () => {
						console.log('Cancel Pressed');
						onDismiss();
					},
					style: 'cancel',
				},
				{
					text: 'OK',
					onPress: () => {
						console.log('OK Pressed');
						onDismiss();
					},
				},
			]
		);
	}, []);

	return null;
};

export default InvalidFileAlert;
