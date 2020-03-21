import React from 'react'
import {BrowserRouter as Router, Link} from 'react-router-dom'
import RouterConfig from './router'

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/public">Public</Link>
            </li>
            <li>
              <Link to="/application">Application</Link>
            </li>
            <li>
              <Link to="/job">Job</Link>
            </li>
            <li>
              <Link to="/user">User</Link>
            </li>
          </ul>
        </nav>

        <RouterConfig/>
      </div>
    </Router>
  )
}

export default App
