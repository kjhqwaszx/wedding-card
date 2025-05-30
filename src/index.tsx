import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import './scss/global.scss'
import { QueryClient, QueryClientProvider } from 'react-query'
import FullScreenMessage from '@shared/FullScreenMessage'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
const queryClient = new QueryClient()

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<FullScreenMessage type="loading" />}>
        <App />
      </Suspense>
    </QueryClientProvider>
  </React.StrictMode>,
)

reportWebVitals()
