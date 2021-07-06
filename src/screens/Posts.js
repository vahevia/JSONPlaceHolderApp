import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    FlatList,
    TouchableWithoutFeedback,
    View,
    Text,
    SafeAreaView,
    ActivityIndicator,
    Image
} from "react-native";
import SegmentedControlTab from 'react-native-segmented-control-tab';
import Swipeout from 'react-native-swipeout';
import { getAllPostServices } from '../services/Services';
import { useSelector, useDispatch } from 'react-redux';
import { postsSelector } from '../redux/postsReducer';
import { updatePosts } from '../redux/postsReducer';
import HeaderIcon from '../components/HeaderIcon';

const PostsScreen = (props) => {

    const { posts, loading } = useSelector(postsSelector)
    const dispatch = useDispatch()

    const [selectedIndex, setSelectedIndex] = useState(0)

    props.navigation.setOptions({
        headerRight: () => (
            <HeaderIcon 
                image={require("../assets/reload.png")} 
                onPress={() => dispatch(getAllPostServices())} 
            />
        )
    })

    useEffect(() => {
        dispatch(getAllPostServices())
    },[dispatch])

    const handleIndexChange = (index) => (
        setSelectedIndex(index)
    );
    
    const onPostDetailPressed = (item) => {
        const index = posts.findIndex((post) => (
            post.id === item.id
        ))
        if (index !== -1) {
            dispatch(updatePosts([
                ...posts.slice(0, index),
                {
                    ...posts[index],
                    read: true
                },
                ...posts.slice(index+1)
            ]))
            props.navigation.navigate('Post', {
                index: index,
                id: item.id,
                description: item.body,
                userId: item.userId
            })
        }
    }

    const deletePressed = (item) => {
        const index = posts.findIndex((post) => (
            post.id === item.id
        ))
        if (index !== -1) {
            dispatch(updatePosts([
                ...posts.slice(0, index),
                ...posts.slice(index+1)
            ]))
        }
    }

    const onDeleteAll = () => {
        dispatch(updatePosts([]))
    }

    const renderItem = ({ item }) => {
        let swipeoutBtns = [
            {
                text: 'Delete',
                backgroundColor: 'red',
                onPress: () => deletePressed(item)
            }
        ]

        return (
            <Swipeout right={swipeoutBtns}>
                <View style={styles.item}>
                    <View style={[styles.center, {flex: 0.1}]}>
                        {item.id < 21 && !item.read && <View style={styles.blueDot} />}
                        {item.favorite && <HeaderIcon image={require("../assets/star.png")}/>}
                    </View>
                    <Text style={styles.text}>
                        {item.title}
                    </Text>
                    <View style={[styles.center, {flex: 0.15}]}>
                        <TouchableWithoutFeedback
                            onPress={() => onPostDetailPressed(item)}
                        >
                            <Text>
                                {`>`}
                            </Text>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </Swipeout>
        )
    };

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.segmentedControlView}>
                <SegmentedControlTab
                    values={['All', 'Favorites']}
                    selectedIndex={selectedIndex}
                    onTabPress={handleIndexChange}
                    tabsContainerStyle={{ width: '80%', height: 30, borderColor: 'green' }}
                    tabStyle={{ borderColor: 'green' }}
                    activeTabStyle={{ backgroundColor: 'green' }}
                    activeTabTextStyle={{color: 'white'}}
                    tabTextStyle={{ color: 'green', fontWeight: 'bold' }}
                />
            </View>
            {loading ?
                <ActivityIndicator />
            :
                selectedIndex === 0 ? 
                <FlatList
                    data={posts}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
                :
                <FlatList
                    data={posts.filter(post => (post.favorite))}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            }
            <View style={styles.deleteAllContainer}>
                <TouchableWithoutFeedback 
                    onPress={() => onDeleteAll()}
                >
                    <Text style={styles.deleteAllText}>
                        Delete All
                    </Text>
                </TouchableWithoutFeedback>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    segmentedControlView : {
        margin: 10, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    item: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: 'white',
        borderBottomColor: '#828489',
        borderBottomWidth: 1
    },
    center: {
        alignItems: 'center', 
        justifyContent: 'center'
    },
    blueDot: {
        width: 10,
        height: 10,
        borderColor: 'blue',
        borderRadius: 5,
        backgroundColor: 'blue'
    },  
    text: {
        flex: 0.8,
        color: '#828489',
        padding: 5,
    },
    deleteAllContainer: {
        position: 'relative',
        bottom: 0,
        backgroundColor: 'red',
        width: '100%',
        height: 35,
        alignItems: 'center',
        justifyContent: 'center'
    },
    deleteAllText: {
        color: 'white'
    }
})

export default PostsScreen;