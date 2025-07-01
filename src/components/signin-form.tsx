import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useRef } from "react";
import { SignInHandler } from "@/lib/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function SignInForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const onSubmiteHandler = async () => {
    if (!emailRef.current || !passwordRef.current) return;
    const response = await SignInHandler(
      emailRef.current.value,
      passwordRef.current.value,
    );
    if (response === "sign in successful") {
      navigate("/");
      return;
    }
    if (!response) {
      return;
    } else {
      toast(response);
      return;
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmiteHandler();
      }}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            ref={emailRef}
            id="email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input ref={passwordRef} id="password" type="password" required />
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/signup" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </form>
  );
}
