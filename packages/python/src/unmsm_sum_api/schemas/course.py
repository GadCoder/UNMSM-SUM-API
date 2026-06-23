from .common import BaseResponse, FlexibleModel


class Schedule(FlexibleModel):
    codHorario: int
    horaInicio: str
    horaFin: str
    dia: str


class Section(FlexibleModel):
    codSeccion: int
    codTurno: str
    canTopeAlumnos: int
    canAlumMatriculados: int
    codTipoHorAsignatura: str
    codDocente: str
    nomDocente: str
    apePaterno: str
    apeMaterno: str
    codAula: str
    horarios: list[Schedule]


class CourseScheduleItem(FlexibleModel):
    codAsignatura: str
    desAsignatura: str
    canHorasTeoria: int
    canHorasPractica: int
    canHorasLaboratorio: int
    numCreditaje: float
    indRegimen: str
    seccion: list[Section]


class CourseScheduleGroup(FlexibleModel):
    asignatura: list[CourseScheduleItem]


class CourseScheduleResponse(BaseResponse):
    data: list[CourseScheduleGroup]
