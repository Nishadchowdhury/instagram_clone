import { INewUser } from "@/types";
import {
  account,
  appwriteConfig,
  avatars,
  databases,
} from "./config";
import { ID, Query } from "appwrite";

//creating account
export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    if (!newAccount) throw new Error();

    const avatarUrl = avatars.getInitials(user.name);

    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: user.username,
      imageURL: avatarUrl,
    });

    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}

//add the user details to the DB
export async function saveUserToDB(user: {
  accountId: string;
  name: string;
  email: string;
  imageURL: URL;
  username?: string;
}) {
  try {
    console.log({ user });
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      user
    );

    return newUser;
  } catch (error) {
    return console.log(error);
  }
}

//to login an user
export async function signInAccount(user: {
  email: string;
  password: string;
}) {
  try {
    const session = await account.createEmailSession(
      user.email,
      user.password
    );

    return session;
  } catch (error) {
    return console.log(error);
  }
}

//getting currentUser from the DB
export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
}
