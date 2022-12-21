import React, { useState, useCallback } from "react";
import 'regenerator-runtime/runtime'
import { DarkModeSwitch } from "./DarkModeSwitch";
import { Main } from "./Main";
import WithSubnavigation from "./Navbar";
import { loadFull } from "tsparticles";
import options from './assets/options.json'
import { loadFireflyPreset } from "tsparticles-preset-firefly";
import Particles from "react-particles";
import type { Engine } from "tsparticles-engine";


export const Layout = ({ children }) => {
    const particlesInit = useCallback(async engine => {
        console.log(engine);
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFireflyPreset(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        await console.log(container);
    }, []);

    return (
        <Main>
            <WithSubnavigation />
            <>
                <Particles
                    id="tsparticles"
                    init={particlesInit}
                    loaded={particlesLoaded}
                    options={{
                        preset: "firefly",
                        background: {
                            color: '#227C70'
                        },
                        fullScreen: {
                            enable: true,
                            zIndex: -1
                        }
                    }}
                />
                {children}
            </>


        </Main>

    )
}