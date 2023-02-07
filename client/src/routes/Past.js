import "../components/shared/Background.scss";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import React, { useState } from "react";
import { getImage } from "../backend/app.service";
import LoadingSpinner from "../components/shared/LoadingSpinner"

export function Past({futureAnswers}) {
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

    const promptText = futureAnswers?.join(" ")
    const [imageUrl, setImageUrl] = useState("");
    const [visible, setVisible] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = () => {
        setIsLoading(true);
        getImage(promptText)
            .then((data) => {
                setImageUrl(`http://localhost:4000/${data}`);
                setIsLoading(false)
            });
        setVisible(true);
        setHidden(true);
        setTimeout(() => { setShow(true) }, 5000)
    };

    return (
        <>
            <h3>
                {!hidden && <button onClick={handleClick}>show me my dream of the future</button>}
                <br />
                {isLoading ?
                    <>
                        <LoadingSpinner />
                    </>
                    : (
                        <img src={imageUrl} crossOrigin="anonymous" />
                    )
                }
                <br />
            </h3>
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
                                {
                                    "src": "/react.cd2ab268.svg",
                                    "height": 20,
                                    "width": 23
                                },
                                {
                                    "src": "/k8s.2d579d24.svg",
                                    "height": 20,
                                    "width": 20
                                },
                                {
                                    "src": "/code.b3b4c4f4.png",
                                    "height": 20,
                                    "width": 20
                                }
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
                }} />
        </>
    );
}

export default Past;
