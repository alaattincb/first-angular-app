import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders, HttpRequest } from '@angular/common/http';

interface FileResponse {
  files: string[];
}

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  files: string[] = [];
  selectedFiles: File[] = [];
  private fetchUrl = 'http://localhost:3000/api/server/files';
  private uploadUrl = 'http://localhost:3000/api/server/upload';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchFiles();
  }

  fetchFiles(): void {
    this.http.get<FileResponse>(this.fetchUrl).subscribe({
      next: (response) => {
        this.files = response.files;
      },
      error: (err) => {
        console.error('Error fetching files:', err);
      }
    });
  }

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = Array.from(input.files);
    }
  }

  uploadFiles(): void {
    if (this.selectedFiles.length === 0) {
      console.log('No files selected');
      return;
    }

    const formData = new FormData();
    this.selectedFiles.forEach(file => {
      formData.append('files', file);
    });

    this.http.post(this.uploadUrl, formData, {
      headers: new HttpHeaders(),
      reportProgress: true,
      observe: 'events'
    }).subscribe({
      next: (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          // Handle progress if needed
          console.log('Upload Progress:', Math.round((event.loaded / event.total!) * 100) + '%');
        } else if (event.type === HttpEventType.Response) {
          console.log('Upload Complete', event.body);
          this.fetchFiles();
        }
      },
      error: (err) => {
        console.error('Error uploading files:', err);
      }
    });
  }
  deleteFile(filename: string) {
    this.http.delete(`${this.fetchUrl}/${filename}`).subscribe({
      next: (response) => {
        console.log('File deleted successfully', response);
        this.fetchFiles();
      },
      error: (err) => {
        console.error('Error deleting file:', err);
      }
    });
  }
  
  getFileIcon(file: string): string {
    const ext = file.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf':
        return 'fas fa-file-pdf';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return 'fas fa-file-image';
      case 'doc':
      case 'docx':
        return 'fas fa-file-word';
      case 'xls':
      case 'xlsx':
        return 'fas fa-file-excel';
      default:
        return 'fas fa-file';
    }
  }
  getFileUrl(file: string): string {
    const ext = file.split('.').pop()?.toLowerCase();
    if (['pdf', 'jpg', 'jpeg', 'png', 'gif'].includes(ext!)) {
      // Eğer dosya bir resim veya PDF ise, doğrudan yeni sekmede açmak için URL'yi döndür
      return `http://localhost:3000/api/uploads/${file}`;
    } else {
      // Diğer dosya türleri için indirme bağlantısı döndür
      return `http://localhost:3000/api/server/download/${file}`;
    }
  }

  downloadFile(file: string): void {
    const a = document.createElement('a');
    a.href = `http://localhost:3000/api/server/download/${file}`;
    a.download = file;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}


