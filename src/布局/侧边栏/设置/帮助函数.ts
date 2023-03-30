export const 下载到本地 = (dataString: string) => {
  const a = document.createElement("a");
  const file = new Blob([dataString], { type: "application/json" });
  a.href = URL.createObjectURL(file);

  const 日期 = new Date();
  const 格式化日期 = `${日期.getFullYear()}-${
    日期.getMonth() + 1
  }-${日期.getDate()} ${日期.getHours()}:${日期.getMinutes()}:${日期.getSeconds()}`;

  a.download = `与文档对话_${格式化日期}.json`;
  a.click();
  document.body.removeChild(a);
};

export const apikey的本地存储 = "apikey";
