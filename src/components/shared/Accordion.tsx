import classNames from 'classnames/bind'
import styles from './Accordion.module.scss'
import { ReactNode, useState } from 'react'

const cx = classNames.bind(styles)

interface AccordionProps {
  label: String
  children: ReactNode
}

function Accordion({ label, children }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(true)

  const handleToggle = () => {
    setIsOpen((prev) => !prev)
  }
  return (
    <div
      className={cx('wrap-accordion', isOpen ? 'open' : '')}
      onClick={handleToggle}
    >
      <div className={cx('wrap-header')}>
        <span>{label}</span>
        <IconArrowDown className={cx('ico-arrow-down')}></IconArrowDown>
      </div>
      <div className={cx('wrap-content')}>{children}</div>
    </div>
  )
}

function IconArrowDown({ className }: { className: string }) {
  return (
    <svg
      className={className}
      enable-background="new 0 0 50 50"
      height="50px"
      id="Layer_1"
      version="1.1"
      viewBox="0 0 50 50"
      width="50px"
    >
      <rect fill="none" height="50" width="50" />
      <polygon points="47.25,15 45.164,12.914 25,33.078 4.836,12.914 2.75,15 25,37.25 " />
    </svg>
  )
}
export default Accordion
