const fs = require('fs');

const deleteDirectory = async()=>{
    fs.rmdir('uploads', { recursive: true }, (err) => {
        if (err) {
            throw err;
        }
    });
}

module.exports.deleteUploadDirectory = deleteDirectory;