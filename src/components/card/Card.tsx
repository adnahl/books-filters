import React from 'react'
import './Card.css'

interface Book {
	id: number
	title: string
	author: string
	genre: string
	description: string
	isbn: string
	image: string
	published: string
	publisher: string
}

const Card = (props: Book) => {
	return (
		<div className="card-container">
			<div className="card-title">
				{props.title}
			</div>
			<div className="card-image-container">
				<img
					src={props.image}
					className="card-image"
				/>
			</div>
			<div className="card-box">
				<span>Author:</span>
				<span>{props.author}</span>
				<span>Genre:</span>
				<span>{props.genre}</span>
				<span>Publisher:</span>
				<span>{props.publisher}</span>
				<span>Published:</span>
				<span>{props.published}</span>
				<span>ISBN:</span>
				<span>{props.isbn}</span>
			</div>
			<div className="card-description">
				{props.description}
			</div>
		</div >
	)
}

export default Card