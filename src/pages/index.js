import React from "react"
import { css } from "emotion"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"
import fetch from "isomorphic-fetch"

import Layout from "../components/layouts/default"
import { primaryColor } from "../styles/colors"

export default class HomePage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			open: false,
			property: ``,
			properties: [],
			loading: false,
		}

		this.onChange = this.onChange.bind(this)
		this.addProp = this.addProp.bind(this)
		this.deleteProps = this.deleteProps.bind(this)
	}

	onChange(e) {
		this.setState({
			property: e.target.value,
		})
	}

	addProp() {
		if (this.state.property.length > 0) {
			this.setState({
				properties: [...this.state.properties, this.state.property],
				property: ``,
			})
		}
	}

	async deleteProps() {
		if (this.state.properties.length > 0) {
			this.setState({ loading: true })
			const res = await fetch(
				` https://app.salsify.com/api/v1/orgs/${
					process.env.GATSBY_SALSIFY_API_TOKEN
				}/properties/`,
				{
					method: `DELETE`,
					headers: {
						Authorization: `Bearer ${process.env.GATSBY_SALSIFY_API_TOKEN}`,
						"Cache-Control": `no-cache`,
						"Content-Type": `application/json`,
					},
					body: JSON.stringify({
						ids: this.state.properties,
					}),
				}
			)

			console.log(res)
		}
	}

	render() {
		const {
			site: {
				frontmatter: { siteTitle, siteDescription },
			},
		} = this.props.data

		return (
			<Layout>
				<Helmet>
					<title>{siteTitle}</title>
					<meta name="description" content={siteDescription} />
				</Helmet>
				<h2>Properties to Delete</h2>
				{this.state.properties.map((prop, i) => (
					<div key={i} className={styles.property}>
						{prop}
					</div>
				))}
				<input
					type="text"
					className={styles.input}
					value={this.state.property}
					onChange={e => this.onChange(e)}
				/>
				<button onClick={() => this.addProp()} className={styles.buttonOne}>
					Add
				</button>
				<button onClick={() => this.deleteProps()} className={styles.buttonTwo}>
					submit
				</button>
			</Layout>
		)
	}
}

const styles = {
	buttonOne: css`
		background: #00ffd2;
		border: 2px solid #66b2b2;
		outline: none;
		color: white;
		height: 30px;
		width: 100px;
		margin-left: 10px;
		cursor: pointer;
	`,
	buttonTwo: css`
		border: none;
		background: ${primaryColor};
		display: block;
		outline: none;
		color: white;
		height: 40px;
		width: 140px;
		font-size: 1.3em;
		margin-top: 10px;
		cursor: pointer;
	`,
	input: css`
		height: 30px;
		outline: none;
		border: 2px solid;
		width: 25%;
		min-width: 200px;
		margin-top: 10px;
	`,
	property: css`
		margin-bottom: 5px;
	`,
}

export const query = graphql`
	query HomePage {
		page: markdownRemark(fileAbsolutePath: { regex: "/src/markdown/index.md/" }) {
			html
		}
		site: markdownRemark(
			fileAbsolutePath: { regex: "/src/markdown/settings/site.md/" }
		) {
			frontmatter {
				siteTitle
				siteDescription
			}
		}
	}
`
