from typing import Any

from .common import BaseResponse


class TutoringResponse(BaseResponse):
    data: list[dict[str, Any]]
