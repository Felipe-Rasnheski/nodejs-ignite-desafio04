import { Request, Response } from "express";
import { User } from "modules/users/model/User";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

class ListAllUsersController {
  private users: User[];
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

  handle(request: Request, response: Response): Response {
    const { user_id } = request.headers;

    try {
      this.users = this.listAllUsersUseCase.execute({ user_id });
    } catch {
      return response
        .status(400)
        .json({ error: `User ${user_id} is not admin` });
    }

    return response.status(200).json(this.users);
  }
}

export { ListAllUsersController };
