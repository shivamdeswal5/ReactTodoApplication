import React from 'react'
import './navbar.css'
export default function NavBar() {
    return (
          <nav className='nav'>
            <ul className='ul'>
              <li>
                <a href='/' className='heading'>React Todo Application</a>
                <div className='options'>
                  <a href='/deleted'>Deleted</a>
                  <a href='/completed'>Completed</a>
                </div>  
              </li>
            </ul>
          </nav>     
      )
}
