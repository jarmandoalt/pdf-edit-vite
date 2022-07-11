import { createRef, useState } from "react";
import information from '../Sources/info.svg'

const Hoverlay = (props) => {
  const refMessage = createRef(),
    $hoverlay = document.getElementById('hoverlay')
    
    const mouseOver = () => {
      switch (props.orientation) {
        case "left":
          refMessage.current.classList.add('is-left')
          $hoverlay.style.justifyContent = 'end'
          break;
          case "right":
            refMessage.current.classList.add('is-right')
            $hoverlay.style.justifyContent = 'end'
            break;
        default:
          break;
      }      
    }

    const mouseLeave = () => {
      refMessage.current.classList.remove('is-left')
      refMessage.current.classList.remove('is-right')
      refMessage.current.classList.remove('is-top')
      refMessage.current.classList.remove('is-button')
    }

  return (
    <div ref={refMessage} className='hoverlay' id="hoverlay">
      <div onMouseOver={mouseOver} onMouseLeave={mouseLeave} > <img src={information} alt="" /> </div>
      <p> {props.message} </p>
    </div>
  );
}

export default Hoverlay;
