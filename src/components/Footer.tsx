import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="absolute bottom-0 p-2">
      <Link className="text-neutral-300 underline" to="/login">Login</Link>
    </footer>
  );
}
