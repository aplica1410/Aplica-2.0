import Application from "../models/Application.js";
import { generateFreelanceEmail } from "./openai.service.js";

export const generateEmailFromJD = async (
  applicationId,
  userProfile
) => {
  const application = await Application.findById(applicationId);

  if (!application) {
    throw new Error("Application not found");
  }

  const aiResult = await generateFreelanceEmail({
    jobDescription: application.jobDescription,
    userProfile,
  });

  application.subject = aiResult.subject;
  application.emailBody = aiResult.emailBody;
  application.status = "draft";

  await application.save();

  return {
    subject: application.subject,
    emailBody: application.emailBody,
  };
};
