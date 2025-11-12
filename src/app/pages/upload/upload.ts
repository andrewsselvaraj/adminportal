import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { S3Service } from '../../services/s3.service';

@Component({
  selector: 'app-upload',
  standalone: false,
  templateUrl: './upload.html',
  styleUrl: './upload.css'
})
export class Upload {
  selectedFile: File | null = null;
  uploadProgress = 0;
  isUploading = false;
  uploadStatus: 'idle' | 'uploading' | 'success' | 'error' = 'idle';
  uploadMessage = '';
  uploadedFileUrl = '';

  constructor(
    public router: Router,
    private s3Service: S3Service
  ) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    if (!this.selectedFile) {
      alert('Please select a file first!');
      return;
    }

    this.isUploading = true;
    this.uploadProgress = 0;
    this.uploadStatus = 'uploading';
    this.uploadMessage = 'Uploading to S3...';
    this.uploadedFileUrl = '';

    // Simulate progress for better UX (S3 doesn't provide real-time progress)
    const progressInterval = setInterval(() => {
      if (this.uploadProgress < 90) {
        this.uploadProgress += Math.random() * 15;
      }
    }, 200);

    // Upload to S3
    this.s3Service.uploadFile(this.selectedFile).subscribe({
      next: (result) => {
        clearInterval(progressInterval);
        this.uploadProgress = 100;
        this.isUploading = false;

        if (result.success) {
          this.uploadStatus = 'success';
          this.uploadMessage = 'File uploaded successfully to S3!';
          this.uploadedFileUrl = result.url || '';
          
          // Reset after 3 seconds
          setTimeout(() => {
            this.resetUpload();
          }, 3000);
        } else {
          this.uploadStatus = 'error';
          this.uploadMessage = `Upload failed: ${result.error}`;
        }
      },
      error: (error) => {
        clearInterval(progressInterval);
        this.uploadProgress = 0;
        this.isUploading = false;
        this.uploadStatus = 'error';
        this.uploadMessage = `Upload error: ${error.message}`;
      }
    });
  }

  private resetUpload() {
    this.selectedFile = null;
    this.uploadProgress = 0;
    this.uploadStatus = 'idle';
    this.uploadMessage = '';
    this.uploadedFileUrl = '';
  }

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      // You could add a toast notification here
      console.log('URL copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  }

  logout() {
    localStorage.removeItem('loggedIn');
    this.router.navigate(['/login']);
  }
}
