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

  // ✅ Always pass object (matches OpenAI service signature)
  const aiResult = await generateFreelanceEmail({
    jobDescription: application.jobDescription,
  });

  // 🔐 SINGLE SOURCE OF TRUTH
  application.subject = aiResult.subject;
  application.emailBody = aiResult.emailBody;
  application.status = "draft";

  await application.save();

  return {
    subject: application.subject,
    emailBody: application.emailBody,
  };
};
