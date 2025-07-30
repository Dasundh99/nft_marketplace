import {useEffect } from 'react'
import './App.css'
import axios from 'axios'
import './index.css';

import Home from './pages/Home'

function App() {
  // const [array, setArray] = useState<string[]>([])

  const fetchAPI = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api')
      console.log(response.data)
      // setArray(response.data.assets)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchAPI()
  }, [])

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Home />
    </div>
  )
}

export default App
