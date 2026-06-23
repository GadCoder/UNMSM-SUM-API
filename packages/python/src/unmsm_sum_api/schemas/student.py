from typing import Any

from .common import BaseResponse, FlexibleModel


class StudentInfo(FlexibleModel):
    apePaterno: str
    apeMaterno: str
    nombre: str
    codFacultad: int
    desFacultad: str
    foto: str
    sexo: str
    correoInstitucional: str
    dni: str
    codAlumno: str
    codEscuela: int
    desEscuela: str
    codEspecialidad: int
    desEspecialidad: str
    codPlan: str
    desPlan: str
    ponderado: float
    actualizoFormulario: bool
    periodo: str
    urlFoto: str
    codPermanencia: str
    desPermanencia: str
    codSituacion: str
    desSituacion: str
    regimen: str
    egresadoEG: str
    anioIngreso: int
    matricula: Any | None


class PersonalInformationResponse(BaseResponse):
    data: dict[str, Any]
