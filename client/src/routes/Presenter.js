import { listImages } from "../backend/app.service";
import { useCallback, useEffect, useState } from "react";

export const Presenter = () => {
  const imgSizePx = 200;
  const refetchPeriodMs = 2500;
  const nearSetSize = 6;
  const midFarSetSize = 10;
  const farSetSize = 30;

  const [imagesNear, setImagesNear] = useState([]);
  const [imagesMidFar, setImagesMidFar] = useState([]);
  const [imagesFar, setImagesFar] = useState([]);

  const loadImages = useCallback(() => {
    listImages().then((r) => {
      const vals = r
        .map((rval) => {
          return {
            url: `http://localhost:4000/${rval.serveUrl.replace("\\\\", "\\")}`,
            timestamp: new Date(rval.lastModified).valueOf(),
          };
        })
        .sort((x, y) => x.timestamp - y.timestamp);

      const cnt = vals.length;
      const chunkNear = vals.slice(cnt - nearSetSize, cnt);
      setImagesNear(chunkNear);

      const midEnd = cnt - nearSetSize;
      const chunkMidFar = vals.slice(midEnd - midFarSetSize, midEnd);
      setImagesMidFar(chunkMidFar);

      const farEnd = midEnd - midFarSetSize;
      const chunkFar = vals.slice(farEnd - farSetSize, farEnd);
      setImagesFar(chunkFar);
    });
  }, [setImagesNear, setImagesMidFar, setImagesFar]);

  useEffect(() => {
    setInterval(() => {
      loadImages();
    }, refetchPeriodMs);
  }, []);

  return (
    <>
      <h2 className="presenter-title">
        Past and Future {imagesFar.length} images.
      </h2>
      <h3>Our Past and Future</h3>
      {!imagesNear.length ? "Loading your future" : ""}
      {imagesNear.map((source, index) => (
        <img
          src={source.url}
          width={imgSizePx}
          height={imgSizePx}
          key={index}
          crossOrigin="anonymous"
        />
      ))}
    </>
  );
};
