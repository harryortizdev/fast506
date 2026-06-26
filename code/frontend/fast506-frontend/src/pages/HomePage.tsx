import Navbar from "../components/organisms/Navbar";
import Footer from "../components/organisms/Footer";
import WhatsAppButton from "../components/atoms/WhatsAppButton";
import Carousel from "../components/molecules/Carousel";
import Label from "../components/atoms/Label";
import HorizontalCard from "../components/molecules/HorizontalCard";
import testdriveImage from "../assets/testdrive.jpg";
import quotationImage from "../assets/quotation.jpg";
import mecanicImage from "../assets/mecanic.jpg";
import CarouselForAds from "../components/molecules/CarouselForAds";
import { getAllBranch, getAllAdvertisement } from "../services/AdService";
import { Ad } from "../models/Ad";
import { useEffect, useState } from "react";


const HomePage = () => {

  const [adBrand, setBranch] = useState<Ad[]>([]);
  const [adAdvertisement, setAdvertisement] = useState<Ad[]>([]);


  const loadAds = async () => {
    const brand = await getAllBranch();
    setBranch(brand);

    const advertisement = await getAllAdvertisement();
    setAdvertisement(advertisement);
  };

  useEffect(() => {
    loadAds();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />

      <main style={{ flex: 1 }} className="container my-4">

        <CarouselForAds ads={adAdvertisement} id="carouselAdvertisement"  />

        <br></br>
        <br></br>


        <div>
          <h1 className="text-center">
            <strong>
              <Label label={"Pensados para vos"} color={"#2C3E50"} />
              <hr className="border-secondary my-4" />

            </strong>
          </h1>
          <Carousel />
        </div>


        <h1 className="text-center">
          <strong>
            <Label label={"Nuestros Servicios"} color={"#2C3E50"} />
            <hr className="border-secondary my-4" />

          </strong>
        </h1>


        <br></br>


        <HorizontalCard image={testdriveImage} title="TESTDRIVE"
          description="Subite al carro de tus sueños hoy. Agendá tu prueba de manejo en carretera sin compromisos." to="/testdrive"
        />
        <br></br>


        <HorizontalCard image={quotationImage} title="COTIZACIONES"
          description="Solicitá tu cotización personalizada en minutos y descubrí los mejores planes para vos." to="/quotation"
        />
        <br></br>


        <HorizontalCard image={mecanicImage} title="TALLER"
          description="Mantené tu auto como nuevo. Agendá tu cita de taller en línea y elegí tu horario ideal." to="/workshopSchedules"
        />

        <br></br>
        <br></br>


        <h1 className="text-center">
          <strong>
            <Label label={"Nuestras Marcas"} color={"#2C3E50"} />
            <hr className="border-secondary my-4" />

          </strong>
        </h1>
        <CarouselForAds ads={adBrand} id='carouselBranchCar' />



      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default HomePage;