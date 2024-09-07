declare var bootstrap: any;

let currentToast: any = null;

export default function acToaster(title: string, message: string, durationInSeconds: number = 5) {
	// Destroy the existing toast if there is one
	if (currentToast) {
		currentToast.hide();
	}

	// Create the toast container
	const toastContainer = document.createElement('div');
	toastContainer.classList.add('toast');
	toastContainer.setAttribute('role', 'alert');
	toastContainer.setAttribute('aria-live', 'assertive');
	toastContainer.setAttribute('aria-atomic', 'true');

	// Set the inner HTML of the toast container using template string
	toastContainer.innerHTML = `
        <div class="toast-header">
            <strong class="me-auto">${title}</strong>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
            ${message}
        </div>
    `;

	// Create or get the toast container wrapper
	let toastContainerWrapper = document.getElementById('toast-container-wrapper');
	if (!toastContainerWrapper) {
		toastContainerWrapper = document.createElement('div');
		toastContainerWrapper.id = 'toast-container-wrapper';
		toastContainerWrapper.style.top = '20px';
		toastContainerWrapper.style.display = 'flex';
		toastContainerWrapper.style.justifyContent = 'center';
		document.body.appendChild(toastContainerWrapper);
	}

	// Clear the wrapper of any existing toasts
	toastContainerWrapper.innerHTML = '';

	// Append the new toast to the container
	toastContainerWrapper.appendChild(toastContainer);

	// Initialize the toast using Bootstrap's JavaScript API
	const toastInstance = new bootstrap.Toast(toastContainer, {
		autohide: true,
		delay: durationInSeconds * 1000, // Convert seconds to milliseconds
	});

	// Show the toast
	toastInstance.show();

	// Set the current toast
	currentToast = toastInstance;

	// Remove the toast from the DOM after it's hidden
	toastContainer.addEventListener('hidden.bs.toast', function () {
		if (toastContainerWrapper!.contains(toastContainer)) {
			toastContainerWrapper!.removeChild(toastContainer);
		}
		// Remove the wrapper if it's empty
		if (toastContainerWrapper!.children.length === 0) {
			document.body.removeChild(toastContainerWrapper!);
		}
		// Clear the current toast reference
		if (currentToast === toastInstance) {
			currentToast = null;
		}
	});
}
