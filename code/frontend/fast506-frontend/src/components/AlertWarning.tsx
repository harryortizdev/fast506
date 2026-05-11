import Swal from "sweetalert2";

const AlertWarning = (mensaje: string) => {
    Swal.fire({
        text: mensaje,
        icon: "error",
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        customClass: {
            popup: "swal-redondo",
        },
    });
};

export default AlertWarning;