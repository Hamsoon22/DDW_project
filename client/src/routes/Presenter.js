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

  const [images, setImages] = useState([]);

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

      setImages(vals);
    });
  }, [setImages]);


  return (
    <>
      <Background />
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 1,
                duration: 0.2,
              },
            },
          },

          "particles": {
            "number": {
                "value": 8,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "line_linked": {
                "enable": false
            },
            "move": {
                "speed": 1,
                "out_mode": "out"
            },
            "shape": {
                "type": [
                    "image",
                    "circle"
                ],
                "image": [
                 
                ]
            },
            "color": {
                "value": "#CCC"
            },
            "size": {
                "value": 30,
                "random": false,
                "anim": {
                    "enable": true,
                    "speed": 4,
                    "size_min": 10,
                    "sync": false
                }
            }
        },
        "retina_detect": false
        }}
      />
      <div className="stage" ref={null} />
    </>
  );
};
