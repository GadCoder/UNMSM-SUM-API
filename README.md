# unmsm-sum-api

Unofficial client for observed UNMSM SUM system endpoints.

This project is not affiliated with, endorsed by, or maintained by Universidad Nacional Mayor de San Marcos. The endpoints were inferred from observed requests and may change without notice.

The endpoints and payload shapes documented here were extracted by inspecting the HTTP requests made by the university's official mobile application, Portal UNMSM: https://play.google.com/store/apps/details?id=com.portalunmsm&hl=es

## Packages

- TypeScript/npm: `unmsm-sum-api`
- Python/PyPI: `unmsm-sum-api`, imported as `unmsm_sum_api`

## TypeScript Usage

```ts
import { SumClient } from "unmsm-sum-api";

const client = new SumClient();
await client.login({ username: "username", password: "password" });

const info = await client.getStudentInfo();
const history = await client.getAcademicHistory();
```

You can also initialize the client with an existing token:

```ts
const client = new SumClient({
  token: "access-token",
  refreshToken: "refresh-token",
});
```

## Python Usage

```python
from unmsm_sum_api import SumClient

with SumClient() as client:
    client.login("username", "password")
    info = client.get_student_info()
    history = client.get_academic_history()
```

You can also initialize the client with an existing token:

```python
client = SumClient(token="access-token", refresh_token="refresh-token")
```

## Structure

```txt
openapi/sum-api.yaml    Initial OpenAPI contract
packages/js/            npm SDK written in TypeScript with Zod
packages/python/        Python SDK with uv, httpx, and Pydantic
docs/                   Endpoint documentation
```

## Contract

`openapi/sum-api.yaml` is the public reference for the observed contract. The SDKs keep their runtime schemas in code:

- TypeScript: `packages/js/src/schemas/`
- Python: `packages/python/src/unmsm_sum_api/schemas/`

If observed endpoints or responses change, the update should be reflected in OpenAPI and both SDK packages.

## Contributing

Contributions are welcome, especially for new endpoints, better schemas, documentation fixes, and bug reports.

When contributing endpoint changes:

- Do not commit real credentials, tokens, cookies, student data, screenshots with personal information, or raw captured traffic.
- Use anonymized examples only when documenting payloads or behavior.
- Update `openapi/sum-api.yaml` with the observed route, method, request body, response body, and auth requirements.
- Update the TypeScript SDK in `packages/js/`, including endpoint constants, Zod schemas, and client methods when needed.
- Update the Python SDK in `packages/python/`, including endpoint constants, Pydantic models, and client methods when needed.
- Update `docs/` if the public endpoint list or usage changes.

Before opening a pull request, run the relevant checks:

```sh
cd packages/js
npm run check
npm run build
```

```sh
cd packages/python
uv run python -m compileall src
```

If a change is based on newly observed behavior from Portal UNMSM, describe what changed and which app version or date it was observed on, without including sensitive data.
