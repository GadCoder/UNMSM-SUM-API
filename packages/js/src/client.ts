import { ENDPOINTS } from "./endpoints.js";
import { HttpClient } from "./http.js";
import {
  AcademicHistoryResponseSchema,
  CourseScheduleResponseSchema,
  EnrollmentInformationResponseSchema,
  LoginResponseSchema,
  NullableDataResponseSchema,
  PersonalInformationResponseSchema,
  StudentInfoSchema,
  TutoringResponseSchema,
  type AcademicHistoryResponse,
  type CourseScheduleResponse,
  type EnrollmentInformationResponse,
  type LoginRequest,
  type LoginResponse,
  type NullableDataResponse,
  type PersonalInformationResponse,
  type StudentInfo,
  type TutoringResponse,
} from "./schemas/index.js";

export type SumClientOptions = {
  baseUrl?: string;
  token?: string;
  refreshToken?: string;
  fetch?: typeof fetch;
};

export class SumClient {
  private readonly http: HttpClient;
  private token?: string;
  private refreshToken?: string;

  constructor(options: SumClientOptions = {}) {
    this.token = options.token;
    this.refreshToken = options.refreshToken;
    this.http = new HttpClient({
      baseUrl: options.baseUrl ?? "https://sum2.unmsm.edu.pe/sumapi",
      fetch: options.fetch ?? fetch,
      getToken: () => this.token,
    });
  }

  /** Returns the current access token stored by the client, if any. */
  get accessToken(): string | undefined {
    return this.token;
  }

  /** Returns the current refresh token stored by the client, if any. */
  get currentRefreshToken(): string | undefined {
    return this.refreshToken;
  }

  /** Authenticates with SUM credentials and stores the returned access and refresh tokens. */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await this.http.request(ENDPOINTS.login, LoginResponseSchema, {
      method: "POST",
      body: credentials,
      auth: false,
    });

    this.token = response.token;
    this.refreshToken = response.refreshToken;
    return response;
  }

  /** Gets general academic and enrollment profile information for the authenticated student. */
  getStudentInfo(): Promise<StudentInfo> {
    return this.http.request(ENDPOINTS.studentInfo, StudentInfoSchema);
  }

  /** Gets the personal information form data registered for the authenticated student. */
  getPersonalInformation(): Promise<PersonalInformationResponse> {
    return this.http.request(ENDPOINTS.personalInformation, PersonalInformationResponseSchema);
  }

  /** Gets the authenticated student's academic history grouped by semester. */
  getAcademicHistory(): Promise<AcademicHistoryResponse> {
    return this.http.request(ENDPOINTS.academicHistory, AcademicHistoryResponseSchema);
  }

  /** Gets enrollment-period information, including whether online enrollment is enabled. */
  getEnrollmentInformation(): Promise<EnrollmentInformationResponse> {
    return this.http.request(ENDPOINTS.enrollmentInformation, EnrollmentInformationResponseSchema);
  }

  /** Gets the authenticated student's current enrollment data, when available. */
  getEnrollment(): Promise<NullableDataResponse> {
    return this.http.request(ENDPOINTS.enrollment, NullableDataResponseSchema);
  }

  /** Gets available course scheduling information, including sections, teachers, and class times. */
  getCourseSchedule(): Promise<CourseScheduleResponse> {
    return this.http.request(ENDPOINTS.courseSchedule, CourseScheduleResponseSchema);
  }

  /** Gets tutoring assignments or tutoring records for the authenticated student. */
  getTutoring(): Promise<TutoringResponse> {
    return this.http.request(ENDPOINTS.tutoring, TutoringResponseSchema);
  }
}
