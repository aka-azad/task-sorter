import { FaGoogle } from "react-icons/fa";
import AuthContext from "./Context/AuthContext";
import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "./Hooks/useAxiosPublic";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const { loginWithGoogle } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const setRoute = "/home"; 

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

  function handleGoogleLogin() {
    loginWithGoogle()
    .then((res) => {
      const { displayName, photoURL, email } = res.user;

      const userInfo = {
        displayName,
        photoURL,
        email,
        lastSignIn: new Date().toISOString(),
      };
      saveUserMutation.mutate(userInfo);
    })
    .catch((error) => {
      toast.error("Error signing in with Google: " + error.message);
    });;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-4">
          Login with Google
        </h2>

        <button
          onClick={handleGoogleLogin}
          className="btn btn-circle mx-auto btn-primary"
        >
          <FaGoogle />
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
