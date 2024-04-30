import './App.css'
import TopBar from './ui/TopBar'
import SideBar from './ui/SideBar'
import Content from './ui/Content'
import {useState} from 'react'

function App() {
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

export default App
