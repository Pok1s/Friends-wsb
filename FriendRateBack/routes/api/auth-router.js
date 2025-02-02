import express from "express";
import authController from "../../controllers/auth-controller.js";
import {
  userSigninSchema,
  userSignupSchema,
  //   userEmailSchema,
} from "../../schemas/user-schema.js";

import { authenticate, isEmptyBody, upload } from "../../middlewares/index.js";
import validateBody from "../../decorators/validaterBody.js";
import { tryCatchWrapper } from "../../helpers/try-catch-wrapper.js";
import { googleAuth, googleRedirect } from "../../controllers/auth-google.js";
import authTelegram from "../../controllers/auth-telegram.js";
import {
  getFacebookLoginUrl,
  getFacebookUserData,
} from "../../controllers/auth-facebook.js";
import { resetPassword, forgotPassword } from "../../controllers/reset-password.js";
import { handleUpload, uploadToCloudinary } from "../../middlewares/uploadCloud.js";
import { updateAvatar } from "../../controllers/update-avatar.js";


const authRouter = express.Router();

authRouter.post(
  "/register",
  isEmptyBody,
  validateBody(userSignupSchema),
  authController.signup
);

authRouter.post(
  "/login",
  isEmptyBody,
  validateBody(userSigninSchema),
  authController.signin
);

authRouter.get("/current", authenticate, authController.current);

authRouter.post("/get-all", authController.getAllUsers);

authRouter.post("/get-all-rate", authController.getAllUsersWithoutId);

authRouter.patch("/update", authenticate, authController.updateProfile);

authRouter.patch("/set-rate", authController.setRate);

authRouter.get("/verify/:verificationToken", authController.verifyMail);

authRouter.post("/verify", isEmptyBody, authController.verifyMail);

authRouter.patch(
  "/avatars",
  handleUpload,
  uploadToCloudinary,
  authenticate,
  tryCatchWrapper(updateAvatar)
);

authRouter.post("/logout", authenticate, authController.signout);

authRouter.delete("/delete", authenticate, authController.deleteUser);

authRouter.get("/google", tryCatchWrapper(googleAuth));

authRouter.get("/google-redirect", tryCatchWrapper(googleRedirect));

authRouter.get("/facebook", tryCatchWrapper(getFacebookLoginUrl));

authRouter.get("/facebook-redirect", tryCatchWrapper(getFacebookUserData));

authRouter.post("/forgot-password", isEmptyBody, tryCatchWrapper(forgotPassword));

authRouter.post("/reset-password/:resetToken", isEmptyBody, tryCatchWrapper(resetPassword));

authRouter.post('/telegram', authTelegram.telegram)

export default authRouter;
