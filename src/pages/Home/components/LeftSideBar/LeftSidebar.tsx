import React, { useState } from "react";
import Image from "next/image";
import {
  FaHome,
  FaSearch,
  FaGamepad,
  FaClock,
  FaList,
  FaDownload,
  FaCog,
  FaQuestionCircle,
} from "react-icons/fa";
import { Images } from "@/app/assets/images";

const LeftSidebar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Start with the sidebar open

  const handleLogoClick = () => {
    setIsSidebarOpen((prev) => !prev); // Toggle sidebar visibility
  };

  return (
    <aside
      className={`transition-transform duration-300 fixed left-0 top-0 bg-sidebarLight dark:bg-sidebarDark block ${
        isSidebarOpen ? "w-1/6" : "w-20"
      } ${isSidebarOpen ? "z-10" : "z-0"} ${
        isSidebarOpen ? "transform-none" : "-translate-x-full"
      } lg:relative lg:translate-x-0`}
    >
      <div className="flex flex-col ">
        {/* Logo */}
        <div className="flex flex-row items-center h-[8%] w-full p-6 gap-4">
          <Image
            onClick={handleLogoClick} // Toggle open/close on logo click
            src={Images.logo}
            alt="Logo"
            width={50}
            height={50}
          />
          {isSidebarOpen && (
            <span className="text-sm md:text-md lg:text-3xl text-textLight dark:text-textDark font-semibold tracking-wide">
              Meu Movies
            </span>
          )}
        </div>

        {/* Menu and Library only visible when sidebar is open */}
        <div className={`flex flex-1 flex-col ${isSidebarOpen ? "px-10 py-6 mt-5" : "px-4 py-6 items-center gap-5 mt-5"}`}>
          {/* Menu Items */}
          <ul className="space-y-6">
            <li className="flex items-center space-x-4 group hover:text-red-500">
              <FaHome className="left-sidebar-icon" />
              {isSidebarOpen && <span className="left-sidebar-text">Home</span>}
            </li>
            <li className="flex items-center space-x-4 group hover:text-red-500">
              <FaSearch className="left-sidebar-icon" />
              {isSidebarOpen && <span className="left-sidebar-text">Discovery</span>}
            </li>
            <li className="flex items-center space-x-4 group hover:text-red-500">
              <FaGamepad className="left-sidebar-icon" />
              {isSidebarOpen && <span className="left-sidebar-text">Community</span>}
            </li>
          </ul>

          <div className="h-[2px] bg-gray-400 w-full my-6" />

          {/* Library Section */}
          <ul className="space-y-6">
            <li className="flex items-center space-x-4 group hover:text-red-500">
              <FaClock className="left-sidebar-icon" />
              {isSidebarOpen && <span className="left-sidebar-text">Recent</span>}
            </li>
            <li className="flex items-center space-x-4 group hover:text-red-500">
              <FaList className="left-sidebar-icon" />
              {isSidebarOpen && <span className="left-sidebar-text">My List</span>}
            </li>
            <li className="flex items-center space-x-4 group hover:text-red-500">
              <FaDownload className="left-sidebar-icon" />
              {isSidebarOpen && <span className="left-sidebar-text">Download</span>}
            </li>
          </ul>

          <div className="h-[2px] bg-gray-400 w-full my-6" />

          {/* Settings & Help */}
          <ul className="space-y-6">
            <li className="flex items-center space-x-4 group hover:text-red-500">
              <FaCog className="left-sidebar-icon" />
              {isSidebarOpen && <span className="left-sidebar-text">Settings</span>}
            </li>
            <li className="flex items-center space-x-4 group hover:text-red-500">
              <FaQuestionCircle className="left-sidebar-icon" />
              {isSidebarOpen && <span className="left-sidebar-text">Help</span>}
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default LeftSidebar;
