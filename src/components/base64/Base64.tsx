export function base64(file: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

export async function getBase64(file: File): Promise<string> {
  let value = await base64(file);
  value = value.replace('data:image/jpeg;base64,', '');
  value = value.replace('data:image/png;base64,', '');
  value = value.replace('data:image/gif;base64,', '');
  value = value.replace('data:image/bmp;base64,', '');
  return value;
}
