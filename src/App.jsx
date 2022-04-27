import Header from './components/Header';
import Game from './components/Game';
import Footer from './components/Footer';

function App() {
  return (
    <div className="h-full w-full min-h-screen min-w-screen flex flex-col items-center p-6">
      <Header />

      <Game />

      <Footer />
    </div>
  );
}

export default App;
