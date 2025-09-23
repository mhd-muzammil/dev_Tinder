import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const user = useSelector((store) => store.user);
  console.log(user);
  

  return (
    <div className="navbar bg-gray-900 shadow-sm">
      <div className="flex-1">
        <Link to='/' className="btn btn-ghost text-xl">👦 DevTinder</Link>
      </div>
      {user && (
        <div className="dropdown dropdown-end mx-6 flex">
          <p className="px-4">Welcome - {user.firstName}</p>
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="User Photo"
                src={user.photoUrl}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-neutral rounded-box z-1 mt-12 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      )}
    </div>
    
  )
};

export default NavBar
