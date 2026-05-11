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
    });

    return result.isConfirmed;
};

export default AlertConfirm;