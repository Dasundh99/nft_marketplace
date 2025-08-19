import React from "react";
import sliderImage from "../../assets/Slider1.jpg";
import avatarImage from "../../assets/Avatar.svg";
import { useWallet } from "@solana/wallet-adapter-react";
import edit from "../../assets/Edit.svg";
import copyIcon from "../../assets/CopyIcon.svg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProfileDashboard: React.FC = () => {
  const { publicKey } = useWallet();
  const navigate = useNavigate();

  const fullAddress = publicKey ? publicKey.toString() : "Not Connected";

  const handleEdit = () => {
    navigate("/settings/profile");
  };

  const handleCopy = () => {
    try {
      if (publicKey) {
        navigator.clipboard.writeText(publicKey.toString());
        toast.success("Wallet address Copied!");
      }
    } catch {
      toast.error("An error occured. Please try again later");
    }
  };

  return (
    <div>
      <img
        src={sliderImage}
        alt="Slider Image"
        className="w-full p-5 object-cover h-100 opacity-40"
      />
      <img
        src={avatarImage}
        alt="Profile Picture"
        className="absolute top-60 p-8"
      />
      <div className="absolute top-85 p-8 font-bold text-2xl flex gap-3 items-center">
        <h2>{fullAddress}</h2>

        <button onClick={handleEdit} className="p-2 cursor-pointer">
          <img src={edit} alt="Edit Icon" className="w-6 h-6 invert" />
        </button>

        <button onClick={handleCopy} className="cursor-pointer">
          <img src={copyIcon} alt="Copy Icon" className="w-6 h-6 invert" />
        </button>
      </div>
    </div>
  );
};
export default ProfileDashboard;
