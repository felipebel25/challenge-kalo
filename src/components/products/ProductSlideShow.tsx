import { Slide } from "react-slideshow-image"
import 'react-slideshow-image/dist/styles.css'
import styles from '../../../styles/ProductSlideshow.module.css'
interface Props {
    images: string[];
}
export const ProductSlideShow = ({ images }: Props) => {
    return (
        <Slide
            easing="ease"
            duration={7000}
            indicators
        >
            {images.map((image) => {
                const url = `/products/${image}`
                return (
                    <div className={styles['each-slide']} key={image}>
                        <div
                            style={{
                                backgroundImage: `url(${url})`,
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat"
                            }}
                        >
                        </div>
                    </div>
                )
            })}

        </Slide>
    )
}
