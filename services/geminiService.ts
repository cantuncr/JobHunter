import { Job, UserProfile } from "../types";

// NO API KEY REQUIRED - PURE HOLLYWOOD MAGIC

const HOOK_TEMPLATES = [
  "I've analyzed {{company}}'s architecture. My background in {{skill}} allows me to cut your deployment times for the {{title}} role by 40% in the first month.",
  "Your {{title}} listing ignores a critical vector: candidates with {{skill}} expertise. I bridge that gap immediately.",
  "Traditional candidates apply. I hunt. I've already identified three optimization points in {{company}}'s public facing stack suitable for a {{title}}.",
  "I don't want a job, I want a mission. {{company}} needs a {{title}} who dominates {{skill}}. That is my exact operational profile.",
  "Scanning your requirements, I see you need efficiency. My {{experience}} proves I don't just write code; I engineer profit for {{company}}.",
  "Skip the interview. Give me a repo access token. I'll prove my worth as your next {{title}} utilizing {{skill}} before lunch.",
  "Detected a synergy match: {{company}}'s ambition + my {{skill}} proficiency. Initiating application protocol for {{title}}."
];

export const generateOptimization = async (job: Job, user: UserProfile): Promise<string> => {
  // 1. Simulate "Thinking" Delay (2 seconds)
  await new Promise(resolve => setTimeout(resolve, 2000));

  // 2. Select a random template
  const template = HOOK_TEMPLATES[Math.floor(Math.random() * HOOK_TEMPLATES.length)];

  // 3. Pick a random skill from user's profile (or default)
  const randomSkill = user.skills.length > 0 
    ? user.skills[Math.floor(Math.random() * user.skills.length)] 
    : "Systems Architecture";

  // 4. Inject Data
  const optimizedHook = template
    .replace(/{{company}}/g, job.company)
    .replace(/{{title}}/g, job.title)
    .replace(/{{skill}}/g, randomSkill)
    .replace(/{{experience}}/g, user.experience || "senior experience");

  return optimizedHook;
};