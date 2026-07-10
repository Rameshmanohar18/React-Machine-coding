// Step 1: Destructure [copiedText, copy] from useCopyToClipboard hook
// Step 2: Button click triggers copy() with the text to be copied
// Step 3: If copiedText exists (not null), show the copied text as confirmation to the user

import useCopyToClipboard from './useCopyToClipboard';

const MyComponent = () => {
  const [copiedText, copy] = useCopyToClipboard();

  return (
    <div>
      <button onClick={() => copy('YOU HAVE COPIED THIS!!')}>Copy Text</button>
      {copiedText && <span>Copied: {copiedText}</span>}
    </div>
  );
};

export default MyComponent;
