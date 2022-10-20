import { listImages } from "../backend/app.service";
import { useCallback, useEffect, useRef, useState } from "react";
import Two from "two.js";
import { filterTruthy } from "./TwoUtils";

function mod(v, l) {
  while (v < 0) {
    v += l;
  }
  return v % l;
}

export const Presenter = () => {
  // YEUN CONTROL PANEL
  const imgSizePx = 512;
  const refetchPeriodMs = 2500;
  const allScaleFactor = 0.5;
  // NEAREST IMAGES
  const nearSetSize = 6;
  const nearOpacity = 1;
  const nearScale = 1.2 * allScaleFactor;
  // MID
  const midFarSetSize = 10;
  const midFarOpacity = 0.9;
  const midFarScale = 0.75 * allScaleFactor;
  // FAR AWAY
  const farSetSize = 30;
  const farOpacity = 0.5;
  const farScale = 0.25 * allScaleFactor;

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

  const fallBackTexture = new Two.Texture(
    "https://raw.githubusercontent.com/jonobr1/two.js/dev/tests/images/canvas/image-sequence-2%402x.png"
  );

  useEffect(() => {
    setInterval(() => {
      loadImages();
    }, refetchPeriodMs);
  }, []);

  const references = {
    square: new Two.Rectangle(0, 0, imgSizePx, imgSizePx),
  };
  const refs = useRef({
    active: null,
    imagesNear: [],
    imagesMidFar: [],
    imagesFar: [],
    velocity: new Two.Vector(0.1, 0),
    spin: Math.PI / 30,
  });
  const domElement = useRef();
  const [active] = useState({
    shapes: {
      square: true,
    },
    operations: {
      position: true,
      rotation: false,
      scale: false,
      vertices: false,
    },
  });

  useEffect(setup, []);
  useEffect(() => {
    // Keep a reference to our state object
    refs.current.active = active;
    refs.current.imagesNear = imagesNear;
    refs.current.imagesMidFar = imagesMidFar;
    refs.current.imagesFar = imagesFar;
  }, [active, imagesNear, imagesMidFar, imagesFar]);

  function setup() {
    let frameCount = 0;
    let playing = true;
    let two = new Two({
      fullscreen: true,
      type: Two.Types.canvas,
    }).appendTo(domElement.current);

    window.addEventListener("pointerup", ignore, false);

    function unmount() {
      playing = false;
      window.removeEventListener("pointerup", ignore, false);
      const parent = two.renderer.domElement.parentElement;
      if (parent) {
        parent.removeChild(two.renderer.domElement);
      }
    }

    const update = (frameCount) => {
      const { active, velocity, spin, imagesNear, imagesMidFar, imagesFar } =
        refs.current;

      // Draw everything immediately
      if (
        imagesNear.length > 0 &&
        imagesMidFar.length > 0 &&
        imagesFar.length > 0 &&
        two.scene.children.length === 0
      ) {
        imagesFar.forEach((i) => {
          add(i.url, farOpacity, farScale);
        });
        imagesMidFar.forEach((i) => {
          add(i.url, midFarOpacity, midFarScale);
        });
        imagesNear.forEach((i) => {
          add(i.url, nearOpacity, nearScale);
        });
      }

      let needsUpdate = false;
      for (const operation in active.operations) {
        if (active.operations[operation]) {
          needsUpdate = true;
        }
      }

      if (!needsUpdate) {
        return;
      }

      const theta = frameCount / 30;

      for (let i = 0; i < two.scene.children.length; i++) {
        const child = two.scene.children[i];
        const direction = i % 2 ? 1 : -1;

        if (active.operations.position) {
          if (direction > 0) {
            child.position.add(velocity);
          } else {
            child.position.sub(velocity);
          }
          child.position.x = mod(child.position.x, two.width);
          child.position.y = mod(child.position.y, two.height);
        }
        if (active.operations.rotation) {
          child.rotation += spin * direction;
        }
        if (active.operations.scale) {
          child.scale = 0.25 * Math.sin(theta * direction) + 1;
        }
        if (active.operations.vertices) {
          modify(child);
        }
      }
    };

    function modify(child) {
      for (let i = 0; i < child.vertices.length; i++) {
        const v = child.vertices[i];
        v.x = v.origin.x + Math.random() * 5;
        v.y = v.origin.y + Math.random() * 5;
      }
    }

    function add(url, opacity, scale) {
      const shapes = filterTruthy(refs.current.active.shapes);
      const index = Math.floor(Math.random() * shapes.length);
      const shape = shapes[index];
      two.add(generate(shape, url, opacity, scale));
    }

    function generate(name, url, opacity, scale) {
      const ref = references[name];
      const path = ref.clone();
      path.position.x = two.width * Math.random();
      path.position.y = two.height * Math.random();
      path.scale = scale;

      if (name === "square") {
        path.fill = !!url ? new Two.Texture(url) : fallBackTexture;
      }
      path.opacity = opacity;
      path.stroke = "white";
      return path;
    }

    const animate = () => {
      update(frameCount++);
      two.render();
      if (playing) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
    return unmount;
  }

  function ignore() {
    refs.current.increment = false;
    refs.current.decrement = false;
  }

  return (
    <>
      <h2 className="presenter-title">
        Past and Future {imagesFar.length} images.
      </h2>
      <h3>Our Past and Future</h3>
      {!imagesNear.length ? "Loading your future" : ""}
      <div className="stage" ref={domElement} />
    </>
  );
};
