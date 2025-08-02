import React from "react";

const About: React.FC = () => {
  return (
    <div className="flex justify-center min-h-screen px-4 py-10">
      <div className="text-center space-y-6 max-w-3xl">
        <h1 className="font-bold text-4xl">ABOUT NFThrive</h1>
        <p className="mt-5 text-gray-400 text-center mb-2">
          NFTs, or Non-Fungible Tokens, are unique digital assets stored on the
          blockchain. Unlike cryptocurrencies like Bitcoin or Ethereum which are
          interchangeable
        </p>
        <section>
          <h2 className="font-bold text-2xl mt-10">How NFTs Work</h2>
          <p className="mt-5 text-gray-400">
            NFTs, or Non-Fungible Tokens, are unique digital assets stored on
            the blockchain. Unlike cryptocurrencies like Bitcoin or Ethereum
            which are interchangeable NFTs represent something one-of-a-kind,
            whether it’s digital art, music, collectibles, or in the case of
            MintedGold, luxury-inspired digital jewelry.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-2xl mt-10">
            What Makes an NFT Unique?
          </h2>
          <p className="mt-5 text-gray-400">
            Each NFT is embedded with a unique code, or metadata, which proves
            its originality and ownership. No two NFTs are the same, and each
            one can be traced back to its creator or owner using blockchain
            technology. Think of it as a digital certificate of authenticity
            impossible to forge, easy to verify
          </p>
        </section>
        <section>
          <h2 className="font-bold text-2xl mt-10">How Are NFTs Created?</h2>
          <p className="mt-5 text-gray-400">
            NFTs are created through a process called minting. This means the
            digital file (art, jewelry design, etc.) is uploaded to the
            blockchain via a smart contract. During this process:
            <ul>
              <li>A unique token is generated.</li>
            </ul>
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
