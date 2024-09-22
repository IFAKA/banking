"use client";

import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Footer from "./Footer";

const Sidebar = ({ user }: SiderbarProps) => {
  const pathname = usePathname();
  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-2">
        <Link
          href={"/"}
          className="flex mb-12 cursor-pointer items-center gap-2"
        >
          <Image
            alt="Horizon Logo"
            src={"/icons/logo.svg"}
            width={34}
            height={34}
            className="size-[24px] max=xl:size-14"
          />
          <h1 className="sidebar-logo">Horizon</h1>
        </Link>
        {sidebarLinks.map((sidebarLink) => {
          const { imgURL, label, route } = sidebarLink;
          const isActive =
            pathname === route || pathname.startsWith(`${route}/`);
          return (
            <Link
              href={route}
              key={label}
              className={cn("sidebar-link", { "bg-bank-gradient": isActive })}
            >
              <div className="relative size-4">
                <Image
                  className={cn({ "brightness-[3] invert-0": isActive })}
                  alt={label}
                  src={imgURL}
                  fill
                />
              </div>
              <p className={cn("sidebar-label", { "!text-white": isActive })}>
                {label}
              </p>
            </Link>
          );
        })}
        USER
      </nav>

      <Footer user={user} />
    </section>
  );
};

export default Sidebar;
