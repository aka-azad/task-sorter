import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import PropTypes from "prop-types";
import AuthContext from "./AuthContext";
import auth from "../Firebase/Firebase.config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import useAxiosPublic from "../Hooks/useAxiosPublic";

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleProvider = new GoogleAuthProvider();

  const loginWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setCurrentUser(currentUser);
      if (currentUser) {
        const userInfo = { email: currentUser.email };
        axiosPublic
          .post("/jwt", userInfo)
          .then((tokenResponse) => {
            if (tokenResponse.data.token) {
              localStorage.setItem("access-token", tokenResponse.data.token);
              setLoading(false);
            }
          })
          .catch((error) => {
            console.error("Error getting JWT:", error);
            setLoading(false);
          });
      } else {
        localStorage.removeItem("access-token");
        setLoading(false);
      }
    });
    return () => {
      return unsubscribe();
    };
  }, [axiosPublic]);

  const value = {
    currentUser,
    loginWithGoogle,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <span
            className="loading loading-spinner loading-lg"
            style={{
              animation: "scaleAnimation 1s infinite",
            }}
          ></span>
          <style>
            {`@keyframes scaleAnimation {
                            0%, 100% {
                                transform: scale(1.5);
                            }
                            50% {
                                transform: scale(1);
                            }
                        }
                    `}
          </style>
        </div>
      )}
      {!loading && children}
    </AuthContext.Provider>
  );
};
AuthProvider.propTypes = { children: PropTypes.node.isRequired };
