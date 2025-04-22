import Head from "next/head";
import { SignUp } from "@clerk/clerk-react";

export default function Register() {
  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-muted px-4">
        <SignUp />
      </div>
    </>
  );
}
