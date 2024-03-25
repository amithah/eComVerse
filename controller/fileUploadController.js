
const AWS = require('aws-sdk');


const actionS3Objects = {
  putObject: 'putObject',
  getObject: 'getObject'
};


/**
 * @description : uploads file using formidable.
 * @param {Object} req : request of file upload API
 * @param {Object} res : response of file upload API.
 * @return {Object} : response of file upload. {status, message, data}
 */
const upload = async (req, res) => {

  const { action, fileName, ResponseContentType } = req.body;
  const signedUrlExpire = 60 * 5; // 600 seconds, 5 minutes

  const S3_PRESIGNEDBUCKET = process.env.S3_PRESIGNEDBUCKET;
  const S3_PRESIGNEDREGION = process.env.S3_PRESIGNEDREGION;

  try {
    //AWS Configuration
    // AWS.config.update({
    //   region: S3_PRESIGNEDREGION
    // });

    var credentials = {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey : process.env.S3_SECRET_KEY
  };
  AWS.config.update({credentials: credentials,  region: S3_PRESIGNEDREGION});
    // Create a new instance of S3
    const s3 = new AWS.S3({
      apiVersion: '2006-03-01',
      signatureVersion: 'v4',
    });

    // Set up the payload of what we are sending to the S3 api
    const s3Params = {
      Bucket: S3_PRESIGNEDBUCKET,
      Key: fileName,
      Expires: signedUrlExpire
    };
    if (ResponseContentType) {
      s3Params['ResponseContentType'] = ResponseContentType;
    }

    if (
      action === actionS3Objects.putObject ||
      action === actionS3Objects.getObject
    ) {
      
      const data = await s3.getSignedUrlPromise(action, s3Params);
    
      const returnData = {
        signedRequest: data,
        url: `https://${S3_PRESIGNEDBUCKET}.s3.${S3_PRESIGNEDREGION}.amazonaws.com/${fileName}`
      };
  
      res.status(200).json({ success: true, data: returnData });
    }
    // DeleteObject - Validate if file exists in S3
    else if (action === actionS3Objects[2]) {
      const s3DeleteParams = {
        Bucket: S3_PRESIGNEDBUCKET,
        Key: fileName
      };
      try {
        await s3.headObject(s3DeleteParams).promise();
        const deleteFile = await s3.deleteObject(s3DeleteParams).promise();
        console.log('File deleted Successfully');
        res.status(200).json(deleteFile);
      } catch (err) {
        console.log('File not Found ERROR : ' + err.code);
        res.status(400).json(err);
      }
    } 
    else {
      res.status(400).json({ success: false, error: err });
    }
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};


module.exports = { upload };
