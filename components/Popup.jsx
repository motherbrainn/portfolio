import Image from 'next/image'
import { useState } from 'react'

const overlayStyle = {
  width: '100%',
  height: '100%',
  position: 'fixed',
  top: 0,
  left: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
}

const Popup = () => {
  const [hoverState, setHoverState] = useState(false)
  const handleHover = () => {
    setHoverState(true)
    setTimeout(() => setHoverState(false), 1000)
  }
  return (
    <div>
      <Image
        src="/images/italy.jpeg"
        alt="Photo"
        width={480}
        height={640}
        className="next-image"
        onMouseEnter={handleHover}
      />
      {hoverState && (
        <div style={overlayStyle}>
          <Image
            src="/images/smile.png"
            alt="Photo"
            width={572}
            height={558}
            className="next-image"
          />
        </div>
      )}
    </div>
  )
}

export default Popup
