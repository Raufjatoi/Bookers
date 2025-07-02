import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PrototypeGenerator from "@/components/PrototypeGenerator";
import BookShowcase from "@/components/BookShowcase";
import About from "@/components/About";
import Footer from "@/components/Footer";
import ComingSoon from "@/components/ComingSoon";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <Header />
            <main>
              <Hero />
              <PrototypeGenerator />
              <BookShowcase />
              <About />
            </main>
            <Footer />
          </>
        } />
        <Route path="/writers-hub" element={<ComingSoon pageName="Writers Hub" />} />
        <Route path="/investor-portal" element={<ComingSoon pageName="Investor Portal" />} />
        <Route path="/publishing-partners" element={<ComingSoon pageName="Publishing Partners" />} />
        <Route path="/support" element={<ComingSoon pageName="Support" />} />
      </Routes>
    </Router>
  );
}

export default App;


