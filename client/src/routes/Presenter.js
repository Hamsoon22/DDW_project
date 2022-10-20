import { listImages } from "../backend/app.service";
import { useCallback, useEffect, useRef, useState } from "react";
import Two from "two.js";

function mod(v, l) {
  while (v < 0) {
    v += l;
  }
  return v % l;
}

export const Presenter = () => {
  const imgSizePx = 200;
  const refetchPeriodMs = 2500;
  const nearSetSize = 6;
  const midFarSetSize = 10;
  const farSetSize = 30;

  const radius = 25;

  const references = {
    triangle: new Two.Polygon(0, 0, radius, 3),
    circle: new Two.Circle(0, 0, radius),
    square: new Two.Rectangle(0, 0, radius * 2, radius * 2),
    pentagon: new Two.Polygon(0, 0, radius, 5),
    star: new Two.Star(0, 0, radius * 0.5, radius, 6),
  };
  const refs = useRef({
    type: Two.Types.webgl,
    increment: false,
    decrement: false,
    active: null,
    count: 0,
    velocity: new Two.Vector(0.1, 0),
    spin: Math.PI / 30,
  });
  const domElement = useRef();
  const [type, setType] = useState(Two.Types.svg);
  const [active, setActive] = useState({
    shapes: {
      triangle: true,
      circle: false,
      square: false,
      pentagon: false,
      star: false,
    },
    operations: {
      position: true,
      rotation: false,
      scale: false,
      vertices: false,
    },
  });
  const [count, setCount] = useState(10);

  useEffect(setup, []);
  useEffect(() => {
    // Keep a reference to our state object
    refs.current.type = type;
    refs.current.active = active;
    refs.current.count = count;
  }, [type, active, count]);

  function setup() {
    let frameCount = 0;
    let playing = true;
    let two = new Two({
      fullscreen: true,
    }).appendTo(domElement.current);

    window.addEventListener("pointerup", ignore, false);
    requestAnimationFrame(animate);

    return unmount;

    function unmount() {
      playing = false;
      window.removeEventListener("pointerup", ignore, false);
      const parent = two.renderer.domElement.parentElement;
      if (parent) {
        parent.removeChild(two.renderer.domElement);
      }
    }

    function animate() {
      update(frameCount++);
      two.render();
      if (playing) {
        requestAnimationFrame(animate);
      }
    }

    function update(frameCount) {
      if (refs.current.type !== two.type) {
        change(refs.current.type);
      }

      if (refs.current.increment) {
        setCount(increment);
      }
      if (refs.current.decrement) {
        setCount(decrement);
      }

      const { count, active, velocity, spin } = refs.current;

      if (count > two.scene.children.length) {
        add();
      } else if (count < two.scene.children.length) {
        remove();
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
    }

    function change(type) {
      const parent = two.renderer.domElement.parentElement;
      if (parent) {
        parent.removeChild(two.renderer.domElement);
      }

      const index = Two.Instances.indexOf(two);
      if (index >= 0) {
        Two.Instances.splice(index, 1);
      }

      two = new Two({
        type,
        fullscreen: true,
      }).appendTo(domElement.current);
    }

    function modify(child) {
      for (let i = 0; i < child.vertices.length; i++) {
        const v = child.vertices[i];
        v.x = v.origin.x + Math.random() * 5;
        v.y = v.origin.y + Math.random() * 5;
      }
    }

    function increment(count) {
      return count + 1;
    }

    function decrement(count) {
      count = Math.max(count - 1, 0);
      return count;
    }

    function add() {
      const shapes = filter(refs.current.active.shapes);
      const index = Math.floor(Math.random() * shapes.length);
      const shape = shapes[index];
      two.add(generate(shape));
    }

    function remove() {
      const child = two.scene.children[0];
      if (child) {
        child.remove();
        two.release(child); // Dispose of any references
      }
    }

    function generate(name) {
      const ref = references[name];
      const path = ref.clone();
      path.position.x = two.width * Math.random();
      path.position.y = two.height * Math.random();
      path.rotation = Math.random() * Math.PI * 2;
      path.fill = getRandomColor();
      path.stroke = "white";
      return path;
    }

    function getRandomColor() {
      const red = Math.floor(Math.random() * 255);
      const green = Math.floor(Math.random() * 255);
      const blue = Math.floor(Math.random() * 255);
      return `rgb(${red}, ${green}, ${blue})`;
    }

    function filter(obj) {
      const result = [];
      for (const k in obj) {
        if (!!obj[k]) {
          result.push(k);
        }
      }
      return result;
    }
  }

  function ignore() {
    refs.current.increment = false;
    refs.current.decrement = false;
  }

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
        <span key={index}>
          <img
            src={source.url}
            width={imgSizePx}
            height={imgSizePx}
            crossOrigin="anonymous"
          />
        </span>
      ))}
      <div className="stage" ref={domElement} />
    </>
  );
};
