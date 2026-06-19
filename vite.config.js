import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      {
        name: 'api-groq',
        configureServer(server) {
          server.middlewares.use('/api/chat', async (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405
              res.setHeader('Content-Type', 'application/json')
              return res.end(JSON.stringify({ error: 'Method not allowed' }))
            }
            try {
              let body = ''
              for await (const chunk of req) body += chunk
              const { system, messages } = JSON.parse(body)

              const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: 'Bearer ' + env.GROQ_API_KEY,
                },
                body: JSON.stringify({
                  model: 'llama-3.3-70b-versatile',
                  messages: [{ role: 'system', content: system }, ...messages],
                  max_tokens: 1000,
                  temperature: 0.4,
                }),
              })

              const data = await r.json()
              res.setHeader('Content-Type', 'application/json')

              if (!r.ok) {
                res.statusCode = r.status
                return res.end(JSON.stringify({ error: data.error?.message || 'Erreur Groq' }))
              }

              const text = data.choices?.[0]?.message?.content?.trim() || ''
              res.end(JSON.stringify({ text }))
            } catch (e) {
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: String(e) }))
            }
          })
        },
      },
    ],
    server: {
      open: true,
    },
  }
})
