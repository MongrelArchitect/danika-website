import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "@util/firebase";
import { UserContext } from "@contexts/UserContext";

export default function Footer() {
  const user = useContext(UserContext);

  const location = useLocation();
  console.log(location.pathname);

  const signOutUser = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      // XXX needs more elegant error handling
      console.error(err);
    }
  };

  const getLink = () => {
    if (user) {
      return (
        <button
          className="text-neutral-300 underline"
          onClick={signOutUser}
          type="button"
        >
          Sign Out
        </button>
      );
    }

    if (location.pathname === "/login") {
      return (
        <Link className="text-neutral-300 underline" to="/">
          Home
        </Link>
      );
    }

    return (
      <Link className="text-neutral-300 underline" to="/login">
        Login
      </Link>
    );
  };

  return <footer className="p-2">{getLink()}</footer>;
}
