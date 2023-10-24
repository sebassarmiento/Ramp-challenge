import classNames from "classnames"
import { useEffect, useRef, useState } from "react"
import { InputCheckboxComponent } from "./types"

export const InputCheckbox: InputCheckboxComponent = ({ id, checked = false, disabled, onChange }) => {
  const { current: inputId } = useRef(`RampInputCheckbox-${id}`)
  const [isChecked, setIsChecked] = useState(checked)

  useEffect(() => {
    // Try to read the approval status from Local Storage when the component mounts
    const approved = localStorage.getItem(id.toString());
    if (approved !== null) {
      setIsChecked(approved === "true");
    }
  }, []);

  const handleApproval = () => {
    console.log("hadnling approval")
    const newApprovalStatus = !isChecked;
    localStorage.setItem(id.toString(), newApprovalStatus.toString()); // Update Local Storage
    setIsChecked(newApprovalStatus)
    onChange(newApprovalStatus)
  }

  return (
    <div className="RampInputCheckbox--container" data-testid={inputId}>
      <label
        onClick={() => handleApproval()}
        className={classNames("RampInputCheckbox--label", {
          "RampInputCheckbox--label-checked": isChecked,
          "RampInputCheckbox--label-disabled": disabled,
        })}
      />
      <input
        id={inputId}
        type="checkbox"
        className="RampInputCheckbox--input"
        checked={isChecked}
        disabled={disabled}
        onChange={() => handleApproval()}
      />
    </div>
  )
}
