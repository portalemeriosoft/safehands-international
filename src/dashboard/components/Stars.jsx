import React from "react";
import { StarIcon } from "@heroicons/react/24/solid";

const Stars = ({ count }) => {
  const elementsArray = Array.from({ length: 5 }, (_, index) =>
    index < count ? (
      <StarIcon key={index} className="inline w-5 h-5 text-yellow-300" />
    ) : (
      <StarIcon key={index} className="inline w-5 h-5 text-stone-200" />
    )
  );

  return elementsArray;
};

export default Stars;
