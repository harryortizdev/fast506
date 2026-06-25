type ActiveLike = {
  isActive?: unknown;
  active?: unknown;
};

const normalizeBoolean = (value: unknown): boolean | null => {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "number") {
    return value === 1;
  }

  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();

    if (["true", "1", "si", "yes", "y", "activo", "active"].includes(normalized)) {
      return true;
    }

    if (["false", "0", "no", "n", "inactivo", "inactive"].includes(normalized)) {
      return false;
    }
  }

  return null;
};

export const isRecordActive = (record?: ActiveLike | null): boolean => {
  if (!record) {
    return true;
  }

  const isActive = normalizeBoolean(record.isActive);
  const active = normalizeBoolean(record.active);

  if (isActive === false || active === false) {
    return false;
  }

  if (isActive === true || active === true) {
    return true;
  }

  return true;
};

export const filterWorkshopSchedulesWithoutReport = (
  repairReports: Array<any> = [],
  workshopSchedules: Array<any> = []
): Array<any> => {
  const activeRepairReports = repairReports.filter((report) => isRecordActive(report));

  const appointmentIdsWithReport = new Set(
    activeRepairReports
      .map((report) => Number(report.idAppointment))
      .filter((value) => Number.isFinite(value) && value > 0)
  );

  return workshopSchedules
    .filter((workshopSchedule) => isRecordActive(workshopSchedule))
    .filter((workshopSchedule) => {
      const appointmentId = Number(workshopSchedule.idAppointment);
      return (
        Number.isFinite(appointmentId) &&
        appointmentId > 0 &&
        !appointmentIdsWithReport.has(appointmentId)
      );
    });
};
