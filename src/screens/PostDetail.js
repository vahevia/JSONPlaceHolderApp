import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView
} from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { getUser, getPostComments } from '../services/Services';
import { updatePosts } from '../redux/postsReducer';
import { postsSelector } from '../redux/postsReducer';
import HeaderIcon from '../components/HeaderIcon';

const PostDetailScreen = ({navigation, route}) => {

    const { posts } = useSelector(postsSelector)
    const dispatch = useDispatch()

    const { id, userId, description, index } = route.params
    const [user, setUser] = useState({});
    const [comments, setComments] = useState([]);

    navigation.setOptions({
        headerRight: () => (
            <HeaderIcon 
                image={require("../assets/star.png")} 
                onPress={() => dispatch(updatePosts([
                    ...posts.slice(0, index),
                    {
                        ...posts[index],
                        favorite: true
                    },
                    ...posts.slice(index+1)
                ]))} 
            />
        )
    })

    async function getInfo() {
        try{
            let res = await getUser(userId)
            setUser(res)
            let commentRes = await getPostComments(id)
            setComments(commentRes)
        } catch (error){
            console.log(error)
        }
    }

    useEffect(() => {
        getInfo()
    }, [])

    const showComments = () => {
        return( comments &&
            comments.map(comment =>
                <View style={styles.commentBox}>
                    <Text>
                        {comment.body}
                    </Text>
                </View>
            )
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topContainer}>
                <Text style={styles.title}>Description</Text>
                <Text style={{textAlign: 'justify'}}>
                    {description}
                </Text>
                <Text style={styles.title}>User</Text>
                <Text style>
                    Name: {user?.name}
                </Text>
                <Text>
                    Email: {user?.email}
                </Text>
                <Text>
                    Phone: {user?.phone}
                </Text>
                <Text>
                    Website: {user?.website}
                </Text>
            </View>
            <View style={styles.commentTitle}>
                <Text style={[styles.title, {paddingVertical: 2}]}>COMMENTS</Text>
            </View>
            {showComments()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    topContainer: {
        paddingHorizontal: 10,
        paddingBottom: 15
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        paddingVertical: 15
    },
    commentTitle: {
        backgroundColor: 'gray',
        paddingHorizontal: 10,
        width: '100%'
    },
    commentBox: {
        paddingHorizontal: 10, 
        backgroundColor: 'white',
        borderBottomColor: '#828489',
        borderBottomWidth: 1
    }
})

export default PostDetailScreen;