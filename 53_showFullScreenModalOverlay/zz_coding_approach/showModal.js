// ============================================
// STATE MANAGEMENT
// ============================================

// State: isModalOpen → useState(false)
// → Controls modal visibility
// → true: modal visible, false: modal hidden

// ============================================
// FUNCTION LOGIC
// ============================================

// openModal():
// → setModalOpen(true)
// → Shows the modal

// closeModal():
// → setModalOpen(false)
// → Hides the modal

// ============================================
// JSX STRUCTURE
// ============================================

// Main container:
// → <div className='modal-container'>

// Open button:
// → <button onClick={openModal}>Open Modal</button>

// Modal (conditional rendering):
// → {isModalOpen && <div className='modal'>...</div>}
// → Only renders when isModalOpen is true

// Modal structure:
// → Outer div: className='modal' (backdrop/overlay)
// → Inner div: className='modal-content' (white box)
// → Close button: <span className='close' onClick={closeModal}>&times;</span>
// → Content: <p>Modal Content Here...</p>

// ============================================
// CSS KEY FEATURES
// ============================================

// .modal:
// → position: fixed - covers entire viewport
// → z-index: 1 - appears on top
// → width: 100%, height: 100% - full screen overlay
// → background-color: rgba(0,0,0,0.4) - semi-transparent backdrop
// → display: flex + center - centers modal content

// .modal-content:
// → background-color: #fefefe - white background
// → width: 30%, height: 30% - sized modal box
// → box-shadow - elevation effect
// → animation: animatetop - slide down animation

// @keyframes animatetop:
// → from: top: -300px, opacity: 0 (off-screen, invisible)
// → to: top: 0, opacity: 1 (in position, visible)
// → animation-duration: 0.4s

// .close:
// → float: right - positions X in top-right
// → font-size: 28px - large clickable area
// → &times; HTML entity - × symbol
// → :hover changes color to black

// ============================================
// KEY CONCEPTS
// ============================================

// Conditional rendering → {isModalOpen && <div>} shows/hides modal
// &times; HTML entity → × close symbol
// position: fixed → Modal stays in place during scroll
// z-index → Ensures modal appears above other content
// rgba(0,0,0,0.4) → Semi-transparent black backdrop
// CSS animation → Smooth slide-down entrance effect
// float: right → Position close button in top-right corner
// Overlay pattern → Full-screen backdrop with centered content
// Boolean state toggle → Simple open/close mechanism