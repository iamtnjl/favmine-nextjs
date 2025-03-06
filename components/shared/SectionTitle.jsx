import React from "react";

const SectionTitle = ({ title, className }) => {
  return (
    <p className={`${className} text-gray-800 text-2xl font-medium`}>{title}</p>
  );
};

export default SectionTitle;
