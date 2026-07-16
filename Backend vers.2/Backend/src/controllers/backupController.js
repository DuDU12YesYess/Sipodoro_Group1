const backupService = require("../services/backupService");

// POST /api/backup
const createBackup = async(req,res)=>{
    try{
        const result = await backupService.createBackup();
        res.json(result);
    }catch(error){
        res.status(500)
        .json({
            message:error.message
        });
    }
};
// GET /api/backup/files
const getFiles=(req,res)=>{
    try{
        const files =
        backupService.listBackups();
        res.json(files);
    }catch(error){
        res.status(500)
        .json({
            message:error.message
        });
    }
};
// GET single backup
const getBackup=(req,res)=>{
    try{
        const data = backupService.getBackup(
            req.params.filename
        );
        res.json(data);
    }catch(error){
        res.status(500)
        .json({
            message:error.message
        });
    }
};

// DELETE backup
const deleteBackup=(req,res)=>{
    try{
        const result = backupService.removeBackup(
            req.params.filename
        );
        res.json(result);
    }catch(error){
        res.status(500)
        .json({
            message:error.message
        });

    }
};
module.exports={
    createBackup,
    getFiles,
    getBackup,
    deleteBackup
};
