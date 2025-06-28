
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PrototypeGenerator from "@/components/PrototypeGenerator";
import About from "@/components/About";
import BookShowcase from "@/components/BookShowcase";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <PrototypeGenerator />
      <About />
      <BookShowcase />
      <Footer />
    </div>
  );
};

export default Index;
