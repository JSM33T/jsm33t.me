import lightGallery from 'lightgallery';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import lgFullscreen from 'lightgallery/plugins/fullscreen';

import lgVideo from 'lightgallery/plugins/video';

let galleryInstances: any = [];

export function initializeLightGallery() {
	cleanLightGallery();
	const gallery = document.querySelectorAll('.gallery');

	if (gallery.length) {
		for (let i = 0; i < gallery.length; i++) {
			//@ts-ignore
			const thumbnails = gallery[i].dataset.thumbnails ? true : false,
				//@ts-ignore
				video = gallery[i].dataset.video ? true : false,
				defaultPlugins = [lgZoom, lgFullscreen],
				videoPlugin = video ? [lgVideo] : [],
				thumbnailPlugin = thumbnails ? [lgThumbnail] : [],
				plugins = [...defaultPlugins, ...videoPlugin, ...thumbnailPlugin];
			//@ts-ignore
			const instance = lightGallery(gallery[i], {
				selector: '.gallery-item',
				plugins: plugins,
				licenseKey: 'D4194FDD-48924833-A54AECA3-D6F8E646',
				download: false,
                pager:true,

                showCloseIcon:true,
                closable:true,
                closeOnTap : true,
				autoplayVideoOnSlide: true,
				zoomFromOrigin: false,
				youtubePlayerParams: {
					modestbranding: 1,
					showinfo: 0,
					rel: 0,
				},
				vimeoPlayerParams: {
					byline: 0,
					portrait: 0,
					color: '6366f1',
				},
			});

			galleryInstances.push(instance);
		}
	}
}

export function cleanLightGallery() {
	//@ts-ignore
	galleryInstances.forEach((instance) => {
		instance.destroy();
	});
	galleryInstances = [];
}
