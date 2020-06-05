import React from 'react';
import { Nav, NavItem, Navbar, NavLink } from 'reactstrap';
import './Header.css';

export const Header = ({ isLoggedin, user, logout }) => {
    if (isLoggedin) {
        const username = user.username;
        return (
            <Navbar color="light" light expand="md">
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <NavLink className="logo" href="/">Conduit</NavLink>
                    </NavItem>

                </Nav>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink href="/">Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/article">New Article</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/settings">Settings</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href={`/profile/${username}`}>{username}</NavLink>
                        {/* <NavLink onClick={logout} href="">{username}</NavLink> */}
                    </NavItem>
                    <NavItem>
                        <NavLink href="" onClick={logout}>Logout</NavLink>
                    </NavItem>
                </Nav>
                {/* <NavbarText>Simple Text</NavbarText> */}
            </Navbar>
        )
    } else
        return (
            <>
                <Navbar color="light" light expand="md">
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink className="logo" href="/">Conduit</NavLink>
                        </NavItem>

                    </Nav>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="/">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/login">Sign in</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/register">Sign up</NavLink>
                        </NavItem>



                    </Nav>
                    {/* <NavbarText>Simple Text</NavbarText> */}
                </Navbar>

                <div className="title">
                    <h1>Conduit</h1>
                    <p>A place to share your knowledge</p>
                </div>
            </>

        )
}