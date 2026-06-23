from typing import Any, Callable, TypeVar

import httpx
from pydantic import BaseModel

from .errors import SumApiError

TModel = TypeVar("TModel", bound=BaseModel)


class HttpClient:
    def __init__(self, *, base_url: str, client: httpx.Client, get_token: Callable[[], str | None]) -> None:
        self.base_url = base_url.rstrip("/")
        self.client = client
        self.get_token = get_token

    def request(
        self,
        path: str,
        model: type[TModel],
        *,
        method: str = "GET",
        json: dict[str, Any] | None = None,
        auth: bool = True,
    ) -> TModel:
        headers = {"accept": "application/json"}
        if auth:
            token = self.get_token()
            if not token:
                raise RuntimeError("Authentication token is required. Call login() or pass token in the constructor.")
            headers["authorization"] = f"Bearer {token}"

        response = self.client.request(method, f"{self.base_url}{path}", headers=headers, json=json)
        body = response.json() if response.content else None

        if response.is_error:
            raise SumApiError(f"SUM API request failed with status {response.status_code}", response.status_code, body)

        return model.model_validate(body)
