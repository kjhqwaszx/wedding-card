import classNames from 'classnames/bind'
import styles from './ImageGallery.module.scss'
import Section from '@shared/Section'

const cx = classNames.bind(styles)
function ImageGallery({ images }: { images: string[] }) {
  return (
    <Section title="사진첩">
      <ul className={cx('wrap-images')}>
        {images.map((image, idx) => (
          <li key={idx} className={cx('wrap-image')}>
            <img src={image} alt={`사진첩 이미지${idx}`} />
          </li>
        ))}
      </ul>
    </Section>
  )
}

export default ImageGallery
