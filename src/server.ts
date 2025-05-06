import express from 'express'
import polarWebhookRouter from './api/webhooks/polar'

const app = express()
const port = process.env.PORT || 3000

// Middleware for parsing JSON bodies
app.use(express.json())

// Webhook routes
app.use('/api', polarWebhookRouter)

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' })
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
}) 