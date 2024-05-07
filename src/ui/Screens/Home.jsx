import '../Style/Home.css'
import TopBar from '../Components/TopBar'
import SideBar from '../Components/SideBar'
import Content from '../Components/Content'
import {useState} from 'react'

function Home({navigate, isCreating, setIsCreating, isEditing, setIsEditing}) {
	const [postId, setPostId] = useState(1)
	const [isLogged, setIsLogged] = useState(false)

	return (
		<div className='app'>
			<TopBar postId={postId} navigate={navigate} />
			<div className='blog'>
			<SideBar postId={postId} setPostId={setPostId}/>
			<Content postId={postId} isLogged={isLogged} setIsLogged={setIsLogged} isCreating={isCreating} setIsCreating={setIsCreating} setIsEditing={setIsEditing} isEditing={isEditing}/>
			</div>
		</div>
	)
}

export default Home
