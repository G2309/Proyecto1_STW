import '../Style/Content.css'
import useApi from '../useApi'
import {useState,useEffect} from 'react'

const Content = ({isVisible, postId}) => {
	const [postDemon, setPostDemon] = useState('')
	const [postContent, setPostContent] = useState('')
	const [postLevel, setPostLevel] = useState(null)
	const [postDate, setPostDate] = useState(null)
	const [postImage, setPostImage] = useState(null)

	const {data: post, isLoading, error} = useApi(`http://localhost:8000/api/blogs/${postId}`)
	useEffect(() => {
		if(post){
			setPostDemon(post.demon)
			setPostContent(post.content)
			setPostLevel(post.level)
			setPostDate(post.post_date)
			setPostImage(post.image)
		}
	},[post])

	return (
		<div className={`content ${isVisible ? '' : 'expanded'}`}>
		<div className='date'>{postDate}</div>	
		<div className='header'>{postDemon}</div>
		{postLevel !== 0 && <div className='level'>Level: {postLevel}</div>}
		<div className='content_post'>{postContent}</div>
		</div>
	)
}

export default Content