import PublisherComponent from "../components/PublisherComponent";
import SubscriberComponent from "../components/SubscriberComponent";

function App() {
  return (
    <div>
      <h2>Event Emitter Demo</h2>
      {/* No shared state, no prop drilling, no Redux */}
      <PublisherComponent />
      <SubscriberComponent />
    </div>
  );
}

export default App;
