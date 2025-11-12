# AWS S3 Integration Setup Guide

This guide will help you set up AWS S3 file upload functionality in your Angular application.

## Prerequisites

1. AWS Account
2. S3 Bucket created
3. AWS IAM User with S3 permissions

## Step 1: Install Dependencies

```bash
npm install aws-sdk @types/aws-sdk
```

## Step 2: Configure AWS Credentials

### Option A: Environment Files (Recommended for development)

1. Update `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  aws: {
    region: 'your-aws-region', // e.g., 'us-east-1'
    accessKeyId: 'your-access-key-id',
    secretAccessKey: 'your-secret-access-key',
    bucketName: 'your-s3-bucket-name'
  }
};
```

2. Update `src/environments/environment.prod.ts` with the same values.

### Option B: AWS Credentials File (Alternative)

Create `~/.aws/credentials`:
```ini
[default]
aws_access_key_id = your-access-key-id
aws_secret_access_key = your-secret-access-key
```

Create `~/.aws/config`:
```ini
[default]
region = your-aws-region
```

## Step 3: S3 Bucket Configuration

1. **Create S3 Bucket**:
   - Go to AWS S3 Console
   - Create a new bucket
   - Choose your preferred region
   - Note the bucket name

2. **Configure Bucket Permissions**:
   - Go to bucket → Permissions tab
   - Update Block Public Access settings (if you need public access)
   - Update bucket policy if needed

3. **CORS Configuration** (if uploading from web):
```json
[
    {
        "AllowedHeaders": ["*"],
        "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
        "AllowedOrigins": ["*"],
        "ExposeHeaders": []
    }
]
```

## Step 4: IAM User Permissions

Create an IAM user with the following policy:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:GetObject",
                "s3:DeleteObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::your-bucket-name",
                "arn:aws:s3:::your-bucket-name/*"
            ]
        }
    ]
}
```

## Step 5: Update Configuration

1. Replace placeholder values in environment files:
   - `your-aws-region` → Your AWS region (e.g., 'us-east-1')
   - `your-access-key-id` → Your IAM user access key
   - `your-secret-access-key` → Your IAM user secret key
   - `your-s3-bucket-name` → Your S3 bucket name

## Step 6: Test the Integration

1. Start your Angular application: `ng serve`
2. Navigate to the upload page
3. Select a file and click upload
4. Check the browser console for any errors
5. Verify the file appears in your S3 bucket

## Security Considerations

### Production Environment

For production, consider using:
- **AWS Cognito** for user authentication
- **IAM Roles** instead of access keys
- **Pre-signed URLs** for secure uploads
- **Environment variables** instead of hardcoded credentials

### Environment Variables Example

```typescript
// In your environment files
export const environment = {
  production: false,
  aws: {
    region: process.env.AWS_REGION || 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    bucketName: process.env.AWS_S3_BUCKET || ''
  }
};
```

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure your S3 bucket has proper CORS configuration
2. **Access Denied**: Check IAM user permissions and bucket policies
3. **Region Mismatch**: Ensure the region in your config matches your bucket region
4. **Invalid Credentials**: Verify your access key and secret key are correct

### Debug Mode

Enable debug logging in the S3 service by adding:
```typescript
AWS.config.logger = console;
```

## Features

The S3 integration includes:
- ✅ File upload to S3
- ✅ Progress indication
- ✅ Success/error status messages
- ✅ S3 URL display after upload
- ✅ Copy to clipboard functionality
- ✅ File deletion capability
- ✅ File listing capability

## API Reference

### S3Service Methods

- `uploadFile(file: File, folder?: string)`: Upload a file to S3
- `deleteFile(key: string)`: Delete a file from S3
- `listFiles(prefix?: string)`: List files in S3 bucket

### Upload Component Properties

- `uploadStatus`: Current upload status ('idle' | 'uploading' | 'success' | 'error')
- `uploadMessage`: Status message to display
- `uploadedFileUrl`: S3 URL of uploaded file
- `uploadProgress`: Upload progress percentage

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify AWS credentials and permissions
3. Ensure S3 bucket configuration is correct
4. Check CORS settings if uploading from web
