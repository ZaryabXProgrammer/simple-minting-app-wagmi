import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import { useState } from "react";
import { parseEther } from "viem";
import { useReadContract, useSendTransaction, useWriteContract } from "wagmi";
import { GTA_NFT_ABI } from "../lib/gtaNft";

const Home: NextPage = () => {
  const [value, setValue] = useState<string>("");
  const [transferRecipient, setTransferRecipient] = useState<string>("");
  const [mintRecipient, setMintRecipient] = useState<string>("");
  const [tokenUri, setTokenUri] = useState<string>("");
  const [tokenID, setTokenID] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const contractAddress = "0x44BBd8259a2EF20FB19d958970235fe01b1E8831";

  const { data: hashSendTx, sendTransaction } = useSendTransaction();
  const { data: hashWriteTx, writeContract } = useWriteContract();

  const { data: tokenURIData } = useReadContract({
    address: contractAddress,
    abi: GTA_NFT_ABI,
    functionName: "tokenURI",
    args: [tokenID],
  });

 

  const handleSubmitTransfer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const etherAmount = parseFloat(value);
    if (isNaN(etherAmount) || etherAmount <= 0) {
      setError("Please enter a valid Ether amount greater than 0.");
      return;
    }

    sendTransaction({
      to: transferRecipient as `0x${string}`,
      value: parseEther(value),
    });
  };

  const handleSubmitMint = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    writeContract({
      address: contractAddress,
      abi: GTA_NFT_ABI,
      functionName: "safeMint",
      args: [mintRecipient as `0x${string}`, tokenUri],
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-6 border border-gray-200">
        <div className="flex justify-center mb-4">
          <ConnectButton />
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center bg-red-100 p-2 rounded-md mb-4">
            {error}
          </p>
        )}

        {/* Transfer Ether Form */}
        <form onSubmit={handleSubmitTransfer} className="space-y-4">
          <h2 className="text-lg font-semibold text-black text-center mb-2">
            Transfer Ether
          </h2>
          <div>
            <label className="text-gray-700 text-sm font-medium">
              Recipient Address
            </label>
            <input
              type="text"
              placeholder="0x2323...2323"
              value={transferRecipient}
              onChange={(e) => setTransferRecipient(e.target.value)}
              className="w-full bg-white text-black rounded-lg p-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow shadow-sm hover:shadow-md"
            />
          </div>

          <div>
            <label className="text-gray-700 text-sm font-medium">
              Amount (ETH)
            </label>
            <input
              type="number"
              placeholder="0.01"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full bg-white text-black rounded-lg p-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow shadow-sm hover:shadow-md"
              step="any"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all shadow-md hover:shadow-lg"
          >
            Send Ether
          </button>
        </form>

        <div className="border-t border-gray-300 my-6"></div>

        {/* Mint NFT Form */}
        <form onSubmit={handleSubmitMint} className="space-y-4">
          <h2 className="text-lg font-semibold text-black text-center">
            Mint NFT
          </h2>

          <div>
            <label className="text-gray-700 text-sm font-medium">
              Recipient Address
            </label>
            <input
              type="text"
              placeholder="0x2323...2323"
              value={mintRecipient}
              onChange={(e) => setMintRecipient(e.target.value)}
              className="w-full bg-white text-black rounded-lg p-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow shadow-sm hover:shadow-md"
            />
          </div>

          <div>
            <label className="text-gray-700 text-sm font-medium">
              Token URI
            </label>
            <input
              type="text"
              placeholder="Enter Token URI"
              
              onChange={(e) => setTokenUri(e.target.value)}
              className="w-full bg-white text-black rounded-lg p-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow shadow-sm hover:shadow-md"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-all shadow-md hover:shadow-lg"
          >
            Mint NFT
          </button>
        </form>

        <div className="border-t border-gray-300 my-6"></div>

        {/* Get Token URI Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-black text-center">
            Get Token URI
          </h2>
          <div>
            <label className="text-gray-700 text-sm font-medium">
              Token ID
            </label>
            <input
              type="number"
              placeholder="Enter Token ID"
           
              onChange={(e) => setTokenID(parseInt(e.target.value) || 0)}
              className="w-full bg-white text-black rounded-lg p-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow shadow-sm hover:shadow-md"
            />
          </div>
          <p className="text-gray-700 text-sm">
            <strong>Token URI:</strong> {tokenURIData?.toString() || "N/A"}
          </p>
        </div>

        {hashWriteTx && (
          <p className="text-green-600 text-sm text-center mt-4">
            Transaction sent! Hash: {hashWriteTx}
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
