import { React, useState } from 'react';

const MyImageCarousel = (props) => {
    const [currentImage, setCurrentImage] = useState(props.images[0].image);
    const [imageIndex, setImageIndex] = useState(0);
    // props would be <MyCarousel images={product.images}
    //      where product.images is an array of image objects, where the image field is the src

    const getNextSrc = () => {
        // will just go to next image in the array. if last element reached loop back to first
        // moving setCurrentImage outside of if-else has small problem
        //  on first click after reload, image doesn't change
        //  guessing there is a delay with setImageIndex updating the imageIndex variable that is not happening fast enough for the setCurrentImage outside of if-else
        if (imageIndex === props.images.length-1){
            setCurrentImage(props.images[0].image);
            setImageIndex(0);
        } else {
            setCurrentImage(props.images[imageIndex+1].image);
            setImageIndex(imageIndex+1);
        }
    }

    return (
        <div>
            <p>click on image to view next photo</p>
            <img src={currentImage} height='200' width='200' onClick={getNextSrc}/>
        </div>
    )
}

export default MyImageCarousel;