const express = require('express')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 4444
const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI, { useUnifiedTopology: true, useFindAndModify: false, useNewUrlParser: true })

const Counter = mongoose.model(
	'Counter',
	new mongoose.Schema({
		count: {
			type: Number,
			required: true,
		},
	})
)

const app = express()

app.set('view engine', 'pug')

app.get('/', async (req, res, next) => {
	try {
		const counter = await Counter.findOneAndUpdate({}, { $inc: { count: 1 } }, { upsert: true, new: true })
		const count = counter.count

		res.render('index', { count })
	} catch (err) {
		next(err)
	}
})

app.listen(PORT, (err) => {
	if (err) {
		throw err
	}

	console.log('Express server listening on port ' + PORT)
})
