import React from "react";

const page = () => {
  return (
    <div className="bg-[#FCF9EE] pt-32 pb-10 px-8 md:px-16 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary underline">
        Return & Exchange Policy
      </h1>
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-xl">
        <p className="text-lg mb-6">
          <span className="font-semibold">Customer First:</span> At Arfa &
          Maryam's, our customers are our top priority. Our customer care team
          is here to assist you at every step if you wish to exchange your
          purchased item. The help you need is just a click away!
        </p>
        <p className="text-md leading-relaxed mt-4">
          <span className="font-semibold">Domestic Orders:</span> You can
          exchange any item purchased online within 7 days of delivery, provided
          you have proof of purchase. For customers opting for the online
          exchange process, a valid reason for the exchange is required.
        </p>
        <p className="text-md leading-relaxed mt-4">
          <span className="font-semibold">Proof of Purchase:</span> This
          includes either a receipt or the online order confirmation email.
        </p>
        <p className="text-md leading-relaxed mt-4">
          <span className="font-semibold">Conditions for Exchange:</span> Items
          can be exchanged only if they are unused, all tags are intact, the
          packaging is in its original condition, and the original invoice is
          present. Additionally, you must state a valid reason for requesting an
          exchange, such as if the item is defective, the wrong size, or
          incorrect. Items delivered in special packaging, such as the
          unstitched women's collection and semi-formal pieces delivered in
          garment bags, must be returned with their original packaging.
        </p>
        <p className="text-md leading-relaxed mt-4">
          Thank you for choosing Arfa & Maryam's. We value your satisfaction and
          are here to assist you with any questions or concerns regarding your
          order.
        </p>
      </div>
    </div>
  );
};

export default page;
