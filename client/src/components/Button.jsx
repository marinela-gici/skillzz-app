import React from "react";

const Button = (props) => {
  return (
    <>
      <button
        onClick={props.onClick}
        type={props.type ?? 'button'}
        className={
          (props.background === "pink"
            ? "bg-rose-400 hover:bg-rose-500"
            : "bg-emerald-400 hover:bg-emerald-600") +
          " rounded-md px-6 py-3 text-lg font-semibold text-white shadow-sm mr-2.5"
        }
      >
        {props.value}
      </button>
    </>
  );
};

export default Button;
