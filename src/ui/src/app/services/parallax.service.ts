import { Injectable, OnDestroy } from '@angular/core';
import Parallax from 'parallax-js';

@Injectable({
    providedIn: 'root'
})
export class ParallaxService implements OnDestroy {

    isEnabled: boolean = localStorage.getItem("animations") === "false" ? false : true;
    private parallaxInstances: Map<string, Parallax> = new Map();



    initParallax(sceneId: string): void {


        const scene = document.getElementById(sceneId);
        if (scene && !this.parallaxInstances.has(sceneId)) {
            const instance = new Parallax(scene, {
                relativeInput: true,
                frictionX: 0.2,
                frictionY: 0.2,
            });
            this.parallaxInstances.set(sceneId, instance);
            if (!this.isEnabled) {
                this.disableParallax(sceneId);
            }
            else {

            }

        }

    }

    destroyParallax(sceneId: string): void {
        const instance = this.parallaxInstances.get(sceneId);
        if (instance) {
            instance.destroy();
            this.parallaxInstances.delete(sceneId);
        }
    }

    disableParallax(sceneId: string): void {
        const instance = this.parallaxInstances.get(sceneId);
        if (instance) {
            instance.disable();
            this.parallaxInstances.delete(sceneId);
        }
    }

    getParallaxInstance(sceneId: string): Parallax | undefined {
        return this.parallaxInstances.get(sceneId);
    }

    ngOnDestroy(): void {
        this.parallaxInstances.forEach((instance) => {
            instance.destroy();
        });
        this.parallaxInstances.clear();
    }
}