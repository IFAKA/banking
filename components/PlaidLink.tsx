"use client";

import { useCallback, useEffect, useState } from "react";
import {
  PlaidLinkOptions,
  PlaidLinkOnSuccess,
  usePlaidLink,
} from "react-plaid-link";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import {
  createLinkToken,
  exchangePublicToken,
} from "@/lib/actions/user.actions";

const PlaidLink = ({ user, dwollaCustomerId, variant }: PlaidLinkProps) => {
  const { push } = useRouter();
  const [token, setToken] = useState("");

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string) => {
      await exchangePublicToken({
        publicToken: public_token,
        user,
      });
      push("/");
    },
    [user]
  );

  const config: PlaidLinkOptions = {
    token,
    onSuccess,
    // onExit: (err, metadata) => {}
    // onEvent: (eventName, metadata) => {}
    // token: 'GENERATED_LINK_TOKEN',
  };

  const { open, exit, ready } = usePlaidLink(config);

  useEffect(() => {
    const getLinkToken = async () => {
      const data = await createLinkToken(user);
      setToken(data?.linkToken);
    };

    getLinkToken();
  }, [user]);

  return (
    <>
      {variant === "primary" ? (
        <Button
          onClick={() => open()}
          disabled={!ready}
          className="plaidlink-primary"
        >
          Connect bank
        </Button>
      ) : variant === "ghost" ? (
        <Button className="plaidlink-ghost">Connect bank</Button>
      ) : (
        <Button className="plaidlink-default">Connect bank</Button>
      )}
    </>
  );
};

export default PlaidLink;
