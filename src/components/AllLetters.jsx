import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import OneLetter from '../components/OneLetter.jsx'
import '../App.css'

export default function AllLetters() {
  const [letter, setLetter] = useState('')
  const [letters, setLetters] = useState([])
  useEffect(() => {
    fetch(
      //   "http://localhost:5001/love-letter-api-cc/us-central1/api/letters",
      'https://love-letter-api-cc.web.app/letters'
    )
      .then(response => response.json())
      .then(data => setLetters(data))
      .catch(console.error)
  }, [setLetters])
  return (
    <section className="card-section">
      <section className="header-container">
        <h1 className="header">💌 Love Letters 💌</h1>
      </section>
      <section className="letter-list">
        {letters &&
          letters.map(letter => (
            <OneLetter key={letter.id} letter={letter} setLetter={setLetter} />
          ))}
      </section>
      <Link to={`/addletter`}>
        <Button type="link" htmlType="button">
          Send a love letter 😘 -> 
        </Button>
      </Link>
    </section>
  )
}
