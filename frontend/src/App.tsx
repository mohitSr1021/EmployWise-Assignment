import { Outlet } from "react-router-dom"
import { Analytics } from "@vercel/analytics/react"

const App = () => {
  return (
    <>
      <Analytics />
      <Outlet />
    </>
  )
}

export default App