export function generateImageUrl(fileName?: string) {
  if (!fileName) return "";
  return `https://firebasestorage.googleapis.com/v0/b/shopping-app-9f7fc.appspot.com/o/${fileName}?alt=media`;
}
