import React from "react";
import "./GiftCoverHome.css";
import about from "../../assets/Home-about-image/about1.png";
import { FaRegStar } from "react-icons/fa";
import { FiTruck } from "react-icons/fi";
import { PiChatsThin } from "react-icons/pi";
import { TbLock } from "react-icons/tb";

function GiftCoverHome() {
  const giftContents = [
    {
      icon: FiTruck ,
      title: "Free Shipping",
      content: "You can edit text on your website by double clicking",
    },
    {
      icon: FaRegStar,
      title: "Quality Products",
      content: "You can edit text on your website by double clicking",
    },
    {
      icon: PiChatsThin,
      title: "24/7 Support",
      content: "You can edit text on your website by double clicking",
    },
    {
      icon: TbLock,
      title: "Secure Payment",
      content: "You can edit text on your website by double clicking",
    },
  ];

  return (
    <div>
      <div className="h-[100vh] flex justify-center items-center">
        <div className="gift_cover flex ">
          <div className="w-[50%] relative z-[1] p-[100px] flex">
            <div>
              <p className=" text-home-blue font-sans text-xl font-medium mb-2">
                It's all fun and games with _
              </p>
              <h2 className=" text-home-blue text-5xl leading-normal font-custom-sans mb-3">
                Personalized Gift and Print Your Photos
              </h2>
              <p className=" text-gray-600 mb-12 ">
                You can edit text on your website by double clicking on a text
                box on your website.
              </p>
              <button className="w-[180px] h-[50px] bg-red-700 hover:bg-red-900 duration-300 text-white">
                Shop Now!!
              </button>
            </div>
          </div>
          <div className="w-[50%] py-[50px] ml-[80px] flex items-center justify-center h-full">
            <div class="relative p-4  border-4 border-red-700 w-[80%] h-full flex items-center">
              <div className="absolute right-20 w-[100%] z-[10px] bg-white h-[80%] shadow-lg flex">
                <img src={about} alt="Love Mug" class="block w-full h-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-[80vw] ">
          <h2 className=" text-center text-home-blue text-3xl leading-normal font-semibold font-custom-sans mt-3 mb-3">
            Over 350 Printed Gifts, Handmade By Us
          </h2>
          <h5 className=" text-center leading-normal text-gray-700 px-5 mb-3">
            Almost before we knew it, we had left the ground. All their
            equipment and instruments are alive.Mist enveloped the ship three
            hours out from port. The spectacle before us was indeed sublime.
          </h5>
          <div className=" flex justify-center gap-7 items-center mb-4">
            <hr className="w-[300px]" />
            <FaRegStar className=" text-2xl text-red-700" />
            <hr className="w-[300px] " />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-[80vw] flex bg-light-gray p-4 gap-4">
          {giftContents.map((item, index) => (
            <div key={index}>
              <div className=" flex gap-3 items-center mb-3">
                <div className="p-2 rounded-full  bg-red-700">
                  <item.icon className=" text-white text-2xl " />
                </div>
                <h3 className="text-home-blue font-custom-sans">{item.title}</h3>
              </div>
              <p>{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GiftCoverHome;
