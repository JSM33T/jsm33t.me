import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComingSoonComponent } from '../../shared/coming-soon/coming-soon.component';
import { AudioPlayerComponent, audioRequestService } from '../../shared/audio-player/audio-player.component';

@Component({
	selector: 'app-attributions',
	standalone: true,
	imports: [RouterModule,AudioPlayerComponent],
	templateUrl: './attributions.component.html',
})
export class AttributionsComponent {

    something(){
       
        audioRequestService.requestAudioPlay("assets/audio/Stuff.mp3");
      
}
}
