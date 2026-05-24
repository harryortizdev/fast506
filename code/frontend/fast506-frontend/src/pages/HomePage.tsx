import Navbar from "../components/organisms/Navbar";
import Footer from "../components/organisms/Footer";
import WhatsAppButton from "../components/atoms/WhatsAppButton";
import Carousel from "../components/molecules/Carousel";
import Label from "../components/atoms/Label";
import HorizontalCard from "../components/molecules/HorizontalCard";
import testdriveImage from "../assets/testdrive.jpg";
import quotationImage from "../assets/quotation.jpg";
import mecanicImage from "../assets/mecanic.jpg";
import { useNavigate } from "react-router-dom";




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

        <HorizontalCard image={testdriveImage} title="TESTDRIVE" 
        description="Subite al carro de tus sueños hoy. Agendá tu prueba de manejo en carretera sin compromisos." to="/testdrive"
        />

            <hr className="border-secondary my-5" />


        <HorizontalCard image={quotationImage} title="COTIZACIONES" 
        description="Solicitá tu cotización personalizada en minutos y descubrí los mejores planes para vos." to="/quotation"
        />

            <hr className="border-secondary my-5" />


        <HorizontalCard image={mecanicImage} title="TALLER" 
        description="Mantené tu auto como nuevo. Agendá tu cita de taller en línea y elegí tu horario ideal." to="/"
        />

        
        
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default HomePage;