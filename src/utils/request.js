// import fetch from "isomorphic-fetch"
import axios from "axios"

const deleteProperties = async () => {
	await axios({
		url: `https://app.salsify.com/api/v1/orgs/${
			process.env.GATSBY_SALSIFY_ORG
		}/properties/123abc`,
		method: `delete`,
		headers: {
			Authorization: `Bearer ${process.env.GATSBY_SALSIFY_API_TOKEN}`,
		},
		// data: { ids: properties },
	})
}

export { deleteProperties }
