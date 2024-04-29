import './Style/Content.css'

const Content = ({isVisible}) => {
	return (
		<div className={`content ${isVisible ? '' : 'expanded'}`}>
		</div>
	)
}

export default Content
