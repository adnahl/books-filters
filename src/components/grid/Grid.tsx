import React, { useEffect, useState } from 'react'
import Card from '../card/Card'
import Filters from '../utils/filters/Filters'
import './Grid.css'
import { Data } from '../../types/data'

interface Qy {
	booksQuantity: number
}

interface PropsFilters {
	genre: string
	author: string
	publisher: string
}

const Grid = ({ booksQuantity }: Qy) => {
	const [data, setData] = useState<Array<Data>>([])
	const [query, setQuery] = useState<string>('')
	const [filters, setFilters] = useState<PropsFilters>({
		genre: '',
		author: '',
		publisher: ''
	})
	const [applyFilter, setApplyFilter] = useState<boolean>(true)

	const getData = async () => {
		const res = await fetch('https://fakerapi.it/api/v1/books?_quantity=' + booksQuantity, {
			method: 'GET',
		})
			.then(res => res.json())
			.catch(err => console.log(err))

		setData(res.data)
	}

	useEffect(() => {
		getData()
	}, [])

	const Search = (data: Array<Data>) => {
		if (query === '') return data
		let dataKeys: Array<string> = ['title', 'author', 'genre', 'description', 'isbn', 'publisher']
		return data.filter((item: any) =>
			dataKeys.some((key: string) =>
				item[key].toString().toLowerCase().includes(query)
			)
		)
	}

	const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
		setQuery(e.currentTarget.value)
	}

	const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
		switch (e.currentTarget.value) {
			case 'titleAZ':
				setData((prev) =>
					[...prev].sort((a, b) => a.title.localeCompare(b.title)))
				break

			case 'titleZA':
				setData((prev) =>
					[...prev].sort((a, b) => b.title.localeCompare(a.title)))
				break

			case 'authorAZ':
				setData((prev) =>
					[...prev].sort((a, b) => a.author.localeCompare(b.author)))
				break

			case 'authorZA':
				setData((prev) =>
					[...prev].sort((a, b) => b.author.localeCompare(a.author)))
				break

			case 'publishedAZ':
				setData((prev) =>
					[...prev].sort((a, b) => a.published.localeCompare(b.published)))
				break

			case 'publishedZA':
				setData((prev) =>
					[...prev].sort((a, b) => b.published.localeCompare(a.published)))
				break

			default:
				setData((prev) =>
					[...prev].sort((a, b) => a.id - b.id))
				break
		}
	}

	const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = e.currentTarget
		setFilters({ ...filters, [name]: value })
	}

	return (
		<div
			className={
				`container ${applyFilter ? 'container-down' : 'container-up'}`
			}>
			<div className={
				`grid-filter-container ${applyFilter ? 'enter-animation' : 'close-animation'}`
			}>
				<Filters
					data={data}
					handleSearch={handleSearch}
					handleSort={handleSort}
					handleFilter={handleFilter}
				/>
			</div>
			<button onClick={() => setApplyFilter(applyFilter => !applyFilter)}>Filters</button>

			<div className="grid-container">
				{
					data.length > 0 &&
					Search(data).map(d =>
						(d.genre.includes(filters.genre) || filters.genre === '') &&
						(d.author.includes(filters.author) || filters.author === '') &&
						(d.publisher.includes(filters.publisher) || filters.publisher === '') &&
						<Card
							key={d.id}
							id={d.id}
							title={d.title}
							author={d.author}
							genre={d.genre}
							description={d.description}
							isbn={d.isbn}
							image={d.image}
							published={d.published}
							publisher={d.publisher}
						/>
					)
				}
			</div>
		</div>
	)
}

export default Grid