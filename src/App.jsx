import Header from './components/Header';
import './App.css';
import NotSlide from './components/Slides/NotSlide';
import Slider from './components/Slider';

function App() {
  return (
    <div>
      <div className="app">
        <div className="main">
          <Header />
          <Slider />
        </div>
      </div>
    </div>
  );
}

export default App;
