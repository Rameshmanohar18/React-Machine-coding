import React, { useState, useEffect, useRef } from 'react';
import styles from './CouponModal.module.css';
import { fetchCoupons } from '../../api/coupons';

// ── PRE-EXISTING: Component signature and props were already defined ───────────
const CouponModal = ({ isOpen, onClose, onApply, appliedCoupon }) => {
  // ── IMPLEMENTED: State for async coupon data ─────────────────────────────
  // coupons   → list returned from the API
  // loading   → shows spinner while API call is in-flight
  // error     → shows error message if API call fails
  // selected  → tracks which coupon the user has clicked inside the modal
  //             initialized with appliedCoupon so re-opening pre-selects it
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(appliedCoupon || null);
  // ── END IMPLEMENTED ────────────────────────────────────────────────────────

  // ── PRE-EXISTING: ref was already attached to the modal div ───────────────
  const modalRef = useRef(null);
  // ── END PRE-EXISTING ──────────────────────────────────────────────────────

  // ── IMPLEMENTED: Fetch coupons from API when modal opens ──────────────────
  // API contract: GET /api/coupons → { success: boolean, coupons: Coupon[] }
  // Only triggers when isOpen flips to true, not on every render.
  useEffect(() => {
    if (!isOpen) return;

    const loadCoupons = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchCoupons();
        if (data.success) setCoupons(data.coupons);
        else setError('Failed to load coupons.');
      } catch {
        setError('Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadCoupons();
  }, [isOpen]);
  // ── END IMPLEMENTED ────────────────────────────────────────────────────────

  // ── PRE-EXISTING: Outside click handler structure was already present ──────
  // IMPLEMENTED: Fixed the event bubbling bug — the click that opens the modal
  // in CheckoutPage bubbles up to document and immediately fires this handler,
  // closing the modal instantly. Fix: wrap addEventListener in setTimeout(0)
  // so it registers AFTER the opening click finishes bubbling.
  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener('click', handleOutsideClick);
    }, 0); // ← KEY FIX: skip the click that triggered modal open

    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen, onClose]);
  // ── END PRE-EXISTING / IMPLEMENTED ────────────────────────────────────────

  // ── PRE-EXISTING: Escape key handler was already present ──────────────────
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);
  // ── END PRE-EXISTING ──────────────────────────────────────────────────────

  if (!isOpen) return null;

  // ── IMPLEMENTED: Apply handler — lifts coupon to CheckoutPage, then closes
  // onApply(selected) → updates appliedCoupon state in CheckoutPage
  //                  → triggers totalPrice recalculation automatically
  // onClose()        → hides the modal after applying
  const handleApply = () => {
    if (selected) {
      onApply(selected);
      onClose();
    }
  };
  // ── END IMPLEMENTED ────────────────────────────────────────────────────────

  return (
    <div className={styles.overlay}>
      <div ref={modalRef} className={styles.modal}>
        {/* ── PRE-EXISTING: Modal header with close button ────────────────── */}
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Available Coupons</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>
        {/* ── END PRE-EXISTING ────────────────────────────────────────────── */}

        <div className={styles.modalBody}>
          {/* ── IMPLEMENTED: Loading state while API call is in-flight ─────── */}
          {loading && (
            <div className={styles.centered}>
              <div className={styles.spinner} />
              <p className={styles.loadingText}>Fetching coupons...</p>
            </div>
          )}
          {/* ── END IMPLEMENTED ─────────────────────────────────────────────── */}

          {/* ── IMPLEMENTED: Error state if API call fails ────────────────── */}
          {error && !loading && <div className={styles.errorBox}>{error}</div>}
          {/* ── END IMPLEMENTED ─────────────────────────────────────────────── */}

          {/* ── IMPLEMENTED: Render coupon list returned from API ─────────────
              Each card is clickable → updates `selected` state.
              Highlights the selected card using couponCardSelected CSS class.
              Radio circle fills to give visual confirmation of selection. */}
          {!loading &&
            !error &&
            coupons.map((coupon) => {
              const isSelected = selected?.id === coupon.id;
              return (
                <div
                  key={coupon.id}
                  className={`${styles.couponCard} ${
                    isSelected ? styles.couponCardSelected : ''
                  }`}
                  onClick={() => setSelected(coupon)}
                >
                  <div className={styles.couponLeft}>
                    <span className={styles.couponCode}>{coupon.code}</span>
                    <span className={styles.couponDesc}>
                      {coupon.description}
                    </span>
                  </div>
                  <div className={styles.couponRight}>
                    <span className={styles.couponDiscount}>
                      ₹{coupon.discount} OFF
                    </span>
                    <div
                      className={`${styles.radioCircle} ${
                        isSelected ? styles.radioCircleSelected : ''
                      }`}
                    >
                      {isSelected && <div className={styles.radioDot} />}
                    </div>
                  </div>
                </div>
              );
            })}
          {/* ── END IMPLEMENTED ─────────────────────────────────────────────── */}
        </div>

        {/* ── IMPLEMENTED: Footer with Apply button ─────────────────────────
            Stays hidden while loading or on error (no coupons to apply).
            Button is disabled until user selects a coupon.
            Label updates dynamically to show discount amount once selected. */}
        {!loading && !error && (
          <div className={styles.modalFooter}>
            <button
              className={styles.applyBtn}
              onClick={handleApply}
              disabled={!selected}
            >
              {selected ? `Apply ₹${selected.discount} OFF` : 'Select a Coupon'}
            </button>
          </div>
        )}
        {/* ── END IMPLEMENTED ─────────────────────────────────────────────── */}
      </div>
    </div>
  );
};

export default CouponModal;
