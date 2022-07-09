import { User } from "src/entity/User";
import { classToPlain } from "class-transformer";

export const LoginResponse = (
    token: string,
    refreshToken: string,
    user: User
) => {
    const plainUser = classToPlain(user);

    return {
        token,
        refreshToken,
        user: plainUser,
    };
};
