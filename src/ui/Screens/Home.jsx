import '../Style/Home.css'
import TopBar from '../Components/TopBar'
import SideBar from '../Components/SideBar'
import Content from '../Components/Content'
import {useState} from 'react'

function Home({navigate}) {
	const [postId, setPostId] = useState(1)

	return (
		<div className='app'>
			<TopBar postId={postId} navigate={navigate}/>
			<div className='blog'>
			<SideBar postId={postId} setPostId={setPostId}/>
			<Content postId={postId}/>
			</div>
		</div>
	)
}

export default Home
