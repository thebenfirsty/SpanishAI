import React, {useState} from 'react';
import {View, Image, TouchableOpacity, StyleSheet, Text, Alert} from 'react-native';

const PrivacySupport = () => {
   return (
    <>
        <View>
            <Text>Privacy: This app does not track user data. All audio recordings and translations are destroyed after
                use.</Text>
        </View>

        <View>
            <Text>Support: Please contact benfirsty@gmail.com for app support.</Text>
        </View>
    </>
    );
};

export default PrivacySupport;