import httpx

from .endpoints import ENDPOINTS
from .http import HttpClient
from .schemas import (
    AcademicHistoryResponse,
    CourseScheduleResponse,
    EnrollmentInformationResponse,
    LoginResponse,
    NullableDataResponse,
    PersonalInformationResponse,
    StudentInfo,
    TutoringResponse,
)


class SumClient:
    def __init__(
        self,
        *,
        base_url: str = "https://sum2.unmsm.edu.pe/sumapi",
        token: str | None = None,
        refresh_token: str | None = None,
        client: httpx.Client | None = None,
    ) -> None:
        self.base_url = base_url.rstrip("/")
        self.token = token
        self.refresh_token = refresh_token
        self._client = client or httpx.Client()
        self._http = HttpClient(base_url=self.base_url, client=self._client, get_token=lambda: self.token)

    def close(self) -> None:
        """Close the underlying HTTP client."""
        self._client.close()

    def __enter__(self) -> "SumClient":
        return self

    def __exit__(self, *args: object) -> None:
        self.close()

    def login(self, username: str, password: str) -> LoginResponse:
        """Authenticate with SUM credentials and store the returned access and refresh tokens."""
        response = self._request(
            ENDPOINTS["login"],
            LoginResponse,
            method="POST",
            json={"username": username, "password": password},
            auth=False,
        )
        self.token = response.token
        self.refresh_token = response.refreshToken
        return response

    def get_student_info(self) -> StudentInfo:
        """Get general academic and enrollment profile information for the authenticated student."""
        return self._request(ENDPOINTS["student_info"], StudentInfo)

    def get_personal_information(self) -> PersonalInformationResponse:
        """Get the personal information form data registered for the authenticated student."""
        return self._request(ENDPOINTS["personal_information"], PersonalInformationResponse)

    def get_academic_history(self) -> AcademicHistoryResponse:
        """Get the authenticated student's academic history grouped by semester."""
        return self._request(ENDPOINTS["academic_history"], AcademicHistoryResponse)

    def get_enrollment_information(self) -> EnrollmentInformationResponse:
        """Get enrollment-period information, including whether online enrollment is enabled."""
        return self._request(ENDPOINTS["enrollment_information"], EnrollmentInformationResponse)

    def get_enrollment(self) -> NullableDataResponse:
        """Get the authenticated student's current enrollment data, when available."""
        return self._request(ENDPOINTS["enrollment"], NullableDataResponse)

    def get_course_schedule(self) -> CourseScheduleResponse:
        """Get available course scheduling information, including sections, teachers, and class times."""
        return self._request(ENDPOINTS["course_schedule"], CourseScheduleResponse)

    def get_tutoring(self) -> TutoringResponse:
        """Get tutoring assignments or tutoring records for the authenticated student."""
        return self._request(ENDPOINTS["tutoring"], TutoringResponse)

    def _request(self, *args, **kwargs):
        return self._http.request(*args, **kwargs)
