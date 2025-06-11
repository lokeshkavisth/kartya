import SignUpView from "@/modules/auth/ui/views/sign-up-view";
import { caller } from "@/trpc/server";
import { redirect } from "next/navigation";
import React from "react";

const SignUp = async () => {
  const { user } = await caller.auth.session();

  if (user) {
    redirect("/");
  }

  return (
    <main className="h-screen grid place-content-center">
      <SignUpView />
    </main>
  );
};

export default SignUp;
