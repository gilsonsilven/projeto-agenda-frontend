import Swal from 'sweetalert2';





export const showError = (resTitle, resErrors) => {

    const errors = Object.entries(resErrors)
        .flatMap(([field, messages]) =>
        messages.map((msg) => `<b>${field}:</b> ${msg}`)
    );


    Swal.fire({
        icon: 'error',
        title: resTitle,
        customClass: {
            title: 'swal-title'
        },
        html: `<ul style="text-align: left; font-size: 14px">${errors.map(err => `<li>${err}</li><br>`).join('')}</ul>`
    })
};


export const showSuccess = (resTitle) => {
  Swal.fire({
    icon: 'success',
    title: resTitle,
    customClass: {
        title: 'swal-title'
    }

  });
};


export const showConfirm = async (title) => {
  return await Swal.fire({
    title,
    customClass: {
        title: 'swal-title',
        container: 'swal-container'
    },
    //text: message,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sim',
    cancelButtonText: 'Cancelar'
  });


};