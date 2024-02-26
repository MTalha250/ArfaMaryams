import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="py-10 px-8 md:px-32">
        <div className="flex flex-wrap justify-between gap-8">
          <div className="max-w-[450px]">
            <h3 className="text-xl font-bold mb-2 tracking-wider uppercase">
              <span className="bg-primary px-2"> Sign Up!</span>
            </h3>
            <p className="font-light md:block hidden text-xs mt-2">
              Get regular updates on the latest Forex news, trading tips, and
              strategies. We also offer a free Forex trading course to help you
              get started.
            </p>
            <form className="flex mt-4 flex-col sm:flex-row sm:items-end">
              <button
                type="submit"
                className="py-2 px-6 border whitespace-nowrap border-transparent text-sm font-medium rounded-full text-black bg-white"
              >
                Sign up for our E-Newsletter
              </button>
            </form>
            <div className="flex justify-center space-x-3 mt-6 w-1/2">
              <a
                href="https://www.facebook.com/profile.php?id=61555189419994"
                target="_blank"
              >
                <FaFacebookF className="text-black bg-white rounded-full p-2 text-4xl cursor-pointer" />
              </a>
              <a
                href="https://www.instagram.com/ezifx_official?igsh=MTc4bjd2OWluZGZoOQ=="
                target="_blank"
              >
                <FaInstagram className="text-black bg-white rounded-full p-2 text-4xl cursor-pointer" />
              </a>
              <a href="https://www.linkedin.com/company/ezifx/" target="_blank">
                <FaLinkedin className="text-black bg-white rounded-full p-2 text-4xl cursor-pointer" />
              </a>
            </div>
          </div>

          <div className="max-w-[280px]">
            <h3 className="text-xl font-bold tracking-wider uppercase">
              <span className="bg-primary px-2 ">Contact</span> Us
            </h3>
            <ul className="mt-4 text-sm space-y-2">
              <li>
                <FaPhone className="rotate-90  inline mr-2" /> +1 800-555-5555
              </li>
              <li>
                <FaEnvelope className="inline   mr-2" />
                <a href="mailto:info@ezifx.com"> info@ezifx.com</a>
              </li>
              <li>
                <FaWhatsapp className="inline text-lg mr-2 " />
                <a href="https://wa.me/1234s567890"> +1 800-555-5555</a>
              </li>
              <li>
                <FaMapMarkerAlt className="inline mr-2  text-lg" />
                <a href="">
                  Registered Address: Ground Floor, The Sotheby Building,
                  Rodney, Grosistet, St. Lucia
                </a>
              </li>
              <li>
                <FaMapMarkerAlt className="inline mr-2  text-lg" />
                <a href="">
                  Physical Address: Sabha Build, Jabel Ali Industrial 1st., P,O
                  Box: 838, Dubai, United Arab Emirates.
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold tracking-wider uppercase">
              <span className=" bg-primary px-2">Account</span> Types
            </h3>
            <ul className="mt-4 text-sm space-y-2 flex flex-col">
              <Link href={"/login"}>Live Trading Account</Link>
              <Link href={"/login"}>Classic Account</Link>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold tracking-wider uppercase">
              <span className="bg-primary px-2">Company</span>
            </h3>
            <ul className="mt-4 space-y-2 text-sm flex flex-col">
              <Link href={"/about-us"}>About Us</Link>
              <Link href={"/company"}>Our Company</Link>
              <Link href={"/contact"}>Contact Us</Link>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <div className="border-y-2 bg-primary text-black text-center py-2">
          <p>© 2024 Coderush. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
