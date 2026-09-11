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
    // className connects the element to CSS styles, while aria-labelledby connects it to the section heading.
    <section className="card users-card" aria-labelledby="users-title">
      {/* The heading and current user count appear in a single row. */}
      <div className="users-heading">
        <div>
          <p className="eyebrow">Plass til flere</p>
          <h2 id="users-title">Brukere</h2>
        </div>
        <span className="user-count">{users.length} brukere</span>
      </div>
      <div className="users-content">
        {/* map creates a list item for each user; key helps React identify the entries. */}
        <ul className="user-list">
          {users.map((user) => (
            <li key={user.email}>
              {/* The first letter of the name acts as an avatar; this decoration is hidden from screen readers. */}
              <span className="user-avatar" aria-hidden="true">{user.username.charAt(0).toUpperCase()}</span>
              <div className="user-details"><strong>{user.username}</strong><span>{user.email}</span></div>
            </li>
          ))}
        </ul>
        {/* Submitting the form calls handleSubmit, which adds the user. */}
        <form className="user-form" onSubmit={handleSubmit}>
          <h3>Hvem blir med?</h3>
          <p className="section-description">Legg til en ny bruker i listen.</p>
          {/* htmlFor connects the label to the input id; value and onChange link the field to React state. */}
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
          {/* type="email" checks the email format, while required prevents submitting an empty field. */}
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
          {/* The error appears only when there is a message; role="alert" announces it to screen readers. */}
          {formError && <p className="form-error" role="alert">{formError}</p>}
          {/* submit sends the form, while the decorative plus sign is hidden from screen readers. */}
          <button className="action-button" type="submit">Legg til bruker <span aria-hidden="true">+</span></button>
          {/* The status area announces that a user was added successfully. */}
          <p className="success-message" role="status">{successMessage}</p>
        </form>
      </div>
    </section>
  )
}

export default Users
