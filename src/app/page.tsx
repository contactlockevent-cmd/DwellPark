import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Listings from "@/components/Listings";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <div className="grain" />
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Listings />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
