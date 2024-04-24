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


export async function uploadAudio(uri) {
    const formData = new FormData();
    console.log(uri);
    formData.append('audioFile', {
        uri: uri,
        type: 'audio/aac', // Adjust the type according to your audio file format
        name: 'test.aac',
    });

    console.log(formData);

    try {
        const response = await fetch("https://spanishai-forwardtheory.koyeb.app/upload", {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
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

export async function saveAudioFile(blob, filename) {
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

export function playAudio(audioPath) {
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
                RNFS.unlink(audioPath);
            } else {
                console.log('Playback failed due to audio decoding errors');
            }
            // Release the audio player resource once playback is complete
            sound.release();
        });
    });
}