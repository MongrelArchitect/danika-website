import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@util/firebase";

export default function Login() {
  const navigate = useNavigate();

  const [attempted, setAttempted] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [formInfo, setFormInfo] = useState({
    email: "",
    validEmail: false,
    password: "",
    validPassword: false,
  });

  const handleFormChange = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    switch (target.id) {
      case "email":
        setFormInfo((prevState) => ({
          ...prevState,
          email: target.value,
          validEmail: target.validity.valid,
        }));
        break;
      case "password":
        setFormInfo((prevState) => ({
          ...prevState,
          password: target.value,
          validPassword: target.validity.valid,
        }));
        break;
      default:
        break;
    }
  };

  const login = async () => {
    setAttempted(true);
    if (formInfo.validEmail && formInfo.validPassword) {
      try {
        await signInWithEmailAndPassword(
          auth,
          formInfo.email,
          formInfo.password,
        );
        navigate("/");
      } catch (err) {
        console.error(err);
        let message = "Unknown error";
        if (err instanceof Error) {
          message = err.message;
          if (message === "Firebase: Error (auth/invalid-credential).") {
            message = "Incorrect email or password";
          }
        }
        if (typeof err === "string") {
          message = err;
        }
        setError(message);
      }
    }
  };

  return (
    <form className="flex flex-col gap-4 text-xl">
      <h1 className="text-4xl">Login</h1>
      <div className="flex flex-col items-start gap-1">
        <label htmlFor="email">Email</label>
        <input
          className="rounded bg-neutral-100 p-2 text-slate-800"
          type="email"
          id="email"
          onChange={handleFormChange}
          required
          value={formInfo.email || ""}
        />
        {attempted && !formInfo.validEmail ? (
          <div className="w-full rounded bg-rose-700 p-2">
            Enter valid email
          </div>
        ) : null}
      </div>
      <div className="flex flex-col items-start gap-1">
        <label htmlFor="password">Password</label>
        <input
          className="rounded bg-neutral-100 p-2 text-slate-800"
          type="password"
          id="password"
          onChange={handleFormChange}
          required
          value={formInfo.password || ""}
        />
        {attempted && !formInfo.validPassword ? (
          <div className="w-full rounded bg-rose-700 p-2">Enter password</div>
        ) : null}
      </div>
      <button
        className="rounded bg-neutral-600 p-2 hover:outline focus:outline"
        onClick={login}
        type="button"
      >
        Submit
      </button>
      {attempted && error ? (
        <div className="w-full rounded bg-rose-700 p-2">{error}</div>
      ) : null}
    </form>
  );
}
