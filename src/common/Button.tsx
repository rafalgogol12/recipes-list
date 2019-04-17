import * as React from "react";

interface ButtonProps {
  text: string,
  callback: () => void,
  styles?: string,
  disabled: boolean
}

export default class Button extends React.Component<ButtonProps>{
  public render() {
    const { styles, callback, text, disabled } = this.props;

    return (
      <button
        className={`btn  ${styles}`}
        onClick={callback}
        disabled={disabled}
      >
        {text}
      </button>
    )
  }
}