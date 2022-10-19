import { listImages } from "../backend/app.service";
import { useCallback, useEffect, useState } from "react";

export const Presenter = () => {
  const random = (null);
  const imgSizePx = random;
  const refetchPeriodMs = 1500;


  const [images, setImages] = useState([]);
  const [images2, setImages2] = useState([]);

  const loadImages = useCallback(() => {
    listImages().then((r) => {
      const vals = r.map(
        (rval) => `http://localhost:4000/${rval.replace("\\\\", "\\")}`
      );
      console.log(vals);
      setImages(vals);
    });
  }, []);

  const loadImages2 = useCallback(() => {
    listImages().then((r) => {
      const vals2 = r.map(
        (rval2) => `http://localhost:4000/${rval2.replace("\\\\", "\\")}`
      );
      console.log(vals2);
      setImages2(vals2);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      loadImages();
      loadImages2();
    }, refetchPeriodMs);
  }, []);
  
  return (
    <>
      <h2>Our past and future in total {images2.length} images </h2>
      <h3>How your past and future look like?</h3>
      <div className="imagemap">
      {images.map((i, index) => (
        <img className="image"
          src={i}
          width={random}
          height={random}
          key={index}
          crossOrigin="anonymous"
        />
      ))}
      </div>
      <br></br>
      {images2.map((i, index) => (
        <img
          src={i}
          width={random}
          height={random}
          key={index}
          crossOrigin="anonymous"
        />
      ))}
    </>
  );
};
