import React, {useState} from 'react';
import {View, Image, TouchableOpacity, StyleSheet, Text, Alert} from 'react-native';
import { AudioRecorder, AudioUtils } from 'react-native-audio';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Sound from "react-native-sound";
import RNFS from "react-native-fs";

// Import the image
const baristaImage = require('./assets/barista.png');
const audioPathIN = AudioUtils.DocumentDirectoryPath + '/test.aac';
const fileUri = "file://" + audioPathIN;
Sound.setCategory("Playback");

async function uploadAudio(uri) {
    const formData = new FormData();
    console.log(uri);
    formData.append('audioFile', {
        uri: uri,
        type: 'audio/aac', // Adjust the type according to your audio file format
        name: 'test.aac',
    });

    console.log(formData);

    try {
        const response = await fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: formData,
            //headers: {
            //    'Content-Type': 'multipart/form-data',
            //},
        })
        console.log("output");
        console.log(response);
        const blob = await response.blob();
        await saveAudioFile(blob, "speech.mp3");
        const filename = "speech.mp3";
        return `${RNFS.DocumentDirectoryPath}/${filename}`;
    } catch (error) {
        console.log(error);
    }
}

async function saveAudioFile(blob, filename) {
    // Convert blob to base64
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = async () => {
        const base64data = reader.result;

        // Extract the base64 content (remove the data URL prefix)
        const base64Content = base64data.split(',')[1];

        // Define the path to save the file
        const path = `${RNFS.DocumentDirectoryPath}/${filename}`;
        // Save the file
        await RNFS.writeFile(path, base64Content, 'base64');
        console.log(`File saved to ${path}`);
        return path;
    };
}

function playAudio(audioPath) {
    // Initialize the sound object
    let cleanedPath = audioPath.trim();
    let sound = new Sound(cleanedPath, "", (error) => {
        console.log(sound);
        console.log("test");
        console.log(audioPath);
        if (error) {
            console.log('Failed to load the sound', error);
            return;
        }
        console.log(`Attempting to play audio from path: ${audioPath}`);
        // Play the sound if loaded successfully
        sound.play((success) => {
            if (success) {
                console.log('Successfully finished playing');
            } else {
                console.log('Playback failed due to audio decoding errors');
            }
            // Release the audio player resource once playback is complete
            sound.release();
        });
    });
}


const BaristaScreen = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [answer, setAnswer] = useState('');

    const startRecording = async () => {
        const permission = await check(PERMISSIONS.IOS.MICROPHONE);

        if (permission !== RESULTS.GRANTED) {
            const requestResult = await request(PERMISSIONS.IOS.MICROPHONE);
            if (requestResult !== RESULTS.GRANTED) {
                Alert.alert('Permission Required', 'This app needs microphone access to record audio.');
                return;
            }
        }

        let audioPath = AudioUtils.DocumentDirectoryPath + '/test.aac';
        AudioRecorder.prepareRecordingAtPath(audioPath, {
            SampleRate: 16000,
            Channels: 1,
            AudioQuality: 'Low',
            AudioEncoding: 'aac',
        });

        AudioRecorder.startRecording();
        setIsRecording(true);
    };

    const stopRecording = async () => {
        await AudioRecorder.stopRecording();
        setIsRecording(false);
    };


    const handlePress = async () => {
        if (isRecording) {
            await stopRecording();
            try {
                console.log(audioPathIN)
                // Ensure conversion is complete before attempting upload
                //const responseText = await uploadAudio(fileUri);
                //console.log(responseText);
                //playAudio(responseText);
                const localAudioPath = await uploadAudio(fileUri);
                console.log(localAudioPath);
                playAudio(localAudioPath);
                console.log("done");
            } catch (error) {
                console.error('Error in conversion or upload: ', error);
            }
        } else {
            await startRecording();
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.image}>
                <Image source={baristaImage} style={styles.image} resizeMode="contain" />
            </View>

        <View>
            <Text> {answer} </Text>
        </View>

            {/* Circular red button at the bottom */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handlePress} style={styles.recordButton}>
                    <View style={isRecording ? styles.square : styles.circular}></View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    imageContainer: {
        marginTop: 20,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%', // Adjust based on your requirement
        height: '80%', // Adjust based on your requirement
    },
    buttonContainer: {
        marginBottom: 30,
    },
    recordButton: {
        backgroundColor: '#FF0000',
        width: 60, // Adjust size as needed
        height: 60, // Adjust size as needed
        borderRadius: 30, // Half of the width/height to make it circular
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#0a0a0a',
        borderStyle: 'solid',
        borderWidth: 2,
    },
    square: {
        backgroundColor: '#FFFFFF',
        width: 20, // Adjust size as needed
        height: 20, // Adjust size as needed
    },

    circular: {
        backgroundColor: '#FFFFFF',
        width: 20, // Adjust size as needed
        height: 20, // Adjust size as needed
        borderRadius: 10,
    },

    Respond: {
        marginBottom: 40,
    },
    respondText: {
        backgroundColor: '#FF0000',
    }
});

export default BaristaScreen;