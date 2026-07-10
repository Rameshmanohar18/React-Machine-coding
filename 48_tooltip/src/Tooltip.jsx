import { useState, useRef, useEffect } from 'react';

function Tooltip({ 
  children, 
  content, 
  position = 'top',
  trigger = 'hover'
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState({});
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);

  // Calculate tooltip position
  useEffect(() => {
    if (isVisible && triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      
      let top = 0;
      let left = 0;

      switch (position) {
        case 'top':
          top = triggerRect.top - tooltipRect.height - 8;
          left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
          break;
        case 'bottom':
          top = triggerRect.bottom + 8;
          left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
          break;
        case 'left':
          top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
          left = triggerRect.left - tooltipRect.width - 8;
          break;
        case 'right':
          top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
          left = triggerRect.right + 8;
          break;
        default:
          break;
      }

      setTooltipStyle({
        top: `${top}px`,
        left: `${left}px`
      });
    }
  }, [isVisible, position]);

  // Show tooltip
  const showTooltip = () => {
    setIsVisible(true);
  };

  // Hide tooltip
  const hideTooltip = () => {
    setIsVisible(false);
  };

  // Toggle tooltip (for click trigger)
  const toggleTooltip = () => {
    setIsVisible(prev => !prev);
  };

  // Handle click outside (for click trigger)
  useEffect(() => {
    if (trigger === 'click' && isVisible) {
      const handleClickOutside = (e) => {
        if (
          triggerRef.current && 
          !triggerRef.current.contains(e.target) &&
          tooltipRef.current &&
          !tooltipRef.current.contains(e.target)
        ) {
          hideTooltip();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [trigger, isVisible]);

  // Event handlers based on trigger type
  const getEventHandlers = () => {
    switch (trigger) {
      case 'hover':
        return {
          onMouseEnter: showTooltip,
          onMouseLeave: hideTooltip
        };
      case 'click':
        return {
          onClick: toggleTooltip
        };
      case 'focus':
        return {
          onFocus: showTooltip,
          onBlur: hideTooltip
        };
      default:
        return {};
    }
  };

  return (
    <>
      <span 
        ref={triggerRef}
        className="tooltip-trigger"
        {...getEventHandlers()}
      >
        {children}
      </span>

      {isVisible && (
        <div
          ref={tooltipRef}
          className={`tooltip tooltip-${position}`}
          style={tooltipStyle}
        >
          {content}
          <div className={`tooltip-arrow tooltip-arrow-${position}`} />
        </div>
      )}
    </>
  );
}

export default Tooltip;