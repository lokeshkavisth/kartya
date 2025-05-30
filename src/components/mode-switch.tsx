"use client";

import { useTheme } from "next-themes";

import { Switch } from "@/components/ui/switch";

export function ModeSwitch() {
  const { setTheme } = useTheme();

  return (
    <Switch
      onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
    />
  );
}
