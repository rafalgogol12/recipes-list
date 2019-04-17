import * as React from 'react';

interface InputProps {
  name: string
  labelName: string
  placeholder: string
  value: any
  callback: (name: string, value: any) => void
  type?: string
  isTextArea?: boolean
  error?: boolean
}

export default class Input extends React.Component<InputProps> {
  public render() {
    const {
      labelName,
      name,
      placeholder,
      value,
      type = "text",
      callback,
      isTextArea = false,
      error = false } = this.props;

    return (
      <div className="input__field">
        <div className="input__field--label">
          <label className="input__field">{labelName} {error && <span className="errorStyleText">Already exist</span>}</label>
        </div>
        {isTextArea ?
          <textarea
            name={name}
            placeholder={placeholder}
            className={`input__field--textArea`}
            value={value}
            onChange={(newValue) => callback(name, newValue.target.value)}
          />
          :
          <input
            name={name}
            placeholder={placeholder}
            className={`input__field--input ${error ? 'errorStyle' : ''}`}
            value={value}
            type={type}
            onChange={(newValue) => callback(name, newValue.target.value)}
            required
          />
        }
      </div>
    )
  }
}