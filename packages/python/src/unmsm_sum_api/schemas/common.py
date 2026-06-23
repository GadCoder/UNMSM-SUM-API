from typing import Any

from pydantic import BaseModel, ConfigDict


class FlexibleModel(BaseModel):
    model_config = ConfigDict(extra="allow")


class BaseResponse(FlexibleModel):
    mensaje: str
    codigo: str


class NullableDataResponse(BaseResponse):
    data: Any | None
