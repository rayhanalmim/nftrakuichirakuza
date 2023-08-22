import SignClient from "@walletconnect/sign-client";
import { Web3Modal } from "@web3modal/standalone";
import { useEffect, useState } from "react";

// 1. Get projectID at https://cloud.walletconnect.com
if (!"9cfe7fc0095191542feb9a438b5e13ec") {
  throw new Error("You need to provide NEXT_PUBLIC_PROJECT_ID env variable");
}

// 2. Configure web3Modal
const web3Modal = new Web3Modal({
  projectId: "9cfe7fc0095191542feb9a438b5e13ec",
  walletConnectVersion: 2,
});

export default function DemoConnect() {
  const [signClient, setSignClient] = useState(undefined);

  // 3. Initialize sign client
  async function onInitializeSignClient() {
    const client = await SignClient.init({
      projectId: "9cfe7fc0095191542feb9a438b5e13ec",
    });
    setSignClient(client);
  }

  // 4. Initiate connection and pass pairing uri to the modal
  async function onOpenModal() {
    if (signClient) {
      const namespaces = {
        eip155: {
          methods: ["eth_sign"],
          chains: ["eip155:1"],
          events: ["accountsChanged"],
        },
      };
      const { uri, approval } = await signClient.connect({
        requiredNamespaces: namespaces,
      });
      if (uri) {
        await web3Modal.openModal({
          uri,
          standaloneChains: namespaces.eip155.chains,
        });
        await approval();
        web3Modal.closeModal();
      }
    }
  }

  useEffect(() => {
    onInitializeSignClient();
  }, []);

  return signClient ? (
    <button onClick={onOpenModal}>Connect Wallet</button>
  ) : (
    "Initializing..."
  );
}
