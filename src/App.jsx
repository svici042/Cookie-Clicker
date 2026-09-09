import './App.css'
import CatFacts from './components/CatFacts'
import CookieClicker from './components/CookieClicker'
import Users from './components/Users'

function App() {
  return (
    <main className="app">
      <CookieClicker />
      <CatFacts />
      <Users />
    </main>
  )
}

export default App
