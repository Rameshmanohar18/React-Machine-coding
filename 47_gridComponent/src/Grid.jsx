import React, { createContext } from 'react';

/**
 * GridContext - Shares gap value from Grid to all GridItems
 *
 * Why Context?
 * - Grid calculates the gap, GridItems need it for width calculation
 * - Without context, we'd have to manually pass gap to each GridItem
 * - Context allows any nested GridItem to access gap automatically
 *
 * Default { gap: 0 } is fallback if GridItem is used outside Grid
 */
export const GridContext = createContext({ gap: 0 });

export const Grid = ({ children, spacing = 0 }) => {
  /**
   * Gap Calculation
   * - Uses 8px as base unit (industry standard from Material Design)
   * - spacing=1 → 8px, spacing=2 → 16px, spacing=3 → 24px
   * - This creates consistent spacing scale across the app
   */
  const gap = spacing * 8;

  /**
   * The Negative Margin Technique (KEY CONCEPT!)
   *
   * PROBLEM:
   * - Each GridItem has margin on ALL sides for spacing
   * - This creates unwanted padding at container edges
   *
   * EXAMPLE with gap=8px:
   * ┌─────────────────────────────────────┐
   * │ 4px │ [Item 1] │ 4px 4px │ [Item 2] │ 4px │  ← Extra 4px at edges!
   * └─────────────────────────────────────┘
   *
   * SOLUTION:
   * - Container has negative margin: -4px (pulls edges inward)
   * - Container width increases: calc(100% + 8px) (compensates)
   * - Result: Items align flush with parent edges
   *
   * AFTER FIX:
   * ┌─────────────────────────────────────┐
   * │[Item 1] │ 4px 4px │ [Item 2]        │  ← Clean edges!
   * └─────────────────────────────────────┘
   */
  const dynamicStyle = {
    // Negative margin = half of gap (cancels item's edge margins)
    margin: `-${gap / 2}px`,

    // Expand width to compensate for negative margins
    // Without this, content would shrink by gap amount
    width: `calc(100% + ${gap}px)`,
  };

  return (
    // Pass gap to all children via Context
    <GridContext.Provider value={{ gap }}>
      {/* 
        Wrapper div with overflow:hidden
        - Negative margins extend beyond parent boundary
        - This can cause horizontal scrollbar
        - overflow:hidden clips the overflow, preventing scrollbar
      */}
      <div className='grid-wrapper'>
        {/* 
          Container with flexbox
          - flex-wrap: wrap allows items to flow to next row
          - Dynamic styles apply the negative margin technique
        */}
        <div className='grid-container' style={dynamicStyle}>
          {children}
        </div>
      </div>
    </GridContext.Provider>
  );
};
