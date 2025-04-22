import Head from "next/head";
import { SignIn } from "@clerk/clerk-react";

export default function Login() {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-muted px-4">
        <SignIn />
      </div>
    </>
  );
}
