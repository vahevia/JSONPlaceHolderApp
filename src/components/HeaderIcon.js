import React from 'react';
import {
    StyleSheet,
    TouchableWithoutFeedback,
    View,
    Image
} from "react-native";

const HeaderIcon = (props) => {
    const { onPress, image } = props

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback 
                onPress={onPress} 
            >
                <Image source={image} style={styles.image}/>
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 20, 
        height: 20, 
        marginRight: 10
    },
    image: {
        flex: 1,
        width: null,
        height: null,
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'contain'
    },
})

export default HeaderIcon;