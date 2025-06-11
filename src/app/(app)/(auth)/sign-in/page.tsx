import SignInView from "@/modules/auth/ui/views/sign-in-view";
import { caller } from "@/trpc/server";
import { redirect } from "next/navigation";

const SignIn = async () => {
  const { user } = await caller.auth.session();

  if (user) {
    redirect("/");
  }

  return (
    <main className="h-screen grid place-content-center">
      <SignInView />
    </main>
  );
};

export default SignIn;
