import { Injectable } from '@angular/core';
import Parallax from 'parallax-js';

@Injectable({
  providedIn: 'root'
})
export class ParallaxService {

  private parallaxInstances: Parallax[] = [];

  addParallaxInstance(parallaxInstance: Parallax) {
    this.parallaxInstances.push(parallaxInstance);
  }

  disableParallax() {
    this.parallaxInstances.forEach(instance => instance.disable());
  }

  enableParallax() {
    this.parallaxInstances.forEach(instance => instance.enable());
  }

}
