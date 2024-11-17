import { Component } from '@angular/core';
import { audioRequestService } from '../../shared/audio-player/audio-player.component';
import { environment } from '../../../../environment/environment';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [],
  templateUrl: './features.component.html',
  styleUrl: './features.component.css'
})
export class FeaturesComponent {


    playA() {
		audioRequestService.requestAudioPlay(environment.cdnUrl + 'http://localhost:8080/music/features/1.%20Electronyk%20Maestro%20shoutout%202019%20ep%2015.mp3');
	}

	playB() {
		audioRequestService.requestAudioPlay(environment.cdnUrl + '/music/features/2.%2098.3fm%20BULLEYA%20(JSM33T%20REMIX).mp3');
	}

	playC() {
		audioRequestService.requestAudioPlay(environment.cdnUrl + '/music/features/3.%2098.3fm%20ZARA%20ZARA%20-%20JSM33T.mp3');
	}
	playD() {
		audioRequestService.requestAudioPlay(environment.cdnUrl + '/music/features/4.%20DJ%20Vector%20-%20Deep%20House%20Podcast%20Shoutout.mp3');
	}
	playE() {
		audioRequestService.requestAudioPlay(environment.cdnUrl + '/music/features/5.%2098.3fm%20TUJE%20BHULA%20-JASMEET.mp3');
	}
    playF() {
		audioRequestService.requestAudioPlay(environment.cdnUrl + '/music/features/6.%2098.3fm%20WAJAH%20TUM%20HO%20-%20JSM33T.mp3');
	}
    playG() {
		audioRequestService.requestAudioPlay(environment.cdnUrl + '/music/features/7.%2098.3%20YOUNG%20AGAIN.mp3');
	}
    playH() {
		audioRequestService.requestAudioPlay(environment.cdnUrl + '/music/features/8.%20NGP%20Ep3%20Wajah%20Tum%20Ho%20-%20JSM33T.mp3');
	}
    playI() {
		audioRequestService.requestAudioPlay(environment.cdnUrl + '/music/features/9.%2098.3fm%20pee%20loon.mp3');
	}
    playJ() {
		audioRequestService.requestAudioPlay(environment.cdnUrl + '/music/features/10.%2098.3fm%20TERI%20KHAIR%20MANGDI%20-%20JSM33T.mp3');
	}
    
}
