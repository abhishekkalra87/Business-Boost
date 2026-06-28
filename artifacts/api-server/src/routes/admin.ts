import { Router } from "express";
import { db } from "@workspace/db";
import { contactsTable } from "@workspace/db";
import { desc } from "drizzle-orm";

const router = Router();

const ADMIN_TOKEN = process.env.ADMIN_SECRET_TOKEN || "4570bf95c33776a4303b7cc4";

router.get("/admin/:token/contacts", async (req, res) => {
  if (req.params.token !== ADMIN_TOKEN) {
    res.status(404).json({ error: "Not found" });
    return;
  }

  try {
    const contacts = await db
      .select()
      .from(contactsTable)
      .orderBy(desc(contactsTable.createdAt));

    res.status(200).json({ contacts });
  } catch (err) {
    req.log.error({ err }, "Failed to fetch contacts");
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});

export default router;
