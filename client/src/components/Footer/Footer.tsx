import { FaInstagram, FaFacebookSquare, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";


const Footer = () => {
    return (
        <footer className="ml-20 bg-black text-gray-300 p-5">
            <div className="h-full w-full flex flex-col justify-center">
                <div className="h-full w-full flex flex-1 gap-5 items-center">
                    <div className="text-2xl font-bold flex-1">NFThrive</div>
                    <div className="flex items-center gap-4">
                        <FaFacebookSquare className="text-xl hover:text-blue-500 cursor-pointer" />
                        <FaInstagram className="text-xl hover:text-pink-500 cursor-pointer" />
                        <FaXTwitter className="text-xl hover:text-gray-500 cursor-pointer" />
                        <FaYoutube className="text-xl hover:text-red-600 cursor-pointer" />
                    </div>
                </div>



                <div className="pt-5 px-10 h-full w-full flex flex-1">
                    <div className="flex-1 flex items-center justify-center">About us</div>
                    <div className="flex-1 flex items-center justify-center">Discover</div>
                    <div className="flex-1 flex items-center justify-center">About us</div>
                    <div className="flex-1 flex items-center justify-center">Books</div>
                    <div className="flex-1 flex items-center justify-center">Explore</div>
                </div>

                <div className="h-full w-full flex flex-1">
                    <div className="p-10 flex-1 flex items-center justify-center text-gray-500 text-center text-xs">MintedGold is a luxury-driven NFT experience
                        that redefines how we view digital ownership
                        and timeless beauty. Rooted in the elegance of handcrafted gold and the artistry of fine jewelry,
                        each NFT in the MintedGold
                        collection is a unique digital collectible forged with precision, rarity, and prestige.</div>
                </div>
                <div className="mt-2 border-t border-gray-600 pt-4 text-center text-xs">
                    <div className="flex ">
                        <div className="flex-1 flex justify-start">
                            <p className="text-white">
                                Copyright © {new Date().getFullYear()} NFThrive. All Rights Reserved.
                            </p>
                        </div>

                        <div className="flex-1 flex justify-end gap-4">
                            <a href="/termsandconditions" className="text-white hover:underline">
                                Terms of Service
                            </a>
                            <a href="/about" className="text-white hover:underline">
                                Privacy Policy
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;







