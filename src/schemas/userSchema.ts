import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
    body: object({
        firstName: string({
          required_error: "First name is required",
        }),
        lastName: string({
          required_error: "Last name is required",
        }),
        password: string({
          required_error: "Password is required",
        }).min(6, "Password is too short - should be min 6 chars"),
        passwordConfirmation: string({
          required_error: "Password confirmation is required",
        }),
        email: string({
          required_error: "Email is required",
        }).email("Not a valid email"),
        phone: string({
            required_error: "Phone is required",
          }),
      }).refine((data) => data.password === data.passwordConfirmation, {
        message: "Passwords do not match",
        path: ["passwordConfirmation"],
      }),
  });


  export const getUserProfileSchema = object({
    params: object({
      userID: string({
        required_error: "User ID is required",
      }),
    }),
  });

  export const updateUserProfileSchema = object({
    params: object({
      userID: string({
        required_error: "User ID is required",
      }),
    }),
    body: object({
      userphone: string({
        required_error: "Phone is required",
      }),
      emergencyContact: object({
        name: string({
          required_error: "Emergency contact name is required",
        }),
        phone: string({
          required_error: "Emergency contact phone is required",
        }),
        relation: string({
          required_error: "Emergency contact relation is required",
        }),
      }).nullable(),
    }),
  });

export type UpdateUserProfileInput = TypeOf<typeof updateUserProfileSchema>;
export type CreateUserInput = TypeOf<typeof createUserSchema>;
export type GetUserProfileInput = TypeOf<typeof getUserProfileSchema>;