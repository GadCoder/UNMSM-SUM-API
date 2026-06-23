from typing import Any

from .common import BaseResponse, FlexibleModel


class AcademicCourse(FlexibleModel):
    codCurso: str
    ciclo: int
    desAsignatura: str
    desCalificacion: str
    codTipoActa: str
    numCreditaje: float
    valCalificacionFinal: float
    codPlan: str
    codSeccion: str
    numActa: str
    tipoAsignatura: str
    numResConv: Any | None


class AcademicSemester(FlexibleModel):
    codSemestre: str
    asignatura: list[AcademicCourse]


class AcademicHistoryResponse(BaseResponse):
    data: list[AcademicSemester]
