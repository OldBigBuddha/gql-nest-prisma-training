import { initUrqlClient } from "next-urql";
import { Client } from "urql";
import { getEnv } from "./utils/env";

const GRAPHQL_ENDPOINT = getEnv("GRAPHQL_ENDPOINT");

export function urqlClient(): Promise<Client> {
  return new Promise((resolve, reject) => {
    const client = initUrqlClient(
      {
        url: GRAPHQL_ENDPOINT,
      },
      false
    );

    if (client === null) {
      reject(Error("Failed to initialize urql client"));
    } else {
      resolve(client);
    }

  });
}
