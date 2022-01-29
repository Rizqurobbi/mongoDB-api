const express = require('express')
const app = express()
const PORT = 2800
const cors = require('cors')
const mongoose = require('mongoose')

app.use(express.json())
app.use(cors())

// url untuk akses mongodb : mongodb://username:password@localhost:27017/databaseName
const mongoAccess = `mongodb://devid:1234@localhost:27017/toko`
// untuk connection ke server mongodb
mongoose.connect(mongoAccess, () => console.log('Connect MongoDB Success ✅'))

// define sturcture data field at collection
const productsSchema = mongoose.Schema({
    productName: String,
    price: Number,
    size: Number,
    status: String
})

// setup collection
const products = mongoose.model('productsCollection', productsSchema, 'products')

app.get('/products', (req, res) => {
    products.find({...req.query}, (err, data) => {
        res.status(200).send(data)
    })
})

app.post('/products', (req, res) => {
    products(req.body).save().then((newData) => {
        console.log("Data Masuk", newData)
        res.status(200).send({
            success: true,
            results: newData
        })
    })
})

app.delete('/products', (req, res) => {
    products.remove(req.query, (err, data) => {
        res.status(200).send({
            success: true,
            results: data
        })
    })
})

app.patch('/products', (req, res) => {
    products.updateOne(req.query, { $set: req.body }, {}, (err, data)=>{
        res.status(200).send({
            success : true,
            results : data
        })
    })
})


app.listen(PORT, () => console.log('MongoDB API Ready ✅'))