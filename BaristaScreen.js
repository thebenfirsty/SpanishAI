import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';

// Import the image
const baristaImage = require('./assets/barista.png');

const BaristaScreen = () => {
    const handlePress = () => {
        // Implement what happens when the button is pressed
        console.log('Record button pressed');
    };

    return (
        <View style={styles.container}>
            {/* Image at the top-middle of the screen */}
            <View style={styles.imageContainer}>
                <Image source={baristaImage} style={styles.image} resizeMode="contain" />
            </View>

            {/* Circular red button at the bottom */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handlePress} style={styles.recordButton}>
                    <View style={styles.square}></View>
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
        width: '80%', // Adjust based on your requirement
        height: '50%', // Adjust based on your requirement
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
    },
    square: {
        backgroundColor: '#FFFFFF',
        width: 30, // Adjust size as needed
        height: 30, // Adjust size as needed
    },
});

export default BaristaScreen;
