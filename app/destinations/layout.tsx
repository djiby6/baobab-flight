import type { ReactNode } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { getDestinationNav } from "@/data/destinations";

export default function DestinationsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Navbar destinations={getDestinationNav()} />
      {children}
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
