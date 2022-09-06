import './Filters.css'
import { Data } from '../../../types/data'
import { useEffect, useRef, useState, useMemo } from 'react'

interface Props {
	data: Array<Data>
	handleSearch: (e: React.FormEvent<HTMLInputElement>) => void
	handleSort: (e: React.ChangeEvent<HTMLSelectElement>) => void
	handleFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const Filters = ({
	data,
	handleSearch,
	handleSort,
	handleFilter
}: Props) => {

	const [genre, setGenre] = useState<Array<string>>([''])
	// let genre = useRef<Array<string>>(['']) 
	let author = useRef<Array<string>>([''])
	let publisher = useRef<Array<string>>([''])

	const diffData = useMemo(() => {
		return data
	}, [data])

	useEffect(() => {
		setGenre(data.map(d => d.genre)
			.filter((item, i, arr) => arr.indexOf(item) === i)
			.sort((a: string, b: string) => a.localeCompare(b)))

		author.current = data.map(d => d.author)
			.filter((item, i, arr) => arr.indexOf(item) === i)
			.sort((a: string, b: string) => a.localeCompare(b))

		publisher.current = data.map(d => d.publisher)
			.filter((item, i, arr) => arr.indexOf(item) === i)
			.sort((a: string, b: string) => a.localeCompare(b))

	}, [diffData])

	return (
		<div className="filter">
			<div className="search">
				<input placeholder="Search..." onChange={handleSearch} />
			</div>

			<div className="order-option">
				<div style={{ display: 'flex', gap: '.25em' }}>
					<span>Order</span><span>by</span>
				</div>
				<select onChange={handleSort}>
					<option value="featured">Featured</option>
					<option value="titleAZ">Title &darr;</option>
					<option value="titleZA">Title &uarr;</option>
					<option value="authorAZ">Author &darr;</option>
					<option value="authorZA">Author &uarr;</option>
					<option value="publishedAZ">Published &darr;</option>
					<option value="publishedZA">Published &uarr;</option>
				</select>
			</div>
			<div className="filter-option">
				<span>Genre</span>
				<select name='genre' onChange={handleFilter}>
					<option value={''}>-- All --</option>
					{
						genre.map((g) =>
							<option key={g} value={g}>{g}</option>
						)
					}
				</select>
			</div>

			<div className="filter-option">
				<span>Author</span>
				<select name='author' onChange={handleFilter}>
					<option value={''}>-- All --</option>
					{
						author.current.map((a) =>
							<option key={a} value={a}>{a}</option>
						)
					}
				</select>
			</div>
			<div className="filter-option">
				<span>Publisher</span>
				<select name='publisher' onChange={handleFilter}>
					<option value={''}>-- All --</option>
					{
						publisher.current.map((p) =>
							<option key={p} value={p}>{p}</option>
						)
					}
				</select>
			</div>
		</div>
	)
}

export default Filters