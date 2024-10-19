// src/styles.ts
import { StyleSheet } from 'react-native';
import Colors from '@theme/colors';

export const commonStyles = StyleSheet.create({
    title: {
        fontSize: 16,
        fontWeight: "600",
        color: Colors.black2A,
    },
    email: {
        fontSize: 13,
        color: "gray",
    },
    container: {
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: Colors.container,
    }
});