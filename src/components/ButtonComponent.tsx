import React from "react";
import indexClasses from "../index.module.css";

interface buttonProps {
  key: string;
  clicked?: () => void;
  disabled?: boolean;
}

const ButtonComponent: React.SFC<buttonProps> = (props) => (
  <button
    onClick={props.clicked}
    disabled={props.disabled}
    className={[indexClasses.styleButton, indexClasses.styleBlack].join(" ")}
  >
    {props.children}
  </button>
);

export default ButtonComponent;
