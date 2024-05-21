import Header from "../../widgets/layout/header";
import Clients from "./components/clients";
import Hero from "./components/hero";
import OurMission from "./components/ourMission";
import OurTools from "./components/ourTools";
import Testmonials from "./components/testmonials";

function Home() {
  return (
    <>
      <Header />
      <Hero />
      <div className="xl:container mx-auto">
        <OurMission />
        <OurTools />
        <Testmonials />
        <Clients />
      </div>
    </>
  );
}

export default Home;
