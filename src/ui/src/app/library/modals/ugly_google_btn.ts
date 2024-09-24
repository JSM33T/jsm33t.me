declare var bootstrap: any;

export default function openExistingModal(Id : string) {
  // Select the existing modal element by its ID (or class if needed)
  const modalElement = document.getElementById(Id) as HTMLElement;

  // Initialize and show the modal using Bootstrap's JavaScript API
  const modalInstance = new bootstrap.Modal(modalElement, {
    backdrop: 'static',  // Optional: To prevent closing on outside click
    keyboard: false      // Optional: To disable closing via the 'Esc' key
  });

  // Show the modal
  modalInstance.show();

  // Optional: Remove the modal from the DOM after it is hidden, if needed
  modalElement.addEventListener('hidden.bs.modal', function () {
    // Do any cleanup actions if necessary
  });
}


export function closeAllModals() {
    const modals = document.querySelectorAll('.modal.show'); // Select all open modals
    modals.forEach(modal => {
      const bootstrapModal = bootstrap.Modal.getInstance(modal); // Get the Bootstrap modal instance
      if (bootstrapModal) {
        bootstrapModal.hide(); // Hide the modal
      }
    });
  }
  