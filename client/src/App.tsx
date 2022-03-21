import React, { useEffect, useState } from "react"
import "./App.css"
import {
  Authentication,
  authenticate,
} from "./Authentification/authentification"

function App() {
  const [inputUrl, setInputUrl] = useState("")
  const [error, setError] = useState("")
const token = localStorage.getItem("auth_token")
  const getData = () => {
    fetch("api/files/jNyYndJ2kJiwuIbDPX065J", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // if (data.err) {
        //   refreshToken()
        // }
        console.log(data)
      })
  }

  return (
    <div className="App">
      <Authentication>
        <header className="App-header">
          {error}
          <button onClick={authenticate}>Get authorization</button>
          <div>
            <input
              value={inputUrl}
              onChange={(e) => {
                setInputUrl(e.target.value)
              }}
            ></input>
            <button onClick={getData}>Get file data</button>
          </div>
        </header>
      </Authentication>
    </div>
  )
}

export default App
