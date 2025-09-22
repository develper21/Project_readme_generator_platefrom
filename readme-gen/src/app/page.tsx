import Topbar from "./components/Topbar";
import Footer from "./components/Footer";
import Page from "./dashboard/page";
import ContentSection from "./components/ContentSection";
import TermServices from "./Term&Services/page";
import PrivacyPolicy from "./PrivacyPolicy/page";
import ProjectsSection from "./components/ProjectSection";
import Setting from "./components/Setting";

export default function Home() {
  return (
    <>
      <Topbar />
      <ContentSection />
      <Footer />
      {/* <Page /> */}
      {/* <TermServices /> */}
      {/* <PrivacyPolicy /> */}
      {/* <ProjectsSection /> */}
      {/* <Setting /> */}
    </>
  );
}
