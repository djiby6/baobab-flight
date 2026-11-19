import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { WhySection } from "@/components/why-section";
import { InspirationSection } from "@/components/inspiration-section";
import { BespokeSection } from "@/components/bespoke-section";
import { CtaSection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { getDestinationNav } from "@/data/destinations";

export default function HomePage() {
  return (
    <>
      <Navbar destinations={getDestinationNav()} />
      <main id="contenu">
        <Hero />
        <WhySection />
        <InspirationSection />
        <BespokeSection />
        <CtaSection />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
