import './index.css';
import pollData from './data/pollData';
import PollWidget from './components/PollWidget';

export default function App() {
  return (
    <div className='app'>
      <PollWidget poll={pollData} />
    </div>
  );
}
