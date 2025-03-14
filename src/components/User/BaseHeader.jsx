import React from 'react'
import { Link } from 'react-router-dom'

function BaseHeader() {
    return (
        <div>
            <div className="navbar bg-primary ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li>
                                <Link className="btn btn-ghost text-md text-neutral-content" to={"/"}>Home</Link>
                            </li>
                            <li>
                                <Link className="btn btn-ghost text-md text-neutral-content" to={"/register"}>Sign Up</Link>
                            </li>
                            <li>
                                <Link className="btn btn-ghost text-md text-neutral-content" to={"/login"}>Sign In</Link>
                            </li>
                            <li >
                                <Link className="btn btn-ghost text-md text-neutral-content" to={"/products"}>Products</Link>
                            </li>
                            <li >
                                <Link className="btn btn-ghost text-md text-neutral-content" to={"/about"}>About</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex-1">
                        <Link to={"/"} className="btn btn-ghost text-xl text-neutral-content">VIBBORA</Link>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 text-neutral-conten">
                        <li>
                            <Link className="btn btn-ghost text-md text-neutral-content" to={"/"}>Home</Link>
                        </li>
                        <li>
                            <Link className="btn btn-ghost text-md text-neutral-content" to={"/register"}>Sign Up</Link>
                        </li>
                        <li >
                            <Link className="btn btn-ghost text-md text-neutral-content" to={"/login"}>Sign In</Link>
                        </li>
                        <li >
                            <Link className="btn btn-ghost text-md text-neutral-content" to={"/products"}>Products</Link>
                        </li>
                        <li >
                            <Link className="btn btn-ghost text-md text-neutral-content" to={"/about"}>About</Link>
                        </li>

                    </ul>
                </div>
                <div className="navbar-end">
                    <Link to={"/register"} className="btn text-neutral-conten">Join Us</Link>
                </div>
            </div>
        </div>
    )
}

export default BaseHeader
