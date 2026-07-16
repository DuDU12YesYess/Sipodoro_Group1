const backupRepository = require("../repository/backupRepository");
const backupHelper = require("../utils/backupHelper");

// Create Backup
const createBackup = async()=>{
    const data = await backupRepository.getAllData();
    const filename = backupHelper.saveBackup(data);
    return {
        message:"Backup created successfully",
        filename
    };
};
// Get backup list
const listBackups=()=>{
    return backupHelper.getBackupFiles();
};
// Read backup
const getBackup=(filename)=>{
    return backupHelper.readBackup(filename);
};
// Delete backup
const removeBackup=(filename)=>{
    backupHelper.deleteBackup(filename);
    return {
        message:"Backup deleted"
    };
};
module.exports={
    createBackup,
    listBackups,
    getBackup,
    removeBackup
};
