"use client";
import React, { useState, useEffect } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";

const Slider = ({ photos }: { photos: string[] }) => {
  const [current, setCurrent] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const length = photos?.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const selectImage = (index: number) => {
    setCurrent(index);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        closeModal();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen]);

  if (!Array.isArray(photos) || photos.length <= 0) {
    return null;
  }

  return (
    <div className="w-full md:w-1/2">
      <section className="relative flex justify-center items-center w-full h-[65vh] md:h-[75vh] overflow-hidden cursor-zoom-in bg-secondary rounded-md">
        <AiOutlineLeft
          className="absolute top-1/2 left-4 text-3xl text-white z-10 bg-black p-2 rounded-full cursor-pointer -translate-y-1/2"
          onClick={prevSlide}
        />
        <AiOutlineRight
          className="absolute top-1/2 right-4 text-3xl text-white z-10 bg-black p-2 rounded-full cursor-pointer -translate-y-1/2"
          onClick={nextSlide}
        />
        {photos.map((photo, index) => {
          return (
            <div className="h-full flex items-center" key={index}>
              {index === current && (
                <motion.img
                  src={photo}
                  alt="image"
                  className="h-full w-full object-cover"
                  layoutId={`expandImage-${index}`}
                  onClick={openModal}
                />
              )}
            </div>
          );
        })}
      </section>
      <section className="flex gap-2 flex-wrap mt-3 no-scrollbar max-w-[700px]">
        {photos.map((photo, index) => {
          return (
            <div
              className="flex"
              key={index}
              onClick={() => selectImage(index)}
            >
              <img
                src={photo}
                className={`h-14 w-14 sm:h-20 sm:w-20 rounded-md object-cover cursor-pointer mr-1 ${
                  current === index ? "border-2 border-primary" : ""
                }`}
              />
            </div>
          );
        })}
      </section>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed flex items-center justify-center z-50 top-0 left-0 w-full h-full bg-black/95"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <span
              className="absolute top-6 right-6 text-primary text-4xl cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                closeModal();
              }}
            >
              &times;
            </span>
            <motion.img
              className="object-cover h-full"
              src={photos[current]}
              alt="Selected"
              layoutId={`expandImage-${current}`}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default Slider;
