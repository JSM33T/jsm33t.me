import { Component, OnInit } from '@angular/core';
import initAOS from '../../../../library/invokers/animate-on-scroll';
import { initParallax } from '../../../../library/invokers/parallax';
import { audioRequestService } from '../../../shared/audio-player/audio-player.component';
import { NgFor } from '@angular/common';
import { environment } from '../../../../../environment/environment';

@Component({
    selector: 'app-coffeeroomalbum',
    standalone: true,
    imports: [NgFor],
    templateUrl: './coffeeroomalbum.component.html',
    styleUrl: './coffeeroomalbum.component.css'
})
export class CoffeeroomalbumComponent implements OnInit {
    ngOnInit(): void {
        initAOS();
        initParallax();
    }
    baseadd: string = environment.cdnUrl + '';

    playA() {
        audioRequestService.requestAudioPlay(environment.cdnUrl + "/music/the-coffeeroom-bootleg/01.%20Ab%20Firse%20Jab%20Baarish%20Hogi%20(Future%20Bass)%20-%20Souvik.mp3");
    }

    playB() {
        audioRequestService.requestAudioPlay(environment.cdnUrl + "/music/the-coffeeroom-bootleg/02.%20Titli%20(DnB)%20-%20Jsm33t.mp3");
    }

    playC() {
        audioRequestService.requestAudioPlay(environment.cdnUrl + "/music/the-coffeeroom-bootleg/03.%20Zara%20Zara%20(Future%20Bass)%20-%20A-Shay.mp3");
    }
    playD() {
        audioRequestService.requestAudioPlay(environment.cdnUrl + "/music/the-coffeeroom-bootleg/04.%20Le%20Dooba%20(Future%20Bass)%20-%20Souvik.mp3");
    }
    playE() {
        audioRequestService.requestAudioPlay(environment.cdnUrl + "/music/the-coffeeroom-bootleg/05.%20Bulleya%20(DnB)%20-%20Jsm33t.mp3");
    }
}
