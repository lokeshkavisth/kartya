import { cookies as nextCookies } from "next/headers";

interface AuthCookiePorps {
  prefix: string;
  value: string;
}

export const generateAuthCookie = async ({
  prefix,
  value,
}: AuthCookiePorps) => {
  const cookies = await nextCookies();
  cookies.set({
    name: `${prefix}-token`,
    value,
    httpOnly: true,
    path: "/",
    // TODO: Ensure cross-domain cookie sharing
    // sameSite: "none",
    // domain: "",
  });
};
