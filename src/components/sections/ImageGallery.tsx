import classNames from 'classnames/bind'
import styles from './ImageGallery.module.scss'
import Section from '@shared/Section'
import ImageViewer from '@components/imageViewer'
import generateImageUrl from '@/utils/generateImageUrl'
import { useState } from 'react'

const cx = classNames.bind(styles)
function ImageGallery({ images }: { images: string[] }) {
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const open = selectedIndex > -1

  const handleSelectedImg = (idx: number) => {
    setSelectedIndex(idx)
  }

  const handleCloseImg = () => {
    setSelectedIndex(-1)
  }
  return (
    <>
      <Section title="사진첩">
        <ul className={cx('wrap-images')}>
          {images.map((image, idx) => (
            <li
              key={idx}
              className={cx('wrap-image')}
              onClick={() => handleSelectedImg(idx)}
            >
              <picture>
                <source
                  srcSet={generateImageUrl({
                    filename: image,
                    format: 'webp',
                    option: 'w_240,h_240,q_auto,c_fill',
                  })}
                  type="image/webp"
                />
                <img
                  src={generateImageUrl({
                    filename: image,
                    format: 'jpg',
                    option: 'w_240,h_240,c_fill,q_auto',
                  })}
                  alt="이미지"
                />
              </picture>
              <img src={image} alt={`사진첩 이미지${idx}`} />
            </li>
          ))}
        </ul>
      </Section>
      <ImageViewer
        images={images}
        open={open}
        selectedIndex={selectedIndex}
        handleCloseImg={handleCloseImg}
      />
    </>
  )
}

export default ImageGallery
