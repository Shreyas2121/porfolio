const DEFAULT_RESUME_DRIVE_FILE_ID =
  "1ohko0u3IC6dEWaEalU1xpq9LyVF9fPtK";

export const resumeDriveFileId =
  process.env.RESUME_DRIVE_FILE_ID?.trim() ||
  DEFAULT_RESUME_DRIVE_FILE_ID;

export const resumePreviewUrl =
  "https://drive.google.com/file/d/" + resumeDriveFileId + "/preview";

export const resumeViewUrl =
  "https://drive.google.com/file/d/" + resumeDriveFileId + "/view";

export const resumeDownloadUrl =
  "https://drive.google.com/uc?export=download&id=" + resumeDriveFileId;
