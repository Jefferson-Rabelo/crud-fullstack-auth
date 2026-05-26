import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import Modal from './components/Modal'

function App() {
  return (

    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App