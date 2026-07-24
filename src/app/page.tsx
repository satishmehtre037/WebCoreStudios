import { Navbar, Footer } from "@/components/core";
import { Hero, WhoWeAre, Services, Products, CaseStudies, Process, Contact } from "@/components/sections";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Hero />
        <WhoWeAre />
        <Services />
        <Products />
        <CaseStudies />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
