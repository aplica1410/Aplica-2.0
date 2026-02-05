import Application from "../models/Application.js";
import { generateFreelanceEmail } from "./openai.service.js";

export const generateEmailFromJD = async (applicationId) => {
  const application = await Application.findById(applicationId);

  if (!application) {
    throw new Error("Application not found");
  }

  // AI result (example)
  const aiResult = await generateFromOpenAI(application.jobDescription);

  application.subject = aiResult.subject;
  application.body = aiResult.body;
  application.status = "draft";

  await application.save();

  return application;
};
