import { useState } from 'react'

// Keep the example users supplied by the assignment.
const mockData = [
  { username: 'Ola Normann', email: 'ola.normann@norge.no' },
  { username: 'Torleif', email: 'torleif@kodehode.no' },
  { username: 'Jan Egil', email: 'jan.egil@kodehode.no' },
  { username: 'Sander', email: 'sander@kodehode.no' },
]

function Users() {
  // A copy is used so the original mockData array is never changed.
  // Added users stay in component memory and disappear when the page reloads.
  const [users, setUsers] = useState([...mockData])
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [formError, setFormError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  function handleSubmit(event) {
    // Prevent the browser from reloading when the form is submitted.
    event.preventDefault()
    setSuccessMessage('')

    if (!username.trim() || !email.trim()) {
      setFormError('Fyll ut både brukernavn og e-post.')
      return
    }

    // Ignore surrounding spaces and letter case when checking for duplicates.
    if (users.some((user) => user.email.toLowerCase() === email.trim().toLowerCase())) {
      setFormError('Denne e-postadressen er allerede lagt til.')
      return
    }

    const newUser = {
      username: username.trim(),
      email: email.trim(),
    }

    // Create a new array instead of changing the existing users array.
    setUsers((currentUsers) => [...currentUsers, newUser])
    setUsername('')
    setEmail('')
    setFormError('')
    setSuccessMessage(`${newUser.username} er lagt til.`)
  }

  return (
    <section className="card users-card" aria-labelledby="users-title">
      <div className="users-heading">
        <div>
          <p className="eyebrow">Plass til flere</p>
          <h2 id="users-title">Brukere</h2>
        </div>
        <span className="user-count">{users.length} brukere</span>
      </div>
      <div className="users-content">
        <ul className="user-list">
          {users.map((user) => (
            <li key={user.email}>
              <span className="user-avatar" aria-hidden="true">{user.username.charAt(0).toUpperCase()}</span>
              <div className="user-details"><strong>{user.username}</strong><span>{user.email}</span></div>
            </li>
          ))}
        </ul>
        <form className="user-form" onSubmit={handleSubmit}>
          <h3>Hvem blir med?</h3>
          <p className="section-description">Legg til en ny bruker i listen.</p>
          <div className="form-field">
            <label htmlFor="username">Brukernavn</label>
            <input
              id="username"
              type="text"
              autoComplete="name"
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="form-field">
            <label htmlFor="email">E-post</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          {formError && <p className="form-error" role="alert">{formError}</p>}
          <button className="action-button" type="submit">Legg til bruker <span aria-hidden="true">+</span></button>
          <p className="success-message" role="status">{successMessage}</p>
        </form>
      </div>
    </section>
  )
}

export default Users
