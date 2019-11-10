// fetch('http://127.0.0.1:4000', {
// 	method: 'POST',
// 	headers: { 'Content-Type':'application/json' },
// 	body: JSON.stringify({query:'{ allUsers{ name } }'})
// }).then(r => r.json())
// .then(r => console.log(r.data))


const { createApolloFetch } = require('apollo-fetch')
const fetch = createApolloFetch({
	uri: 'http://127.0.0.1:4000'
})

fetch({
	query: `{
		allUsers { name }
	}`
}).then(response => {
	console.log(response.data)
})