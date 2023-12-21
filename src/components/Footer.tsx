import { useContext } from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "@util/firebase";
import { UserContext } from "@contexts/UserContext";

export default function Footer() {
  const user = useContext(UserContext);

  const signOutUser = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      // XXX needs more elegant error handling
      console.error(err);
    }
  };

  return (
    <footer className="p-2">
      {user ? (
        <button
          className="text-neutral-300 underline"
          onClick={signOutUser}
          type="button"
        >
          Sign Out
        </button>
      ) : (
        <Link className="text-neutral-300 underline" to="/login">
          Login
        </Link>
      )}
    </footer>
  );
}
