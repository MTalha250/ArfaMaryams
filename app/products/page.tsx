import React from "react";
import Card from "@/components/card";
const page = () => {
  return (
    <div className="pt-32 px-8 md:px-16">
      <h1 className="font-bold text-3xl">Products</h1>
      <div className="grid grid-cols-4 gap-10 my-10">
        <Card
          id="1"
          img="https://via.placeholder.com/150"
          img2="https://via.placeholder.com/150"
          img3="https://via.placeholder.com/150"
          img4="https://via.placeholder.com/150"
          name="Product 1"
          price={100}
        />
        <Card
          id="1"
          img="https://via.placeholder.com/150"
          img2="https://via.placeholder.com/150"
          img3="https://via.placeholder.com/150"
          img4="https://via.placeholder.com/150"
          name="Product 1"
          price={100}
        />
        <Card
          id="1"
          img="https://via.placeholder.com/150"
          img2="https://via.placeholder.com/150"
          img3="https://via.placeholder.com/150"
          img4="https://via.placeholder.com/150"
          name="Product 1"
          price={100}
        />
        <Card
          id="1"
          img="https://via.placeholder.com/150"
          img2="https://via.placeholder.com/150"
          img3="https://via.placeholder.com/150"
          img4="https://via.placeholder.com/150"
          name="Product 1"
          price={100}
        />
      </div>
    </div>
  );
};

export default page;
