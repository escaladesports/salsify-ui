import React from 'react'
import { css } from 'emotion'
import Link from 'gatsby-link'
import { getPaginationModel } from 'ultimate-pagination'

export default class Footer extends React.Component{
	static defaultProps = {
		numberfirst: false,
	}
	getLink(n){
		const { numberFirst, linkPrefix } = this.props
		if (!numberFirst && n === 1){
			return linkPrefix
		}
		return `${linkPrefix}/${n}`
	}
	render() {
		const {
			page,
			totalPages,
		} = this.props
		const paginationModel = getPaginationModel({
			currentPage: page,
			totalPages,
			boundaryPagesRange: 2,
			siblingPagesRange: 2,
			hidePreviousAndNextPageLinks: true,
			hideFirstAndLastPageLinks: true,
		})
		const previous = page > 1 ? page - 1 : false
		const next = page < totalPages ? page + 1 : false

		return (
			<ul className={styles.list}>
				<li className={styles.previous}>
					{previous && (
						<Link to={this.getLink(previous)}>Previous</Link>
					)}
				</li>
				<li className={styles.summary}>
					Page {page} of {totalPages}
				</li>
				{paginationModel.map(({ type, isActive, value }, key) => (
					<li key={`page${key}`} className={styles.link}>
						{type === `PAGE` && isActive && value}
						{type !== `PAGE` && `...`}
						{type === `PAGE` && !isActive && (
							<Link to={this.getLink(value)}>{value}</Link>
						)}
					</li>
				))}
				<li className={styles.next}>
					{next && (
						<Link to={this.getLink(next)}>Next</Link>
					)}
				</li>
			</ul>
		)
	}
}


const breakpoint = 600
const styles = {
	list: css`
		list-style-type: none;
		margin: 0;
		padding: 0;
		font-size: .8em;
		li{
			display: inline-block;
			min-height: 1px;
			width: ${100 / 3}%;
			:first-of-type{
				padding-left: 0;
			}
			:last-of-type{
				padding-right: 0;
			}
		}
		@media(min-width: ${breakpoint}px){
			li{
				padding: 0 5px;
				width: auto;
			}
		}
	`,
	link: css`
		display: none !important;
		@media(min-width: ${breakpoint}px){
			display: inline-block !important;
		}
	`,
	summary: css`
		text-align: center;
		@media(min-width: ${breakpoint}px){
			display: none !important;
		}
	`,
	previous: css`
		text-align: left;
	`,
	next: css`
		text-align: right;
	`,
}