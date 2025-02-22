import { FaGoogle } from "react-icons/fa";
import AuthContext from "../Context/AuthContext";
import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router";

const LoginPage = () => {
  const { loginWithGoogle, currentUser } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const setRoute = "/";

  const saveUserMutation = useMutation({
    mutationFn: (user) => axiosPublic.post("/users", user),
    onSuccess: () => {
      toast.success("Sign in successful!");
      queryClient.invalidateQueries(["users"]);
      navigate(setRoute);
    },
    onError: (error) => {
      toast.error("Error saving sign-in info: " + error.message);
      console.error("Error saving sign-in info: ", error);
    },
  });

  if (currentUser) {
    return <Navigate to="/" />;
  }

  function handleGoogleLogin() {
    loginWithGoogle()
      .then((res) => {
        const { displayName, photoURL, email, uid } = res.user;

        const userInfo = {
          displayName,
          photoURL,
          email,
          userId: uid,
          lastSignIn: new Date().toISOString(),
        };
        saveUserMutation.mutate(userInfo);
      })
      .catch((error) => {
        toast.error("Error signing in with Google: " + error.message);
      });
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary to-accent p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-sm w-full text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome!</h2>
        <p className="text-gray-600 mb-6">
          Sign in or Signup with Google to continue.
        </p>

        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center w-full py-3 px-4 rounded-lg bg-red-500 text-white font-semibold text-lg hover:bg-red-600 transition-all duration-300 shadow-lg"
        >
          <FaGoogle className="mr-3 text-xl" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
