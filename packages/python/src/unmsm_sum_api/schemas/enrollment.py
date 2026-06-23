from typing import Any

from .common import BaseResponse, FlexibleModel


class EnrollmentInformation(FlexibleModel):
    codSemestre: str
    fechaDB: str
    fecIniMatInternet: str
    fecFinMatInternet: str
    mensajeMat: str
    indMatHabilitada: bool
    matricula: Any | None


class EnrollmentInformationResponse(BaseResponse):
    data: EnrollmentInformation
