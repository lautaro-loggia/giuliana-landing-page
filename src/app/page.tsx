import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { PhotoMarquee } from "@/components/PhotoMarquee";
import { Services } from "@/components/Services";
import { Method } from "@/components/Method";
import { About } from "@/components/About";
import { AppSection } from "@/components/AppSection";
import { Results } from "@/components/Results";
import { Booking } from "@/components/Booking";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <PhotoMarquee />
        <Services />
        <Method />
        <About />
        <AppSection />
        <Results />
        <Booking />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
