import { Request, Response } from "express";
import { User } from "modules/users/model/User";

import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

class ShowUserProfileController {
  private user: User;
  constructor(private showUserProfileUseCase: ShowUserProfileUseCase) {}

  handle(request: Request, response: Response): Response {
    const { user_id } = request.params;

    try {
      this.user = this.showUserProfileUseCase.execute({ user_id });
    } catch {
      return response.status(404).json({ error: `User ${user_id} not found` });
    }

    return response.json(this.user);
  }
}

export { ShowUserProfileController };
