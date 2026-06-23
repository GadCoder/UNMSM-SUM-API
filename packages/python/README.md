# unmsm-sum-api

Unofficial Python client for observed UNMSM SUM system endpoints.

This package is not affiliated with, endorsed by, or maintained by Universidad Nacional Mayor de San Marcos.

The endpoints and payload shapes were extracted by inspecting the HTTP requests made by the university's official mobile application, Portal UNMSM: https://play.google.com/store/apps/details?id=com.portalunmsm&hl=es

Package: https://pypi.org/project/unmsm-sum-api/

## Installation

```sh
pip install unmsm-sum-api
```

With `uv`:

```sh
uv add unmsm-sum-api
```

## Usage

```python
from unmsm_sum_api import SumClient

with SumClient() as client:
    client.login("username", "password")
    info = client.get_student_info()
```
