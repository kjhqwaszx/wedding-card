import classNames from 'classnames/bind'
import styles from './Calendar.module.scss'
import Section from '@shared/Section'
import { format, parseISO } from 'date-fns'
import { ko } from 'date-fns/locale/ko'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { memo } from 'react'
const cx = classNames.bind(styles)

function Calendar({ date }: { date: string }) {
  const weddingDate = parseISO(date)

  const css = `
    .rdp-caption {
        display: none;
    }
    .rdp-cell {
        cursor: default;
    }
    .rdp-head_cell {
        font-weight: 500;
        font-size: 14px;
        font-weight: bold;
    }
    .rdp-day_selected {
        background-color: var(--red);
        font-weight: bold;
        color: #fff;
    }
    .rdp-day_selected:hover {
        background-color: var(--red);
    }
`
  return (
    <Section
      className={cx('container')}
      title={
        <div className={cx('wrap-header')}>
          <span className={cx('txt-date')}>
            {format(weddingDate, 'yyyy.MM.dd')}
          </span>
          <span className={cx('txt-time')}>
            {format(weddingDate, 'aaa h시 eeee', { locale: ko })}
          </span>
        </div>
      }
    >
      <div className={cx('wrap-calendar')}>
        <style>{css}</style>
        <DayPicker
          locale={ko}
          month={weddingDate}
          selected={weddingDate}
          formatters={{ formatCaption: () => '' }}
        />
      </div>
    </Section>
  )
}

export default memo(Calendar)
