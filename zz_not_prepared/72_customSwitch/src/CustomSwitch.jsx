import React, { Children, isValidElement } from "react";

// CustomCase - marker component, logic handled by CustomSwitch
const CustomCase = ({ children }) => children;

// DefaultCase - marker component for fallback
const DefaultCase = ({ children }) => children;

// CustomSwitch - evaluates and renders matching case
const CustomSwitch = ({ value, children }) => {
  let matchedChild = null;
  let defaultChild = null;

  // Children.forEach - Iterates React children safely, handles arrays/fragments
  Children.forEach(children, (child) => {
    // isValidElement - Filters out null, undefined, strings
    if (!isValidElement(child)) return;

    // Store DefaultCase for fallback
    if (child.type === DefaultCase) {
      defaultChild = child.props.children;
      return;
    }

    // Skip if already matched (first match wins)
    if (matchedChild !== null) return;

    if (child.type === CustomCase) {
      const caseValue = child.props.value;

      // Function case - evaluate with switch value
      if (typeof caseValue === "function") {
        if (caseValue(value)) {
          matchedChild = child.props.children;
        }
      }
      // Primitive case - loose equality comparison
      // eslint-disable-next-line eqeqeq
      else if (caseValue == value) {
        matchedChild = child.props.children;
      }
    }
  });

  // Nullish coalescing - ?? returns default only when match is null/undefined
  return matchedChild ?? defaultChild;
};

export { CustomSwitch, CustomCase, DefaultCase };
