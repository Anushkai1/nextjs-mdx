import React from "react";

export default function CustomButton() {
  return (
    <button
      className='bg-blue-600 text-white p-4 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed '
    >
   Click me
    </button>
  );
}
