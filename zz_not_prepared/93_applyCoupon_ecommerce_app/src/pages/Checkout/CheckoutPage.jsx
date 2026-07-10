import React, { useState } from 'react';
import styles from './CheckoutPage.module.css';
import CouponModal from '../../components/CouponModal/CouponModal';

const CheckoutPage = () => {
  // ── PRE-EXISTING: Booking data ─────────────────────────────────────────────
  const booking = {
    hotel: 'The Oberoi Grand',
    location: 'Kolkata, India',
    checkIn: '2025-03-10',
    checkOut: '2025-03-13',
    nights: 3,
    pricePerNight: 4500,
    taxes: 810,
  };

  const basePrice = booking.pricePerNight * booking.nights;
  // ── END PRE-EXISTING ───────────────────────────────────────────────────────

  // ── IMPLEMENTED: State to track which coupon is applied and modal open state
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // ── END IMPLEMENTED ────────────────────────────────────────────────────────

  // ── IMPLEMENTED: Derive discount + final total from applied coupon ─────────
  // When a coupon is applied, subtract its discount from base + taxes.
  // When no coupon, discount is 0 so total remains unchanged.
  const discount = appliedCoupon ? appliedCoupon.discount : 0;
  const totalPrice = basePrice + booking.taxes - discount;
  // ── END IMPLEMENTED ────────────────────────────────────────────────────────

  return (
    <div className={styles.page}>
      <div className={styles.pageInner}>
        <h1 className={styles.pageTitle}>Checkout</h1>

        <div className={styles.grid}>

          {/* ── PRE-EXISTING: Booking Summary Card ────────────────────────── */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Booking Summary</h2>
            <div className={styles.hotelInfo}>
              <div className={styles.hotelIcon}>🏨</div>
              <div>
                <p className={styles.hotelName}>{booking.hotel}</p>
                <p className={styles.hotelLocation}>📍 {booking.location}</p>
              </div>
            </div>
            <div className={styles.divider} />
            <div className={styles.row}>
              <span className={styles.label}>Check-in</span>
              <span className={styles.value}>{booking.checkIn}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Check-out</span>
              <span className={styles.value}>{booking.checkOut}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Duration</span>
              <span className={styles.value}>{booking.nights} nights</span>
            </div>
          </div>
          {/* ── END PRE-EXISTING ──────────────────────────────────────────── */}

          {/* ── PRE-EXISTING: Price Details Card ──────────────────────────── */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Price Details</h2>
            <div className={styles.row}>
              <span className={styles.label}>
                ₹{booking.pricePerNight} × {booking.nights} nights
              </span>
              <span className={styles.value}>₹{basePrice.toLocaleString()}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Taxes & Fees</span>
              <span className={styles.value}>₹{booking.taxes.toLocaleString()}</span>
            </div>
            {/* ── END PRE-EXISTING ────────────────────────────────────────── */}

            {/* ── IMPLEMENTED: Show applied coupon row with remove option ───
                Conditionally renders only when a coupon has been applied.
                Displays the coupon code, discount amount, and a Remove button
                that clears the applied coupon and restores the original total. */}
            {appliedCoupon && (
              <div className={`${styles.row} ${styles.discountRow}`}>
                <span className={styles.discountLabel}>
                  🏷 {appliedCoupon.code}
                  <button
                    className={styles.removeBtn}
                    onClick={() => setAppliedCoupon(null)}
                  >
                    Remove
                  </button>
                </span>
                <span className={styles.discountValue}>
                  − ₹{discount.toLocaleString()}
                </span>
              </div>
            )}
            {/* ── END IMPLEMENTED ─────────────────────────────────────────── */}

            <div className={styles.divider} />

            {/* ── PRE-EXISTING: Total row ────────────────────────────────── */}
            <div className={`${styles.row} ${styles.totalRow}`}>
              <span className={styles.totalLabel}>Total</span>
              {/* ── IMPLEMENTED: totalPrice now reflects coupon discount ─── */}
              <span className={styles.totalValue}>
                ₹{totalPrice.toLocaleString()}
              </span>
            </div>
            {/* ── END PRE-EXISTING ────────────────────────────────────────── */}

            {/* ── PRE-EXISTING: Apply Coupon button was already in codebase ─
                IMPLEMENTED: Added onClick → setIsModalOpen(true) to open modal */}
            <button
              className={styles.couponBtn}
              onClick={() => setIsModalOpen(true)}
            >
              🏷 {appliedCoupon ? 'Change Coupon' : 'Apply Coupon'}
            </button>

            {/* ── PRE-EXISTING: Pay button ───────────────────────────────── */}
            {/* ── IMPLEMENTED: totalPrice passed here reflects discount too  */}
            <button className={styles.payBtn}>
              Pay ₹{totalPrice.toLocaleString()}
            </button>
            {/* ── END PRE-EXISTING ────────────────────────────────────────── */}

          </div>
        </div>
      </div>

      {/* ── PRE-EXISTING: CouponModal already existed in the codebase ─────────
          IMPLEMENTED: Wired up isOpen, onClose, onApply, appliedCoupon props
          so the modal can open, fetch coupons, apply selection, and update price */}
      <CouponModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onApply={(coupon) => setAppliedCoupon(coupon)}
        appliedCoupon={appliedCoupon}
      />
      {/* ── END ───────────────────────────────────────────────────────────── */}

    </div>
  );
};

export default CheckoutPage;