const mongoose = require('mongoose')
const express = require('express')
const jwt = require('jsonwebtoken');

const router = express.Router()

const { getMovies, getMovie, addMovie, deleteMovie } = require('./controller')



router.get('/getMovies', authenticateToken, getMovies)
router.get('/:movie', authenticateToken, getMovie)
router.post('/addMovie', addMovie)
router.delete('/:movie', deleteMovie)

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    // console.log(`got header: ${authHeader}`)
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        // console.log(`got token: ${token}`)
        jwt.verify(token, 'secretKey', (err, user) => {
            if (err) {
                return res.sendStatus(403)
            }
            req.user = user
            // console.log(`token is valid!`)
            // console.log(req.user)
            next()
        })
    } else {
        return res.sendStatus(401)
    }
}


module.exports = router
