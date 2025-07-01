import { Button } from "@/components/ui/button";
import logo from "../assets/sb-logo.svg";
import { Link, useLocation } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { MenuIcon } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState<boolean>(false);
  return (
    <nav className="fixed top-0 z-50 backdrop-blur-lg overflow-x-hidden w-screen">
      <div className="mx-auto max-w-4xl w-full px-6 md:px-12 grid grid-cols-3 items-center h-14 ">
        <Link to="/">
          <div className="flex items-center space-x-2">
            <img
              src={logo}
              alt="ResearchAI Logo"
              className="h-7 w-auto invert"
            />
            <h3
              className={`font-semibold text-lg ${location.pathname === "/" ? "text-neutral-50 " : "text-neutral-950 "}`}
            >
              BrainTwin
            </h3>
          </div>
        </Link>

        {/* Center: Nav links */}
        <div
          className={`hidden md:flex justify-center space-x-10 font-medium ${location.pathname === "/" ? "text-neutral-100 " : "text-neutral-950 "}`}
        >
          <Link
            to="/dashboard"
            className="cursor-pointer hover:underline underline-offset-3 transition"
          >
            Dashboard
          </Link>
        </div>

        <div className="hidden md:flex justify-end">
          <Link
            to="/signin"
            className="cursor-pointer hover:text-gray-300 transition"
          >
            <Button size="sm" variant="secondary">
              Sign In
            </Button>
          </Link>
        </div>
        <div className="md:hidden block justify-end absolute right-10">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger className="w-fit" asChild>
              <Button size={"sm"}>
                <MenuIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="bg-white border w-fit py-2 px-4 flex flex-col gap-2">
              <Link
                to="/signin"
                onClick={() => {
                  setOpen(false);
                }}
                className={`cursor-pointer bg-blend-difference ${location.pathname === "/" ? "text-neutral-950 " : "text-neutral-950 "}`}
              >
                Sign In
              </Link>
              <Link
                to="/dashboard"
                onClick={() => {
                  setOpen(false);
                }}
                className={`cursor-pointer bg-blend-difference ${location.pathname === "/" ? "text-neutral-950 " : "text-neutral-950 "}`}
              >
                Dashboard
              </Link>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </nav>
  );
}
