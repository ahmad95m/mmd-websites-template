"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkCompatProps extends Omit<LinkProps, "className" | "href"> {
  to: string; // React Router uses 'to', Next uses 'href'. compatibility wrapper mapped 'to' -> 'href'
  className?: string | ((props: { isActive: boolean; isPending: boolean }) => string);
  activeClassName?: string;
  pendingClassName?: string;
  children?: React.ReactNode;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName, to, ...props }, ref) => {
    const pathname = usePathname();
    const isActive = pathname === to || pathname?.startsWith(`${to}/`);
    const isPending = false; // Next.js doesn't expose pending state easily here without useTransition

    const resolvedClassName = typeof className === "function"
      ? className({ isActive, isPending })
      : cn(className, isActive && activeClassName, isPending && pendingClassName);

    return (
      <Link
        ref={ref}
        href={to}
        className={resolvedClassName}
        {...props}
      />
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
