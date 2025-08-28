import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

// S3 Object interfaces for better type safety
interface S3Object {
  Key: string;
  LastModified: Date;
  ETag: string;
  Size: number;
  StorageClass: string;
}

interface S3ListResult {
  Contents?: S3Object[];
  IsTruncated: boolean;
  NextContinuationToken?: string;
}

interface S3UploadResult {
  Location: string;
  Bucket: string;
  Key: string;
  ETag: string;
}

// AWS S3 Configuration
const AWS_CONFIG = environment.aws;

@Injectable({
  providedIn: 'root'
})
export class S3Service {
  private s3: any; // AWS.S3 instance

  constructor() {
    // Initialize AWS SDK
    this.initializeAWS();
  }

  private initializeAWS() {
    // Note: In a production environment, you should use AWS Cognito or IAM roles
    // instead of hardcoding credentials. This is for demonstration purposes.
    
    // Dynamically import AWS SDK to avoid build issues
    import('aws-sdk').then((AWS: any) => {
      AWS.config.update({
        region: AWS_CONFIG.region,
        accessKeyId: AWS_CONFIG.accessKeyId,
        secretAccessKey: AWS_CONFIG.secretAccessKey
      });
      
      this.s3 = new AWS.S3();
    }).catch(error => {
      console.error('Failed to load AWS SDK:', error);
    });
  }

  uploadFile(file: File, folder?: string): Observable<{ success: boolean; url?: string; error?: string }> {
    return from(this.performUpload(file, folder));
  }

  private async performUpload(file: File, folder?: string): Promise<{ success: boolean; url?: string; error?: string }> {
    try {
      if (!this.s3) {
        throw new Error('AWS SDK not initialized');
      }

      const key = folder ? `${folder}/${file.name}` : file.name;
      
      const params = {
        Bucket: AWS_CONFIG.bucketName,
        Key: key,
        Body: file,
        ContentType: file.type,
        ACL: 'public-read', // Make file publicly accessible (remove if not needed)
        Metadata: {
          'original-name': file.name,
          'upload-date': new Date().toISOString()
        }
      };

      const result: S3UploadResult = await this.s3.upload(params).promise();
      
      return {
        success: true,
        url: result.Location
      };
    } catch (error) {
      console.error('S3 upload error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  deleteFile(key: string): Observable<{ success: boolean; error?: string }> {
    return from(this.performDelete(key));
  }

  private async performDelete(key: string): Promise<{ success: boolean; error?: string }> {
    try {
      if (!this.s3) {
        throw new Error('AWS SDK not initialized');
      }

      const params = {
        Bucket: AWS_CONFIG.bucketName,
        Key: key
      };

      await this.s3.deleteObject(params).promise();
      
      return { success: true };
    } catch (error) {
      console.error('S3 delete error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  listFiles(prefix?: string): Observable<string[]> {
    return from(this.performList(prefix));
  }

  private async performList(prefix?: string): Promise<string[]> {
    try {
      if (!this.s3) {
        throw new Error('AWS SDK not initialized');
      }

      const params = {
        Bucket: AWS_CONFIG.bucketName,
        Prefix: prefix || ''
      };

      const result: S3ListResult = await this.s3.listObjectsV2(params).promise();
      
      return result.Contents?.map((obj: S3Object) => obj.Key) || [];
    } catch (error) {
      console.error('S3 list error:', error);
      return [];
    }
  }
}
