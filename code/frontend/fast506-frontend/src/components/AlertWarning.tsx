import Swal from "sweetalert2";

const AlertWarning = (mensaje: string) => {
  Swal.fire({
    text: mensaje,
    icon: "error",
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    width: window.innerWidth < 576 ? "90%" : "28rem",
    padding: window.innerWidth < 576 ? "1rem" : "1.5rem",

    customClass: {
      popup: "swal-warning-responsive",
      htmlContainer: "swal-warning-text",
    },
  });
};

export default AlertWarning;