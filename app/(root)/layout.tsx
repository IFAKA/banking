import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isLoggedIn = { firstName: "My", lastName: "Name" };
  return (
    <main className="flex h-screen w-full font-inter">
      <Sidebar user={isLoggedIn} />

      <div className="flex flex-col size-full">
        <div className="root-layout">
          <Image
            src={"/icons/logo.svg"}
            alt="menu logo"
            height={30}
            width={30}
          />
          <div>
            <MobileNav user={isLoggedIn} />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}
