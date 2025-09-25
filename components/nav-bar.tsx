"use client";
import * as React from "react";
import { useEffect, useState, useRef, useId } from "react";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";
import Logo from "@/public/msweets-logo.png";
import Image from "next/image";
import Cart from "@/public/cart-icon.png";
import { Search } from "lucide-react";

// Simple logo component for the navbar

// Hamburger icon component
const HamburgerIcon = ({
  className,
  ...props
}: React.SVGAttributes<SVGElement>) => (
  <svg
    className={cn("pointer-events-none", className)}
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4 12L20 12"
      className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
    />
    <path
      d="M4 12H20"
      className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
    />
    <path
      d="M4 12H20"
      className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
    />
  </svg>
);
// Types
export interface Navbar04NavItem {
  href?: string;
  label: string;
}
export interface Navbar04Props extends React.HTMLAttributes<HTMLElement> {
  logo?: string;
  logoHref?: string;
  navigationLinks?: Navbar04NavItem[];
  signInText?: string;
  signInHref?: string;
  cartText?: string;
  cartHref?: string;
  cartCount?: number;
  searchPlaceholder?: string;
  onSignInClick?: () => void;
  onCartClick?: () => void;
  onSearchSubmit?: (query: string) => void;
}
// Default navigation links
const defaultNavigationLinks: Navbar04NavItem[] = [
  { href: "#", label: "Home" },
  { href: "#", label: "Shop" },
  { href: "#", label: "Sale" },
  { href: "#", label: "Blog" },
  { href: "#", label: "About Us" },
  { href: "#", label: "Contact" },
];
export const Navbar01 = React.forwardRef<HTMLElement, Navbar04Props>(
  (
    {
      className,
      logo = Logo,
      logoHref = "#",
      navigationLinks = defaultNavigationLinks,
      signInText = "Login/Sign Up",
      signInHref = "#signin",
      cartText = "Cart",
      cartHref = "#cart",
      cartCount = 2,
      searchPlaceholder = "Search...",
      onSignInClick,
      onCartClick,
      onSearchSubmit,
      ...props
    },
    ref
  ) => {
    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef<HTMLElement>(null);
    const searchId = useId();
    useEffect(() => {
      const checkWidth = () => {
        if (containerRef.current) {
          const width = containerRef.current.offsetWidth;
          setIsMobile(width < 768); // 768px is md breakpoint
        }
      };
      checkWidth();
      const resizeObserver = new ResizeObserver(checkWidth);
      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
      }
      return () => {
        resizeObserver.disconnect();
      };
    }, []);
    // Combine refs
    const combinedRef = React.useCallback(
      (node: HTMLElement | null) => {
        containerRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref]
    );
    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const query = formData.get("search") as string;
      if (onSearchSubmit) {
        onSearchSubmit(query);
      }
    };
    return (
      <header
        ref={combinedRef}
        className={cn(
          "absolute top-0 z-40 w-full bg-none backdrop-blur  md:px-6 [&_*]:no-underline  lg:px-24 lg:py-6 ",
          className
        )}
        {...props}
      >
        <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-4">
          {/* Left side */}
          <div className="flex flex-1 items-center gap-2">
            {/* Mobile menu trigger */}
            {isMobile && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className="group h-9 w-9  hover:text-accent-foreground"
                    variant="ghost"
                    size="icon"
                  >
                    <HamburgerIcon className="text-white" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-64 p-1">
                  <NavigationMenu className="max-w-none">
                    <NavigationMenuList className="flex-col items-start gap-0">
                      {navigationLinks.map((link, index) => (
                        <NavigationMenuItem key={index} className="w-full">
                          <Button
                            onClick={(e) => e.preventDefault()}
                            className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors  hover:text-accent-foreground  focus:text-accent-foreground cursor-pointer no-underline"
                          >
                            {link.label}
                          </Button>
                        </NavigationMenuItem>
                      ))}
                      <NavigationMenuItem
                        className="w-full"
                        role="presentation"
                        aria-hidden={true}
                      >
                        <div
                          role="separator"
                          aria-orientation="horizontal"
                          className="bg-border -mx-1 my-1 h-px"
                        />
                      </NavigationMenuItem>
                      <NavigationMenuItem className="w-full ">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            if (onSignInClick) onSignInClick();
                          }}
                          className="text-white flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors  hover:text-accent-foreground focus:text-accent-foreground cursor-pointer no-underline"
                        >
                          {signInText}
                        </button>
                      </NavigationMenuItem>
                      <NavigationMenuItem className="w-full">
                        <Button
                          size="sm"
                          className="mt-0.5 w-full text-left text-sm"
                          onClick={(e) => {
                            e.preventDefault();
                            if (onCartClick) onCartClick();
                          }}
                        >
                          <Image src={Cart} alt="Cart Icon" />
                        </Button>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                </PopoverContent>
              </Popover>
            )}
            {/* Main nav */}
            <div className="flex flex-1 items-center gap-6 max-md:justify-between">
              <button
                onClick={(e) => e.preventDefault()}
                className="hidden  md:flex items-center space-x-2 text-primary hover:text-primary/90 transition-colors cursor-pointer"
              >
                <Image
                  src={Logo}
                  alt="logo"
                  className="w-10 md:w-20 lg:w-20 2xl:w-25"
                />
              </button>
              {/* Navigation menu */}
              {!isMobile && (
                <NavigationMenu className="flex">
                  <NavigationMenuList className="">
                    {navigationLinks.map((link, index) => (
                      <NavigationMenuItem key={index}>
                        <NavigationMenuLink
                          href={link.href}
                          onClick={(e) => e.preventDefault()}
                          className="text-white hover:text-primary py-1.5 font-medium transition-colors cursor-pointer group inline-flex h-10 w-max items-center justify-center rounded-md  px-4 text-sm  focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 2xl:text-2xl"
                        >
                          {link.label}
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              )}
              {/* Search form */}
              {/* <form onSubmit={handleSearchSubmit} className="relative">
                <Input
                  id={searchId}
                  name="search"
                  className="peer h-8 ps-8 pe-2"
                  placeholder={searchPlaceholder}
                  type="search"
                />
                <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 peer-disabled:opacity-50">
                  <SearchIcon size={16} />
                </div>
              </form> */}
            </div>
          </div>
          {/* Right side */}
          {!isMobile && (
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                className="text-white text-sm font-medium  hover:text-accent-foreground 2xl:text-2xl"
                onClick={(e) => {
                  e.preventDefault();
                  if (onSignInClick) onSignInClick();
                }}
              >
                {signInText}
              </Button>
              {/* <button
                className="rounded-full bg-white text-sm font-medium p-2 shadow-sm "
                onClick={(e) => {
                  e.preventDefault();
                  if (onCartClick) onCartClick();
                }}
              >
                <Search className="text-brand-red" />
              </button> */}
              <button
                className="rounded-full bg-white text-sm font-medium p-2 shadow-sm "
                onClick={(e) => {
                  e.preventDefault();
                  if (onCartClick) onCartClick();
                }}
              >
                <Image src={Cart} alt="Cart Icon" width={24} />
              </button>
            </div>
          )}
        </div>
      </header>
    );
  }
);
Navbar01.displayName = "Navbar01";
export { Logo, HamburgerIcon };
