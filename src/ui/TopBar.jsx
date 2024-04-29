import './Style/TopBar.css'
import useApi from '../api/useApi'
import {useState,useEffect} from 'react'

const TopBar = ({postId}) => {
	const [postTitle, setPostTitle] = useState('')
	const {data: post,isLoading,error} = useApi(`http://localhost:8000/api/blogs/${postId}`)

	useEffect(()  => { 
		if(post) {
			setPostTitle(post.title)
		}
	}, [post])


	return (
		<div className='topbar'>
			<h2>{postTitle}</h2>
		</div>
	)
}

export default TopBar
