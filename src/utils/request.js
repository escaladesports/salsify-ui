// import fetch from "isomorphic-fetch"
import axios from "axios"

const deleteProperties = async properties => {
	await axios({
		url: `https://app.salsify.com/api/v1/orgs/${
			process.env.GATSBY_SANDBOX_ORG
		}/properties`,
		method: `delete`,
		headers: {
			Authorization: `Bearer ${process.env.GATSBY_SALSIFY_API_TOKEN}`,
			[`Content-Type`]: `application/json`,
		},
		data: { ids: properties },
	})
}

export { deleteProperties }
