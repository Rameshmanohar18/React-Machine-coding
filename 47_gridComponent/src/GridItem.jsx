import React, { useContext } from 'react';
import { useMediaQuery } from './useMediaQuery';
import { GridContext } from './Grid';

export const GridItem = ({ children, size = 12, sm }) => {
  /**
   * Get gap from Grid's Context
   * - Grid calculates gap from spacing prop
   * - We need gap to subtract from width calculation
   */
  const { gap } = useContext(GridContext);

  /**
   * Check if screen is mobile (<600px)
   * - useMediaQuery returns true/false based on screen width
   * - Re-renders component when screen size crosses 600px
   */
  const isSmall = useMediaQuery('(max-width: 600px)');

  /**
   * Responsive Column Selection
   *
   * Logic: Use 'sm' columns if:
   *   1. Screen is small (< 600px) AND
   *   2. 'sm' prop was provided (not undefined)
   * Otherwise: Use default 'size' columns
   *
   * Examples:
   *   - size={4} sm={12} on desktop → cols = 4
   *   - size={4} sm={12} on mobile  → cols = 12
   *   - size={6} (no sm) on mobile  → cols = 6 (size used as fallback)
   */
  const cols = isSmall && sm !== undefined ? sm : size;

  /**
   * Width Percentage Calculation
   *
   * 12-column system means each column = 100% / 12 = 8.33%
   *
   * Examples:
   *   - cols=12 → (12/12) * 100 = 100%  (full width)
   *   - cols=6  → (6/12) * 100  = 50%   (half width)
   *   - cols=4  → (4/12) * 100  = 33.33% (one-third)
   *   - cols=3  → (3/12) * 100  = 25%   (quarter)
   */
  const width = (cols / 12) * 100;

  /**
   * Dynamic Style Calculation
   *
   * These styles must be inline because they depend on:
   *   1. 'width' - calculated from cols prop
   *   2. 'gap' - received from Grid via Context
   */
  const dynamicStyle = {
    /**
     * Width with Gap Subtraction
     *
     * WHY subtract gap?
     * - Item has margin on left AND right (gap/2 each side = gap total)
     * - If we don't subtract, items would overflow their row
     *
     * EXAMPLE: Two 50% items with 8px gap
     *   Without subtraction: 50% + 50% + margins = overflow!
     *   With subtraction: calc(50% - 8px) + calc(50% - 8px) + margins = perfect fit
     *
     * FORMULA: calc(percentage - gap)
     *   - percentage: How much of 12 columns this item takes
     *   - gap: Total horizontal margin (left + right = gap/2 + gap/2)
     */
    width: `calc(${width}% - ${gap}px)`,

    /**
     * Margin for Spacing
     *
     * Each item gets gap/2 on ALL sides:
     *   - Between two items: gap/2 + gap/2 = gap (correct spacing!)
     *   - At edges: Cancelled by Grid's negative margin
     */
    margin: `${gap / 2}px`,
  };

  return (
    <div className='grid-item' style={dynamicStyle}>
      {children}
    </div>
  );
};
