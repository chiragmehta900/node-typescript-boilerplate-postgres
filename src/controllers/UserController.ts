import { compare, hash } from "bcryptjs";
import { classToPlain } from "class-transformer";
import { Request, Response } from "express";
import { Role } from "../entity/Role";
import { User } from "../entity/User";
import { InternalServerError } from "../response/InternalServerErrorResponse";
import { RequestFailed } from "../response/RequestFailedResponse";
import { RoleType } from "./../types/RoleType";
import { getConnection } from "typeorm";
import { AuthRequest } from "../middlewares/AuthRequestContext";
import { LoginResponse } from "../response/LoginResponse";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  try {
    const phonenumber: string = req.body.phonenumber;
    const password: string = req.body.password;

    if (!phonenumber || !phonenumber.trim().length) {
      return RequestFailed(res, 400, "phonenumber");
    }

    if (!password || !password.trim().length) {
      return RequestFailed(res, 400, "password");
    }

    const user = await getConnection()
      .getRepository(User)
      .createQueryBuilder("user")
      .where("user.phoneNumber = :phonenumber", { phonenumber })
      .leftJoinAndSelect("user.role", "role")
      .getOne();

    if (!user) {
      return RequestFailed(res, 401, "Your email / password might be wrong.");
    } else {
      const isValidPass = await compare(password, user.password);
      if (!isValidPass) {
        return RequestFailed(res, 401, "You have entered a wrong password.");
      }
      if (!user.isActive) {
        return RequestFailed(res, 401, "Your account is not active.");
      }
      const data = {
        id: user.id,
        phonenumber: user.phoneNumber,
        tokenVersion: user.tokenVersion,
      };
      const token = await jwt.sign(data, process.env.TOKEN_SECRET!, {
        expiresIn: "7d",
      });

      const refreshToken = await jwt.sign(
        data,
        process.env.REFRESH_TOKEN_SECRET!,
        {
          expiresIn: "30d",
        }
      );
      if (token) {
        res.status(202).json(LoginResponse(token, refreshToken, user));

        if (user.role.name !== RoleType.admin) {
          user.save();
        }
      }
    }
  } catch (error) {
    return InternalServerError(res, error);
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const firstname: string = req.body.firstName;
    const lastname: string = req.body.lastName;
    const password: string = req.body.password;
    const profileImage: string = req.body.profileImage || "";
    const phoneNumber: string = req.body.phoneNumber;
    const timestamp = req.body.timestamp
      ? new Date(req.body.timestamp)
      : new Date();

    if (!firstname || !firstname.trim().length) {
      return RequestFailed(res, 400, "firstname");
    }
    if (!lastname || !lastname.trim().length) {
      return RequestFailed(res, 400, "lastname");
    }
    if (!password || !password.trim().length) {
      return RequestFailed(res, 400, "password");
    }
    if (!phoneNumber || !phoneNumber.trim().length) {
      return RequestFailed(res, 400, "phonenumber");
    }

    const role = await Role.findOne({
      where: { name: RoleType.user },
    });

    const hashPassword = await hash(password, 12);

    if (role) {
      const user = new User();
      user.firstName = firstname;
      user.lastName = lastname;
      user.role = role;
      user.password = hashPassword;
      user.phoneNumber = phoneNumber;
      user.profileImage = profileImage;
      user.last_updated = new Date();
      user.timestamp = timestamp;
      await user.save();

      const userResponse = classToPlain(user);
      res.status(200).json({
        success: true,
        user: userResponse,
      });
    }
  } catch (error) {
    return InternalServerError(res, error);
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const query = req.query.search;
    const users = await getConnection()
      .getRepository(User)
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.role", "role")
      .where("user.firstName like :name", { name: `${query ? query : "%"}%` })
      .orderBy("user.timestamp", "DESC")
      .paginate();

    const { data, ...rest } = users;
    const newUsers: any[] = [];
    data.forEach((user: User) => {
      newUsers.push(classToPlain(user));
    });
    res.status(200).json({
      success: true,
      users: newUsers,
      ...rest,
    });
  } catch (error) {
    return InternalServerError(res, error);
  }
};

export const getUserById = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findOne(req.userId, {
      relations: ["role"],
    });

    if (!user) {
      return RequestFailed(res, 404, "user", req.userId);
    }

    const plainUser = classToPlain(user);
    res.status(200).json({
      success: true,
      user: plainUser,
    });
  } catch (error) {
    return InternalServerError(res, error);
  }
};

export const updateUser = async (req: AuthRequest, res: Response) => {
  try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const phoneNumber = req.body.phoneNumber;
    const email = req.body.email;
    const profileImage = req.body.profileImage || null;

    const user = await User.findOne(req.userId, { relations: ["role"] });
    if (!user) {
      return RequestFailed(res, 404, "user", req.userId);
    }
    if (firstName) {
      user.firstName = firstName;
    }
    if (lastName) {
      user.lastName = lastName;
    }
    if (phoneNumber) {
      user.phoneNumber = phoneNumber;
    }
    if (email) {
      user.email = email;
    }
    if (profileImage) {
      user.profileImage = profileImage;
    }

    await user.save();

    const userResponse = classToPlain(user);
    res.status(200).json({
      success: true,
      user: userResponse,
    });
  } catch (error) {
    return InternalServerError(res, error);
  }
};
