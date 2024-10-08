import React, { useState } from "react";
import { FaStar, FaRegStar, FaEdit, FaTrashAlt } from "react-icons/fa";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Review {
  name: string;
  email: string;
  rating: number;
  title: string;
  review: string;
  created_at: string;
}

interface ReviewsProps {
  reviews: Review[];
  userEmail: string;
  onSubmitReview: (review: Partial<Review>) => void;
  onDeleteReview: (index: number) => void;
  className?: string;
}

const Reviews: React.FC<ReviewsProps> = ({
  reviews,
  userEmail,
  onSubmitReview,
  onDeleteReview,
  className = "",
}) => {
  const { data } = useSession();
  const user = data?.user;
  const router = useRouter();
  const [hover, setHover] = useState<number>(-1);
  const [review, setReview] = useState<Partial<Review>>({
    rating: 0,
    title: "",
    review: "",
  });

  const labels: { [key: number]: string } = {
    1: "Useless",
    2: "Poor",
    3: "Ok",
    4: "Good",
    5: "Excellent",
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setReview((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (review.rating === 0 || review.title === "" || review.review === "") {
      toast.error("Please fill all the fields");
      return;
    }
    onSubmitReview(review);
    setReview({ rating: 0, title: "", review: "" });
  };

  const renderStars = (value: number, readOnly = false) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= value) {
        stars.push(
          <FaStar
            key={i}
            onMouseEnter={() => !readOnly && setHover(i)}
            onMouseLeave={() => !readOnly && setHover(-1)}
            onClick={() => !readOnly && setReview({ ...review, rating: i })}
            style={{ cursor: readOnly ? "default" : "pointer" }}
            className="text-primary"
          />
        );
      } else {
        stars.push(
          <FaRegStar
            key={i}
            onMouseEnter={() => !readOnly && setHover(i)}
            onMouseLeave={() => !readOnly && setHover(-1)}
            onClick={() => !readOnly && setReview({ ...review, rating: i })}
            style={{ cursor: readOnly ? "default" : "pointer" }}
            className="text-primary"
          />
        );
      }
    }
    return stars;
  };

  return (
    <div
      className={`py-6 px-3 md:p-10 w-full border border-gray-500 min-h-[30vh] ${className}`}
    >
      <h1
        className=" 
        text-2xl font-bold text-gray-800 mb-5"
      >
        Reviews
      </h1>
      {!user && (
        <p className="text-sm text-center text-gray-500">
          Please{" "}
          <button
            onClick={() => router.push("/login")}
            className="text-primary underline"
          >
            login
          </button>{" "}
          to write a review
        </p>
      )}
      <Accordion type="multiple">
        <AccordionItem value="write-review">
          <AccordionTrigger
            disabled={!user}
            className="border-b border-gray-500 w-full flex flex-col sm:flex-row justify-between p-3"
          >
            <div className="mb-3 sm:mb-0 flex items-center w-full">
              <div className="flex">
                {renderStars(
                  reviews.length > 0
                    ? reviews.reduce((s, r) => (s = s + r.rating), 0) /
                        reviews.length
                    : 0,
                  true
                )}
              </div>
              <span className="ml-2">({reviews.length})</span>
            </div>
            <button className="text-sm py-1.5 px-2.5 bg-secondary text-white flex items-center gap-2 shrink-0 mx-2">
              <FaEdit /> Write a Review
            </button>
          </AccordionTrigger>
          <AccordionContent>
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="flex flex-col border-b border-gray-500"
            >
              <h2 className="font-bold text-lg my-3">Your Review</h2>
              <p>
                <span className="text-red-500">*</span> Score
              </p>
              <div className="flex items-center mb-3">
                <div className="flex">{renderStars(review.rating || 0)}</div>
                {review.rating !== null && (
                  <span className="ml-2">
                    {labels[hover !== -1 ? hover : review.rating || 0]}
                  </span>
                )}
              </div>
              <label htmlFor="title">
                <span className="text-red-500">*</span> Title:
              </label>
              <input
                type="text"
                className="font-bold w-full border border-black p-2 mb-3"
                id="title"
                name="title"
                value={review.title || ""}
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="review">
                <span className="text-red-500">*</span> Review:
              </label>
              <textarea
                className="w-full border border-black p-2 mb-3"
                id="review"
                name="review"
                rows={3}
                value={review.review || ""}
                onChange={(e) => handleChange(e)}
              />

              <button className="mb-5 ml-auto flex justify-center border py-1 border-black bg-transparent text-white  dark:border-white relative group transition duration-200">
                <div className="absolute bottom-0 right-0 bg-primary h-full w-full group-hover:scale-x-90 group-hover:scale-y-75 transition-all duration-200" />
                <span className="relative text-sm font-semibold py-1 px-2 tracking-wider">
                  Post
                </span>
              </button>
            </form>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="sm:p-2 my-5">
        {reviews.length > 0 ? (
          reviews
            .sort(
              (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
            )
            .map((d, i) => (
              <div
                className="w-full border-b border-black py-3 group flex gap-2"
                key={i}
              >
                <span className="shrink-0 text-center leading-10 font-bold text-white h-10 w-10 bg-primary rounded-full mt-1">
                  {d.name.slice(0, 1)}
                </span>
                <div className="w-full flex flex-col space-y-0.5">
                  <h2 className="flex justify-between font-bold text-primary">
                    <span>{d.name}</span>
                    <span className="text-gray-500 text-xs">
                      {d.created_at.slice(0, 10).split("-").reverse().join("-")}
                    </span>
                  </h2>
                  <div className="items-center w-full flex justify-between">
                    <div className="flex">{renderStars(d.rating, true)}</div>
                    {d.email === userEmail && (
                      <button
                        className="text-gray-500 invisible group-hover:visible"
                        onClick={() => onDeleteReview(i)}
                      >
                        <FaTrashAlt />
                      </button>
                    )}
                  </div>
                  <h3 className="font-semibold">{d.title}</h3>
                  <p className="font-light text-sm">{d.review}</p>
                </div>
              </div>
            ))
        ) : (
          <p className="text-sm text-center text-gray-500">
            No reviews yet. Be the first one to write a review!
          </p>
        )}
      </div>
    </div>
  );
};

export default Reviews;
