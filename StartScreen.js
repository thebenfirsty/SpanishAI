import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const StartScreen = ({ navigation }) => {
    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Ordering Coffee')}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Order Coffee</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Privacy and Support')}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Privacy and Support</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    button: {
        backgroundColor: 'rgba(13,61,13,0.65)',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});

export default StartScreen;
