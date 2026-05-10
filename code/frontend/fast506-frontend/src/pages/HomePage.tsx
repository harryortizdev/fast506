import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";

const HomePage = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      
      <main style={{ flex: 1 }}>
        {/* tu contenido aquí */}
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default HomePage;