import React from "react";
import * as XLSX from "xlsx";

const ExportXLSX = () => {
  const dataVN = {
    "common.page.notfound": "Chúng tôi không tìm thấy trang này",
    "common.404error": "Lỗi 404",
    "common.login": "Đăng nhập lại",
    "common.404.welcome":
      "xin chào {name}! Trang bạn yên cầu hiện tại không thể truy cập. Vui lòng thử lại sau khi admin đã cấp quyền truy cập",
    "common.404note":
      "Có vẻ như một cái gì đó bị ngắt kết nối. Không tìm thấy trang bạn yêu cầu, nhưng có một số cách để đưa bạn trở lại đúng hướng. Bạn có thể quay lại trang trước hoặc truy cập trang chủ của chúng tôi.",
    "common.error.authorization":
      "Hiện tài khoản của bạn chưa được phân quyền truy cập. Vui lòng liên hệ {email} để được hỗ trợ.",
    "common.error.title.authorization": "Xác nhận phân quyền tài khoản!",
  };

  const dataEN = {
    "common.page.notfound": "We couldn’t find this page",
    "common.404error": "404 Error",
    "common.login": "Log in again",
    "common.404.welcome":
      "Hello {name}! The page you requested is currently not accessible. Please try again after the admin has granted access.",
    "common.404note":
      "It seems something is disconnected. The page you requested cannot be found, but there are some ways to get you back on track. You can go back to the previous page or visit our homepage.",
    "common.error.authorization":
      "Your account currently does not have access rights. Please contact {email} for support.",
    "common.error.title.authorization": "Account Authorization Confirmation!",
  };

  const importXlsxToTwoObjects = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        if (jsonData.length > 0) {
          // Assuming the first row is the header
          const header = jsonData[0];
          const keyIndex = header.indexOf("Key");
          const vietnameseIndex = header.indexOf("Vietnamese");
          const englishIndex = header.indexOf("English");

          if (
            keyIndex === -1 ||
            vietnameseIndex === -1 ||
            englishIndex === -1
          ) {
            return reject("Key, Vietnamese, or English column not found");
          }

          const objectVietnamese = {};
          const objectEnglish = {};
          jsonData.slice(1).forEach((row) => {
            const key = row[keyIndex];
            const vietnamese = row[vietnameseIndex];
            const english = row[englishIndex];
            if (key) {
              objectVietnamese[key] = vietnamese;
              objectEnglish[key] = english;
            }
          });

          resolve({ objectVietnamese, objectEnglish });
        } else {
          reject("No data found in the file");
        }
      };

      reader.onerror = (error) => reject(error);

      reader.readAsArrayBuffer(file);
    });
  };

  // Example usage with an input element:
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    importXlsxToTwoObjects(file)
      .then(({ objectVietnamese, objectEnglish }) => {
        console.log("Object Vietnamese:", objectVietnamese);
        console.log("Object English:", objectEnglish);
      })
      .catch((error) => {
        console.error("Error importing file:", error);
      });
  };

  const exportToExcel = (
    dataVN,
    dataEN,
    fileName = "export_with_languages.xlsx",
  ) => {
    // Convert the data objects to an array of arrays with row numbers and languages
    const rows = Object.keys(dataVN).map((key, index) => [
      index + 1, // Row number (starting from 1)
      key,
      dataVN[key],
      dataEN[key] || "", // Default to an empty string if the key is not found in dataEN
    ]);

    // Add headers for the columns
    rows.unshift(["NO", "Key", "Vietnamese", "English"]); // Insert headers at the start

    // Create a new workbook and a sheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(rows);

    // Set the column widths to fit the content
    const maxLengths = rows.reduce((acc, row) => {
      row.forEach((cell, i) => {
        const length = cell ? cell.toString().length : 0;
        acc[i] = Math.max(acc[i] || 0, length);
      });
      return acc;
    }, []);

    worksheet["!cols"] = maxLengths.map((length) => ({ wch: length + 2 })); // Add some padding

    // Append the sheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Write the workbook to a file
    XLSX.writeFile(workbook, fileName);
  };

  const handleExport = () => {
    exportToExcel(dataVN, dataEN, "12_page404.xlsx");
  };

  return (
    <div>
      <h1>Export to Excel</h1>
      <button onClick={handleExport}>Export to Excel</button>
      <input type="file" onChange={handleFileUpload} />
    </div>
  );
};

export default ExportXLSX;
