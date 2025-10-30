import React from "react";

const About: React.FC = () => {
  return (
    <div className="flex justify-center min-h-screen px-4 py-10">
      <div className="text-center space-y-6 max-w-3xl">
        <h1 className="font-bold text-4xl">ABOUT NFThrive</h1>
        <p className="mt-5 text-gray-400 text-center mb-2 leading-relaxed">
          NFTs, or Non-Fungible Tokens, are unique digital assets stored on the
          blockchain. Unlike cryptocurrencies like Bitcoin or Ethereum which are
          interchangeable
        </p>
        <section>
          <h2 className="font-bold text-2xl mt-10">How NFTs Work</h2>
          <p className="mt-5 text-gray-400 leading-relaxed">
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
          <p className="mt-5 text-gray-400 leading-relaxed">
            Each NFT is embedded with a unique code, or metadata, which proves
            its originality and ownership. No two NFTs are the same, and each
            one can be traced back to its creator or owner using blockchain
            technology. Think of it as a digital certificate of authenticity
            impossible to forge, easy to verify
          </p>
        </section>
        <section>
          <h2 className="font-bold text-2xl mt-10">How Are NFTs Created?</h2>
          <p className="mt-5 text-gray-400 leading-relaxed">
            NFTs are created through a process called minting. This means the
            digital file (art, jewelry design, etc.) is uploaded to the
            blockchain via a smart contract. During this process:
          </p>
          <ul className="text-gray-400 list-disc list-inside mt-3 leading-relaxed">
            <li>A unique token is generated.</li>
            <li>Ownership is established and stored on a public ledger</li>
            <li>It is permanently linked to the creator.</li>
          </ul>

          <p className="text-gray-400 mt-5 leading-relaxed">
            At MintedGold, we mint each NFT with great care ensuring that every
            gold and gem inspired piece holds real digital value and artistic
            distinction.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-2xl mt-10">How Do You Own an NFT?</h2>
          <p className="mt-5 text-gray-400 leading-relaxed">
            When you buy an NFT, you're buying ownership rights to that specific
            digital asset. This ownership is secured by the blockchain, which
            acts like a public record. You can:
          </p>
          <ul className="list-disc list-inside text-gray-400 mt-5 mb-5 leading-relaxed">
            <li>View it in your wallet</li>
            <li>Resell it on NFT marketplaces</li>
            <li>Showcase it in virtual galleries</li>
            <li>Hold it as a collectible asset</li>
          </ul>
        </section>
        <section>
          <h2 className="font-bold text-2xl mt-10">
            Why Is This Technology Valuable
          </h2>
          <p className="text-gray-400 mt-5 leading-relaxed">
            NFTs let creators protect and control their work. They also give
            buyers proof of ownership, authenticity, and rarity. For brands like
            MintedGold, this means offering timeless beauty through secure,
            modern technology where art, luxury, and innovation meet.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
