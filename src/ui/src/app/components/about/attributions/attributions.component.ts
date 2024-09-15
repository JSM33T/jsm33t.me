import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AudioPlayerComponent, audioRequestService } from '../../shared/audio-player/audio-player.component';
import { environment } from '../../../../environment/environment';

@Component({
	selector: 'app-attributions',
	standalone: true,
	imports: [RouterModule, AudioPlayerComponent],
	templateUrl: './attributions.component.html',
})
export class AttributionsComponent {
	something() {
		audioRequestService.requestAudioPlay('https://cdn.jsm33t.me/music/the-coffeeroom-bootleg/03.%20Titli%20(DnB)%20-%20Jsm33t.mp3');
	}
}
