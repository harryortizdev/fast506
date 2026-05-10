import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      
      <main style={{ flex: 1 }}>
        {/* tu contenido aquí */}
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;