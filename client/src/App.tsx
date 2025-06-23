import {useEffect } from 'react'
import './App.css'
import axios from 'axios'

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
    <>
      <h1>NFT Marketplace</h1>

      {/* <div className="card">
        {array.length > 0 ? (
          <ul>
            {array.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <p>Loading...</p>
        )}
      </div> */}
    </>
  )
}

export default App
