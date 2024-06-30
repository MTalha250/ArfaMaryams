import React from "react";

const ShippingPolicy: React.FC = () => {
  return (
    <div className="bg-[#FCF9EE] pt-32 pb-10 px-8 md:px-16 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary underline">
        Shipping Policy
      </h1>
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-xl">
        <p className="text-lg mb-6">
          <span className="font-semibold">Pakistan:</span> Up to 3 - 5 working
          days. <br />
          <span className="font-semibold">International:</span> Up to 1 - 2
          weeks.
        </p>
        <p className="text-md leading-relaxed">
          At Arfa & Maryam's, we are committed to providing you with the best
          shopping experience. We understand the excitement of receiving your
          purchase and strive to process and ship your orders as quickly as
          possible. Our dedicated team ensures that your items are carefully
          packaged and dispatched promptly to reach you in perfect condition.
        </p>
        <p className="text-md leading-relaxed mt-4">
          For our customers in Pakistan, we offer a delivery timeframe of up to
          3 - 5 working days. For international orders, delivery can take up to
          1 - 2 weeks, depending on your location and local customs procedures.
        </p>
        <p className="text-md leading-relaxed mt-4">
          Please note that while we aim to meet the estimated delivery times, we
          cannot guarantee them. Delays may occur due to unforeseen
          circumstances with the delivery company or customs processes for
          international orders. Arfa & Maryam's is not responsible for any such
          delays.
        </p>
        <p className="text-md leading-relaxed mt-4">
          If you experience any significant delays or issues with your delivery,
          please contact our customer service team. We are here to assist you
          and ensure that your shopping experience with Arfa & Maryam's is
          smooth and satisfactory.
        </p>
        <p className="text-md leading-relaxed mt-4">
          Thank you for choosing Arfa & Maryam's. We appreciate your business
          and look forward to serving you again.
        </p>
      </div>
    </div>
  );
};

export default ShippingPolicy;
