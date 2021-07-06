import axios from "axios";
import { getPosts, getPostsSuccess, getPostsFail } from '../redux/postsReducer'

const API = 'https://jsonplaceholder.typicode.com'

const addExtraPropertyPost = (posts) => posts.map((post) => 
    ({...post, read: false, favorite: false})
)

export const getAllPostServices = () => (dispatch) => {
    dispatch(getPosts())
    axios.get(`${API}/posts`).then(
        res =>
        dispatch(getPostsSuccess(addExtraPropertyPost(res.data)))
    ).catch(
        err => 
        dispatch(getPostsFail(err))
    )
}

export const getAllPosts = async () => {
    try {
        let res = await axios(`${API}/posts`, { method: 'GET' })
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const getPostComments = async (id) => {
    try {
        let res = await axios(`${API}/posts/${id}/comments`, { method: 'GET' })
        console.log(res)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const getUser = async (id) => {
    try {
        let res = await axios(`${API}/users/${id}`, { method: 'GET' })
        return res.data
    } catch (error) {
        console.log(error)
    }
}