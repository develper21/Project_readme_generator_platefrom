"use client";
import { useState } from "react";
import { Eye, EyeOff, Github, X } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      setLoading(false);
      if (res && (res as any).ok) {
        router.push("/dashboard");
      } else {
        router.push("/auth/signup");
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      router.push("/auth/signup");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md rounded-2xl shadow-xl p-8 relative border">
        <Link href="/" className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <X size={20} />
        </Link>

        <h1 className="text-2xl font-bold text-center mb-6 text-gray-900">
          Log in
        </h1>

        <button className="w-full flex items-center cursor-pointer justify-center gap-2 border border-gray-400 py-3 rounded-lg hover:bg-gray-50 transition font-medium mb-4" onClick={() => signIn("github", { callbackUrl: "/dashboard" })}>
          <Github className="w-5 h-5" /> Continue with GitHub
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-sm text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">
              Email or phone number
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="flex justify-between items-center text-sm font-medium text-gray-700 mb-1">
              <span>Password</span>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="flex items-center text-sm text-gray-600 hover:text-gray-700">
                {showPassword ? (
                  <>
                    <EyeOff size={18} />
                  </>
                ) : (
                  <>
                    <Eye size={18} />
                  </>
                )}
              </button>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2.5 rounded-md hover:bg-blue-700 font-medium transition"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              Remember me
            </label>
            <a href="#" className="hover:underline">
              Forgot Password?
            </a>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link href="/auth/signup" className="text-blue-600 font-medium hover:underline">
            Sign up
          </Link>
        </div>
        <p className="mt-2 text-xs text-gray-500 text-center">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.{" "}
          <a href="#" className="underline text-gray-700">
            Learn more.
          </a>
        </p>
      </div>
    </div>
  );
}