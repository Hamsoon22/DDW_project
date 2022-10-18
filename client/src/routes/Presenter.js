import { listImages } from "../backend/app.service";
import { useCallback, useEffect, useState } from "react";

export const Presenter = () => {
  const imgSizePx = 125;
  const refetchPeriodMs = 2500;

  const [images, setImages] = useState([]);

  const loadImages = useCallback(() => {
    listImages().then((r) => {
      const vals = r.map(
        (rval) => `http://localhost:4000/${rval.replace("\\\\", "\\")}`
      );
      console.log(vals);
      setImages(vals);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      loadImages();
    }, refetchPeriodMs);
  }, []);
  return (
    <>
      <h2>Presenting {images.length} images.</h2>
      {images.map((i, index) => (
        <img
          src={i}
          width={imgSizePx}
          height={imgSizePx}
          key={index}
          crossOrigin="anonymous"
        />
      ))}
    </>
  );
};
