import React,{useState} from "react";
import graphImage from "../../../public/graphImage.png";
import workspace from "../../../public/workspace.png";
import { Link } from "react-router";
import { Wrench } from "lucide-react";

const Home = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div className="relative bg-gray-50 overflow-hidden h-screen">
      {/* Background pattern */}
      <div className="absolute bottom-0 right-0 overflow-hidden lg:inset-y-0">
        <img
          className="w-auto h-full"
          src="https://d33wubrfki0l68.cloudfront.net/1e0fc04f38f5896d10ff66824a62e466839567f8/699b5/images/hero/3/background-pattern.png"
          alt=""
        />
      </div>

      {/* Header */}
      <header className="relative py-4 md:py-6 border-b border-gray-200 bg-white z-10">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex-shrink-0">
              <a
                href="#"
                className="flex rounded outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
              >
        <Link to="/home" className="flex items-center">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <Wrench className="size-6 text-blue-600" />
              <span className="font-semibold text-lg hidden md:block">
                TaskLine
              </span>
            </div>
          )}

          {isCollapsed && <Wrench className="size-6 text-blue-600" />}
        </Link>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden">
              <button type="button" className="text-gray-900">
                <svg
                  className="w-7 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:ml-16 lg:items-center lg:justify-center lg:space-x-10">
              <Link
                to='/sign-in'
                className="px-5 py-2 text-base font-semibold leading-7 text-gray-900 transition-all duration-200 bg-transparent hover:bg-blue-600 hover:text-white rounded-xl font-pj"
              >
                Login
              </Link>

              <Link
                to='/sign-up'
                className="px-5 py-2 text-base font-semibold leading-7 text-white transition-all duration-200 bg-blue-500 hover:bg-blue-600 rounded-xl font-pj"
                role="button"
              >
                Create free account
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 lg:pt-20 lg:pb-24 h-[calc(100vh-80px)] flex items-center">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 gap-y-8 lg:items-center lg:grid-cols-2 sm:gap-y-20 xl:grid-cols-5">
            <div className="text-center xl:col-span-2 lg:text-left md:px-16 lg:px-0">
              <div className="max-w-sm mx-auto sm:max-w-md md:max-w-full">
                <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl font-pj">
                  Built for teams that want 10x results with zero chaos.
                </h1>

                <p className="mt-6 text-lg text-gray-900 font-pj">
                  Manage projects with clarity — perfect for{" "}
                  <span className="font-bold">small teams</span> and large
                  organizations alike, without the unnecessary complexity.
                </p>
              </div>
            </div>

            <div className="xl:col-span-3 flex justify-center">
              <img
                className="w-[85%] mx-auto"
                src={graphImage}
                alt="Dashboard Illustration"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
