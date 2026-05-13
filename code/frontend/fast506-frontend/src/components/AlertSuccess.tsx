import Swal from "sweetalert2";

const AlertSuccess = (mensaje: string) => {
  Swal.fire({
    text: mensaje,
    icon: "success",
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    width: window.innerWidth < 576 ? "90%" : "28rem",
    padding: window.innerWidth < 576 ? "1rem" : "1.5rem",

    customClass: {
      popup: "swal-success-responsive",
      htmlContainer: "swal-success-text",
    },
  });
};

export default AlertSuccess;