import {
  fetchAuthSession,
  fetchUserAttributes,
  getCurrentUser,
} from "aws-amplify/auth";
import { useEffect, useState } from "react";

export default function useAuthUser() {
  const [user, setUser] = useState<Record<string, any>>();

  useEffect(() => {
    async function getUser() {
      const session = await fetchAuthSession();
      if (!session.tokens) {
        return;
      }
      const user = {
        ...(await getCurrentUser()),
        ...(await fetchUserAttributes()),
        isAdmin: false,
      };
      console.log(session.tokens);
      const groups = session.tokens.accessToken.payload["cognito:groups"];
      const role = session.tokens.idToken?.payload["custom:role"];
      // @ts-expect-error error
      user.isAdmin = Boolean(groups && groups.includes("Admins"));
      // @ts-expect-error error
      user.role = role;
      setUser(user);
    }

    getUser();
  }, []);

  return user;
}
