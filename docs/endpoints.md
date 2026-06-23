# Endpoints

Base URL: `https://sum2.unmsm.edu.pe/sumapi`

All endpoints except `POST /auth/login` require `Authorization: Bearer <token>`.

| Method | Path | SDK Method |
| --- | --- | --- |
| POST | `/auth/login` | `login` |
| GET | `/alumno/info` | `getStudentInfo` / `get_student_info` |
| GET | `/alumno/mostrarInformacionPersonalFormulario` | `getPersonalInformation` / `get_personal_information` |
| GET | `/alumno/mostrarHistorialAcademicoXsemestre` | `getAcademicHistory` / `get_academic_history` |
| GET | `/matricula/informacionMatricula` | `getEnrollmentInformation` / `get_enrollment_information` |
| GET | `/matricula/mostrarMatricula` | `getEnrollment` / `get_enrollment` |
| GET | `/matricula/obtenerProgramacionCursos` | `getCourseSchedule` / `get_course_schedule` |
| GET | `/alumno/tutoria` | `getTutoring` / `get_tutoring` |

## Validation

The SDKs validate observed fields while allowing extra fields:

- TypeScript uses `zod` with `.passthrough()`.
- Python uses `pydantic` with `extra="allow"`.

This helps detect important type changes or missing required fields without breaking when the API adds new fields.

## Contract

The public contract reference is `openapi/sum-api.yaml`.

The schemas used by the SDKs live in:

- `packages/js/src/schemas/`
- `packages/python/src/unmsm_sum_api/schemas/`

When new endpoints are added, update this table, the OpenAPI contract, and the schemas in both SDKs.
