import { listImages } from "../backend/app.service";
import { useCallback, useState } from "react";
import Background from "../components/shared/Background";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export const Presenter = () => {

  const particlesInit = useCallback(async engine => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async container => {
    await console.log(container);
  }, []);


  const loadImages = useCallback(() => {
    listImages().then((data) => {
          return {
            url: `http://localhost:4000/$${data}}`,
          };
    });
  });

  return (
    <>
      <Background />
       {loadImages}
      <div className="stage" ref={null} />
    </>
  );
};
