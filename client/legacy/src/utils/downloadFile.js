export const downloadFile = (data, fileName) => {
  /** global: Blob */
  const blob = new Blob([data]);
  const downloadUrl = window.URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = downloadUrl;
  link.setAttribute('download', fileName);

  document.body.appendChild(link);

  link.click();
  link.remove();
};
