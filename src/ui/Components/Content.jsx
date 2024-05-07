import { useState, useEffect } from 'react';
import '../Style/Content.css'; 
import useApi from '../useApi'

const Content = ({ isVisible, postId, isLogged }) => {
    const [postDemon, setPostDemon] = useState('');
    const [postContent, setPostContent] = useState('');
    const [postLevel, setPostLevel] = useState(null);
    const [postDate, setPostDate] = useState(null);
    const {data: post, isLoading, error} = useApi(`https://backend-stw-p1.onrender.com/api/blogs/${postId}`)

    useEffect(() => {
        if (post) {
            setPostDemon(post.demon);
            setPostContent(post.content);
            setPostLevel(post.level);
            setPostDate(post.post_date);
        }
    }, [post]);



    return (
        <div className={`content ${isVisible ? '' : 'expanded'}`}>
                    <div className='date'>{postDate}</div>
                    <div className='header'>{postDemon}</div>
                    {postLevel !== 0 && <div className='level'>Level: {postLevel}</div>}
                    <div className='content-post'>{postContent}</div>
        </div>
    )
}

export default Content

