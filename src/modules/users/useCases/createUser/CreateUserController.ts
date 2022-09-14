import { Response, Request } from "express";
import { User } from "modules/users/model/User";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  private user: User;
  constructor(private createUserUseCase: CreateUserUseCase) {}

  handle(request: Request, response: Response): Response {
    const { name, email } = request.body;

    try {
      this.user = this.createUserUseCase.execute({ name, email });
    } catch {
      return response
        .status(400)
        .json({ error: `User with email ${email} already exists` });
    }

    return response.status(201).json(this.user);
  }
}

export { CreateUserController };
