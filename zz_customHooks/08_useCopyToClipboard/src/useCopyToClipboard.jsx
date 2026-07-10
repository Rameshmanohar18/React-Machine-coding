// Step 1: useCopyToClipboard func returns [copiedText, copy] — copiedText holds the last copied text, copy is the function to trigger clipboard copy
// Step 2: Create a copiedText state initialized to null
// Step 3: Define an async copy function that accepts a text param
// Step 4: First guard check — if navigator.clipboard is not supported, warn and return false
// Step 5: Inside try block, use navigator.clipboard.writeText(text) to copy text to clipboard, then update copiedText state and return true
// Step 6: Inside catch block, warn with the error and return false
// Step 7: Return [copiedText, copy] so the consumer can trigger copy and also read what was last copied

import { useState } from 'react';

const useCopyToClipboard = () => {
  const [copiedText, setCopiedText] = useState(null);

  const copy = async (text) => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported');
      return false;
    }
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      return true;
    } catch (error) {
      console.warn('Copy failed', error);
      return false;
    }
  };

  return [copiedText, copy];
};

export default useCopyToClipboard;
