"use server";

import { cookies } from "next/headers";
import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../server/appwrite";
import { parseStringify } from "../utils";

export const signIn = async (userData: SignUpParams) => {
  try {
    // validate user credentials
  } catch (error) {
    console.error("Error:   ", error);
  }
};

export const signUp = async (userData: SignUpParams) => {
  const { email, password, firstName, lastName } = userData;
  const name = `${firstName} ${lastName}`;
  try {
    const { account } = await createAdminClient();

    const newUser = await account.create(ID.unique(), email, password, name);
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(newUser);
  } catch (error) {
    console.error("Error:   ", error);
  }
};

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();
    
    return parseStringify(user);
  } catch (error) {
    return null;
  }
}
