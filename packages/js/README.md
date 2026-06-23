# unmsm-sum-api

Unofficial TypeScript client for observed UNMSM SUM system endpoints.

This package is not affiliated with, endorsed by, or maintained by Universidad Nacional Mayor de San Marcos.

The endpoints and payload shapes were extracted by inspecting the HTTP requests made by the university's official mobile application, Portal UNMSM: https://play.google.com/store/apps/details?id=com.portalunmsm&hl=es

Package: https://www.npmjs.com/package/unmsm-sum-api

## Installation

```sh
npm install unmsm-sum-api
```

## Usage

```ts
import { SumClient } from "unmsm-sum-api";

const client = new SumClient();
await client.login({ username: "username", password: "password" });

const info = await client.getStudentInfo();
```
