export function base64ToBlob(base64String, contentType = "") {
  // 将 base64 字符串分割成两部分
  const parts = base64String.split(";base64,");

  // 如果没有提供 contentType，尝试从 base64 字符串中提取
  if (!contentType && parts.length > 1) {
    contentType = parts[0].split(":")[1];
  }

  // 获取实际的 base64 编码部分
  const base64Data = parts.pop();

  // 解码 base64
  const rawData = atob(base64Data);

  // 将解码后的数据转换为 Uint8Array
  const uInt8Array = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    uInt8Array[i] = rawData.charCodeAt(i);
  }

  // 创建并返回 Blob 对象
  return new Blob([uInt8Array], { type: contentType });
}
