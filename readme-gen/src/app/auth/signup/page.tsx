"use client";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Github, X } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  // NEW: form state + loading
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    // basic validations
    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }
    if (confirmEmail && email !== confirmEmail) {
      alert("Emails do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.status === 201) {
        // Created: auto sign in
        const sign = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });

        if (sign && (sign as any).ok) {
          router.push("/dashboard");
        } else {
          // fallback: go to signin page
          router.push("/auth/signin");
        }
      } else if (res.status === 409) {
        // User exists -> try sign in directly
        const sign = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });
        if (sign && (sign as any).ok) {
          router.push("/dashboard");
        } else {
          alert("Account already exists. Please login or reset your password.");
          router.push("/auth/signin");
        }
      } else {
        const data = await res.json().catch(() => ({}));
        alert(data?.error || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black px-4">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-blue-500">
        <Link href="/" className="absolute top-4 right-4 text-gray-500 hover:text-black">
          <X size={20} />
        </Link>

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Sign Up
        </h1>

        <button className="w-full flex items-center justify-center gap-2 border border-gray-400 py-3 rounded-md hover:bg-gray-50 transition font-medium" onClick={() => signIn("github", { callbackUrl: "/dashboard" })}>
          <Github size={20} /> Continue with GitHub
        </button>

        <div className="flex items-center gap-2 my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-gray-500 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* NOTE: we added onSubmit and controlled inputs only */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Conform Email
            </label>
            <input
              type="email"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPassword ? (
                  <>
                    <EyeOff size={18} /> <span className="ml-1 text-xs">Hide</span>
                  </>
                ) : (
                  <>
                    <Eye size={18} /> <span className="ml-1 text-xs">Show</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4 border-gray-400" />
              Remember me
            </label>
            <a href="#" className="hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* keep button text/design same; just disable while loading */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition"
          >
            {loading ? "Please wait..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link href="/auth/signin" className="underline font-medium text-black">
            Login
          </Link>
        </div>

        <p className="mt-3 text-xs text-gray-500 text-center">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.{" "}
          <a href="#" className="underline">
            Learn more
          </a>.
        </p>
      </div>
    </div>
  );
}