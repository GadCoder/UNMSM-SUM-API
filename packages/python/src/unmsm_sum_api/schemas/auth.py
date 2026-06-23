from .common import FlexibleModel


class LoginResponse(FlexibleModel):
    username: str
    fullName: str
    token: str
    refreshToken: str
    createAt: str
    expirationDate: str
