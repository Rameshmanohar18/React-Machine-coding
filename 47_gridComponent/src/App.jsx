import React from 'react';
import { GridItem } from './GridItem';
import { Grid } from './Grid';

export default function App() {
  return (
    <div>
      <h2>Grid Demo</h2>

      {/* 
        Grid Container
        - spacing={1} means gap = 1 * 8px = 8px between items
        - spacing={2} would mean 16px, spacing={3} = 24px, etc.
      */}
      <Grid spacing={1}>
        {/* 
          First GridItem
          - size={4}: Takes 4/12 = 33.33% width on desktop (>600px)
          - sm={12}: Takes 12/12 = 100% width on mobile (<600px)
        */}
        <GridItem size={4} sm={12}>
          <div className='demo-box'>4 cols (12 on mobile)</div>
        </GridItem>

        {/* 
          Second GridItem  
          - size={8}: Takes 8/12 = 66.67% width on desktop
          - sm={12}: Takes 100% width on mobile
          
          Together: 4 + 8 = 12 columns = full width on desktop
          On mobile: Both stack vertically at 100% width
        */}
        <GridItem size={8} sm={12}>
          <div className='demo-box'>8 cols (12 on mobile)</div>
        </GridItem>
      </Grid>
    </div>
  );
}
