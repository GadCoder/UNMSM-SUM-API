export const ENDPOINTS = {
  login: "/auth/login",
  studentInfo: "/alumno/info",
  personalInformation: "/alumno/mostrarInformacionPersonalFormulario",
  academicHistory: "/alumno/mostrarHistorialAcademicoXsemestre",
  enrollmentInformation: "/matricula/informacionMatricula",
  enrollment: "/matricula/mostrarMatricula",
  courseSchedule: "/matricula/obtenerProgramacionCursos",
  tutoring: "/alumno/tutoria",
} as const;
