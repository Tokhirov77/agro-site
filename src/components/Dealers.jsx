import Dealers from './components/Dealers'; // Файлга йўл

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Products />
      
      {/* МАНА ШУ ЕРГА ҚЎШИНГ */}
      <div id="dealers">
        <Dealers lang={lang} />
      </div>

      <Contact />
      <Footer />
    </div>
  );
}