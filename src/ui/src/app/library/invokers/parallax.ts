import Parallax from 'parallax-js';

let parallaxInstances: Parallax[] = [];
let parallaxInstance:any = null;

export function initParallax() {
	// destroyParallax();
	// const elements = document.querySelectorAll('.parallax');
	// //console.log(`Found ${elements.length} parallax elements.`);
	// for (let i = 0; i < elements.length; i++) {
	// 	// @ts-ignore
	// 	const parallaxInstance = new Parallax(elements[i]);
	// 	parallaxInstances.push(parallaxInstance);
      
	// 	//console.log(`Initialized parallax for element ${i}`);
	// }

let ff = localStorage.getItem("animations");

if(ff == "true")
{
    const element = document.querySelector('.parallax') as HTMLElement;
    if (element) {
        parallaxInstance = new Parallax(element);
    }
}
 
}

export function enableParallax() {
    if (parallaxInstance) {
        parallaxInstance.enable();
    }
}


export function disableParallax(){
    
    if (parallaxInstance) {
        parallaxInstance.disable();
    }
}

// Assuming you have a way to trigger these functions, such as on route change or component lifecycle methods
// Example usage:
// initParallax(); // to initialize
// destroyParallax(); // to destroy
