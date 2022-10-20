import { listImages } from "../backend/app.service";
import { useCallback, useEffect, useState } from "react";

export const Presenter = () => {
  const imgSizePx = 200;
  const refetchPeriodMs = 2500;
  const [images, setImages] = useState([]);

  const loadImages = useCallback(() => {
    listImages().then((r) => {
      const vals = r.map(
        (rval) => `http://localhost:4000/${rval.replace("\\\\", "\\")}`
      );
      setImages(vals);
    });
  }, []);

  useEffect(() => {
    setInterval(() => {
      loadImages();
    }, refetchPeriodMs);
  }, []);

  return (
    <>
      <h2 className="presenter-title">
        Past and Future {images.length} images.
      </h2>
      <h3>Our Past and Future</h3>
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
