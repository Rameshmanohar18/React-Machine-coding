import Tooltip from './Tooltip';

function TooltipDemo() {
  return (
    <div className='demo-container'>
      <h1>Tooltip Component Demo</h1>

      {/* Position Examples */}
      <section className='demo-section'>
        <h2>Positioning (Hover Trigger)</h2>
        <div className='position-grid'>
          <Tooltip content='This is a top tooltip' position='top'>
            <button className='demo-button'>Top</button>
          </Tooltip>

          <Tooltip content='This is a bottom tooltip' position='bottom'>
            <button className='demo-button'>Bottom</button>
          </Tooltip>

          <Tooltip content='This is a left tooltip' position='left'>
            <button className='demo-button'>Left</button>
          </Tooltip>

          <Tooltip content='This is a right tooltip' position='right'>
            <button className='demo-button'>Right</button>
          </Tooltip>
        </div>
      </section>

      {/* Trigger Examples */}
      <section className='demo-section'>
        <h2>Trigger Types</h2>
        <div className='trigger-grid'>
          <Tooltip content='Hover over me!' trigger='hover' position='top'>
            <button className='demo-button'>Hover</button>
          </Tooltip>

          <Tooltip content='Click me to toggle!' trigger='click' position='top'>
            <button className='demo-button'>Click</button>
          </Tooltip>

          <Tooltip content='Focus on me!' trigger='focus' position='top'>
            <input
              type='text'
              placeholder='Focus trigger'
              className='demo-input'
            />
          </Tooltip>
        </div>
      </section>
    </div>
  );
}

export default TooltipDemo;
