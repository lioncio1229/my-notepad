import { useRef } from "react";

export default function Radio({text, onChange, selected, value})
{
    const ref = useRef();

    const handleMouseEnter = () => {
      ref.current.style.backgroundColor = '';
    }
    
    const handleMouseLeave = () => {
      ref.current.style.backgroundColor = '';
    }

    return (
        <div
          ref={ref}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="modern-radio-container"
          onClick={() => {
            onChange(value);
          }}
        >
          <div
            className={`radio-outer-circle ${value !== selected && "unselected"}`}
          >
            <div
              className={`radio-inner-circle ${value !== selected &&
                "unselected-circle"}`}
            />
          </div>
          <div className="helper-text">{text}</div>
        </div>
      );
}