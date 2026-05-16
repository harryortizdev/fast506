import Swal from "sweetalert2";

const AlertConfirm = async (mensaje: string): Promise<boolean> => {
  const result = await Swal.fire({
    title: "¿Está seguro?",
    text: mensaje,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
    width: window.innerWidth < 576 ? "90%" : "32rem",
    padding: window.innerWidth < 576 ? "1rem" : "1.5rem",

    customClass: {
      popup: "responsive-swal",
      title: "responsive-swal-title",
      htmlContainer: "responsive-swal-text",
      confirmButton: "responsive-swal-btn",
      cancelButton: "responsive-swal-btn",
    },

    buttonsStyling: true,
  });

  return result.isConfirmed;
};

export default AlertConfirm;