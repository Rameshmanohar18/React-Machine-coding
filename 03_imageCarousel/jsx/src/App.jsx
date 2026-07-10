import { slides } from '../data/carouselData';
import './App.css';
import { Carousel } from './components/Carousel';
function App() {
  return (
    <div className='App'>
      <Carousel data={slides} />
    </div>
  );
}

export default App;
