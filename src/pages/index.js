import React from "react"
import { css } from "emotion"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"

import Layout from "../components/layouts/default"
import { primaryColor } from "../styles/colors"
import { deleteProperties } from "../utils/request"

export default class HomePage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			open: false,
			property: ``,
			properties: [],
			loading: false,
			error: null,
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
			try {
				await deleteProperties(this.state.properties)
			} catch (e) {
				this.setState({
					error: JSON.stringify(e),
					properties: [],
					property: ``,
				})
			}
		}
	}

	render() {
		const { error } = this.state
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
				{error ? (
					<div className={styles.error}>
						<div>
							<span>Error:</span> <br />
							{error}
						</div>
					</div>
				) : null}
			</Layout>
		)
	}
}

const styles = {
	error: css`
		margin-top: 20px;
		span {
			font-size: 2em;
			font-weight: 700;
			color: #000;
		}
		div {
			color: rgba(255, 0, 0, 1);
		}
	`,
	buttonOne: css`
		background: #00ffd2;
		border: 2px solid #66b2b2;
		outline: none;
		color: #66b2b2;
		height: 30px;
		width: 100px;
		margin-left: 10px;
		cursor: pointer;
		& :hover {
			background: #66b2b2;
			border: 2px solid #00ffd2;
			color: #00ffd2;
		}
	`,
	buttonTwo: css`
		border: none;
		background: ${primaryColor};
		border: 2px solid green;
		display: block;
		outline: none;
		color: green;
		height: 40px;
		width: 140px;
		font-size: 1.3em;
		margin-top: 10px;
		cursor: pointer;
		& :hover {
			background: green;
			border: 2px solid ${primaryColor};
			color: ${primaryColor};
		}
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
