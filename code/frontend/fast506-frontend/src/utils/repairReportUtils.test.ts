import { filterWorkshopSchedulesWithoutReport } from "./repairReportUtils";

describe("filterWorkshopSchedulesWithoutReport", () => {
  it("excluye citas inactivas y las que ya tienen reporte activo", () => {
    const repairReports = [
      { idReparation: 1, idAppointment: 101, isActive: true },
      { idReparation: 2, idAppointment: 202, isActive: false },
    ];

    const workshopSchedules = [
      { idAppointment: 101, numberReference: 1, isActive: true, active: true },
      { idAppointment: 202, numberReference: 2, isActive: true, active: true },
      { idAppointment: 303, numberReference: 3, isActive: false, active: true },
      { idAppointment: 404, numberReference: 4, isActive: true, active: false },
      { idAppointment: 505, numberReference: 5, isActive: true, active: true },
    ];

    const result = filterWorkshopSchedulesWithoutReport(repairReports, workshopSchedules);

    expect(result.map((item) => item.idAppointment)).toEqual([202, 505]);
  });
});
