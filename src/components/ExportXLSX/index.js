import React from "react";
import * as XLSX from "xlsx";

const ExportXLSX = () => {
  const dataVN = {
    "organizations.router.name": "Tổ chức",
    "organizations.router.nameBreadcrumb": "Quản lý tổ chức",
    "organizations.title": "Danh sách tổ chức",
    "organizations.summary.totalOrganization": "Tổng số tổ chức",
    "organizations.summary.totalFacility": "Tổng số cơ sở",
    "organizations.filter.operationStatus": "Trạng thái",
    "organizations.filter.operationStatus.unexpired": "Còn hạn",
    "organizations.filter.operationStatus.expire": "Hết hạn",
    "organizations.filter.operationStatus.cancelOrganization": "Hủy tổ chức",
    "organizations.filter.operationStatus.notActivated": "Chưa diễn ra",
    "organizations.filter.effectiveTime": "Thời gian hiệu lực",
    "organizations.filter.expiredTime": "Thời gian hết hạn",
    "organizations.table.code": "Mã định danh tổ chức",
    "organizations.table.name": "Tên tổ chức",
    "organizations.table.numberOfFacility": "Số cơ sở trực thuộc",
    "organizations.table.capacityUsed": "Gói cước gia hạn",
    "organizations.table.tariffPackage.periodByMonth": "Thời hạn",
    "organizations.table.tariffPackage.effectiveTime": "Thời gian hiệu lực",
    "organizations.table.tariffPackage.expiredTime": "Thời gian hết hạn",
    "organizations.table.tariffPackage.numberOfDaysRemaining":
      "Số ngày hết hạn",
    "organizations.table.operationStatus": "Trạng thái",
    "organizations.table.operationStatus.params":
      "{status,select, 1 {Còn hạn} 2 {Hết hạn} 3 {Hủy tổ chức} 4 {Chưa diễn ra} other {Không xác định}}",
    "organizations.confirmDelete.title": "Xác nhận xóa tổ chức",
    "organizations.confirmDelete.content":
      "Tổ chức này sẽ bị xóa và không thể khôi phục.",
    "organizations.action.menu": "Quản lý cơ sở",
    "organizations.action.file.expired": "Gói cước ngưng kinh doanh",
    "organizations.action.file.title": "Xác nhận gia hạn gói cước",
    "organizations.action.file.expired.content":
      "Không thể gia hạn vì gói cước {tariffPackagesName} đã {text}. Vui lòng lựa chọn gói cước khác để sử dụng",
    "organizations.action.file.expired.text": "Ngưng kinh doanh",
    "organizations.action.file.content":
      "Gói cước {tariffPackagesName} sẽ được tiếp tục gia hạn từ {dateForm} đến {dateTo} với giá tiền là {price}.",
    "organizations.action.filePlus": "Gia hạn gói cước",
    "organizations.action.close": "Hủy tổ chức",
    "organizations.action.x.title": "Xác nhận hủy bỏ tổ chức",
    "organizations.action.x.content":
      "Gói cước {packageName} sẽ bị hủy và dữ liệu sẽ bị xóa sau khi hủy bỏ tổ chức.",

    "organizations.modal.create.title": "Thêm tổ chức",
    "organizations.modal.create.title.infoData": "Thông tin gói cước sử dụng",
    "organizations.modal.create.title.infoOrganizations": "Thông tin tổ chức",
    "organizations.modal.create.title.infoAccount": "Thông tin tài khoản",
    "organizations.modal.create.form.code": "Mã định danh tổ chức",
    "organizations.modal.create.form.code.required":
      "Mã định danh tổ chức không đúng định dạng",
    "organizations.modal.create.form.code.placeholder":
      "Vui lòng nhập mã định danh tổ chức",
    "organizations.modal.create.form.name": "Tên tổ chức",
    "organizations.modal.create.form.name.placeholder":
      "Vui lòng nhập tên định danh tổ chức",
    "organizations.modal.create.checkbox.data": "Gói có sẵn",
    "organizations.modal.create.checkbox.notData": "Gói khác",
    "organizations.modal.create.tariffPackagesSelect": "Gói cước",
    "organizations.modal.create.tariffPackagesSelect.placeholder":
      "Vui lòng chọn gói cước",
    "organizations.modal.create.capacity": "Dung lượng",
    "organizations.modal.create.capacity.placeholder":
      "Vui lòng nhập dung lượng",
    "organizations.modal.create.periodByMonth": "Thời hạn",
    "organizations.modal.create.periodByMonth.month": "Theo tháng",
    "organizations.modal.create.periodByMonth.unlimited": "Không thời hạn",
    "organizations.modal.create.periodByMonth.placeholder":
      "Vui lòng nhập thời hạn",
    "organizations.modal.create.effectiveTime": "Thời gian hiệu lực",
    "organizations.modal.create.expiredTime": "Thời gian hết hạn",
    "organizations.modal.create.price": "Giá tiền",
    "organizations.modal.create.price.placeholder": "Vui lòng nhập giá tiền",
    "organizations.modal.create.account.name": "Họ và tên",
    "organizations.modal.create.account.name.placeholder":
      "Vui lòng nhập họ và tên",
    "organizations.modal.create.account.email": "Email",
    "organizations.modal.create.account.email.required":
      "Email không đúng định dạng",
    "organizations.modal.create.account.email.placeholder":
      "Vui lòng nhập email",
    "organizations.modal.create.account.timeZone": "Múi giờ",
    "organizations.modal.create.account.timeZone.placeholder":
      "Vui lòng chọn múi giờ",
    "organizations.modal.create.account.phoneNumber": "Số điện thoại",
    "organizations.modal.create.account.phoneNumber.placeholder":
      "Vui lòng nhập số điện thoại",
    "organizations.modal.create.account.dayOfBirth": "Ngày sinh",
    "organizations.modal.create.account.dayOfBirth.placeholder":
      "Vui lòng nhập ngày sinh",
    "organizations.modal.create.account.username": "Tên đăng nhập",
    "organizations.modal.create.account.username.placeholder":
      "Vui lòng nhập tên đăng nhập",
    "organizations.modal.create.account.password": "Mật khẩu",
    "organizations.modal.create.account.password.placeholder":
      "Vui lòng nhập mật khẩu",

    "organizations.router.info.name": "Thông tin tổ chức",
    "organizations.info.title": "Thông tin tổ chức",
    "organizations.info.title.infoOrganizations": "Thông tin tổ chức",
    "organizations.info.code": "Ma định danh tổ chức",
    "organizations.info.name": "Tên tổ chức",
    "organizations.info.operationStatus": "Trạng thái",
    "organizations.info.operationStatus.params":
      "{status,select, 1 {Còn hạn} 2 {Hết hạn} 3 {Hủy tổ chức} 4 {Chưa diễn ra} other {Không xác định}}",
    "organizations.info.capacity": "Dung lượng sử dụng",
    "organizations.info.title.infoAccount": "Thông tin tài khoản",
    "organizations.info.account.name": "Họ và tên",
    "organizations.info.account.username": "Tên đăng nhập",
    "organizations.info.account.email": "Email",
    "organizations.info.account.phoneNumber": "Số điện thoại",
    "organizations.info.account.dayOfBirth": "Ngày sinh",
    "organizations.info.account.timeZone": "Múi giờ",
    "organizations.info.title.packageInfo": "Thông tin gói cước",
    "organizations.info.title.history.transaction": "Lịch sử giao dịch",
    "organizations.info.filter.extensionTime": "Thời gian gia hạn",
    "organizations.paymentHistories.table.gracetime": "Thời gian gia hạn",
    "organizations.paymentHistories.table.tariffPackage.capacity": "Dung lượng",
    "organizations.paymentHistories.table.organization.tariffPackage.effectiveTime":
      "Thời gian hiệu lực",
    "organizations.paymentHistories.table.effectiveTime": "Thời gian hiệu lực",
    "organizations.paymentHistories.table.price": "Giá gói cước",
    "organizations.paymentHistories.table.payer.name": "Người gia hạn",
    "organizations.paymentHistories.table.payer.phoneNumber": "Số điện thoại",
    "organizations.paymentHistories.table.paymentStatus": "Trạng thái",
    "organizations.paymentHistories.table.paymentMethod": "Phương thức",
    "organizations.paymentHistories.table.paymentStatus.params":
      "{status,select, 1 {Thành công} 2 {Đang xử lý} 3 {Thất bại} 4 {Đã hủy} other {Khác}}",
    "organizations.paymentHistories.table.paymentMethod.params":
      "{status,select, 1 {Trực tiếp} 2 {Ví điện tử} 3 {VNPay} 4 {--} 5 {PayPal} 6 {OnePay} other {Khác}}",
    "organizations.info.action.x.title": "Xác nhận hủy gói cước thay đổi",
    "organizations.info.action.x.content":
      "Gói cước thay đổi {packageName}/{month} sẽ bị hủy bỏ.",
    "organizations.info.businessStatus.outOfBusiness": "Ngưng kinh doanh",
    "organizations.info.paymentStatus.processing": "Đang xử lí",
    "organizations.info.modal.change.add.title": "Thêm gói cước mới",
    "organizations.info.modal.change.update.title": "Thay đổi gói cước",
    "organizations.info.modal.change.checkbox.data": "Gói có sẵn",
    "organizations.info.modal.change.checkbox.notData": "Gói khác",
    "organizations.info.modal.change.tariffPackagesSelect": "Gói cước",
    "organizations.info.modal.change.tariffPackagesSelect.placeholder":
      "Vui lòng chọn gói cước",
    "organizations.info.modal.change.capacity": "Dung lượng",
    "organizations.info.modal.change.capacity.placeholder":
      "Vui lòng nhập dung lượng",
    "organizations.info.modal.change.account.periodByMonth": "Thời hạn",
    "organizations.info.modal.change.account.periodByMonth.month": "Theo tháng",
    "organizations.info.modal.change.account.periodByMonth.unlimited":
      "Không thời hạn",
    "organizations.info.modal.change.account.periodByMonth.placeholder":
      "Vui lòng nhập thời hạn",
    "organizations.info.modal.change.account.effectiveTime":
      "Thời gian hiệu lực",
    "organizations.info.modal.change.account.expiredTime": "Thời gian hết hạn",
    "organizations.info.modal.change.account.price": "Giá tiền",
    "organizations.info.modal.change.account.price.placeholder":
      "Vui lòng nhập giá tiền",
    "organizations.info.modal.change.render.total": "Tổng thực thu {total}",
    "organizations.info.modal.update.title": "Cập nhật tổ chức",
    "organizations.info.modal.update.title.infoOrganizations":
      "Thông tin tổ chức",
    "organizations.info.modal.update.form.code": "Mã định danh tổ chức",
    "organizations.info.modal.update.form.code.required":
      "Mã định danh tổ chức không đúng định dạng",
    "organizations.info.modal.update.form.code.placeholder":
      "Vui lòng nhập mã định danh tổ chức",
    "organizations.info.modal.update.form.name": "Tên tổ chức",
    "organizations.info.modal.update.form.name.placeholder":
      "Vui lòng nhập tên định danh tổ chức",
    "organizations.info.modal.update.form.isAutoRenewal": "Gia hạn tự động",
    "organizations.info.modal.update.form.isAutoRenewal.yes": "Đồng ý",
    "organizations.info.modal.update.form.isAutoRenewal.no": "Không đồng ý",
    "organizations.info.modal.update.title.infoAccount": "Thông tin tài khoản",
    "organizations.info.modal.update.account.name": "Họ và tên",
    "organizations.info.modal.update.account.name.placeholder":
      "Vui lòng nhập họ và tên",
    "organizations.info.modal.update.account.email": "Email",
    "organizations.info.modal.update.account.email.placeholder":
      "Vui lòng nhập email",
    "organizations.info.modal.update.account.timeZone": "Múi giờ",
    "organizations.info.modal.update.account.timeZone.placeholder":
      "Vui lòng chọn múi giờ",
    "organizations.info.modal.update.account.phoneNumber": "Số điện thoại",
    "organizations.info.modal.update.account.phoneNumber.placeholder":
      "Vui lòng nhập số điện thoại",
    "organizations.info.modal.update.account.dayOfBirth": "Ngày sinh",
    "organizations.info.modal.update.account.dayOfBirth.placeholder":
      "Vui lòng nhập ngày sinh",
    "organizations.info.modal.update.account.username": "Tên đăng nhập",
    "organizations.info.modal.update.account.username.placeholder":
      "Vui lòng nhập tên đăng nhập",
  };

  const dataEN = {
    "organizations.router.name": "Organization",
    "organizations.router.nameBreadcrumb": "Organization Management",
    "organizations.title": "Organization List",
    "organizations.summary.totalOrganization": "Total Organizations",
    "organizations.summary.totalFacility": "Total Facilities",
    "organizations.filter.operationStatus": "Status",
    "organizations.filter.operationStatus.unexpired": "Active",
    "organizations.filter.operationStatus.expire": "Expired",
    "organizations.filter.operationStatus.cancelOrganization":
      "Canceled Organization",
    "organizations.filter.operationStatus.notActivated": "Not Activated",
    "organizations.filter.effectiveTime": "Effective Time",
    "organizations.filter.expiredTime": "Expiration Time",
    "organizations.table.code": "Organization Identifier Code",
    "organizations.table.name": "Organization Name",
    "organizations.table.numberOfFacility": "Number of Subsidiaries",
    "organizations.table.capacityUsed": "Renewal Package",
    "organizations.table.tariffPackage.periodByMonth": "Duration",
    "organizations.table.tariffPackage.effectiveTime": "Effective Time",
    "organizations.table.tariffPackage.expiredTime": "Expiration Time",
    "organizations.table.tariffPackage.numberOfDaysRemaining":
      "Days Until Expiration",
    "organizations.table.operationStatus": "Status",
    "organizations.table.operationStatus.params":
      "{status,select, 1 {Active} 2 {Expired} 3 {Canceled Organization} 4 {Not Activated} other {Undefined}}",
    "organizations.confirmDelete.title": "Confirm Organization Deletion",
    "organizations.confirmDelete.content":
      "This organization will be deleted and cannot be recovered.",
    "organizations.action.menu": "Manage Facility",
    "organizations.action.file.expired": "Discontinued Package",
    "organizations.action.file.title": "Confirm Package Renewal",
    "organizations.action.file.expired.content":
      "Cannot renew because the {tariffPackagesName} package has {text}. Please choose another package to use.",
    "organizations.action.file.expired.text": "Discontinued",
    "organizations.action.file.content":
      "The {tariffPackagesName} package will continue to be renewed from {dateForm} to {dateTo} at a price of {price}.",
    "organizations.action.filePlus": "Renew Package",
    "organizations.action.close": "Cancel Organization",
    "organizations.action.x.title": "Confirm Organization Cancellation",
    "organizations.action.x.content":
      "The {packageName} package will be canceled and data will be deleted after canceling the organization.",

    "organizations.modal.create.title": "Add Organization",
    "organizations.modal.create.title.infoData": "Package Information",
    "organizations.modal.create.title.infoOrganizations":
      "Organization Information",
    "organizations.modal.create.title.infoAccount": "Account Information",
    "organizations.modal.create.form.code": "Organization Identifier Code",
    "organizations.modal.create.form.code.required":
      "Invalid organization identifier code format",
    "organizations.modal.create.form.code.placeholder":
      "Please enter the organization identifier code",
    "organizations.modal.create.form.name": "Organization Name",
    "organizations.modal.create.form.name.placeholder":
      "Please enter the organization name",
    "organizations.modal.create.checkbox.data": "Available Package",
    "organizations.modal.create.checkbox.notData": "Other Package",
    "organizations.modal.create.tariffPackagesSelect": "Package",
    "organizations.modal.create.tariffPackagesSelect.placeholder":
      "Please select a package",
    "organizations.modal.create.capacity": "Capacity",
    "organizations.modal.create.capacity.placeholder":
      "Please enter the capacity",
    "organizations.modal.create.periodByMonth": "Duration",
    "organizations.modal.create.periodByMonth.month": "By Month",
    "organizations.modal.create.periodByMonth.unlimited": "Unlimited",
    "organizations.modal.create.periodByMonth.placeholder":
      "Please enter the duration",
    "organizations.modal.create.effectiveTime": "Effective Time",
    "organizations.modal.create.expiredTime": "Expiration Time",
    "organizations.modal.create.price": "Price",
    "organizations.modal.create.price.placeholder": "Please enter the price",
    "organizations.modal.create.account.name": "Full Name",
    "organizations.modal.create.account.name.placeholder":
      "Please enter the full name",
    "organizations.modal.create.account.email": "Email",
    "organizations.modal.create.account.email.required": "Invalid email format",
    "organizations.modal.create.account.email.placeholder":
      "Please enter the email",
    "organizations.modal.create.account.timeZone": "Time Zone",
    "organizations.modal.create.account.timeZone.placeholder":
      "Please select a time zone",
    "organizations.modal.create.account.phoneNumber": "Phone Number",
    "organizations.modal.create.account.phoneNumber.placeholder":
      "Please enter the phone number",
    "organizations.modal.create.account.dayOfBirth": "Date of Birth",
    "organizations.modal.create.account.dayOfBirth.placeholder":
      "Please enter the date of birth",
    "organizations.modal.create.account.username": "Username",
    "organizations.modal.create.account.username.placeholder":
      "Please enter the username",
    "organizations.modal.create.account.password": "Password",
    "organizations.modal.create.account.password.placeholder":
      "Please enter the password",

    "organizations.router.info.name": "Organization Information",
    "organizations.info.title": "Organization Information",
    "organizations.info.title.infoOrganizations": "Organization Information",
    "organizations.info.code": "Organization Identifier Code",
    "organizations.info.name": "Organization Name",
    "organizations.info.operationStatus": "Status",
    "organizations.info.operationStatus.params":
      "{status,select, 1 {Active} 2 {Expired} 3 {Canceled Organization} 4 {Not Activated} other {Undefined}}",
    "organizations.info.capacity": "Used Capacity",
    "organizations.info.title.infoAccount": "Account Information",
    "organizations.info.account.name": "Full Name",
    "organizations.info.account.username": "Username",
    "organizations.info.account.email": "Email",
    "organizations.info.account.phoneNumber": "Phone Number",
    "organizations.info.account.dayOfBirth": "Date of Birth",
    "organizations.info.account.timeZone": "Time Zone",
    "organizations.info.title.packageInfo": "Package Information",
    "organizations.info.title.history.transaction": "Transaction History",
    "organizations.info.filter.extensionTime": "Extension Time",
    "organizations.paymentHistories.table.gracetime": "Extension Time",
    "organizations.paymentHistories.table.tariffPackage.capacity": "Capacity",
    "organizations.paymentHistories.table.organization.tariffPackage.effectiveTime":
      "Effective Time",
    "organizations.paymentHistories.table.effectiveTime": "Effective Time",
    "organizations.paymentHistories.table.price": "Package Price",
    "organizations.paymentHistories.table.payer.name": "Payer",
    "organizations.paymentHistories.table.payer.phoneNumber": "Phone Number",
    "organizations.paymentHistories.table.paymentStatus": "Status",
    "organizations.paymentHistories.table.paymentMethod": "Method",
    "organizations.paymentHistories.table.paymentStatus.params":
      "{status,select, 1 {Successful} 2 {Processing} 3 {Failed} 4 {Canceled} other {Other}}",
    "organizations.paymentHistories.table.paymentMethod.params":
      "{status,select, 1 {Direct} 2 {E-wallet} 3 {VNPay} 4 {--} 5 {PayPal} 6 {OnePay} other {Other}}",
    "organizations.info.action.x.title":
      "Confirm Cancellation of Package Change",
    "organizations.info.action.x.content":
      "The {packageName}/{month} package will be canceled.",
    "organizations.info.businessStatus.outOfBusiness": "Discontinued",
    "organizations.info.paymentStatus.processing": "Processing",
    "organizations.info.modal.change.add.title": "Add New Package",
    "organizations.info.modal.change.update.title": "Change Package",
    "organizations.info.modal.change.checkbox.data": "Available Package",
    "organizations.info.modal.change.checkbox.notData": "Other Package",
    "organizations.info.modal.change.tariffPackagesSelect": "Package",
    "organizations.info.modal.change.tariffPackagesSelect.placeholder":
      "Please select a package",
    "organizations.info.modal.change.capacity": "Capacity",
    "organizations.info.modal.change.capacity.placeholder":
      "Please enter capacity",
    "organizations.info.modal.change.account.periodByMonth": "Duration",
    "organizations.info.modal.change.account.periodByMonth.month": "By Month",
    "organizations.info.modal.change.account.periodByMonth.unlimited":
      "Unlimited",
    "organizations.info.modal.change.account.periodByMonth.placeholder":
      "Please enter the duration",
    "organizations.info.modal.change.account.effectiveTime": "Effective Time",
    "organizations.info.modal.change.account.expiredTime": "Expiration Time",
    "organizations.info.modal.change.account.price": "Price",
    "organizations.info.modal.change.account.price.placeholder":
      "Please enter the price",
    "organizations.info.modal.change.render.total": "Total Amount {total}",
    "organizations.info.modal.update.title": "Update Organization",
    "organizations.info.modal.update.title.infoOrganizations":
      "Organization Information",
    "organizations.info.modal.update.form.code": "Organization Identifier Code",
    "organizations.info.modal.update.form.code.required":
      "Invalid organization identifier code format",
    "organizations.info.modal.update.form.code.placeholder":
      "Please enter the organization identifier code",
    "organizations.info.modal.update.form.name": "Organization Name",
    "organizations.info.modal.update.form.name.placeholder":
      "Please enter the organization name",
    "organizations.info.modal.update.form.isAutoRenewal": "Auto-Renewal",
    "organizations.info.modal.update.form.isAutoRenewal.yes": "Yes",
    "organizations.info.modal.update.form.isAutoRenewal.no": "No",
    "organizations.info.modal.update.title.infoAccount": "Account Information",
    "organizations.info.modal.update.account.name": "Full Name",
    "organizations.info.modal.update.account.name.placeholder":
      "Please enter full name",
    "organizations.info.modal.update.account.email": "Email",
    "organizations.info.modal.update.account.email.placeholder":
      "Please enter email",
    "organizations.info.modal.update.account.timeZone": "Time Zone",
    "organizations.info.modal.update.account.timeZone.placeholder":
      "Please select a time zone",
    "organizations.info.modal.update.account.phoneNumber": "Phone Number",
    "organizations.info.modal.update.account.phoneNumber.placeholder":
      "Please enter the phone number",
    "organizations.info.modal.update.account.dayOfBirth": "Date of Birth",
    "organizations.info.modal.update.account.dayOfBirth.placeholder":
      "Please enter the date of birth",
    "organizations.info.modal.update.account.username": "Username",
    "organizations.info.modal.update.account.username.placeholder":
      "Please enter the username",
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
    rows.unshift(["NO", "Key", "Value Vietnamese", "Value English"]); // Insert headers at the start

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
    exportToExcel(dataVN, dataEN, "2_Organizations (system user).xlsx");
  };

  return (
    <div>
      <h1>My Dashboard</h1>
      <button onClick={handleExport}>Export to Excel</button>
    </div>
  );
};

export default ExportXLSX;
