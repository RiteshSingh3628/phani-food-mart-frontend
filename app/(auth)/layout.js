import { NavTabs } from "@/components/ui/nav-tabs";
import Image from "next/image";
import AnimatedTabContent from "@/components/ui/animated-tab-content";
import { AUTH_TABS_ITEMS } from "@/lib/constants/auth/authConstant";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen w-full flex bg-[#322e63]">
      {/* Left side: Image and branding */}
      <div className="hidden lg:flex flex-col flex-1 relative border-r border-[#333333]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/image2.jpg"
            alt="Luxurious chocolate dessert"
            className="w-full h-full object-cover opacity-80"
            width={800}
            height={600}
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-[#18181A] via-[#18181A]/50 to-transparent"></div>
        </div>

        {/* Branding top left */}
        <div className="relative z-10 p-12 flex items-center gap-2">
          <div className="text-[#EAAA2A]">
            <Image
              src="/logo.png"
              alt="brand logo"
              className="w-full h-full object-cover"
              width={70}
              height={70}
            />
          </div>
        </div>

        {/* Marketing text bottom left */}
        <div className="relative z-10 p-12 mt-auto pb-24 max-w-lg">
          <h1 className="text-5xl font-serif text-white mb-2 leading-tight">
            Curated Global
          </h1>
          <h2 className="text-5xl text-[#EAAA2A] font-serif mb-6 italic">
            Indulgences
          </h2>
          <p className="text-[#A3A3A3] text-lg leading-relaxed">
            Experience the finest collection of imported chocolates, exotic
            drinks, and artisanal snacks from around the world.
          </p>
        </div>
      </div>

      {/* Right side: Form */}
      <div className="flex-1 relative flex flex-col items-center pt-[15vh] lg:pt-[20vh] p-8">
        <div className="w-full max-w-md flex flex-col">
          <NavTabs items={AUTH_TABS_ITEMS} />
          <div className="mt-2">
            <AnimatedTabContent>{children}</AnimatedTabContent>
          </div>
        </div>
        {/* footer */}
        <div className="mt-8 text-center absolute bottom-10 left-0 right-0">
          <p className="text-[#A3A3A3] italic font-serif text-sm mb-4">
            Welcome back to a world of refined taste.
          </p>
          <div className="w-full flex justify-center gap-6 text-xs text-[#A3A3A3]">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
