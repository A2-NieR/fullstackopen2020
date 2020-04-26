import React, { useState } from 'react';

const Blog = ({ blog }) => {
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	};

	const [details, setDetails] = useState(false);

	const hideDetails = { display: details ? 'none' : '' };
	const showDetails = { display: details ? '' : 'none' };

	const toggleDetails = () => setDetails(!details);

	return (
		<div style={blogStyle}>
			<div style={hideDetails}>
				{blog.title} {blog.author} <button onClick={toggleDetails}>View</button>
			</div>
			<div style={showDetails}>
				{blog.title} {blog.author} <button onClick={toggleDetails}>Hide</button>
				<br />
				{blog.url}
				<br />
				{blog.likes} <button>Like</button>
				<br />
				{blog.user === undefined ? '' : blog.user.name}
			</div>
		</div>
	);
};

export default Blog;
