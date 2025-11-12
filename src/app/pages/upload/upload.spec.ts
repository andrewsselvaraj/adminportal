import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Upload } from './upload';

describe('Upload', () => {
  let component: Upload;
  let fixture: ComponentFixture<Upload>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    
    await TestBed.configureTestingModule({
      declarations: [ Upload ],
      providers: [
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Upload);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.selectedFile).toBeNull();
    expect(component.uploadProgress).toBe(0);
    expect(component.isUploading).toBeFalse();
  });

  it('should handle file selection', () => {
    const mockFile = new File(['test content'], 'test.txt', { type: 'text/plain' });
    const mockEvent = { target: { files: [mockFile] } };
    
    component.onFileSelected(mockEvent);
    
    expect(component.selectedFile).toBe(mockFile);
  });

  it('should show alert when no file is selected for upload', () => {
    spyOn(window, 'alert');
    
    component.uploadFile();
    
    expect(window.alert).toHaveBeenCalledWith('Please select a file first!');
  });

  it('should start upload process when file is selected', () => {
    const mockFile = new File(['test content'], 'test.txt', { type: 'text/plain' });
    component.selectedFile = mockFile;
    
    component.uploadFile();
    
    expect(component.isUploading).toBeTrue();
    expect(component.uploadProgress).toBe(0);
  });

  it('should logout and navigate to login', () => {
    spyOn(localStorage, 'removeItem');
    
    component.logout();
    
    expect(localStorage.removeItem).toHaveBeenCalledWith('loggedIn');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
});
