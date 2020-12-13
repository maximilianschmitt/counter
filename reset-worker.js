const mongoose = require('mongoose')
const Counter = require('./Counter')

const RESET_INTERVAL_MS = process.env.RESET_INTERVAL_SECONDS
	? parseInt(process.env.RESET_INTERVAL_SECONDS) * 1000
	: 1000 * 60
const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI, { useUnifiedTopology: true, useFindAndModify: false, useNewUrlParser: true })

async function main() {
	await Counter.remove({})

	await new Promise((resolve) => {
		setTimeout(resolve, RESET_INTERVAL_MS)
	})

	main()
}

main()
