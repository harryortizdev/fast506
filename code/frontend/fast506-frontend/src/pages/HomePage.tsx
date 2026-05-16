import Navbar from "../components/organisms/Navbar";
import Footer from "../components/organisms/Footer";
import WhatsAppButton from "../components/atoms/WhatsAppButton";

const HomePage = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      
      <main style={{ flex: 1 }}>
        
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default HomePage;