import './Style/Home.css'
import TopBar from './TopBar'
import SideBar from './SideBar'
import Content from './Content'
import {useState} from 'react'

function Home() {
	const [postId, setPostId] = useState(1)

	return (
		<div className='app'>
			<TopBar postId={postId}/>
			<div className='blog'>
			<SideBar postId={postId} setPostId={setPostId}/>
			<Content postId={postId}/>
			</div>
		</div>
	)
}

export default Home
