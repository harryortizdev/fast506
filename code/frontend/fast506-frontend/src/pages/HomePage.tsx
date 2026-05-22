import Navbar from "../components/organisms/Navbar";
import Footer from "../components/organisms/Footer";
import WhatsAppButton from "../components/atoms/WhatsAppButton";
import Carousel from "../components/molecules/Carousel";
import Label from "../components/atoms/Label";

const HomePage = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />

      <main style={{ flex: 1 }} className="container my-4">
        <div>
          <h1 className="text-center">
            <Label label={"Pensados para vos"} color={"#2C3E50 "} />
          </h1>
          <Carousel />  
        </div>
        
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default HomePage;