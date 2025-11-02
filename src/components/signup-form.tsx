import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { SignUpHandler } from "@/lib/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const onSubmiteHandler = async () => {
    if (!emailRef.current || !passwordRef.current) return;
    const response = await SignUpHandler(
      emailRef.current.value,
      passwordRef.current.value,
    );
    if (response === "sign up successful") {
      navigate("/signin");
      return;
    }
    if (!response) {
      return;
    } else {
      toast.error(response);
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
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email to sign up
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
          Sign Up
        </Button>
      </div>
      <div className="text-center text-sm">
        Already an account?{" "}
        <Link to="/signin" className="underline underline-offset-4">
          Sign In
        </Link>
      </div>
    </form>
  );
}
