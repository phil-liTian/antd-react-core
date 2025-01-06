import React from 'react'
import { render, raf, composeRef, unmount } from 'vc-util'
import CSSMotion from 'rc-motion'
import { getTargetWaveColor } from './utils'
import classNames from 'classnames'

interface WaveEffectProps {
  target: HTMLElement
  className: string
}

const WaveEffect: React.FC<WaveEffectProps> = (props) => {
  const { target, className } = props
  const divRef = React.useRef<HTMLDivElement>(null)

  const [color, setWaveColor] = React.useState<string | null>(null);
  const [borderRadius, setBorderRadius] = React.useState<number[]>([]);
  const [left, setLeft] = React.useState(0)
  const [top, setTop] = React.useState(0);
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);
  const [enabled, setEnabled] = React.useState(false);

  const waveStyle = {
    left,
    top,
    width,
    height,
    borderRadius: borderRadius.map((radius) => `${radius}px`).join(' '),
  }

  if (color) {
    waveStyle['--wave-color'] = color
  }

  function syncPos() {
    const nodeStyle = getComputedStyle(target);
    const isStatic = nodeStyle.position === 'static';

    setWaveColor(getTargetWaveColor(target))

    setLeft(target.offsetLeft)
    setTop(target.offsetTop)
    setWidth(target.offsetWidth)
    setHeight(target.offsetHeight)

    const { borderTopLeftRadius, borderTopRightRadius, borderBottomLeftRadius, borderBottomRightRadius } = nodeStyle
    // border radius

    setBorderRadius([
      borderBottomLeftRadius,
      borderBottomRightRadius,
      borderTopRightRadius,
      borderTopLeftRadius
    ].map(radius => parseFloat(radius)))
  }


  React.useEffect(() => {
    if (target) {
      const id = raf(() => {
        syncPos()
      })

      return () => {
        raf.cancel(id)
      }
    }
  }, [])

  return <CSSMotion
    motionName='wave-motion'
    motionDeadline={5000}
    onAppearEnd={(_, event) => {
      if (event.deadline || (event as TransitionEvent).propertyName === 'opacity') {
        const holder = divRef.current?.parentElement
        unmount(holder)?.then(() => {
          holder?.remove()
        })
      }

      return false
    }}>
    {({ className: motionClassName }, ref) => (<div ref={composeRef(divRef, ref)} style={waveStyle} className={classNames(className, motionClassName)} />)}
  </CSSMotion>
}



const showWaveEffect = (target, info) => {
  const { component } = info
  if (!component) return

  // create holder
  const holder = document.createElement('div')
  holder.style.position = 'absolute'
  holder.style.left = '0px'
  holder.style.top = '0px'
  target.insertBefore(holder, target.firstChild)

  // react18 render函数已被弃用
  render(<WaveEffect {...info} target={target} />, holder)
}

export default showWaveEffect