'use client';
import React, { useEffect, useRef } from 'react';
import createGlobe from 'cobe';
import styles from '../src/css/earth.module.css';

const Earth = ({
    className,
    theta = 0.25,
    dark = 1,
    scale = 0.8,
    diffuse = 1.2,
    mapSamples = 55000,
    mapBrightness = 6,
    baseColor = [0.4, 0.6509, 1],
    markerColor = [1, 0, 0],
    glowColor = [0.2745, 0.5765, 0.898],
}) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        let width = 0;
        const onResize = () => canvasRef.current && (width = canvasRef.current.offsetWidth);
        window.addEventListener('resize', onResize);
        onResize();
        let phi = 0;

        onResize();
        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: width * 2,
            height: width * 2,
            phi: 0,
            theta: theta,
            dark: dark,
            scale: scale,
            diffuse: diffuse,
            mapSamples: mapSamples,
            mapBrightness: mapBrightness,
            baseColor: baseColor,
            markerColor: markerColor,
            glowColor: glowColor,
            opacity: 1,
            offset: [0, 0],
            markers: [],
            onRender: (state) => {
                state.phi = phi;
                phi += 0.003;
            },
        });

        return () => {
            globe.destroy();
        };
    }, []);

    return (
        <div className={`${styles.earthcontainer} ${className}`}>
            <canvas ref={canvasRef} className={styles.earthcanvas} />
        </div>
    );
};

export default Earth;
