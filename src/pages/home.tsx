import { Button } from "@/components/ui/button";
import { ArrowRightIcon, ZapIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="h-full w-full overflow-x-hidden relative">
      <div className="absolute -top-[140%] left-1/2 -translate-x-1/2 w-[130%] h-[210%] bg-fuchsia-500 blur-3xl rounded-full -z-10"></div>
      <div className="h-screen w-screen flex flex-col gap-4 items-center justify-center">
        <h1 className="text-neutral-50 text-center md:text-6xl text-5xl font-bold ">
          Capture Everything
          <br />
          Forget Nothing
        </h1>
        <p className="text-neutral-200 text-center px-8 ">
          Don’t lose your best ideas — every note, thought, and link
          <br />
          is saved the moment it strikes.
        </p>
        <div className="flex md:flex-row flex-col gap-4 mt-2">
          <Button
            onClick={() => {
              navigate("/signup");
            }}
            className="bg-neutral-900 hover:bg-neutral-700"
          >
            Get Started
            <ZapIcon className="mr-2 h-4 w-4" />
          </Button>{" "}
          <Button
            onClick={() => {
              navigate("/dashboard");
            }}
            variant="outline"
          >
            Jump to Dashboard
            <ArrowRightIcon className="mr-2 h-4 w-4" />
          </Button>{" "}
        </div>
      </div>
    </div>
  );
}
