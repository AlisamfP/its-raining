import React from 'react';
import { GestureResponderEvent, Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
    label: string;
    onPress?: (event: GestureResponderEvent) => void;
};

const Button: React.FC<Props> = ({ label, onPress }) => (
    <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.buttonLabel}>{label}</Text>
        </Pressable>
    </View>
);

const styles = StyleSheet.create({
    buttonContainer: {
        width: 320,
        height: 68,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
    },
    button: {
        borderRadius: 10,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#fff',
    },
    buttonLabel: {
        color: '#25292e',
        fontSize: 16,
    },
});

export default Button;
