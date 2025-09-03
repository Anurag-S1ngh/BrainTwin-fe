import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Custom404() {
  return (
    <>
      <div className="flex h-screen overflow-hidden items-center justify-center">
        <div className="flex-1 lg:flex justify-center items-center hidden h-full">
          <img
            className="w-full h-full object-cover"
            src="../../public/404.webp"
            alt="404 Error"
          />
        </div>
        <div className="flex-1">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center text-6xl sm:text-7xl font-bold space-x-4">
              <span>Error</span>
              <span className="text-violet-500">404</span>
            </div>
            <p className="text-sm sm:text-base text-neutral-400 mt-2 text-center">
              This page isn’t available right now.
              <br />
              It may have been moved or deleted.
            </p>
            <Link to="/">
              <Button>Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
