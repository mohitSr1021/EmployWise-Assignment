import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Routers from './Routes/Routes.tsx'
import { Provider } from 'react-redux'
import { store } from './Redux/Store/Store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={Routers} />
    </Provider>

  </StrictMode>,
)
