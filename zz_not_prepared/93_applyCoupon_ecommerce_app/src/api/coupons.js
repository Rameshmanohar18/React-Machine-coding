export const fetchCoupons = async () => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        success: true,
        coupons: [
          {
            id: 'C1',
            code: 'SAVE500',
            discount: 500,
            description: 'Flat ₹500 off on bookings above ₹2000',
          },
          {
            id: 'C2',
            code: 'SAVE1000',
            discount: 1000,
            description: 'Flat ₹1000 off on bookings above ₹4000',
          },
          {
            id: 'C3',
            code: 'WELCOME200',
            discount: 200,
            description: 'Welcome offer – ₹200 off for new users',
          },
          {
            id: 'C4',
            code: 'SUMMER750',
            discount: 750,
            description: 'Summer special – ₹750 off',
          },
        ],
      });
    }, 1000)
  );
};
