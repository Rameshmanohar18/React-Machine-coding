### Summary of Changes:

1. **PropTypes to TypeScript Interfaces**:
    - Removed all `PropTypes` usage and replaced it with TypeScript interfaces for type checking.
    - In `Carousel.tsx`, I defined an interface `CarouselProps` to specify the structure of the `data` prop.
    - In `CarouselItem.tsx`, I defined an interface `CarouselItemProps` for the `src`, `alt`, and `isActive` props.

2. **JSX to TSX Conversion**:
    - Changed file extensions from `.jsx` to `.tsx`.

3. **Type Annotations**:
    - Explicitly typed React components with `React.FC<PropsType>` to ensure that component props are correctly typed.

4. **Type Assertion**:
    - Used `as HTMLElement` in `ReactDOM.createRoot(document.getElementById('root'))` to ensure TypeScript correctly identifies the type of the `root` element.

