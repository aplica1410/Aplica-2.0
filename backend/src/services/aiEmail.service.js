import Application from "../models/Application.js";
import { generateFreelanceEmail } from "./openai.service.js";

/**
 * Generate email from JD and save it to application
 */
export const generateEmailFromJD = async (applicationId) => {
  const application = await Application.findById(applicationId);

  if (!application) {
    throw new Error("Application not found");
  }

  // ✅ Call the CORRECT OpenAI service
  const aiResult = await generateFreelanceEmail(
    application.jobDescription
  );

  // ✅ Save generated content
  application.subject = aiResult.subject;
  application.emailBody = aiResult.body; // IMPORTANT: match frontend field
  application.status = "draft";

  await application.save();

  return {
    subject: application.subject,
    body: application.emailBody,
  };
};
