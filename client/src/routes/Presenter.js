import { listImages } from "../backend/app.service";
import { useCallback, useState } from "react";
import Background from "../components/shared/Background";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export const Presenter = () => {

  const [images, setImages] = useState([]);
  const [newestImage, setNewestImage] = useState(null);

  const pickHighest = (obj) => {
    return obj.sort((a,b)=>a.createdAt<b.createdAt?1:-1)[0]
 };

  const loadImages = useCallback(() => {
    listImages().then((r) => {
      const vals = r.filter((el)=>el.type === "past")
      let newest = pickHighest(vals)
      setNewestImage({
        url: `http://localhost:4000/${newest.image.replace("\\\\", "\\")}`,
        timestamp: new Date(newest.createdAt).valueOf(),
      })
      setImages(vals.filter((el)=>el.id !== newest.id).map((rval) => {
          return {
            url: `http://localhost:4000/${rval.image.replace("\\\\", "\\")}`,
            timestamp: new Date(rval.createdAt).valueOf(),
          };
        })
        .sort((x, y) => x.timestamp - y.timestamp));
    });
  });

  return (
    <>
      <image style={{width:"200px", height:"200px",position:"absolute"}} src={newestImage.url} alt="newest"/>
      <Background />
      <div className="stage" ref={domElement} />
      
    </>
  );
};
