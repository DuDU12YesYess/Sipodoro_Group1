const express=require("express");
const router=express.Router();
const backupController =require("../controllers/backupController");

// Create backup
router.post("/",backupController.createBackup);

// Get backup files
router.get("/files",backupController.getFiles);

// Read backup
router.get("/:filename",backupController.getBackup);

// Delete backup
router.delete("/:filename",backupController.deleteBackup);

module.exports=router;
