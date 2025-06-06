import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { cookies as nextCookies, headers as nextHeaders } from "next/headers";
import { AUTH_COOKIE } from "../constants";
import { signinSchema, signupSchema } from "../schema";

export const authRouter = createTRPCRouter({
  session: baseProcedure.query(async ({ ctx }) => {
    const headers = await nextHeaders();
    const session = await ctx.db.auth({ headers });

    return session;
  }),

  signup: baseProcedure.input(signupSchema).mutation(async ({ input, ctx }) => {
    await ctx.db.create({
      collection: "users",
      data: {
        email: input.email,
        username: input.username,
        password: input.password, // Password hashing auto handled by payload.
      },
    });

    const data = await ctx.db.login({
      collection: "users",
      data: {
        email: input.email,
        password: input.password,
      },
    });

    if (!data.token) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Failed to login",
      });
    }

    const cookies = await nextCookies();
    cookies.set({
      name: AUTH_COOKIE,
      value: data.token,
      httpOnly: true,
      path: "/",
      // TODO: Ensure cross-domain cookie sharing
      // sameSite: "none",
      // domain: "",
    });
  }),

  signin: baseProcedure.input(signinSchema).mutation(async ({ input, ctx }) => {
    const data = await ctx.db.login({
      collection: "users",
      data: {
        email: input.email,
        password: input.password,
      },
    });

    if (!data.token) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Failed to login",
      });
    }

    const cookies = await nextCookies();
    cookies.set({
      name: AUTH_COOKIE,
      value: data.token,
      httpOnly: true,
      path: "/",
      // TODO: Ensure cross-domain cookie sharing
      // sameSite: "none",
      // domain: "",
    });

    return data;
  }),

  logout: baseProcedure.mutation(async () => {
    const cookies = await nextCookies();
    cookies.delete(AUTH_COOKIE);
  }),
});
