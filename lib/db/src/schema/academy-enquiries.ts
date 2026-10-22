import { pgTable, serial, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const academyEnquiriesTable = pgTable("academy_enquiries", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  enquiryType: text("enquiry_type").notNull(),
  courseInterest: text("course_interest"),
  company: text("company"),
  teamSize: text("team_size"),
  trainingNeeds: text("training_needs"),
  linkedinProfile: text("linkedin_profile"),
  expertise: text("expertise"),
  teachingExperience: text("teaching_experience"),
  privacyConsent: boolean("privacy_consent").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertAcademyEnquirySchema = createInsertSchema(academyEnquiriesTable).omit({
  id: true,
  createdAt: true,
});
export type InsertAcademyEnquiry = z.infer<typeof insertAcademyEnquirySchema>;
export type AcademyEnquiry = typeof academyEnquiriesTable.$inferSelect;
