const express = require('express')
const UserRoutes = require('./userRoutes')
const MailRoutes = require('./mailRoutes')
const RecordRoutes = require('./recordRoutes')
const AuthRoutes = require('./authRoutes')
const UploadRoutes = require('./uploadRoutes')

function routerApi(app) {
    const router = express.Router()

    app.use('/api/v1/', router)

    router.use('/auth', AuthRoutes)
    router.use('/users', UserRoutes)
    router.use('/mail', MailRoutes)
    router.use('/record', RecordRoutes)
    router.use('/upload', UploadRoutes)
}

module.exports = routerApi