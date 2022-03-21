import { FC, useEffect, useState } from "react"
const FIGMA_URL = "https://www.figma.com/"
const API_URL = "https://api.figma.com/v1/"
const AUTH_ENDPOINT = "oauth?"
const TOKEN_ENDPOINT = "api/oauth/token?"

export const authenticate = () => {
  const url = `${FIGMA_URL}${AUTH_ENDPOINT}client_id=${process.env.REACT_APP_FIGMA_API_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=file_read&state=false&response_type=code`
  window.open(url, "_blank")
}
export const Authentication: FC = ({children}) => {
  const [error, setError] = useState("")
  const [token, setToken] = useState("")

  const pathname = window.location.href
  const authPath = pathname.split("?code=")
  const authCode = authPath[1] && authPath[1].split("&")[0]
  useEffect(() => {
    const token = localStorage.getItem("auth_token")
    if (token) {
      setToken(token)
    } else {
      if (authCode) {
        fetch(
          `${FIGMA_URL}${TOKEN_ENDPOINT}client_id=${process.env.REACT_APP_FIGMA_API_CLIENT_ID}&client_secret=${process.env.REACT_APP_FIGMA_API_CLIENT_SECRET}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&code=${authCode}&grant_type=authorization_code`,
          {
            method: "POST",
          }
        )
          .then((response) => response.json())
          .then((data) => {
            data.access_token
              ? localStorage.setItem("auth_token", data.access_token)
              : setError("Authentification failed")
          })
      }
    }
  }, [])
  return <>{children}</>
}
