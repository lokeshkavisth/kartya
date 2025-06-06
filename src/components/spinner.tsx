import { cn } from "@/lib/utils";
import { Loader, LoaderCircle } from "lucide-react";
import React from "react";

interface SpinnerProps {
  className?: string;
}

export function Spinner({ className }: SpinnerProps) {
  return <Loader className={cn("size-4 animate-spin", className)} />;
}

export function SpinnerCircle({ className }: SpinnerProps) {
  return <LoaderCircle className={cn("size-4 animate-spin", className)} />;
}
