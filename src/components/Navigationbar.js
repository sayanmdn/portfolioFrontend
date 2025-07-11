import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { delAuth, initAuth } from "../redux/actions";
import axios from "axios";
import { URL } from "../config";

export function Navigationbar(props) {
  let history = useHistory();

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
  };

  return (
    <nav 
      className="w-full flex items-center justify-between px-6 py-4 md:px-12 lg:px-24 relative"
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

      {/* Navigation */}
      <div className="flex items-center space-x-8">
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

    </nav>
  );
}
