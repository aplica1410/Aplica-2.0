import Application from "../models/Application.js";
import { generateFreelanceEmail } from "./openai.service.js";

export const generateEmailFromJD = async (applicationId) => {
  const application = await Application.findById(applicationId);

  if (!application) {
    throw new Error("Application not found");
  }

  const { jobDescription } = application;

  const { subject, emailBody } = await generateFreelanceEmail({
    jobDescription,
  });

  application.subject = subject;
  application.emailBody = emailBody;
  application.status = "draft";

  await application.save();

  return {
    subject,
    emailBody,
  };
};
