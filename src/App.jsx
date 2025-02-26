import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { getUserById, getActivities } from './apiRequests/cymbalBackend'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [userData, setUserData] = useState(null)
  const [activitiesData, setActivitiesData] = useState(null)


  const getUser = async (id) => { 
    const user = await getUserById(id)
    console.log(user)
    setUserData(user)
  }

  const getActivitiesData = async () => {
    const activities = await getActivities()
    console.log(activities)
    setActivitiesData(activities)
  }


  useEffect(() => {
    getUser(153628973)
    getActivitiesData()
  }, [])


  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
