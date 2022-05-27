import { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext({
  userForename: "",
  userSurname: "",
  userId: null,
  auth: false,
});

const AuthContextProvider = (props) => {
  const [user, setUser] = useState({
    userForename: "",
    userSurname: "",
    userId: null,
    auth: false,
  });

  const navigate = useNavigate();

  const userSigninHandler = ({ userEmail, userPassword }) => {
    console.log("Signing in user");
    axios
      .post(
        "http://localhost:4000/auth/signin",
        {
          userEmail: userEmail,
          userPassword: userPassword,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.status);
        setUser({
          userForename: res.data.user.userForename,
          userSurname: res.data.user.userSurname,
          userId: res.data.user.userId,
          auth: true,
        });
        res.status == 200 ? navigate("/profile") : navigate("/");
      })
      .catch((err) => console.error(err));
  };

  const userSignOutHandler = () => {
    console.log("Signing out user");
    axios
      .post("http://localhost:4000/auth/signout")
      .then((res) => (res.status == 200 ? navigate("/") : navigate("/logout")))
      .then(
        setUser({
          userForename: "",
          userSurname: "",
          userId: null,
          auth: false,
        })
      )
      .catch((err) => console.error(err));
  };

  return (
    <AuthContext.Provider
      value={{ userSigninHandler, userSignOutHandler, user }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
