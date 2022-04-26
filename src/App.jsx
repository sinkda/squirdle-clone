import Header from './components/Header';
import Game from './components/Game';

function App() {
  return (
    <div className="h-full w-full min-h-screen min-w-screen flex flex-col items-center bg-gray-600 p-6">
      <Header />

      <Game />
    </div>
  );
}

export default App;
