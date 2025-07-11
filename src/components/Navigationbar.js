import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { delAuth, initAuth } from "../redux/actions";
import axios from "axios";
import { URL } from "../config";

export function Navigationbar(props) {
  let history = useHistory();
  const [expanded, setExpanded] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    const authToken = localStorage.getItem("token");
    axios
      .post(
        `${URL}post/isAuthenticated`,
        { token: "not needed here" },
        { headers: { Authorization: authToken } }
      )
      .then((res) => {
        console.log(res);
        if (res.data.code === "tokenValid") {
          console.log("res.data message: " + JSON.stringify(res.data.message));
          dispatch(initAuth(res.data.message));
        }
      })
      .catch((err) => {
        console.log("Error from isValidAuthToken " + err);
      });
  }, [dispatch]);

  const auth = useSelector((state) => state.auth);

  const handleLogout = () => {
    localStorage.setItem("token", null);
    dispatch(delAuth());
    history.push("/login");
    setExpanded(false);
  };

  const closeNavbar = () => {
    setExpanded(false);
  };

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <nav 
      className="w-full flex items-center justify-between px-6 py-4 md:px-12 lg:px-24"
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      {/* Brand */}
      <div className="flex items-center">
        <Link
          to="/"
          className="text-2xl font-bold transition-colors duration-300"
          style={{ 
            color: '#6366f1', 
            textDecoration: 'none' 
          }}
          onMouseEnter={(e) => e.target.style.color = '#8b5cf6'}
          onMouseLeave={(e) => e.target.style.color = '#6366f1'}
        >
          Sayantan's Webapps
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden p-2 rounded-lg border transition-colors duration-300"
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderColor: 'rgba(255, 255, 255, 0.1)'
        }}
        onClick={handleToggle}
        aria-label="Toggle navigation"
        onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.08)'}
        onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.05)'}
      >
        <svg
          className="w-6 h-6"
          style={{ color: '#ffffff' }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center space-x-8">
        <Link
          to="/"
          className="transition-colors duration-300 font-medium"
          style={{ 
            color: 'rgba(255, 255, 255, 0.8)', 
            textDecoration: 'none' 
          }}
          onMouseEnter={(e) => e.target.style.color = '#ffffff'}
          onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}
        >
          Home
        </Link>
        <Link
          to="/news"
          className="transition-colors duration-300 font-medium"
          style={{ 
            color: 'rgba(255, 255, 255, 0.8)', 
            textDecoration: 'none' 
          }}
          onMouseEnter={(e) => e.target.style.color = '#ffffff'}
          onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}
        >
          News
        </Link>
        <Link
          to="/stocks"
          className="transition-colors duration-300 font-medium"
          style={{ 
            color: 'rgba(255, 255, 255, 0.8)', 
            textDecoration: 'none' 
          }}
          onMouseEnter={(e) => e.target.style.color = '#ffffff'}
          onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}
        >
          Stock Suggestions
        </Link>
        {!auth.isLoggedIn && (
          <>
            <Link
              to="/signup"
              className="transition-colors duration-300 font-medium"
              style={{ 
                color: 'rgba(255, 255, 255, 0.8)', 
                textDecoration: 'none' 
              }}
              onMouseEnter={(e) => e.target.style.color = '#ffffff'}
              onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}
            >
              Signup
            </Link>
            <Link
              to="/login"
              className="transition-colors duration-300 font-medium"
              style={{ 
                color: 'rgba(255, 255, 255, 0.8)', 
                textDecoration: 'none' 
              }}
              onMouseEnter={(e) => e.target.style.color = '#ffffff'}
              onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}
            >
              Login
            </Link>
          </>
        )}
        {auth.isLoggedIn && (
          <>
            <Link
              to="/write"
              className="transition-colors duration-300 font-medium"
              style={{ 
                color: 'rgba(255, 255, 255, 0.8)', 
                textDecoration: 'none' 
              }}
              onMouseEnter={(e) => e.target.style.color = '#ffffff'}
              onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}
            >
              Rewrite
            </Link>
            <Link
              to="/instagram"
              className="transition-colors duration-300 font-medium"
              style={{ 
                color: 'rgba(255, 255, 255, 0.8)', 
                textDecoration: 'none' 
              }}
              onMouseEnter={(e) => e.target.style.color = '#ffffff'}
              onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}
            >
              Instagram Fetcher
            </Link>
            <Link
              to="/warehouse"
              className="transition-colors duration-300 font-medium"
              style={{ 
                color: 'rgba(255, 255, 255, 0.8)', 
                textDecoration: 'none' 
              }}
              onMouseEnter={(e) => e.target.style.color = '#ffffff'}
              onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}
            >
              Warehouse
            </Link>
            <button
              onClick={handleLogout}
              className="transition-colors duration-300 font-medium bg-transparent border-none cursor-pointer"
              style={{ 
                color: 'rgba(255, 255, 255, 0.8)'
              }}
              onMouseEnter={(e) => e.target.style.color = '#ffffff'}
              onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}
            >
              Logout
            </button>
          </>
        )}
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full border rounded-b-lg transform transition-all duration-300 ${
          expanded 
            ? 'translate-y-0 opacity-100 visible' 
            : '-translate-y-4 opacity-0 invisible'
        }`}
        style={{
          background: '#151520',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderColor: 'rgba(255, 255, 255, 0.2)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)'
        }}
      >
        <div className="flex flex-col space-y-2 p-6">
          <Link
            to="/"
            onClick={closeNavbar}
            className="transition-colors duration-300 font-medium py-2 px-4 rounded-lg"
            style={{ 
              color: 'rgba(255, 255, 255, 0.8)', 
              textDecoration: 'none' 
            }}
            onMouseEnter={(e) => {
              e.target.style.color = '#ffffff';
              e.target.style.background = 'rgba(255, 255, 255, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = 'rgba(255, 255, 255, 0.8)';
              e.target.style.background = 'transparent';
            }}
          >
            Home
          </Link>
          <Link
            to="/news"
            onClick={closeNavbar}
            className="transition-colors duration-300 font-medium py-2 px-4 rounded-lg"
            style={{ 
              color: 'rgba(255, 255, 255, 0.8)', 
              textDecoration: 'none' 
            }}
            onMouseEnter={(e) => {
              e.target.style.color = '#ffffff';
              e.target.style.background = 'rgba(255, 255, 255, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = 'rgba(255, 255, 255, 0.8)';
              e.target.style.background = 'transparent';
            }}
          >
            News
          </Link>
          <Link
            to="/stocks"
            onClick={closeNavbar}
            className="transition-colors duration-300 font-medium py-2 px-4 rounded-lg"
            style={{ 
              color: 'rgba(255, 255, 255, 0.8)', 
              textDecoration: 'none' 
            }}
            onMouseEnter={(e) => {
              e.target.style.color = '#ffffff';
              e.target.style.background = 'rgba(255, 255, 255, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = 'rgba(255, 255, 255, 0.8)';
              e.target.style.background = 'transparent';
            }}
          >
            Stock Suggestions
          </Link>
          {!auth.isLoggedIn && (
            <>
              <Link
                to="/signup"
                onClick={closeNavbar}
                className="transition-colors duration-300 font-medium py-2 px-4 rounded-lg"
                style={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  textDecoration: 'none' 
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#ffffff';
                  e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                  e.target.style.background = 'transparent';
                }}
              >
                Signup
              </Link>
              <Link
                to="/login"
                onClick={closeNavbar}
                className="transition-colors duration-300 font-medium py-2 px-4 rounded-lg"
                style={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  textDecoration: 'none' 
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#ffffff';
                  e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                  e.target.style.background = 'transparent';
                }}
              >
                Login
              </Link>
            </>
          )}
          {auth.isLoggedIn && (
            <>
              <Link
                to="/write"
                onClick={closeNavbar}
                className="transition-colors duration-300 font-medium py-2 px-4 rounded-lg"
                style={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  textDecoration: 'none' 
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#ffffff';
                  e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                  e.target.style.background = 'transparent';
                }}
              >
                Rewrite
              </Link>
              <Link
                to="/instagram"
                onClick={closeNavbar}
                className="transition-colors duration-300 font-medium py-2 px-4 rounded-lg"
                style={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  textDecoration: 'none' 
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#ffffff';
                  e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                  e.target.style.background = 'transparent';
                }}
              >
                Instagram Fetcher
              </Link>
              <Link
                to="/warehouse"
                onClick={closeNavbar}
                className="transition-colors duration-300 font-medium py-2 px-4 rounded-lg"
                style={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  textDecoration: 'none' 
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#ffffff';
                  e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                  e.target.style.background = 'transparent';
                }}
              >
                Warehouse
              </Link>
              <button
                onClick={handleLogout}
                className="transition-colors duration-300 font-medium bg-transparent border-none cursor-pointer py-2 px-4 rounded-lg text-left"
                style={{ 
                  color: 'rgba(255, 255, 255, 0.8)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#ffffff';
                  e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                  e.target.style.background = 'transparent';
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
