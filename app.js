/* ==========================================================================
   HỆ THỐNG QUẢN TRỊ BÃI GIỮ XE THÔNG MINH - UEH MEKONG (UNISMARTPARK)
   Core Application Logic (app.js)
   ========================================================================== */

// ==========================================================================
// 1. DATABASE 10 SINH VIÊN MẶC ĐỊNH CỦA NHÓM (HARDCODED + LOCALSTORAGE)
// ==========================================================================
const DEFAULT_STUDENTS = [
  { mssv: "31251570287", hoTen: "Nguyễn Đức Trí", ngaySinh: "24/07/2007", bienSo: "62AU-006.41", dongXe: "SH mode", loaiXe: "Xe máy", oDo: "A02", trangThaiGui: "Đang sử dụng" },
  { mssv: "31251570256", hoTen: "Nguyễn Đặng Hoàn Mỹ", ngaySinh: "02/03/2007", bienSo: "95H1-986.23", dongXe: "SH mode", loaiXe: "Xe máy", oDo: "A03", trangThaiGui: "Đang sử dụng" },
  { mssv: "31251570240", hoTen: "Hồ Thị Mỹ Hường", ngaySinh: "08/03/2006", bienSo: "68A1-327.45", dongXe: "VISION", loaiXe: "Xe máy", oDo: "A12", trangThaiGui: "Đặt trước" },
  { mssv: "31251570272", hoTen: "Nguyễn Thị Mỹ Thanh", ngaySinh: "08/02/2007", bienSo: "69AC-378.12", dongXe: "VARIO", loaiXe: "Xe máy", oDo: "A04", trangThaiGui: "Đang sử dụng" },
  { mssv: "31251570289", hoTen: "Bùi Hoàng Trúc", ngaySinh: "29/09/2007", bienSo: "664DB148.09", dongXe: "VISION", loaiXe: "Xe máy", oDo: "A05", trangThaiGui: "Đang sử dụng" },
  { mssv: "31251570295", hoTen: "Nguyễn Hoàng Khả Vy", ngaySinh: "21/02/2007", bienSo: "664AA323.35", dongXe: "VESPA", loaiXe: "Xe máy", oDo: "A15", trangThaiGui: "Đặt trước" },
  { mssv: "31251570242", hoTen: "Phạm Đào Minh Khôi", ngaySinh: "01/02/2007", bienSo: "95G1-134.34", dongXe: "WAVE", loaiXe: "Xe máy", oDo: "A06", trangThaiGui: "Đang sử dụng" },
  { mssv: "31251570267", hoTen: "Nguyễn Thành Phú", ngaySinh: "08/10/2006", bienSo: "664E-145.78", dongXe: "Exciter 135", loaiXe: "Xe máy", oDo: "A07", trangThaiGui: "Đang sử dụng" },
  { mssv: "31251570228", hoTen: "Nguyễn Vũ Bằng", ngaySinh: "01/05/2007", bienSo: "64E1-245.21", dongXe: "FUTURE", loaiXe: "Xe máy", oDo: "A08", trangThaiGui: "Đang sử dụng" },
  { mssv: "31251570269", hoTen: "Nguyễn Thảo Quyên", ngaySinh: "17/06/2007", bienSo: "66AD-578.34", dongXe: "FUTURE", loaiXe: "Xe máy", oDo: "A09", trangThaiGui: "Đang sử dụng" }
];

function isStudentParked(statusStr) {
  return statusStr === "Đang sử dụng" || statusStr === "Đang gửi";
}

// ==========================================================================
// 2. DANH SÁCH 7 KHU VỰC BÃI ĐỖ XE THỰC TẾ TẠI UEH MEKONG
// ==========================================================================
const PARKING_ZONES_META = [
  {
    id: "khu-a",
    name: "1. Bãi đỗ xe Khu A (Nhà xe có mái che)",
    shortName: "Sơ đồ bãi đỗ xe – Khu A (Nhà xe)",
    location: "Phía Bắc Sân bóng chuyền - Cạnh giảng đường Khu A",
    prefix: "A",
    roofType: "indoor", // Nhà xe (Có mái che)
    roofLabel: "Nhà xe (Có mái che)",
    floodRisk: false,
    defaultVehicle: "Xe máy"
  },
  {
    id: "trung-tam",
    name: "2. Bãi đỗ xe Trung tâm (Giữa Sân bóng chuyền & Khu C)",
    shortName: "Sơ đồ bãi đỗ xe – Khu Trung tâm",
    location: "Giữa Sân bóng chuyền và Khu C (Khu vực tự học)",
    prefix: "TT",
    roofType: "indoor",
    roofLabel: "Nhà xe (Có mái che)",
    floodRisk: false,
    defaultVehicle: "Xe máy"
  },
  {
    id: "hoi-truong-a",
    name: "3. Bãi đỗ xe sau Hội trường A",
    shortName: "Sơ đồ bãi đỗ xe – Sau Hội trường A",
    location: "Phía Bắc Hội trường A & Khu vực tự học",
    prefix: "HT",
    roofType: "indoor",
    roofLabel: "Nhà xe (Có mái che)",
    floodRisk: false,
    defaultVehicle: "Xe máy"
  },
  {
    id: "khu-d",
    name: "4. Bãi đỗ xe Khu D (Giữa Khu D & Sân bóng chuyền)",
    shortName: "Sơ đồ bãi đỗ xe – Khu D",
    location: "Hành lang giữa Khu D và Sân bóng chuyền",
    prefix: "D",
    roofType: "indoor",
    roofLabel: "Nhà xe (Có mái che)",
    floodRisk: false,
    defaultVehicle: "Xe máy"
  },
  {
    id: "sau-khu-d",
    name: "5. Bãi đỗ xe sau Khu D (Giáp KTX A & KTX B)",
    shortName: "Sơ đồ bãi đỗ xe – Sau Khu D (KTX)",
    location: "Giữa tòa Khu D và Ký túc xá A / Ký túc xá B",
    prefix: "SD",
    roofType: "outdoor",
    roofLabel: "Ngoài trời",
    floodRisk: true,
    defaultVehicle: "Xe máy"
  },
  {
    id: "mini-mart",
    name: "6. Bãi đỗ xe trước Mini Mart",
    shortName: "Sơ đồ bãi đỗ xe – Trước Mini Mart",
    location: "Phía Nam Mini Mart, đầu tòa Khu D",
    prefix: "MM",
    roofType: "outdoor",
    roofLabel: "Ngoài trời",
    floodRisk: false,
    defaultVehicle: "Xe máy"
  },
  {
    id: "sau-ktx-b",
    name: "7. Bãi đỗ xe sau KTX B (Ngoài trời - Dọc bờ sông)",
    shortName: "Sơ đồ bãi đỗ xe – Sau KTX B (Bờ sông)",
    location: "Ngoài trời - Sát tường rào bảo vệ dọc bờ sông (Vùng trũng)",
    prefix: "KB",
    roofType: "outdoor",
    roofLabel: "Ngoài trời (Vùng trũng bờ sông)",
    floodRisk: true,
    defaultVehicle: "Xe máy"
  }
];

const STORAGE_KEY_STUDENTS = "unismartpark_ueh_students_v3";
const STORAGE_KEY_LOGS = "unismartpark_ueh_logs_v3";

// ==========================================================================
// 3. STATE QUẢN LÝ TOÀN HỆ THỐNG
// ==========================================================================
let students = [];
let parkingZones = {}; // { zoneId: [20 slots] }
let currentZoneId = "khu-a";
let selectedSlotCode = "A01";
let currentVehicleFilter = "Xe máy";
let isInlineCampusMapOpen = false;
let isFloodSimActive = false;
let voiceAIEnabled = true;

// Global KPI base counters (matching prompt: 120 Trống, 150 Đang sử dụng, 15 Đặt trước, 5 Không khả dụng)
let kpiStats = {
  free: 120,
  occupied: 150,
  reserved: 15,
  unavailable: 5,
  totalIn: 1320,
  totalOut: 1290
};

// Scanner State
let html5QrCodeInstance = null;
let isCameraRunning = false;
let lastScannedCode = "";
let lastScanTimestamp = 0;
let currentDisplayedStudent = null;
let currentModalStudent = null;
let currentMobileStudentMssv = "31251570240"; // Mặc định Hồ Thị Mỹ Hường (hoặc chọn bất kỳ ai trong 10 SV)

// Activity Logs & Alerts
let activityLogs = [];
let systemAlerts = [];

// ==========================================================================
// 4. KHỞI TẠO HỆ THỐNG (INITIALIZATION)
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  loadDatabase();
  buildAllParkingZones();
  initDefaultLogsAndAlerts();
  populateZoneDropdown();
  populateStudentDropdowns();

  // Render initial UI
  render20SlotGrid();
  selectSlot("A01");
  renderScannedStudentCard(students[0], "Check-in (Vào bãi)", true);
  renderKPICards();
  renderRecentActivityTable();
  renderDashboardAlerts();
  renderNotificationsPopover();
  renderStudentDatabaseTable();
  renderCampusMapViews();
  renderMobileStudentApp();

  // Start real-time clock
  updateRealTimeClock();
  setInterval(updateRealTimeClock, 1000);

  // Populate available camera devices quietly if supported
  discoverCameraDevices();

  // Check URL query params (e.g., ?mode=student or ?mssv=31251570287)
  const params = new URLSearchParams(window.location.search);
  if (params.get("mode") === "student") {
    switchAppMode("student");
  }
  if (params.get("mssv")) {
    const found = students.find(s => s.mssv === params.get("mssv"));
    if (found) {
      currentMobileStudentMssv = found.mssv;
      renderMobileStudentApp();
    }
  }

  if (window.lucide) {
    lucide.createIcons();
  }
});

// ==========================================================================
// 5. QUẢN LÝ DATABASE 10 SINH VIÊN & ĐỒNG BỘ LOCALSTORAGE
// ==========================================================================
function loadDatabase() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_STUDENTS);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        students = parsed;
        // Đảm bảo đủ 10 sinh viên gốc của nhóm luôn hiện diện
        DEFAULT_STUDENTS.forEach(defStu => {
          if (!students.some(s => s.mssv === defStu.mssv)) {
            students.push({ ...defStu });
          }
        });
        return;
      }
    }
  } catch (e) {
    console.warn("Không thể đọc localStorage, dùng dữ liệu mặc định:", e);
  }
  students = DEFAULT_STUDENTS.map(s => ({ ...s }));
  saveDatabase();
}

function saveDatabase() {
  try {
    localStorage.setItem(STORAGE_KEY_STUDENTS, JSON.stringify(students));
  } catch (e) {
    console.warn("Không thể lưu localStorage:", e);
  }
}

function resetDefaultDatabase() {
  students = DEFAULT_STUDENTS.map(s => ({ ...s }));
  saveDatabase();
  isFloodSimActive = false;
  kpiStats = {
    free: 120,
    occupied: 150,
    reserved: 15,
    unavailable: 5,
    totalIn: 1320,
    totalOut: 1290
  };
  buildAllParkingZones();
  initDefaultLogsAndAlerts();
  populateStudentDropdowns();
  render20SlotGrid();
  selectSlot("A01");
  renderScannedStudentCard(students[0], "Check-in (Vào bãi)", true);
  renderKPICards();
  renderRecentActivityTable();
  renderDashboardAlerts();
  renderStudentDatabaseTable();
  renderCampusMapViews();
  renderMobileStudentApp();
  updateWeatherWidgetUI();
  dismissPushBanner();
  hideEmergencyStrip();
  speakVietnamese("Đã khôi phục dữ liệu mặc định của mười sinh viên trong nhóm");
}

// ==========================================================================
// 6. XÂY DỰNG DỮ LIỆU 20 Ô ĐỖ CHO TỪNG KHU VỰC TRONG 7 BÃI XE
// ==========================================================================
function buildAllParkingZones() {
  parkingZones = {};

  PARKING_ZONES_META.forEach(zone => {
    const slots = [];
    for (let i = 1; i <= 20; i++) {
      const numStr = i < 10 ? `0${i}` : `${i}`;
      const code = `${zone.prefix}${numStr}`;

      let status = "free"; // free | occupied | reserved | unavailable
      let studentMssv = null;
      let studentName = null;
      let licensePlate = null;
      let vehicleType = zone.defaultVehicle;
      let note = "Sẵn sàng sử dụng";

      if (zone.id === "khu-a") {
        // Ánh xạ chính xác 10 sinh viên trong nhóm vào Khu A (A02-A09, A12, A15) + A17 Không khả dụng (chuẩn Hình 2)
        const matchedStudent = students.find(s => s.oDo.toUpperCase() === code);
        if (matchedStudent) {
          studentMssv = matchedStudent.mssv;
          studentName = matchedStudent.hoTen;
          licensePlate = matchedStudent.bienSo;
          vehicleType = matchedStudent.loaiXe || "Xe máy";
          if (isStudentParked(matchedStudent.trangThaiGui)) {
            status = "occupied";
            note = `Đang sử dụng (${matchedStudent.dongXe})`;
          } else if (matchedStudent.trangThaiGui === "Đặt trước") {
            status = "reserved";
            note = `Đã đặt trước (${matchedStudent.dongXe})`;
          }
        } else if (code === "A17") {
          status = "unavailable";
          note = "Bảo trì cảm biến / Không khả dụng";
        } else if (["A11", "A13", "A14", "A16", "A18", "A19", "A20"].includes(code)) {
          // Để A01 và A10 trống (Xanh lá) cho việc đặt chỗ & điều phối mưa ngập, các ô còn lại có xe sinh viên khác để sát thực tế Hình 2
          if (["A13", "A14", "A18", "A19"].includes(code)) {
            status = "occupied";
            studentName = "Sinh viên UEH Mekong";
            licensePlate = `64B1-${100 + i}.${20 + i}`;
            note = "Đang sử dụng";
          }
        }
      } else {
        // Các khu vực khác (2..7): Tạo dữ liệu mô phỏng chân thực
        if (i % 7 === 0) {
          status = "reserved";
          studentName = "SV Đặt trước";
          licensePlate = `64E1-${200 + i}.${10 + i}`;
          note = "Đã đặt chỗ trước";
        } else if (i % 2 === 0 || i % 3 === 0) {
          status = "occupied";
          studentName = "Sinh viên UEH";
          licensePlate = `65B1-${300 + i}.${30 + i}`;
          note = "Đang sử dụng";
        }
        // Nếu đang kích hoạt ngập nước và bãi này thuộc vùng trũng ngoài trời (Sau KTX B dọc bờ sông / Sau Khu D)
        if (isFloodSimActive && zone.floodRisk && i <= 14) {
          status = "unavailable";
          note = "Cảnh báo ngập nước - Tạm đóng ô";
        }
      }

      slots.push({
        code,
        zoneId: zone.id,
        zoneName: zone.name,
        roofLabel: zone.roofLabel,
        roofType: zone.roofType,
        status,
        studentMssv,
        studentName,
        licensePlate,
        vehicleType,
        note
      });
    }
    parkingZones[zone.id] = slots;
  });
}

function syncSlotsWithStudents() {
  // Cập nhật các ô đỗ dựa trên mảng students hiện tại
  Object.values(parkingZones).forEach(slotList => {
    slotList.forEach(slot => {
      if (slot.studentMssv) {
        slot.status = "free";
        slot.studentMssv = null;
        slot.studentName = null;
        slot.licensePlate = null;
        slot.note = "Sẵn sàng sử dụng";
      }
    });
  });

  students.forEach(stu => {
    if (!stu.oDo || stu.trangThaiGui === "Đã lấy xe") return;
    const targetCode = stu.oDo.trim().toUpperCase();
    for (const zId of Object.keys(parkingZones)) {
      const foundSlot = parkingZones[zId].find(s => s.code.toUpperCase() === targetCode);
      if (foundSlot) {
        foundSlot.studentMssv = stu.mssv;
        foundSlot.studentName = stu.hoTen;
        foundSlot.licensePlate = stu.bienSo;
        foundSlot.vehicleType = stu.loaiXe || "Xe máy";
        if (isStudentParked(stu.trangThaiGui)) {
          foundSlot.status = "occupied";
          foundSlot.note = `Đang sử dụng (${stu.dongXe})`;
        } else if (stu.trangThaiGui === "Đặt trước") {
          foundSlot.status = "reserved";
          foundSlot.note = `Đã đặt trước (${stu.dongXe})`;
        }
        break;
      }
    }
  });
}

// ==========================================================================
// 7. NHẬT KÝ HOẠT ĐỘNG & CẢNH BÁO MẶC ĐỊNH (CHUẨN HÌNH MẪU 2)
// ==========================================================================
function initDefaultLogsAndAlerts() {
  activityLogs = [
    {
      time: "09:20",
      vehicle: "Xe máy",
      plate: "95H1-986.23",
      studentName: "Nguyễn Đặng Hoàn Mỹ",
      mssv: "31251570256",
      slot: "A03",
      status: "Vào",
      badgeType: "in",
      detail: "Quét mã vạch UEH Student hợp lệ"
    },
    {
      time: "09:18",
      vehicle: "Xe máy",
      plate: "68A1-327.45",
      studentName: "Hồ Thị Mỹ Hường",
      mssv: "31251570240",
      slot: "A12",
      status: "Đặt trước",
      badgeType: "reserved",
      detail: "Đặt chỗ trước qua App Sinh viên"
    },
    {
      time: "09:15",
      vehicle: "Xe máy",
      plate: "59B1-246.80",
      studentName: "Xe chưa đăng ký",
      mssv: "—",
      slot: "A17",
      status: "Cảnh báo",
      badgeType: "alert",
      detail: "Cảm biến báo ô A17 đang bảo trì"
    },
    {
      time: "09:10",
      vehicle: "Xe máy",
      plate: "62AU-006.41",
      studentName: "Nguyễn Đức Trí",
      mssv: "31251570287",
      slot: "A02",
      status: "Vào",
      badgeType: "in",
      detail: "Check-in cổng chính thành công"
    }
  ];

  systemAlerts = [
    {
      id: "alert-rain-30m",
      time: "08:20",
      title: "Dự báo mưa lớn trong 30 phút tới",
      desc: "Hãy cân nhắc chọn khu vực có mái che (Nhà xe Khu A, Khu D).",
      type: "weather",
      icon: "cloud-rain"
    },
    {
      id: "alert-flood-b",
      time: "08:35",
      title: "Nguy cơ ngập tại khu vực B / Sau KTX B dọc bờ sông",
      desc: "Hệ thống đề xuất chuyển sang khu vực A (Nhà xe có mái che).",
      type: "flood",
      icon: "waves"
    }
  ];
}

// ==========================================================================
// 8. RENDER SƠ ĐỒ 20 Ô ĐỖ 2D KỸ THUẬT SỐ (CHUẨN HÌNH MẪU 2)
// ==========================================================================
function populateZoneDropdown() {
  const select = document.getElementById("zone-selector-dropdown");
  if (!select) return;
  select.innerHTML = PARKING_ZONES_META.map(z =>
    `<option value="${z.id}" ${z.id === currentZoneId ? "selected" : ""}>📍 ${z.name}</option>`
  ).join("");
}

function selectParkingZone(zoneId) {
  if (!parkingZones[zoneId]) return;
  currentZoneId = zoneId;

  const dropdown = document.getElementById("zone-selector-dropdown");
  if (dropdown) dropdown.value = zoneId;

  const zoneMeta = PARKING_ZONES_META.find(z => z.id === zoneId);
  if (zoneMeta) {
    // Update roof filter buttons highlight
    const btnIndoor = document.getElementById("filter-roof-indoor");
    const btnOutdoor = document.getElementById("filter-roof-outdoor");
    if (zoneMeta.roofType === "indoor") {
      btnIndoor.className = "px-2.5 py-1 rounded-lg text-xs font-bold transition bg-[#005f69] text-white";
      btnOutdoor.className = "px-2.5 py-1 rounded-lg text-xs font-bold transition text-slate-600 hover:text-slate-900";
    } else {
      btnOutdoor.className = "px-2.5 py-1 rounded-lg text-xs font-bold transition bg-[#f26f21] text-white";
      btnIndoor.className = "px-2.5 py-1 rounded-lg text-xs font-bold transition text-slate-600 hover:text-slate-900";
    }

    const roofBadge = document.getElementById("current-zone-roof-badge");
    const locDesc = document.getElementById("current-zone-location-desc");
    if (roofBadge) {
      roofBadge.textContent = zoneMeta.roofLabel;
      roofBadge.className = zoneMeta.roofType === "indoor"
        ? "px-2.5 py-0.5 rounded-full font-bold bg-teal-100 text-[#005f69]"
        : "px-2.5 py-0.5 rounded-full font-bold bg-orange-100 text-[#f26f21]";
    }
    if (locDesc) locDesc.textContent = zoneMeta.location;
  }

  // If inline campus map was open, switch back to 20-slot grid so user sees the zone slots immediately
  if (isInlineCampusMapOpen) {
    toggleInlineCampusMap(false);
  }

  render20SlotGrid();
  const firstSlot = parkingZones[zoneId][0];
  if (firstSlot) selectSlot(firstSlot.code);
  renderCampusMapViews();
}

function filterZoneByRoof(roofType) {
  const matchingZone = PARKING_ZONES_META.find(z => z.roofType === roofType);
  if (matchingZone) {
    selectParkingZone(matchingZone.id);
  }
}

function setVehicleFilter(vehicleType) {
  currentVehicleFilter = vehicleType;
  const btnMoto = document.getElementById("filter-vehicle-moto");
  const btnCar = document.getElementById("filter-vehicle-car");
  if (vehicleType === "Xe máy") {
    btnMoto.className = "px-2 py-1 rounded-lg text-xs font-bold transition bg-[#005f69] text-white";
    btnCar.className = "px-2 py-1 rounded-lg text-xs font-bold transition text-slate-600 hover:text-slate-900";
  } else {
    btnCar.className = "px-2 py-1 rounded-lg text-xs font-bold transition bg-[#005f69] text-white";
    btnMoto.className = "px-2 py-1 rounded-lg text-xs font-bold transition text-slate-600 hover:text-slate-900";
  }
  render20SlotGrid();
}

function render20SlotGrid() {
  const slots = parkingZones[currentZoneId] || [];
  const topRowEl = document.getElementById("slots-row-top");
  const bottomRowEl = document.getElementById("slots-row-bottom");
  const lotContainer = document.getElementById("parking-20-grid-container");

  if (!topRowEl || !bottomRowEl) return;

  const zoneMeta = PARKING_ZONES_META.find(z => z.id === currentZoneId);
  if (lotContainer) {
    if (isFloodSimActive && zoneMeta && zoneMeta.floodRisk) {
      lotContainer.classList.add("rain-effect");
    } else {
      lotContainer.classList.remove("rain-effect");
    }
  }

  const topSlots = slots.slice(0, 10);
  const bottomSlots = slots.slice(10, 20);

  topRowEl.innerHTML = topSlots.map(s => createSlotCardHTML(s)).join("");
  bottomRowEl.innerHTML = bottomSlots.map(s => createSlotCardHTML(s)).join("");

  if (window.lucide) {
    lucide.createIcons();
  }
}

function createSlotCardHTML(slot) {
  const isSelected = slot.code === selectedSlotCode;
  let statusClass = "slot-free";
  let iconHTML = currentVehicleFilter === "Ô tô"
    ? `<i data-lucide="car" class="w-5 h-5 sm:w-6 sm:h-6"></i>`
    : `<i data-lucide="bike" class="w-5 h-5 sm:w-6 sm:h-6"></i>`;
  let subLabel = "Trống";

  if (slot.status === "occupied") {
    statusClass = (slot.code === "A02" || isSelected)
      ? "slot-occupied slot-highlight-blue"
      : "slot-occupied";
    subLabel = slot.licensePlate ? slot.licensePlate.split("-")[0] : "Đang đỗ";
  } else if (slot.status === "reserved") {
    statusClass = "slot-reserved";
    subLabel = "Đặt trước";
  } else if (slot.status === "unavailable") {
    statusClass = (isFloodSimActive && slot.note.includes("ngập")) ? "slot-flooded" : "slot-unavailable";
    iconHTML = `<i data-lucide="ban" class="w-5 h-5 sm:w-6 sm:h-6"></i>`;
    subLabel = (isFloodSimActive && slot.note.includes("ngập")) ? "Ngập nước" : "Bảo trì";
  }

  return `
    <div onclick="selectSlot('${slot.code}')"
         class="parking-slot ${statusClass} ${isSelected ? "selected-slot" : ""} rounded-xl p-1.5 sm:p-2 flex flex-col items-center justify-between min-h-[78px] sm:min-h-[88px] shadow-sm"
         title="Ô ${slot.code} - ${slot.studentName || slot.note}">
      <span class="text-[11px] sm:text-xs font-extrabold tracking-tight">${slot.code}</span>
      <div class="my-1 flex items-center justify-center">
        ${iconHTML}
      </div>
      <span class="text-[9px] sm:text-[10px] font-bold truncate max-w-full px-1 rounded bg-white/50">
        ${subLabel}
      </span>
    </div>
  `;
}

// ==========================================================================
// 9. XỬ LÝ CHỌN Ô ĐỖ & HIỂN THỊ KHUNG "THÔNG TIN Ô ĐỖ" BÊN PHẢI
// ==========================================================================
function selectSlot(slotCode) {
  selectedSlotCode = slotCode;
  const slots = parkingZones[currentZoneId] || [];
  const slot = slots.find(s => s.code === slotCode);
  if (!slot) return;

  render20SlotGrid();

  const codeEl = document.getElementById("slot-detail-code");
  const badgeEl = document.getElementById("slot-detail-badge");
  const zoneTagEl = document.getElementById("slot-detail-zone-tag");
  const areaEl = document.getElementById("slot-detail-area");
  const vehicleEl = document.getElementById("slot-detail-vehicle");
  const statusTextEl = document.getElementById("slot-detail-status-text");
  const studentEl = document.getElementById("slot-detail-student");
  const plateEl = document.getElementById("slot-detail-plate");
  const simInput = document.getElementById("sim-incoming-plate-input");

  if (codeEl) codeEl.textContent = slot.code;
  if (zoneTagEl) zoneTagEl.textContent = slot.zoneName.replace(/^\d+\.\s*/, "");
  if (areaEl) areaEl.textContent = `${slot.roofLabel}`;
  if (vehicleEl) vehicleEl.textContent = currentVehicleFilter || slot.vehicleType;
  if (studentEl) studentEl.textContent = slot.studentName ? `${slot.studentName}${slot.studentMssv ? " (" + slot.studentMssv + ")" : ""}` : "— Chưa có —";
  if (plateEl) plateEl.textContent = slot.licensePlate || "—";

  if (simInput && slot.licensePlate) {
    simInput.value = slot.licensePlate;
  } else if (simInput) {
    simInput.value = "";
  }

  if (slot.status === "free") {
    codeEl.className = "text-2xl sm:text-3xl font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl";
    badgeEl.className = "px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-700 font-bold text-xs sm:text-sm flex items-center gap-1.5 border border-emerald-200";
    badgeEl.innerHTML = `<i data-lucide="check-circle-2" class="w-4 h-4"></i><span>Trống</span>`;
    statusTextEl.textContent = "Sẵn sàng sử dụng";
    statusTextEl.className = "font-bold text-emerald-700";
  } else if (slot.status === "occupied") {
    codeEl.className = "text-2xl sm:text-3xl font-black text-blue-700 bg-blue-50 border border-blue-200 px-4 py-2 rounded-xl";
    badgeEl.className = "px-3.5 py-2 rounded-xl bg-blue-50 text-blue-700 font-bold text-xs sm:text-sm flex items-center gap-1.5 border border-blue-200";
    badgeEl.innerHTML = `<i data-lucide="bike" class="w-4 h-4"></i><span>Đang sử dụng</span>`;
    statusTextEl.textContent = slot.note || "Đang có phương tiện đỗ";
    statusTextEl.className = "font-bold text-blue-700";
  } else if (slot.status === "reserved") {
    codeEl.className = "text-2xl sm:text-3xl font-black text-[#f26f21] bg-orange-50 border border-orange-200 px-4 py-2 rounded-xl";
    badgeEl.className = "px-3.5 py-2 rounded-xl bg-orange-50 text-[#f26f21] font-bold text-xs sm:text-sm flex items-center gap-1.5 border border-orange-200";
    badgeEl.innerHTML = `<i data-lucide="calendar-clock" class="w-4 h-4"></i><span>Đặt trước</span>`;
    statusTextEl.textContent = slot.note || "Đã được sinh viên đặt trước";
    statusTextEl.className = "font-bold text-[#f26f21]";
  } else {
    codeEl.className = "text-2xl sm:text-3xl font-black text-red-600 bg-red-50 border border-red-200 px-4 py-2 rounded-xl";
    badgeEl.className = "px-3.5 py-2 rounded-xl bg-red-50 text-red-600 font-bold text-xs sm:text-sm flex items-center gap-1.5 border border-red-200";
    badgeEl.innerHTML = `<i data-lucide="alert-triangle" class="w-4 h-4"></i><span>Không khả dụng</span>`;
    statusTextEl.textContent = slot.note || "Ngập nước / Tạm ngưng";
    statusTextEl.className = "font-bold text-red-600";
  }

  if (window.lucide) lucide.createIcons();
}

// ==========================================================================
// 10. PHÂN HỆ 1: CAMERA QUÉT MÃ VẠCH ĐA THIẾT BỊ & CHECK-IN / CHECK-OUT 2 CHIỀU
// ==========================================================================
function switchScanTab(tab) {
  const btnRfid = document.getElementById("scan-tab-rfid");
  const btnBarcode = document.getElementById("scan-tab-barcode");
  const hintText = document.getElementById("scanner-hint-text");

  if (tab === "rfid") {
    btnRfid.className = "py-2 px-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition bg-[#005f69] text-white shadow-sm";
    btnBarcode.className = "py-2 px-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition text-slate-600 hover:text-slate-900";
    if (hintText) hintText.textContent = "Chế độ Thẻ từ: Quét thẻ RFID hoặc chọn sinh viên bên dưới";
  } else {
    btnBarcode.className = "py-2 px-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition bg-[#005f69] text-white shadow-sm";
    btnRfid.className = "py-2 px-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition text-slate-600 hover:text-slate-900";
    if (hintText) hintText.textContent = "Đưa mã vạch MSSV trên App UEH Student vào khung ngắm";
  }
}

async function discoverCameraDevices() {
  if (typeof Html5Qrcode === "undefined") return;
  try {
    const devices = await Html5Qrcode.getCameras();
    const select = document.getElementById("camera-device-select");
    if (!select) return;
    if (devices && devices.length > 0) {
      select.innerHTML = `<option value="">-- Chọn Camera (${devices.length} thiết bị) --</option>` +
        devices.map((d, idx) => `<option value="${d.id}">${d.label || "Camera " + (idx + 1)}</option>`).join("");
    }
  } catch (err) {
    // Camera permission not yet granted; will populate when user clicks Start Camera
  }
}

function getSupportedFormats() {
  if (typeof Html5QrcodeSupportedFormats === "undefined") return undefined;
  return [
    Html5QrcodeSupportedFormats.CODE_128,
    Html5QrcodeSupportedFormats.CODE_39,
    Html5QrcodeSupportedFormats.EAN_13,
    Html5QrcodeSupportedFormats.EAN_8,
    Html5QrcodeSupportedFormats.QR_CODE,
    Html5QrcodeSupportedFormats.ITF,
    Html5QrcodeSupportedFormats.CODABAR
  ];
}

async function startCameraScanner(facingModeOrDeviceId) {
  switchScanTab("barcode");
  const readerEl = document.getElementById("qr-reader");
  const idlePreviewEl = document.getElementById("scanner-idle-preview");
  const stopBtn = document.getElementById("btn-stop-camera");
  const indicator = document.getElementById("camera-active-indicator");

  if (typeof Html5Qrcode === "undefined") {
    alert("Thư viện html5-qrcode chưa tải xong. Vui lòng kiểm tra kết nối mạng hoặc dùng nút Quét nhanh bên dưới.");
    return;
  }

  try {
    if (html5QrCodeInstance && isCameraRunning) {
      await html5QrCodeInstance.stop();
      isCameraRunning = false;
    }

    readerEl.classList.remove("hidden");
    idlePreviewEl.classList.add("hidden");
    if (stopBtn) stopBtn.classList.remove("hidden");
    if (indicator) {
      indicator.textContent = "Đang mở Cam...";
      indicator.className = "text-[10px] font-bold text-amber-600 animate-pulse";
    }

    if (!html5QrCodeInstance) {
      html5QrCodeInstance = new Html5Qrcode("qr-reader", {
        formatsToSupport: getSupportedFormats(),
        experimentalFeatures: {
          useBarCodeDetectorIfSupported: true
        },
        verbose: false
      });
    }

    const config = {
      fps: 20,
      qrbox: (viewfinderWidth, viewfinderHeight) => {
        const w = Math.max(180, Math.floor(viewfinderWidth * 0.85));
        const h = Math.max(100, Math.floor(viewfinderHeight * 0.55));
        return { width: w, height: h };
      },
      aspectRatio: 1.333334
    };

    const cameraConstraint = (facingModeOrDeviceId === "environment")
      ? { facingMode: { ideal: "environment" } }
      : (facingModeOrDeviceId === "user")
      ? { facingMode: "user" }
      : facingModeOrDeviceId;

    await html5QrCodeInstance.start(
      cameraConstraint,
      config,
      (decodedText) => {
        onBarcodeScannedSuccess(decodedText);
      },
      () => {
        // Ignore frame scan misses
      }
    );

    isCameraRunning = true;
    if (indicator) {
      indicator.textContent = facingModeOrDeviceId === "environment" ? "🟢 Cam Sau ĐT" : "🟢 Webcam Live";
      indicator.className = "text-[10px] font-bold text-emerald-600";
    }

    // Refresh camera device list now that permission is granted
    discoverCameraDevices();
  } catch (err) {
    console.warn("Không thể mở trực tiếp Camera:", err);
    readerEl.classList.add("hidden");
    idlePreviewEl.classList.remove("hidden");
    if (stopBtn) stopBtn.classList.add("hidden");
    if (indicator) {
      indicator.textContent = "Dùng Chụp ảnh / Test nhanh";
      indicator.className = "text-[10px] font-bold text-orange-600";
    }
    updateScanStatusBanner(
      false,
      "Trình duyệt chặn Camera hoặc chưa có HTTPS. Hãy bấm [📸 Chụp/Tải ảnh mã vạch] hoặc chọn nhanh SV bên dưới!"
    );
  }
}

async function onSelectCameraDevice(deviceId) {
  if (!deviceId) return;
  await startCameraScanner(deviceId);
}

async function stopCameraScanner() {
  const readerEl = document.getElementById("qr-reader");
  const idlePreviewEl = document.getElementById("scanner-idle-preview");
  const stopBtn = document.getElementById("btn-stop-camera");
  const indicator = document.getElementById("camera-active-indicator");

  try {
    if (html5QrCodeInstance && isCameraRunning) {
      await html5QrCodeInstance.stop();
      isCameraRunning = false;
    }
  } catch (e) {
    console.warn("Lỗi khi tắt camera:", e);
  }

  if (readerEl) readerEl.classList.add("hidden");
  if (idlePreviewEl) idlePreviewEl.classList.remove("hidden");
  if (stopBtn) stopBtn.classList.add("hidden");
  if (indicator) {
    indicator.textContent = "Đã tắt Cam";
    indicator.className = "text-[10px] font-semibold text-slate-400";
  }
}

// ==========================================================================
// QUÉT ẢNH CHỤP / TẢI LÊN MÃ VẠCH (ĐA TẦNG XỬ LÝ ĐỂ NHẠY 100% TRÊN MỌI ĐIỆN THOẠI)
// ==========================================================================
async function handleBarcodeImageUpload(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  updateScanStatusBanner(true, "Đang phân tích ảnh mã vạch...");

  try {
    if (isCameraRunning) {
      await stopCameraScanner();
    }

    // Tầng 1: Thử dùng Native BarcodeDetector nếu trình duyệt hỗ trợ
    if ("BarcodeDetector" in window) {
      try {
        const detector = new BarcodeDetector({
          formats: ["code_128", "code_39", "ean_13", "ean_8", "qr_code", "itf", "codabar"]
        });
        const bitmap = await createImageBitmap(file);
        const barcodes = await detector.detect(bitmap);
        if (barcodes && barcodes.length > 0 && barcodes[0].rawValue) {
          onBarcodeScannedSuccess(barcodes[0].rawValue);
          event.target.value = "";
          return;
        }
      } catch (e) {
        // Chuyển sang tầng 2
      }
    }

    // Tầng 2: Dùng html5-qrcode scanFile trực tiếp
    if (!html5QrCodeInstance) {
      html5QrCodeInstance = new Html5Qrcode("qr-reader", {
        formatsToSupport: getSupportedFormats(),
        verbose: false
      });
    }

    try {
      const resultText = await html5QrCodeInstance.scanFile(file, false);
      if (resultText) {
        onBarcodeScannedSuccess(resultText);
        event.target.value = "";
        return;
      }
    } catch (directErr) {
      // Tầng 3: Tiền xử lý ảnh trên Canvas (chuẩn hóa kích thước & tăng tương phản cho mã vạch 1D chụp từ màn hình ĐT)
      const processedFile = await preprocessBarcodeImageFile(file);
      const retryText = await html5QrCodeInstance.scanFile(processedFile, false);
      if (retryText) {
        onBarcodeScannedSuccess(retryText);
        event.target.value = "";
        return;
      }
    }
  } catch (err) {
    console.warn("Không đọc được mã vạch từ bức ảnh này:", err);
    updateScanStatusBanner(
      false,
      "Ảnh bị mờ hoặc chói sáng! Hãy chụp rõ vùng mã vạch hoặc chọn nhanh SV trong danh sách."
    );
    speakVietnamese("Không thể xác thực");
  }

  event.target.value = "";
}

function preprocessBarcodeImageFile(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const canvas = document.createElement("canvas");
      const targetWidth = 1000;
      const scale = targetWidth / img.width;
      canvas.width = targetWidth;
      canvas.height = Math.max(300, Math.floor(img.height * scale));
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.filter = "contrast(160%) grayscale(100%)";
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(new File([blob], "processed-barcode.png", { type: "image/png" }));
        } else {
          reject(new Error("Canvas toBlob failed"));
        }
      }, "image/png");
    };
    img.onerror = reject;
    img.src = url;
  });
}

// ==========================================================================
// XỬ LÝ KẾT QUẢ QUÉT MÃ (2 CHIỀU CHECK-IN / CHECK-OUT + GIỌNG ĐỌC AI TIẾNG VIỆT)
// ==========================================================================
function onBarcodeScannedSuccess(rawCode) {
  const cleanCode = String(rawCode || "").trim();
  if (!cleanCode) return;

  const nowMs = Date.now();
  // Chống quét trùng liên tiếp trong vòng 2.5 giây khi giữ thẻ trước webcam
  if (cleanCode === lastScannedCode && nowMs - lastScanTimestamp < 2500) {
    return;
  }
  lastScannedCode = cleanCode;
  lastScanTimestamp = nowMs;

  // Tìm sinh viên trong Database theo MSSV hoặc Biển số xe
  const student = students.find(
    s => s.mssv.toLowerCase() === cleanCode.toLowerCase() ||
         s.bienSo.toLowerCase() === cleanCode.toLowerCase()
  );

  if (student) {
    // Phát âm thanh & giọng đọc AI Tiếng Việt: "XÁC THỰC THÀNH CÔNG"
    playFeedbackBeep(true);
    speakVietnamese("XÁC THỰC THÀNH CÔNG");

    // Tự động đảo trạng thái 2 chiều (Đang gửi -> Check-out Ra; Chưa gửi / Đặt trước -> Check-in Vào)
    let actionLabel = "";
    let isCheckIn = true;

    if (isStudentParked(student.trangThaiGui)) {
      // Thực hiện CHECK-OUT (Ra bãi)
      isCheckIn = false;
      actionLabel = "Check-out (Ra bãi)";
      student.trangThaiGui = "Đã lấy xe";

      // Giải phóng ô đỗ hiện tại
      freeStudentSlot(student.mssv, student.oDo);

      kpiStats.occupied = Math.max(0, kpiStats.occupied - 1);
      kpiStats.free += 1;
      kpiStats.totalOut += 1;

      addActivityLog({
        vehicle: student.loaiXe || "Xe máy",
        plate: student.bienSo,
        studentName: student.hoTen,
        mssv: student.mssv,
        slot: student.oDo || "A01",
        status: "Ra",
        badgeType: "out",
        detail: `Check-out 2 chiều thành công (${student.dongXe})`
      });
    } else {
      // Thực hiện CHECK-IN (Vào bãi)
      isCheckIn = true;
      actionLabel = "Check-in (Vào bãi)";
      const wasReserved = student.trangThaiGui === "Đặt trước";
      student.trangThaiGui = "Đang sử dụng";

      // Đảm bảo sinh viên có ô đỗ trong Khu A (nếu ô cũ đã bị người khác đỗ thì cấp ô trống mới)
      assignOrActivateStudentSlot(student);

      if (wasReserved) {
        kpiStats.reserved = Math.max(0, kpiStats.reserved - 1);
      } else {
        kpiStats.free = Math.max(0, kpiStats.free - 1);
      }
      kpiStats.occupied += 1;
      kpiStats.totalIn += 1;

      addActivityLog({
        vehicle: student.loaiXe || "Xe máy",
        plate: student.bienSo,
        studentName: student.hoTen,
        mssv: student.mssv,
        slot: student.oDo,
        status: "Vào",
        badgeType: "in",
        detail: `Check-in 2 chiều thành công (${student.dongXe})`
      });
    }

    saveDatabase();
    updateScanStatusBanner(true, `XÁC THỰC THÀNH CÔNG! (${student.hoTen})`);
    renderScannedStudentCard(student, actionLabel, isCheckIn);

    // Chuyển sơ đồ về Khu A và chọn đúng ô của sinh viên vừa quét để thấy hiệu ứng đổi màu trực tiếp
    if (student.oDo && student.oDo.startsWith("A")) {
      currentZoneId = "khu-a";
      populateZoneDropdown();
    }
    render20SlotGrid();
    if (student.oDo) selectSlot(student.oDo);
    renderKPICards();
    renderRecentActivityTable();
    renderStudentDatabaseTable();
    renderCampusMapViews();
    renderMobileStudentApp();
  } else {
    // MÃ LẠ KHÔNG CÓ TRONG DATABASE -> ĐỌC TO "KHÔNG THỂ XÁC THỰC"
    playFeedbackBeep(false);
    speakVietnamese("KHÔNG THỂ XÁC THỰC");

    updateScanStatusBanner(false, `KHÔNG THỂ XÁC THỰC! Mã lạ: ${cleanCode}`);
    renderUnknownScannedCard(cleanCode);

    addActivityLog({
      vehicle: "Không xác định",
      plate: cleanCode,
      studentName: "Khách lạ / Mã không hợp lệ",
      mssv: cleanCode,
      slot: "Cổng",
      status: "Cảnh báo",
      badgeType: "alert",
      detail: "Từ chối mở barie: Mã không có trong Database UEH Mekong"
    });
    renderRecentActivityTable();
  }
}

function freeStudentSlot(mssv, slotCode) {
  for (const zId of Object.keys(parkingZones)) {
    const slot = parkingZones[zId].find(
      s => s.studentMssv === mssv || (slotCode && s.code.toUpperCase() === slotCode.toUpperCase())
    );
    if (slot) {
      slot.status = "free";
      slot.studentMssv = null;
      slot.studentName = null;
      slot.licensePlate = null;
      slot.note = "Sẵn sàng sử dụng";
    }
  }
}

function assignOrActivateStudentSlot(student) {
  const khuASlots = parkingZones["khu-a"] || [];
  let targetSlot = khuASlots.find(s => s.code.toUpperCase() === (student.oDo || "").toUpperCase());

  if (!targetSlot || (targetSlot.status === "occupied" && targetSlot.studentMssv !== student.mssv)) {
    targetSlot = khuASlots.find(s => s.status === "free") || khuASlots[0];
  }

  if (targetSlot) {
    student.oDo = targetSlot.code;
    targetSlot.status = "occupied";
    targetSlot.studentMssv = student.mssv;
    targetSlot.studentName = student.hoTen;
    targetSlot.licensePlate = student.bienSo;
    targetSlot.vehicleType = student.loaiXe || "Xe máy";
    targetSlot.note = `Đang đỗ (${student.dongXe})`;
  }
}

function triggerQuickStudentScan() {
  const select = document.getElementById("quick-student-select");
  if (!select || !select.value) return;
  lastScannedCode = ""; // Cho phép test bấm liên tục để đổi chiều Vào <-> Ra
  onBarcodeScannedSuccess(select.value);
}

function triggerManualCodeScan() {
  const input = document.getElementById("manual-scan-input");
  if (!input || !input.value.trim()) {
    alert("Vui lòng nhập MSSV, Biển số hoặc một mã bất kỳ để kiểm tra!");
    return;
  }
  lastScannedCode = "";
  onBarcodeScannedSuccess(input.value.trim());
}

function simulateStrangerScan() {
  const randomStrangerCode = "99998888" + Math.floor(100 + Math.random() * 899);
  const input = document.getElementById("manual-scan-input");
  if (input) input.value = randomStrangerCode;
  lastScannedCode = "";
  onBarcodeScannedSuccess(randomStrangerCode);
}

function updateScanStatusBanner(isSuccess, message) {
  const banner = document.getElementById("scan-status-banner");
  const textEl = document.getElementById("scan-status-text");
  if (!banner || !textEl) return;

  if (isSuccess) {
    banner.className = "flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-extrabold text-xs sm:text-sm";
    banner.innerHTML = `<i data-lucide="check-circle-2" class="w-5 h-5 text-emerald-600 shrink-0"></i><span id="scan-status-text">${message}</span>`;
  } else {
    banner.className = "flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-red-50 border border-red-200 text-red-700 font-extrabold text-xs sm:text-sm animate-pulse";
    banner.innerHTML = `<i data-lucide="x-circle" class="w-5 h-5 text-red-600 shrink-0"></i><span id="scan-status-text">${message}</span>`;
  }
  if (window.lucide) lucide.createIcons();
}

function renderScannedStudentCard(student, directionLabel, isCheckIn) {
  if (!student) return;
  currentDisplayedStudent = student;

  const initials = getInitials(student.hoTen);
  const avatarEl = document.getElementById("scanned-avatar-circle");
  const nameEl = document.getElementById("scanned-student-name");
  const mssvEl = document.getElementById("scanned-student-mssv");
  const dobEl = document.getElementById("scanned-student-dob");
  const plateEl = document.getElementById("scanned-student-plate");
  const modelEl = document.getElementById("scanned-student-model");
  const slotEl = document.getElementById("scanned-student-slot");

  if (avatarEl) {
    avatarEl.textContent = initials;
    avatarEl.className = "w-8 h-8 rounded-full bg-[#005f69] text-white font-extrabold text-xs flex items-center justify-center mb-1 shadow";
  }
  if (nameEl) nameEl.textContent = student.hoTen;
  if (mssvEl) mssvEl.textContent = student.mssv;
  if (dobEl) dobEl.textContent = student.ngaySinh;
  if (plateEl) plateEl.textContent = student.bienSo;
  if (modelEl) modelEl.textContent = `${student.dongXe} (${student.loaiXe || "Xe máy"})`;
  if (slotEl) slotEl.textContent = student.oDo || "A01";

  const nowStr = getFormattedNowShort();
  const dirIconEl = document.getElementById("scanned-direction-icon");
  const dirLabelEl = document.getElementById("scanned-direction-label");
  const dirTimeEl = document.getElementById("scanned-direction-time");
  const dirBadgeEl = document.getElementById("scanned-direction-badge");

  if (dirLabelEl) dirLabelEl.textContent = directionLabel || "Check-in (Vào bãi)";
  if (dirTimeEl) dirTimeEl.textContent = nowStr;

  if (isCheckIn) {
    if (dirIconEl) {
      dirIconEl.className = "w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold";
      dirIconEl.innerHTML = `<i data-lucide="log-in" class="w-4 h-4"></i>`;
    }
    if (dirBadgeEl) {
      dirBadgeEl.textContent = "Vào thành công";
      dirBadgeEl.className = "px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-700";
    }
  } else {
    if (dirIconEl) {
      dirIconEl.className = "w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold";
      dirIconEl.innerHTML = `<i data-lucide="log-out" class="w-4 h-4"></i>`;
    }
    if (dirBadgeEl) {
      dirBadgeEl.textContent = "Ra thành công";
      dirBadgeEl.className = "px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-100 text-blue-700";
    }
  }

  // Render preview barcode inside scanner frame
  renderSafeJsBarcode("#scanner-preview-barcode", student.mssv, {
    format: "CODE128",
    lineColor: "#0f172a",
    width: 1.6,
    height: 36,
    displayValue: false,
    margin: 2
  });
  const codeLabel = document.getElementById("scanner-preview-code-label");
  if (codeLabel) codeLabel.textContent = student.mssv;

  if (window.lucide) lucide.createIcons();
}

function renderUnknownScannedCard(strangerCode) {
  const avatarEl = document.getElementById("scanned-avatar-circle");
  const nameEl = document.getElementById("scanned-student-name");
  const mssvEl = document.getElementById("scanned-student-mssv");
  const dobEl = document.getElementById("scanned-student-dob");
  const plateEl = document.getElementById("scanned-student-plate");
  const modelEl = document.getElementById("scanned-student-model");
  const slotEl = document.getElementById("scanned-student-slot");

  if (avatarEl) {
    avatarEl.textContent = "!";
    avatarEl.className = "w-8 h-8 rounded-full bg-red-600 text-white font-extrabold text-xs flex items-center justify-center mb-1 shadow";
  }
  if (nameEl) nameEl.textContent = "KHÔNG THỂ XÁC THỰC";
  if (mssvEl) mssvEl.textContent = strangerCode;
  if (dobEl) dobEl.textContent = "Không có dữ liệu";
  if (plateEl) plateEl.textContent = "Chưa đăng ký";
  if (modelEl) modelEl.textContent = "Không xác định";
  if (slotEl) slotEl.textContent = "Từ chối";

  const dirIconEl = document.getElementById("scanned-direction-icon");
  const dirLabelEl = document.getElementById("scanned-direction-label");
  const dirTimeEl = document.getElementById("scanned-direction-time");
  const dirBadgeEl = document.getElementById("scanned-direction-badge");

  if (dirIconEl) {
    dirIconEl.className = "w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center font-bold";
    dirIconEl.innerHTML = `<i data-lucide="shield-x" class="w-4 h-4"></i>`;
  }
  if (dirLabelEl) dirLabelEl.textContent = "Cảnh báo thẻ/mã lạ";
  if (dirTimeEl) dirTimeEl.textContent = getFormattedNowShort();
  if (dirBadgeEl) {
    dirBadgeEl.textContent = "Từ chối";
    dirBadgeEl.className = "px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-100 text-red-700";
  }

  if (window.lucide) lucide.createIcons();
}

function resetScannerCard() {
  lastScannedCode = "";
  const firstStu = students[0] || DEFAULT_STUDENTS[0];
  updateScanStatusBanner(true, "Sẵn sàng quét thẻ / mã vạch tiếp theo");
  renderScannedStudentCard(firstStu, "Sẵn sàng kiểm tra", true);
}

// ==========================================================================
// GIỌNG ĐỌC AI TIẾNG VIỆT (SPEECH SYNTHESIS VI-VN) & ÂM BÁO WEB AUDIO
// ==========================================================================
function speakVietnamese(text) {
  if (!voiceAIEnabled || !("speechSynthesis" in window)) return;
  try {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "vi-VN";
    utter.rate = 1.05;
    utter.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const viVoice = voices.find(v => v.lang && v.lang.toLowerCase().includes("vi"));
    if (viVoice) {
      utter.voice = viVoice;
    }
    window.speechSynthesis.speak(utter);
  } catch (e) {
    console.warn("SpeechSynthesis error:", e);
  }
}

function testVoiceAI() {
  playFeedbackBeep(true);
  speakVietnamese("XÁC THỰC THÀNH CÔNG. Hệ thống quản trị bãi giữ xe thông minh U E H Mê Kông xin chào!");
}

function toggleVoiceSetting(enabled) {
  voiceAIEnabled = Boolean(enabled);
  if (voiceAIEnabled) {
    speakVietnamese("Đã bật giọng đọc A I tiếng Việt");
  }
}

function playFeedbackBeep(isSuccess) {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (isSuccess) {
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.setValueAtTime(1320, ctx.currentTime + 0.09);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } else {
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(240, ctx.currentTime);
      osc.frequency.setValueAtTime(180, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.38);
      osc.start();
      osc.stop(ctx.currentTime + 0.38);
    }
  } catch (e) {
    // Ignore audio context restriction if any
  }
}

// ==========================================================================
// 11. PHÂN HỆ 2: QUẢN LÝ VỊ TRÍ ĐỖ XE THÔNG MINH & ĐỐI CHIẾU BIỂN SỐ AI
// ==========================================================================
function selectQuickReservedSlotForDemo() {
  currentZoneId = "khu-a";
  populateZoneDropdown();
  const khuASlots = parkingZones["khu-a"] || [];
  let reservedSlot = khuASlots.find(s => s.status === "reserved");
  if (!reservedSlot) {
    // Nếu cả A12 và A15 đã vào bãi, tự động đặt lại A12 ở trạng thái Đặt trước cho Hồ Thị Mỹ Hường để demo
    const a12 = khuASlots.find(s => s.code === "A12");
    const huong = students.find(s => s.mssv === "31251570240");
    if (a12 && huong) {
      huong.trangThaiGui = "Đặt trước";
      huong.oDo = "A12";
      a12.status = "reserved";
      a12.studentMssv = huong.mssv;
      a12.studentName = huong.hoTen;
      a12.licensePlate = huong.bienSo;
      a12.note = `Đã đặt trước (${huong.dongXe})`;
      reservedSlot = a12;
      saveDatabase();
    }
  }
  render20SlotGrid();
  if (reservedSlot) {
    selectSlot(reservedSlot.code);
  }
}

function simulatePlateMatchOnSelectedSlot(shouldMatch) {
  const slots = parkingZones[currentZoneId] || [];
  let slot = slots.find(s => s.code === selectedSlotCode);
  if (!slot) return;

  // Nếu ô đang chọn chưa có biển số đặt trước, gợi ý chuyển sang ô Đặt trước A12 (Hồ Thị Mỹ Hường) hoặc gán tạm biển số mẫu
  if (!slot.licensePlate) {
    selectQuickReservedSlotForDemo();
    slot = (parkingZones[currentZoneId] || []).find(s => s.code === selectedSlotCode);
  }

  const input = document.getElementById("sim-incoming-plate-input");
  if (shouldMatch) {
    if (input) input.value = slot.licensePlate || "68A1-327.45";
  } else {
    if (input) input.value = "59X1-999.99";
  }
  verifyIncomingVehiclePlate();
}

function verifyIncomingVehiclePlate() {
  const slots = parkingZones[currentZoneId] || [];
  const slot = slots.find(s => s.code === selectedSlotCode);
  const input = document.getElementById("sim-incoming-plate-input");
  const incomingPlate = (input && input.value.trim()) ? input.value.trim().toUpperCase() : "";

  if (!slot) return;
  if (!incomingPlate) {
    alert("Vui lòng nhập biển số xe đi vào ô hoặc nhấn nút [Xe đúng biển số] / [Xe sai biển số]!");
    return;
  }

  const registeredPlate = (slot.licensePlate || "").trim().toUpperCase();

  // Trường hợp ô đã đặt trước hoặc đã đăng ký biển số
  if (registeredPlate) {
    if (incomingPlate === registeredPlate) {
      // KHỚP BIỂN SỐ -> Chuyển trạng thái ô sang "Đang sử dụng" (Xanh dương)
      const wasReserved = slot.status === "reserved";
      slot.status = "occupied";
      slot.note = `Đang sử dụng (Đã xác thực biển số AI: ${incomingPlate})`;

      if (slot.studentMssv) {
        const stu = students.find(s => s.mssv === slot.studentMssv);
        if (stu) stu.trangThaiGui = "Đang sử dụng";
        saveDatabase();
      }

      if (wasReserved) {
        kpiStats.reserved = Math.max(0, kpiStats.reserved - 1);
        kpiStats.occupied += 1;
      }

      hideEmergencyStrip();
      playFeedbackBeep(true);
      speakVietnamese(`Xác thực biển số chính xác tại ô ${slot.code}. Chuyển sang trạng thái đang sử dụng.`);

      addActivityLog({
        vehicle: slot.vehicleType || "Xe máy",
        plate: incomingPlate,
        studentName: slot.studentName || "Sinh viên UEH",
        mssv: slot.studentMssv || "—",
        slot: slot.code,
        status: "Vào",
        badgeType: "in",
        detail: `Camera AI khớp biển số đặt trước tại ô ${slot.code}`
      });

      render20SlotGrid();
      selectSlot(slot.code);
      renderKPICards();
      renderRecentActivityTable();
      renderStudentDatabaseTable();
      renderMobileStudentApp();
    } else {
      // SAI BIỂN SỐ -> Phát cảnh báo đỏ "Cảnh báo đỗ sai vị trí đặt trước!"
      playFeedbackBeep(false);
      speakVietnamese(`Cảnh báo đỗ sai vị trí đặt trước tại ô ${slot.code}!`);

      showEmergencyStrip(
        `🚨 CẢNH BÁO ĐỖ SAI VỊ TRÍ ĐẶT TRƯỚC TẠI Ô ${slot.code}!`,
        `Camera AI phát hiện xe biển số [${incomingPlate}] đi vào ô ${slot.code} đã được đặt trước bởi ${slot.studentName || "Sinh viên"} (Biển số đăng ký: [${registeredPlate}]).`
      );

      systemAlerts.unshift({
        id: "alert-plate-" + Date.now(),
        time: getCurrentHHMM(),
        title: `Cảnh báo đỗ sai vị trí đặt trước tại ô ${slot.code}!`,
        desc: `Xe [${incomingPlate}] xâm phạm ô đặt trước của biển số [${registeredPlate}] (${slot.studentName || "SV"}).`,
        type: "security",
        icon: "shield-alert"
      });

      addActivityLog({
        vehicle: slot.vehicleType || "Xe máy",
        plate: incomingPlate,
        studentName: `Sai biển số (ĐK: ${registeredPlate})`,
        mssv: slot.studentMssv || "—",
        slot: slot.code,
        status: "Cảnh báo",
        badgeType: "alert",
        detail: `Cảnh báo đỗ sai vị trí đặt trước tại ô ${slot.code}!`
      });

      renderDashboardAlerts();
      renderRecentActivityTable();
      renderNotificationsPopover();
    }
  } else {
    // Nếu ô đang Trống, kiểm tra xem biển số này có thuộc sinh viên nào trong nhóm không
    const matchedStu = students.find(s => s.bienSo.toUpperCase() === incomingPlate);
    slot.status = "occupied";
    slot.licensePlate = incomingPlate;
    slot.studentName = matchedStu ? matchedStu.hoTen : "Sinh viên vãng lai";
    slot.studentMssv = matchedStu ? matchedStu.mssv : null;
    slot.note = "Đang sử dụng (Ghi nhận bởi Camera AI)";

    if (matchedStu) {
      matchedStu.oDo = slot.code;
      matchedStu.trangThaiGui = "Đang sử dụng";
      saveDatabase();
    }

    kpiStats.free = Math.max(0, kpiStats.free - 1);
    kpiStats.occupied += 1;

    playFeedbackBeep(true);
    speakVietnamese(`Đã ghi nhận xe ${incomingPlate} vào ô ${slot.code}`);

    addActivityLog({
      vehicle: slot.vehicleType || "Xe máy",
      plate: incomingPlate,
      studentName: slot.studentName,
      mssv: slot.studentMssv || "—",
      slot: slot.code,
      status: "Vào",
      badgeType: "in",
      detail: `Xe vào ô trống ${slot.code}`
    });

    render20SlotGrid();
    selectSlot(slot.code);
    renderKPICards();
    renderRecentActivityTable();
    renderStudentDatabaseTable();
  }
}

function showEmergencyStrip(title, desc) {
  const strip = document.getElementById("admin-emergency-strip");
  const titleEl = document.getElementById("emergency-strip-title");
  const descEl = document.getElementById("emergency-strip-desc");
  if (!strip) return;
  if (titleEl) titleEl.textContent = title;
  if (descEl) descEl.textContent = desc;
  strip.classList.remove("hidden");
}

function hideEmergencyStrip() {
  const strip = document.getElementById("admin-emergency-strip");
  if (strip) strip.classList.add("hidden");
}

// ==========================================================================
// ĐẶT CHỖ TRƯỚC TẠI Ô ĐỖ (RESERVE SLOT MODAL)
// ==========================================================================
function openReserveSlotModal() {
  const modal = document.getElementById("modal-reserve-slot");
  const codeSpan = document.getElementById("reserve-modal-slot-code");
  const select = document.getElementById("reserve-modal-student-select");
  if (!modal) return;

  if (codeSpan) codeSpan.textContent = selectedSlotCode;
  if (select) {
    select.innerHTML = students.map((s, idx) =>
      `<option value="${idx}">${s.hoTen} - ${s.mssv} (${s.bienSo})</option>`
    ).join("");
    onChangeReserveStudentSelect(0);
  }
  modal.classList.remove("hidden");
}

function onChangeReserveStudentSelect(idx) {
  const stu = students[Number(idx)];
  if (!stu) return;
  document.getElementById("reserve-modal-mssv").value = stu.mssv;
  document.getElementById("reserve-modal-plate").value = stu.bienSo;
  document.getElementById("reserve-modal-name").value = stu.hoTen;
}

function closeReserveSlotModal() {
  const modal = document.getElementById("modal-reserve-slot");
  if (modal) modal.classList.add("hidden");
}

function confirmReserveSlot() {
  const mssv = document.getElementById("reserve-modal-mssv").value.trim();
  const plate = document.getElementById("reserve-modal-plate").value.trim().toUpperCase();
  const name = document.getElementById("reserve-modal-name").value.trim();

  if (!plate || !name) {
    alert("Vui lòng nhập đầy đủ Họ tên và Biển số xe!");
    return;
  }

  const slots = parkingZones[currentZoneId] || [];
  const slot = slots.find(s => s.code === selectedSlotCode);
  if (!slot) return;

  slot.status = "reserved";
  slot.studentMssv = mssv || null;
  slot.studentName = name;
  slot.licensePlate = plate;
  slot.note = "Đã đặt trước";

  const stu = students.find(s => s.mssv === mssv);
  if (stu) {
    stu.oDo = slot.code;
    stu.trangThaiGui = "Đặt trước";
    saveDatabase();
  }

  kpiStats.free = Math.max(0, kpiStats.free - 1);
  kpiStats.reserved += 1;

  addActivityLog({
    vehicle: currentVehicleFilter || "Xe máy",
    plate,
    studentName: name,
    mssv: mssv || "—",
    slot: slot.code,
    status: "Đặt trước",
    badgeType: "reserved",
    detail: `Đặt trước ô ${slot.code} thành công`
  });

  closeReserveSlotModal();
  playFeedbackBeep(true);
  speakVietnamese(`Đã đặt trước ô ${slot.code} cho sinh viên ${name}`);

  render20SlotGrid();
  selectSlot(slot.code);
  renderKPICards();
  renderRecentActivityTable();
  renderStudentDatabaseTable();
  renderMobileStudentApp();
}

// ==========================================================================
// 12. PHÂN HỆ 3: CẢNH BÁO THỜI TIẾT & NGẬP NƯỚC CHỦ ĐỘNG (ĐỒNG BỘ APP SINH VIÊN)
// ==========================================================================
function toggleFloodSimulation() {
  isFloodSimActive = !isFloodSimActive;

  if (isFloodSimActive) {
    // 1. Chuyển các ô đỗ ngoài trời vùng trũng (Sau KTX B dọc bờ sông & Sau Khu D) sang ĐỎ ("Không khả dụng / Nguy cơ ngập")
    ["sau-ktx-b", "sau-khu-d"].forEach(zId => {
      const zSlots = parkingZones[zId] || [];
      zSlots.forEach((s, idx) => {
        if (idx < 14) {
          s.status = "unavailable";
          s.note = "Không khả dụng / Nguy cơ ngập nước bờ sông";
        }
      });
    });

    // Cập nhật chỉ số KPI Không khả dụng
    kpiStats.unavailable = 28;
    kpiStats.free = 97;

    // 2. Thêm cảnh báo khẩn vào danh sách Cảnh báo & Nhật ký
    const floodAlertMsg = "Cảnh báo mưa lớn & nguy cơ ngập tại bãi xe ngoài trời dọc bờ sông! Hệ thống đề xuất di chuyển phương tiện sang Khu A (Nhà xe có mái che)";
    systemAlerts.unshift({
      id: "alert-flood-active-" + Date.now(),
      time: getCurrentHHMM(),
      title: "🌧️ CẢNH BÁO KHẨN: Ngập nước bãi ngoài trời dọc bờ sông (Sau KTX B)",
      desc: floodAlertMsg,
      type: "flood",
      icon: "cloud-lightning"
    });

    addActivityLog({
      vehicle: "Toàn bãi",
      plate: "Khu B / KTX B",
      studentName: "Hệ thống Cảm biến Mực nước",
      mssv: "AUTO-AI",
      slot: "KB01-KB14",
      status: "Cảnh báo",
      badgeType: "alert",
      detail: floodAlertMsg
    });

    // 3. Hiển thị Pop-up Notification đẩy sang giao diện [📱 App Sinh viên] và màn hình
    const pushBanner = document.getElementById("push-notification-banner");
    if (pushBanner) pushBanner.classList.remove("hidden");

    const studentBadge = document.getElementById("student-app-badge");
    if (studentBadge) studentBadge.classList.remove("hidden");

    const mobileFloodCard = document.getElementById("mobile-flood-alert-card");
    if (mobileFloodCard) mobileFloodCard.classList.remove("hidden");

    // 4. Phát giọng đọc AI Tiếng Việt cảnh báo
    playFeedbackBeep(false);
    speakVietnamese("Cảnh báo mưa lớn và nguy cơ ngập tại bãi xe ngoài trời dọc bờ sông! Hệ thống đề xuất di chuyển phương tiện sang Khu A nhà xe có mái che.");

    // Chuyển góc nhìn sang Bãi đỗ xe sau KTX B (Ngoài trời dọc bờ sông) để thấy các ô đỏ ngập nước trực quan
    selectParkingZone("sau-ktx-b");
  } else {
    // Khôi phục thời tiết bình thường
    kpiStats.unavailable = 5;
    kpiStats.free = 120;
    buildAllParkingZones();
    syncSlotsWithStudents();
    dismissPushBanner();
    const mobileFloodCard = document.getElementById("mobile-flood-alert-card");
    if (mobileFloodCard) mobileFloodCard.classList.add("hidden");
    selectParkingZone("khu-a");
    speakVietnamese("Thời tiết đã ổn định. Các bãi đỗ xe ngoài trời hoạt động bình thường.");
  }

  updateWeatherWidgetUI();
  render20SlotGrid();
  renderKPICards();
  renderDashboardAlerts();
  renderRecentActivityTable();
  renderNotificationsPopover();
  renderCampusMapViews();
  renderMobileStudentApp();
}

function updateWeatherWidgetUI() {
  const tempEl = document.getElementById("weather-temp-text");
  const rainEl = document.getElementById("weather-rain-text");
  const widget = document.getElementById("header-weather-widget");
  const btnFlood = document.getElementById("btn-trigger-flood");

  if (isFloodSimActive) {
    if (tempEl) tempEl.textContent = "24°C • Mưa rất to";
    if (rainEl) rainEl.textContent = "Cảnh báo ngập: 98%";
    if (widget) widget.className = "cursor-pointer bg-red-50 border border-red-300 rounded-xl px-3 py-1.5 flex items-center gap-2.5 animate-pulse";
    if (btnFlood) {
      btnFlood.innerHTML = `<i data-lucide="sun" class="w-4 h-4 shrink-0"></i><span>☀️ Tắt giả lập mưa ngập (Khôi phục thời tiết)</span>`;
      btnFlood.className = "w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md transition";
    }
  } else {
    if (tempEl) tempEl.textContent = "28°C";
    if (rainEl) rainEl.textContent = "Khả năng mưa: 80%";
    if (widget) widget.className = "cursor-pointer bg-[#eef6ff] hover:bg-blue-100/80 border border-blue-200/70 rounded-xl px-3 py-1.5 flex items-center gap-2.5 transition";
    if (btnFlood) {
      btnFlood.innerHTML = `<i data-lucide="cloud-rain-wind" class="w-4 h-4 shrink-0"></i><span>🌧️ Giả lập Mưa lớn & Ngập nước bãi ngoài trời</span>`;
      btnFlood.className = "w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#f26f21] to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md transition active:scale-95";
    }
  }
  if (window.lucide) lucide.createIcons();
}

function dismissPushBanner() {
  const banner = document.getElementById("push-notification-banner");
  if (banner) banner.classList.add("hidden");
}

function acceptFloodRelocationFromBanner() {
  dismissPushBanner();
  relocateStudentToCoveredKhuA(currentMobileStudentMssv);
}

function acceptFloodRelocationFromMobile() {
  relocateStudentToCoveredKhuA(currentMobileStudentMssv);
}

function relocateStudentToCoveredKhuA(mssv) {
  const stu = students.find(s => s.mssv === mssv) || students[0];
  if (!stu) return;

  const khuASlots = parkingZones["khu-a"] || [];
  // Tìm 1 ô trống trong Khu A (VD: A01, A10, A11...)
  const emptySlot = khuASlots.find(s => s.status === "free") || khuASlots[0];
  if (!emptySlot) {
    alert("Nhà xe Khu A hiện đã kín chỗ!");
    return;
  }

  // Giải phóng ô cũ nếu có
  freeStudentSlot(stu.mssv, stu.oDo);

  // Giữ chỗ mới tại Khu A (Nhà xe có mái che)
  const oldSlot = stu.oDo || "Ngoài trời";
  stu.oDo = emptySlot.code;
  stu.trangThaiGui = "Đặt trước";
  saveDatabase();

  emptySlot.status = "reserved";
  emptySlot.studentMssv = stu.mssv;
  emptySlot.studentName = stu.hoTen;
  emptySlot.licensePlate = stu.bienSo;
  emptySlot.note = "Điều phối tránh ngập từ App Sinh viên";

  kpiStats.free = Math.max(0, kpiStats.free - 1);
  kpiStats.reserved += 1;

  addActivityLog({
    vehicle: stu.loaiXe || "Xe máy",
    plate: stu.bienSo,
    studentName: stu.hoTen,
    mssv: stu.mssv,
    slot: emptySlot.code,
    status: "Đặt trước",
    badgeType: "reserved",
    detail: `Sinh viên đồng ý chuyển từ ${oldSlot} sang ô có mái che ${emptySlot.code} (Khu A)`
  });

  const mobileFloodCard = document.getElementById("mobile-flood-alert-card");
  if (mobileFloodCard) mobileFloodCard.classList.add("hidden");
  dismissPushBanner();

  playFeedbackBeep(true);
  speakVietnamese(`Đã tự động điều phối và giữ chỗ mới tại ô ${emptySlot.code} Nhà xe Khu A cho sinh viên ${stu.hoTen}`);

  // Chuyển sơ đồ về Khu A và highlight ô mới
  selectParkingZone("khu-a");
  selectSlot(emptySlot.code);
  renderKPICards();
  renderRecentActivityTable();
  renderStudentDatabaseTable();
  renderMobileStudentApp();
}

// ==========================================================================
// 13. GIAO DIỆN [📱 APP SINH VIÊN] & THẺ MÃ VẠCH ĐIỆN TỬ UEH STUDENT
// ==========================================================================
function switchAppMode(mode) {
  const adminView = document.getElementById("admin-main-view");
  const studentView = document.getElementById("student-app-view");
  const btnAdmin = document.getElementById("btn-mode-admin");
  const btnStudent = document.getElementById("btn-mode-student");

  if (mode === "student") {
    adminView.classList.add("hidden");
    studentView.classList.remove("hidden");
    btnStudent.className = "px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all bg-[#f26f21] text-white shadow-sm";
    btnAdmin.className = "px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all text-slate-600 hover:text-slate-900";
    renderMobileStudentApp();
  } else {
    studentView.classList.add("hidden");
    adminView.classList.remove("hidden");
    btnAdmin.className = "px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all bg-[#005f69] text-white shadow-sm";
    btnStudent.className = "px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all text-slate-600 hover:text-slate-900";
    render20SlotGrid();
  }
}

function populateStudentDropdowns() {
  const quickSelect = document.getElementById("quick-student-select");
  if (quickSelect) {
    quickSelect.innerHTML = students.map(s =>
      `<option value="${s.mssv}">${s.hoTen} (${s.mssv} - ${s.oDo})</option>`
    ).join("");
  }

  const mobileSelect = document.getElementById("mobile-student-switcher");
  if (mobileSelect) {
    mobileSelect.innerHTML = students.map(s =>
      `<option value="${s.mssv}" ${s.mssv === currentMobileStudentMssv ? "selected" : ""}>${s.hoTen}</option>`
    ).join("");
  }
}

function onSwitchMobileStudent(mssv) {
  currentMobileStudentMssv = mssv;
  renderMobileStudentApp();
}

function renderMobileStudentApp() {
  const stu = students.find(s => s.mssv === currentMobileStudentMssv) || students[0];
  if (!stu) return;

  const setTxt = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  setTxt("mobile-student-name", stu.hoTen);
  setTxt("mobile-avatar-box", getInitials(stu.hoTen));
  setTxt("mobile-card-name", stu.hoTen);
  setTxt("mobile-card-mssv", stu.mssv);
  setTxt("mobile-card-dob", stu.ngaySinh);
  setTxt("mobile-card-plate", stu.bienSo);
  setTxt("mobile-card-model", stu.dongXe);
  setTxt("mobile-current-slot-badge", `Ô ${stu.oDo || "Chưa có"}`);

  const pillEl = document.getElementById("mobile-parking-status-pill");
  const statusTxtEl = document.getElementById("mobile-current-status-text");
  if (isStudentParked(stu.trangThaiGui)) {
    if (pillEl) {
      pillEl.textContent = "Đang sử dụng";
      pillEl.className = "px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-700";
    }
    if (statusTxtEl) {
      statusTxtEl.textContent = "Phương tiện đang đỗ an toàn trong bãi";
      statusTxtEl.className = "font-bold text-blue-700";
    }
  } else if (stu.trangThaiGui === "Đặt trước") {
    if (pillEl) {
      pillEl.textContent = "Đặt trước";
      pillEl.className = "px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-orange-100 text-[#f26f21]";
    }
    if (statusTxtEl) {
      statusTxtEl.textContent = "Đã giữ chỗ trước (Chờ xe vào ô)";
      statusTxtEl.className = "font-bold text-[#f26f21]";
    }
  } else {
    if (pillEl) {
      pillEl.textContent = "Đã lấy xe";
      pillEl.className = "px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600";
    }
    if (statusTxtEl) {
      statusTxtEl.textContent = "Chưa gửi xe trong bãi";
      statusTxtEl.className = "font-bold text-slate-600";
    }
  }

  // Render scannable CODE_128 barcode for this student
  renderSafeJsBarcode("#mobile-student-barcode", stu.mssv, {
    format: "CODE128",
    lineColor: "#000000",
    width: 2,
    height: 52,
    displayValue: true,
    fontSize: 13,
    fontOptions: "bold",
    margin: 4
  });

  // Populate available slots in Khu A for booking
  const availSelect = document.getElementById("mobile-available-slots-select");
  if (availSelect) {
    const khuASlots = (parkingZones["khu-a"] || []).filter(s => s.status === "free");
    if (khuASlots.length > 0) {
      availSelect.innerHTML = khuASlots.map(s =>
        `<option value="${s.code}">Ô trống ${s.code} - Khu A (Có mái che)</option>`
      ).join("");
    } else {
      availSelect.innerHTML = `<option value="">Hết ô trống tại Khu A</option>`;
    }
  }

  if (window.lucide) lucide.createIcons();
}

function triggerScanFromMobileApp() {
  lastScannedCode = "";
  onBarcodeScannedSuccess(currentMobileStudentMssv);
}

function studentBookSlotFromApp() {
  const select = document.getElementById("mobile-available-slots-select");
  if (!select || !select.value) return;
  const targetCode = select.value;
  const stu = students.find(s => s.mssv === currentMobileStudentMssv);
  if (!stu) return;

  freeStudentSlot(stu.mssv, stu.oDo);

  const khuASlots = parkingZones["khu-a"] || [];
  const slot = khuASlots.find(s => s.code === targetCode);
  if (slot) {
    slot.status = "reserved";
    slot.studentMssv = stu.mssv;
    slot.studentName = stu.hoTen;
    slot.licensePlate = stu.bienSo;
    slot.note = `Đặt trước từ App (${stu.dongXe})`;
  }

  stu.oDo = targetCode;
  stu.trangThaiGui = "Đặt trước";
  saveDatabase();

  addActivityLog({
    vehicle: stu.loaiXe || "Xe máy",
    plate: stu.bienSo,
    studentName: stu.hoTen,
    mssv: stu.mssv,
    slot: targetCode,
    status: "Đặt trước",
    badgeType: "reserved",
    detail: `Sinh viên đặt chỗ ô ${targetCode} trên App UEH Student`
  });

  playFeedbackBeep(true);
  speakVietnamese(`Đã giữ chỗ ô ${targetCode} Khu A cho sinh viên ${stu.hoTen}`);

  render20SlotGrid();
  selectSlot(targetCode);
  renderKPICards();
  renderRecentActivityTable();
  renderStudentDatabaseTable();
  renderMobileStudentApp();
}

// ==========================================================================
// 14. SƠ ĐỒ KHUÔN VIÊN UEH MEKONG TƯƠNG TÁC (7 KHU VỰC BÃI ĐỖ XE - CHUẨN HÌNH 1)
// ==========================================================================
function toggleInlineCampusMap(forceState) {
  isInlineCampusMapOpen = typeof forceState === "boolean" ? forceState : !isInlineCampusMapOpen;
  const gridContainer = document.getElementById("parking-20-grid-container");
  const mapContainer = document.getElementById("inline-campus-map-container");
  const labelEl = document.getElementById("btn-toggle-campus-label");

  if (isInlineCampusMapOpen) {
    gridContainer.classList.add("hidden");
    mapContainer.classList.remove("hidden");
    if (labelEl) labelEl.textContent = "Đóng Sơ đồ Khuôn viên (Về 20 Ô)";
    renderCampusMapViews();
  } else {
    mapContainer.classList.add("hidden");
    gridContainer.classList.remove("hidden");
    if (labelEl) labelEl.textContent = "Sơ đồ Khuôn viên (7 Bãi)";
  }
}

function buildInteractiveCampusMapDiagramHTML() {
  const zoneBadge = (zoneId, label, extraClasses = "") => {
    const isActive = currentZoneId === zoneId;
    const zoneMeta = PARKING_ZONES_META.find(z => z.id === zoneId);
    const isFlooded = isFloodSimActive && zoneMeta && zoneMeta.floodRisk;
    const baseColor = isFlooded
      ? "bg-red-100 border-red-600 text-red-900 animate-pulse"
      : "bg-[#dcfce7] border-emerald-600 text-emerald-950";
    return `
      <div onclick="selectParkingZone('${zoneId}')"
           class="campus-parking-zone ${baseColor} ${isActive ? "active-zone" : ""} border-2 rounded-xl p-1.5 flex items-center justify-center gap-1.5 shadow-sm ${extraClasses}"
           title="Nhấn để mở sơ đồ 20 ô đỗ của ${label}">
        <span class="bg-emerald-700 text-white font-black text-[10px] w-5 h-5 rounded flex items-center justify-center shrink-0">P</span>
        <span class="text-[10px] sm:text-[11px] font-extrabold leading-tight uppercase text-center">${label}</span>
        <span class="text-xs hidden sm:inline">🛵</span>
      </div>
    `;
  };

  return `
    <div class="border-[3px] border-slate-800 rounded-2xl p-3 sm:p-4 bg-[#f8fafc] relative text-slate-900 select-none">
      <!-- Top Perimeter Label -->
      <div class="text-center text-[10px] sm:text-xs font-extrabold text-slate-600 uppercase tracking-wider mb-2">
        🌊 Tường rào bảo vệ dọc bờ sông
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-2.5 items-stretch">

        <!-- FAR LEFT COLUMN (2 COLS): CĂN TIN + BÃI ĐỖ XE SAU KTX B + KTX B + KTX A + KHÁCH SẠN UEH -->
        <div class="lg:col-span-3 flex flex-col justify-between gap-2">
          <div class="grid grid-cols-12 gap-2 flex-1">
            <!-- Leftmost strip: Căn tin & Bãi đỗ xe sau KTX B (Dọc bờ sông) -->
            <div class="col-span-5 flex flex-col gap-2">
              <div class="bg-[#bae6fd] border-2 border-slate-800 rounded-lg p-2 text-center font-black text-xs">
                CĂN TIN
              </div>
              ${zoneBadge("sau-ktx-b", "BÃI ĐỖ XE SAU KTX B", "flex-1 flex-col py-3")}
            </div>

            <!-- KTX B & KTX A -->
            <div class="col-span-7 flex flex-col gap-2">
              <div class="bg-[#bae6fd] border-2 border-slate-800 rounded-lg p-3 flex-1 flex items-center justify-center text-center font-black text-xs sm:text-sm">
                KÝ TÚC XÁ B
              </div>
              <div class="bg-[#bae6fd] border-2 border-slate-800 rounded-lg p-3 flex-1 flex items-center justify-center text-center font-black text-xs sm:text-sm">
                KÝ TÚC XÁ A
              </div>
            </div>
          </div>

          <!-- Bottom-left: Khách sạn UEH Mekong -->
          <div class="bg-[#bae6fd] border-2 border-slate-800 rounded-lg p-2.5 text-center font-black text-xs sm:text-sm">
            KHÁCH SẠN UEH MEKONG
          </div>
        </div>

        <!-- SECOND COLUMN (3 COLS): MINI MART + BÃI TRƯỚC MINI MART + KHU D + 2 BÃI KHU D + SÂN CẦU LÔNG / COFFEE -->
        <div class="lg:col-span-3 flex flex-col justify-between gap-2">
          <div class="bg-[#bae6fd] border-2 border-slate-800 rounded-lg p-2 text-center font-black text-xs sm:text-sm">
            MINI MART
          </div>

          ${zoneBadge("mini-mart", "BÃI ĐỖ XE TRƯỚC MINI MART")}

          <!-- Khu D flanked by Bãi sau Khu D (left) and Bãi Khu D (right) -->
          <div class="grid grid-cols-12 gap-1.5 flex-1 items-stretch">
            <div class="col-span-4 flex">
              ${zoneBadge("sau-khu-d", "BÃI ĐỖ XE SAU KHU D", "w-full flex-col")}
            </div>
            <div class="col-span-4 bg-[#bae6fd] border-2 border-slate-800 rounded-lg p-2 flex items-center justify-center text-center font-black text-sm sm:text-base">
              KHU D
            </div>
            <div class="col-span-4 flex">
              ${zoneBadge("khu-d", "BÃI ĐỖ XE KHU D", "w-full flex-col")}
            </div>
          </div>

          <!-- Sân cầu lông & Start-up Coffee -->
          <div class="grid grid-cols-2 gap-1.5">
            <div class="bg-[#bae6fd] border-2 border-slate-800 rounded-lg p-2 text-center font-extrabold text-[10px] sm:text-xs">
              SÂN CẦU LÔNG
            </div>
            <div class="bg-[#bae6fd] border-2 border-slate-800 rounded-lg p-2 text-center font-extrabold text-[10px] sm:text-xs">
              START-UP COFFEE
            </div>
          </div>
        </div>

        <!-- CENTER COLUMN (4 COLS): NHÀ ĂN + KHU A + BÃI KHU A + SÂN BÓNG CHUYỀN + BÃI TRUNG TÂM + BÃI SAU HT A + HỘI TRƯỜNG A & KHU C -->
        <div class="lg:col-span-4 flex flex-col justify-between gap-2">
          <div class="bg-[#bae6fd] border-2 border-slate-800 rounded-lg py-1.5 px-3 text-center font-black text-xs w-3/4 mx-auto">
            NHÀ ĂN
          </div>

          <div class="bg-[#bae6fd] border-2 border-slate-800 rounded-lg py-3 px-4 text-center font-black text-base sm:text-lg tracking-wide">
            KHU A
          </div>

          ${zoneBadge("khu-a", "BÃI ĐỖ XE KHU A (CÓ MÁI CHE)")}

          <!-- Sân bóng chuyền -->
          <div class="bg-[#67e8f9] border-2 border-teal-600 rounded-xl py-4 px-3 text-center font-black text-xs sm:text-sm text-slate-900 shadow-inner relative">
            🏐 SÂN BÓNG CHUYỀN
          </div>

          ${zoneBadge("trung-tam", "BÃI ĐỖ XE TRUNG TÂM")}

          <div class="w-3/4">
            ${zoneBadge("hoi-truong-a", "BÃI ĐỖ XE SAU HỘI TRƯỜNG A")}
          </div>

          <!-- Hội trường A & Khu C -->
          <div class="grid grid-cols-12 gap-2">
            <div class="col-span-5 border-2 border-slate-800 rounded-lg overflow-hidden">
              <div class="bg-[#bae6fd] p-1.5 text-center font-black text-xs">HỘI TRƯỜNG A</div>
              <div class="bg-[#fdba74] p-1 text-center font-bold text-[10px] border-t border-slate-800">KHU VỰC TỰ HỌC</div>
            </div>
            <div class="col-span-7 border-2 border-slate-800 rounded-lg overflow-hidden flex flex-col justify-between">
              <div class="bg-[#bae6fd] p-2 text-center font-black text-sm">KHU C</div>
              <div class="bg-[#fdba74] p-1 text-center font-bold text-[10px] border-t border-slate-800">KHU VỰC TỰ HỌC</div>
            </div>
          </div>
        </div>

        <!-- RIGHT COLUMN (2 COLS): NHÀ KHÁCH + KHU B + KHU VỰC TỰ HỌC + MCIE + CỔNG VÀO & BẢO VỆ -->
        <div class="lg:col-span-2 flex flex-col justify-between gap-2">
          <div class="bg-[#bae6fd] border-2 border-slate-800 rounded-lg p-2.5 text-center font-black text-xs sm:text-sm">
            NHÀ KHÁCH
          </div>

          <div class="grid grid-cols-12 gap-1.5 flex-1">
            <div class="col-span-5 bg-[#bae6fd] border-2 border-slate-800 rounded-lg p-2 flex items-center justify-center text-center font-black text-sm sm:text-base">
              KHU B
            </div>
            <div class="col-span-7 flex flex-col gap-1.5">
              <div class="bg-[#fdba74] border-2 border-slate-800 rounded-lg p-2 flex-1 flex items-center justify-center text-center font-black text-[10px] sm:text-xs">
                KHU VỰC TỰ HỌC
              </div>
              <div class="bg-[#bae6fd] border-2 border-slate-800 rounded-lg p-2 flex-1 flex items-center justify-center text-center font-extrabold text-[9px] sm:text-[10px] leading-tight">
                TRUNG TÂM ĐỔI MỚI SÁNG TẠO & KHỞI NGHIỆP ĐBSCL (MCIE)
              </div>
            </div>
          </div>

          <!-- Cổng vào & Bảo vệ -->
          <div class="grid grid-cols-2 gap-1.5 pt-1">
            <div class="bg-emerald-100 border-2 border-slate-800 rounded-lg p-1.5 text-center font-black text-[11px] text-emerald-900 flex flex-col items-center">
              <span>⬆️</span>
              <span>CỔNG VÀO</span>
            </div>
            <div class="bg-[#bae6fd] border-2 border-slate-800 rounded-lg p-1.5 flex items-center justify-center text-center font-black text-[11px]">
              BẢO VỆ
            </div>
          </div>
        </div>

      </div>

      <!-- Bottom Perimeter Label -->
      <div class="text-center text-[10px] sm:text-xs font-extrabold text-slate-600 uppercase tracking-wider mt-2.5 pt-1.5 border-t border-slate-300">
        Tường rào cách ly bên ngoài • Giáp Sở Nông nghiệp và Môi trường tỉnh Vĩnh Long
      </div>
    </div>
  `;
}

function renderCampusMapViews() {
  const html = buildInteractiveCampusMapDiagramHTML();
  const inlineEl = document.getElementById("inline-campus-map-render");
  const fullEl = document.getElementById("full-campus-map-digital");
  if (inlineEl) inlineEl.innerHTML = html;
  if (fullEl) fullEl.innerHTML = html;

  // Render 7 summary cards in Campus Map tab & Parking Lots tab
  const cardsGrid = document.getElementById("seven-zones-cards-grid");
  const detailedList = document.getElementById("all-zones-detailed-list");

  const cardsHTML = PARKING_ZONES_META.map(z => {
    const zSlots = parkingZones[z.id] || [];
    const freeCnt = zSlots.filter(s => s.status === "free").length;
    const occCnt = zSlots.filter(s => s.status === "occupied").length;
    const resCnt = zSlots.filter(s => s.status === "reserved").length;
    const unavCnt = zSlots.filter(s => s.status === "unavailable").length;
    const isActive = z.id === currentZoneId;

    return `
      <div onclick="selectParkingZone('${z.id}'); switchSidebarTab('overview');"
           class="cursor-pointer rounded-2xl p-4 border transition hover:shadow-md ${isActive ? "bg-teal-50/70 border-[#005f69] ring-2 ring-[#005f69]/20" : "bg-slate-50 border-slate-200"}">
        <div class="flex items-start justify-between gap-2 mb-2">
          <h4 class="font-extrabold text-xs sm:text-sm text-slate-900">${z.name}</h4>
          <span class="px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${z.roofType === "indoor" ? "bg-teal-100 text-[#005f69]" : "bg-orange-100 text-[#f26f21]"}">
            ${z.roofType === "indoor" ? "Có mái che" : "Ngoài trời"}
          </span>
        </div>
        <p class="text-[11px] text-slate-500 mb-3">${z.location}</p>
        <div class="grid grid-cols-4 gap-1 text-center text-[11px] font-bold">
          <div class="bg-emerald-50 text-emerald-700 py-1 rounded-lg">Trống: ${freeCnt}</div>
          <div class="bg-blue-50 text-blue-700 py-1 rounded-lg">Đỗ: ${occCnt}</div>
          <div class="bg-orange-50 text-[#f26f21] py-1 rounded-lg">Đặt: ${resCnt}</div>
          <div class="bg-red-50 text-red-600 py-1 rounded-lg">Lỗi: ${unavCnt}</div>
        </div>
      </div>
    `;
  }).join("");

  if (cardsGrid) cardsGrid.innerHTML = cardsHTML;
  if (detailedList) detailedList.innerHTML = cardsHTML;
}

function switchCampusMapDisplay(mode) {
  const digitalEl = document.getElementById("full-campus-map-digital");
  const imgEl = document.getElementById("full-campus-map-image");
  const btnDig = document.getElementById("btn-campus-mode-digital");
  const btnImg = document.getElementById("btn-campus-mode-image");

  if (mode === "image") {
    digitalEl.classList.add("hidden");
    imgEl.classList.remove("hidden");
    btnImg.className = "px-3 py-2 rounded-xl text-xs font-bold bg-[#005f69] text-white shadow-sm";
    btnDig.className = "px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200";
  } else {
    imgEl.classList.add("hidden");
    digitalEl.classList.remove("hidden");
    btnDig.className = "px-3 py-2 rounded-xl text-xs font-bold bg-[#005f69] text-white shadow-sm";
    btnImg.className = "px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200";
  }
}

function openOriginalMapModal() {
  switchSidebarTab("campus-map");
  switchCampusMapDisplay("image");
}

// ==========================================================================
// 15. RENDER KPI CARDS, THỐNG KÊ NHANH, HOẠT ĐỘNG GẦN ĐÂY & CẢNH BÁO
// ==========================================================================
function renderKPICards() {
  const total = kpiStats.free + kpiStats.occupied + kpiStats.reserved + kpiStats.unavailable;
  const pct = (val) => Math.max(1, Math.round((val / total) * 100));

  const setEl = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };

  setEl("kpi-free-count", kpiStats.free);
  setEl("kpi-free-pct", `(~ ${pct(kpiStats.free)}%)`);
  setEl("kpi-occupied-count", kpiStats.occupied);
  setEl("kpi-occupied-pct", `(~ ${pct(kpiStats.occupied)}%)`);
  setEl("kpi-reserved-count", kpiStats.reserved);
  setEl("kpi-reserved-pct", `(~ ${pct(kpiStats.reserved)}%)`);
  setEl("kpi-unavailable-count", kpiStats.unavailable);
  setEl("kpi-unavailable-pct", `(~ ${pct(kpiStats.unavailable)}%)`);

  setEl("stat-total-in", kpiStats.totalIn.toLocaleString("vi-VN"));
  setEl("stat-total-out", kpiStats.totalOut.toLocaleString("vi-VN"));
}

function addActivityLog(entry) {
  activityLogs.unshift({
    time: getCurrentHHMM(),
    ...entry
  });
  if (activityLogs.length > 50) activityLogs.pop();
}

function renderRecentActivityTable() {
  const tbody = document.getElementById("recent-activity-tbody");
  const fullTbody = document.getElementById("full-history-tbody");

  const getBadgeHTML = (log) => {
    if (log.badgeType === "in") {
      return `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-700"><span class="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>${log.status}</span>`;
    }
    if (log.badgeType === "out") {
      return `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-700"><span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span>${log.status}</span>`;
    }
    if (log.badgeType === "reserved") {
      return `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-orange-100 text-[#f26f21]"><span class="w-1.5 h-1.5 rounded-full bg-[#f26f21]"></span>${log.status}</span>`;
    }
    return `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-100 text-red-700"><span class="w-1.5 h-1.5 rounded-full bg-red-600"></span>${log.status}</span>`;
  };

  if (tbody) {
    tbody.innerHTML = activityLogs.slice(0, 5).map(log => `
      <tr class="hover:bg-slate-50 transition">
        <td class="py-2 px-2 font-bold text-slate-700 tabular-nums">${log.time}</td>
        <td class="py-2 px-2 text-[#005f69]">
          <span class="inline-flex items-center gap-1 font-semibold">
            <i data-lucide="${log.vehicle === 'Ô tô' ? 'car' : 'bike'}" class="w-4 h-4"></i>
          </span>
        </td>
        <td class="py-2 px-2">
          <div class="font-mono font-bold text-slate-800">${log.plate}</div>
          <div class="text-[10px] text-slate-500 truncate max-w-[140px]">${log.studentName || ""}</div>
        </td>
        <td class="py-2 px-2 font-extrabold text-slate-800">${log.slot}</td>
        <td class="py-2 px-2 text-right">${getBadgeHTML(log)}</td>
      </tr>
    `).join("");
  }

  if (fullTbody) {
    fullTbody.innerHTML = activityLogs.map(log => `
      <tr class="hover:bg-slate-50">
        <td class="py-2.5 px-3 font-bold tabular-nums">${log.time}</td>
        <td class="py-2.5 px-3 font-bold text-slate-800">${log.studentName || "—"}</td>
        <td class="py-2.5 px-3 font-mono text-slate-600">${log.mssv || "—"}</td>
        <td class="py-2.5 px-3 font-mono font-bold text-[#005f69]">${log.plate}</td>
        <td class="py-2.5 px-3">${log.vehicle}</td>
        <td class="py-2.5 px-3 font-extrabold text-[#f26f21]">${log.slot}</td>
        <td class="py-2.5 px-3 text-slate-600">${log.detail || ""}</td>
        <td class="py-2.5 px-3 text-right">${getBadgeHTML(log)}</td>
      </tr>
    `).join("");
  }

  if (window.lucide) lucide.createIcons();
}

function renderDashboardAlerts() {
  const listEl = document.getElementById("dashboard-alert-list");
  const fullContainer = document.getElementById("full-alerts-container");
  const badgeCount = document.getElementById("notif-badge-count");

  if (badgeCount) badgeCount.textContent = systemAlerts.length;

  const html = systemAlerts.map(a => {
    const isDanger = a.type === "security" || a.title.includes("KHẨN");
    return `
      <div class="flex items-start justify-between gap-2.5 p-2.5 rounded-xl border ${isDanger ? "bg-red-50 border-red-200" : "bg-slate-50 border-slate-200/80"}">
        <div class="flex items-start gap-2.5 min-w-0">
          <div class="p-1.5 rounded-lg ${isDanger ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"} shrink-0 mt-0.5">
            <i data-lucide="${a.icon || "cloud-rain"}" class="w-4 h-4"></i>
          </div>
          <div class="min-w-0">
            <div class="font-bold text-xs text-slate-800 leading-snug">${a.title}</div>
            <div class="text-[11px] text-slate-500 truncate">${a.desc}</div>
          </div>
        </div>
        <span class="text-[10px] font-bold text-slate-400 shrink-0 tabular-nums">${a.time}</span>
      </div>
    `;
  }).join("");

  if (listEl) listEl.innerHTML = html;
  if (fullContainer) fullContainer.innerHTML = html;
  if (window.lucide) lucide.createIcons();
}

function toggleNotificationPopover() {
  const pop = document.getElementById("notif-popover");
  if (pop) pop.classList.toggle("hidden");
}

function renderNotificationsPopover() {
  const list = document.getElementById("notif-list");
  if (!list) return;
  list.innerHTML = systemAlerts.map(a => `
    <div class="p-2.5 hover:bg-slate-50 rounded-xl text-xs">
      <div class="flex justify-between font-bold text-slate-800">
        <span>${a.title}</span>
        <span class="text-[10px] text-slate-400">${a.time}</span>
      </div>
      <p class="text-[11px] text-slate-500 mt-0.5">${a.desc}</p>
    </div>
  `).join("");
}

function clearNotifications() {
  const badge = document.getElementById("notif-badge-count");
  if (badge) badge.textContent = "0";
  toggleNotificationPopover();
}

// ==========================================================================
// 16. QUẢN LÝ BẢNG 10 SINH VIÊN NHÓM + THÊM/SỬA/XÓA + CSV + MÃ VẠCH JSBARCODE
// ==========================================================================
function renderStudentDatabaseTable() {
  const tbody = document.getElementById("student-db-tbody");
  if (!tbody) return;

  tbody.innerHTML = students.map((stu, idx) => {
    const statusBadge = isStudentParked(stu.trangThaiGui)
      ? `<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-700">Đang sử dụng</span>`
      : stu.trangThaiGui === "Đặt trước"
      ? `<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-orange-100 text-[#f26f21]">Đặt trước</span>`
      : `<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600">Đã lấy xe</span>`;

    return `
      <tr class="hover:bg-slate-50 transition">
        <td class="py-2.5 px-3 font-bold text-slate-500">${idx + 1}</td>
        <td class="py-2.5 px-3 font-mono font-bold text-slate-900">${stu.mssv}</td>
        <td class="py-2.5 px-3 font-extrabold text-slate-900">${stu.hoTen}</td>
        <td class="py-2.5 px-3 text-slate-600">${stu.ngaySinh}</td>
        <td class="py-2.5 px-3 font-mono font-bold text-[#005f69]">${stu.bienSo}</td>
        <td class="py-2.5 px-3 font-semibold text-slate-700">${stu.dongXe} <span class="text-slate-400">(${stu.loaiXe || "Xe máy"})</span></td>
        <td class="py-2.5 px-3 font-black text-[#f26f21]">${stu.oDo || "—"}</td>
        <td class="py-2.5 px-3">${statusBadge}</td>
        <td class="py-2.5 px-3">
          <button onclick="openStudentBarcodeByIndex(${idx})" class="bg-teal-50 hover:bg-teal-100 text-[#005f69] border border-teal-200 font-bold text-[11px] px-2.5 py-1 rounded-lg flex items-center gap-1">
            <i data-lucide="barcode" class="w-3.5 h-3.5"></i> Mã vạch
          </button>
        </td>
        <td class="py-2.5 px-3 text-right space-x-1">
          <button onclick="scanStudentByIndex(${idx})" class="bg-[#005f69] hover:bg-[#0d4a52] text-white font-bold text-[11px] px-2.5 py-1 rounded-lg" title="Quét Check-in/Check-out nhanh">
            Quét
          </button>
          <button onclick="openEditStudentModal(${idx})" class="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] px-2 py-1 rounded-lg">
            Sửa
          </button>
          <button onclick="deleteStudentByIndex(${idx})" class="bg-red-50 hover:bg-red-100 text-red-600 font-bold text-[11px] px-2 py-1 rounded-lg">
            Xóa
          </button>
        </td>
      </tr>
    `;
  }).join("");

  if (window.lucide) lucide.createIcons();
}

function openStudentDbModal() {
  switchAppMode("admin");
  switchSidebarTab("history");
}

function scanStudentByIndex(idx) {
  const stu = students[idx];
  if (!stu) return;
  switchSidebarTab("overview");
  lastScannedCode = "";
  onBarcodeScannedSuccess(stu.mssv);
}

function openAddStudentModal() {
  document.getElementById("student-form-title").textContent = "Thêm Sinh viên mới";
  document.getElementById("form-student-edit-index").value = "-1";
  document.getElementById("form-student-mssv").value = "";
  document.getElementById("form-student-dob").value = "";
  document.getElementById("form-student-name").value = "";
  document.getElementById("form-student-plate").value = "";
  document.getElementById("form-student-model").value = "";
  document.getElementById("form-student-type").value = "Xe máy";
  document.getElementById("form-student-slot").value = "A10";
  document.getElementById("form-student-status").value = "Đang sử dụng";
  document.getElementById("modal-student-form").classList.remove("hidden");
}

function openEditStudentModal(idx) {
  const stu = students[idx];
  if (!stu) return;
  document.getElementById("student-form-title").textContent = `Cập nhật: ${stu.hoTen}`;
  document.getElementById("form-student-edit-index").value = String(idx);
  document.getElementById("form-student-mssv").value = stu.mssv;
  document.getElementById("form-student-dob").value = stu.ngaySinh;
  document.getElementById("form-student-name").value = stu.hoTen;
  document.getElementById("form-student-plate").value = stu.bienSo;
  document.getElementById("form-student-model").value = stu.dongXe;
  document.getElementById("form-student-type").value = stu.loaiXe || "Xe máy";
  document.getElementById("form-student-slot").value = stu.oDo || "A01";
  document.getElementById("form-student-status").value = isStudentParked(stu.trangThaiGui) ? "Đang sử dụng" : (stu.trangThaiGui || "Đang sử dụng");
  document.getElementById("modal-student-form").classList.remove("hidden");
}

function closeStudentFormModal() {
  document.getElementById("modal-student-form").classList.add("hidden");
}

function saveStudentForm() {
  const editIdx = Number(document.getElementById("form-student-edit-index").value);
  const mssv = document.getElementById("form-student-mssv").value.trim();
  const ngaySinh = document.getElementById("form-student-dob").value.trim() || "01/01/2007";
  const hoTen = document.getElementById("form-student-name").value.trim();
  const bienSo = document.getElementById("form-student-plate").value.trim().toUpperCase();
  const dongXe = document.getElementById("form-student-model").value.trim() || "VISION";
  const loaiXe = document.getElementById("form-student-type").value;
  const oDo = document.getElementById("form-student-slot").value.trim().toUpperCase() || "A10";
  const trangThaiGui = document.getElementById("form-student-status").value;

  if (!mssv || !hoTen || !bienSo) {
    alert("Vui lòng nhập đầy đủ MSSV, Họ tên và Biển số xe!");
    return;
  }

  const record = { mssv, hoTen, ngaySinh, bienSo, dongXe, loaiXe, oDo, trangThaiGui };
  if (editIdx >= 0 && editIdx < students.length) {
    students[editIdx] = record;
  } else {
    students.push(record);
  }

  saveDatabase();
  syncSlotsWithStudents();
  populateStudentDropdowns();
  renderStudentDatabaseTable();
  render20SlotGrid();
  renderMobileStudentApp();
  closeStudentFormModal();
}

function deleteStudentByIndex(idx) {
  const stu = students[idx];
  if (!stu) return;
  if (!confirm(`Bạn có chắc muốn xóa sinh viên ${stu.hoTen} (${stu.mssv})?`)) return;
  freeStudentSlot(stu.mssv, stu.oDo);
  students.splice(idx, 1);
  saveDatabase();
  populateStudentDropdowns();
  renderStudentDatabaseTable();
  render20SlotGrid();
  renderMobileStudentApp();
}

// Xuất / Nhập CSV
function exportStudentsCSV() {
  const headers = ["mssv", "hoTen", "ngaySinh", "bienSo", "dongXe", "loaiXe", "oDo", "trangThaiGui"];
  const rows = students.map(s =>
    headers.map(h => `"${String(s[h] || "").replace(/"/g, '""')}"`).join(",")
  );
  const csvContent = "\uFEFF" + [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "danh_sach_sinh_vien_ueh_mekong.csv";
  a.click();
  URL.revokeObjectURL(url);
}

function importStudentsCSV(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const text = e.target.result;
    const lines = text.split(/\r?\n/).filter(l => l.trim());
    if (lines.length < 2) return;
    const imported = [];
    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(",").map(c => c.replace(/^"|"$/g, "").trim());
      if (cols.length >= 4 && cols[0]) {
        imported.push({
          mssv: cols[0],
          hoTen: cols[1] || "Sinh viên UEH",
          ngaySinh: cols[2] || "01/01/2007",
          bienSo: cols[3] || "64B1-000.00",
          dongXe: cols[4] || "Xe máy",
          loaiXe: cols[5] || "Xe máy",
          oDo: cols[6] || "A10",
          trangThaiGui: cols[7] || "Đang gửi"
        });
      }
    }
    if (imported.length > 0) {
      students = imported;
      saveDatabase();
      syncSlotsWithStudents();
      populateStudentDropdowns();
      renderStudentDatabaseTable();
      render20SlotGrid();
      renderMobileStudentApp();
      alert(`Đã nhập thành công ${imported.length} sinh viên từ file CSV!`);
    }
  };
  reader.readAsText(file, "UTF-8");
  event.target.value = "";
}

// ==========================================================================
// 17. MODAL XEM & TẢI ẢNH MÃ VẠCH SINH VIÊN (JSBARCODE)
// ==========================================================================
function openCurrentStudentBarcodeModal() {
  const stu = currentDisplayedStudent || students[0];
  if (stu) openStudentBarcodeModal(stu);
}

function openStudentBarcodeByIndex(idx) {
  const stu = students[idx];
  if (stu) openStudentBarcodeModal(stu);
}

function openStudentBarcodeModal(stu) {
  currentModalStudent = stu;
  const modal = document.getElementById("modal-barcode-viewer");
  document.getElementById("barcode-modal-name").textContent = stu.hoTen;
  document.getElementById("barcode-modal-info").textContent =
    `MSSV: ${stu.mssv} • Ngày sinh: ${stu.ngaySinh} • Biển số: ${stu.bienSo} (${stu.dongXe})`;

  renderSafeJsBarcode("#barcode-modal-svg", stu.mssv, {
    format: "CODE128",
    lineColor: "#000000",
    width: 2.2,
    height: 70,
    displayValue: true,
    fontSize: 16,
    fontOptions: "bold",
    margin: 10
  });

  if (modal) modal.classList.remove("hidden");
}

function closeBarcodeModal() {
  const modal = document.getElementById("modal-barcode-viewer");
  if (modal) modal.classList.add("hidden");
}

function scanCurrentModalStudentNow() {
  if (!currentModalStudent) return;
  closeBarcodeModal();
  switchSidebarTab("overview");
  lastScannedCode = "";
  onBarcodeScannedSuccess(currentModalStudent.mssv);
}

function downloadSampleBarcodeImage() {
  const select = document.getElementById("quick-student-select");
  const mssv = (select && select.value) ? select.value : students[0].mssv;
  const stu = students.find(s => s.mssv === mssv) || students[0];
  downloadStudentBarcodeAsPNG(stu);
}

function downloadModalBarcodePNG() {
  if (currentModalStudent) {
    downloadStudentBarcodeAsPNG(currentModalStudent);
  }
}

function downloadStudentBarcodeAsPNG(stu) {
  const canvas = document.createElement("canvas");
  try {
    JsBarcode(canvas, stu.mssv, {
      format: "CODE128",
      lineColor: "#000000",
      background: "#ffffff",
      width: 3,
      height: 100,
      displayValue: true,
      fontSize: 20,
      margin: 24
    });
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `MaVach_UEH_${stu.mssv}.png`;
    a.click();
  } catch (e) {
    console.warn("Lỗi tạo ảnh mã vạch:", e);
  }
}

function renderSafeJsBarcode(selector, value, options) {
  if (typeof JsBarcode === "undefined") return;
  try {
    JsBarcode(selector, String(value || "31251570287"), options);
  } catch (e) {
    console.warn("JsBarcode error:", e);
  }
}

// ==========================================================================
// 18. ĐIỀU HƯỚNG SIDEBAR BÊN PHẢI & ĐỒNG HỒ THỜI GIAN THỰC
// ==========================================================================
function switchSidebarTab(tabName) {
  switchAppMode("admin");
  const tabs = ["overview", "campus-map", "parking-lots", "history", "alerts", "stats", "settings"];
  tabs.forEach(t => {
    const sec = document.getElementById(`tab-${t}`);
    const btn = document.getElementById(`nav-btn-${t}`);
    if (sec) {
      if (t === tabName) sec.classList.remove("hidden");
      else sec.classList.add("hidden");
    }
    if (btn) {
      if (t === tabName) {
        btn.className = "sidebar-nav-btn w-full px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-between transition bg-[#005f69] text-white shadow-sm shrink-0";
      } else {
        btn.className = "sidebar-nav-btn w-full px-3.5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-between transition text-teal-100/80 hover:bg-white/10 hover:text-white shrink-0";
      }
    }
  });

  if (tabName === "stats") {
    renderStatsBreakdown();
  }
}

function renderStatsBreakdown() {
  const container = document.getElementById("stats-breakdown-container");
  if (!container) return;
  container.innerHTML = PARKING_ZONES_META.map(z => {
    const slots = parkingZones[z.id] || [];
    const used = slots.filter(s => s.status === "occupied" || s.status === "reserved").length;
    const pct = Math.round((used / 20) * 100);
    return `
      <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
        <div class="flex justify-between items-center text-xs font-bold">
          <span class="text-slate-800">${z.name}</span>
          <span class="text-[#005f69]">${used}/20 ô (${pct}%)</span>
        </div>
        <div class="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
          <div class="h-full bg-[#005f69] rounded-full" style="width: ${pct}%"></div>
        </div>
        <div class="text-[11px] text-slate-500">${z.location}</div>
      </div>
    `;
  }).join("");
}

function handleLogoutClick() {
  speakVietnamese("Cảm ơn bạn đã sử dụng hệ thống quản trị bãi giữ xe thông minh U E H Mê Kông.");
  alert("Đã đăng xuất phiên quản trị Admin (Chế độ Demo).");
}

function updateRealTimeClock() {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");

  const days = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
  const dayName = days[now.getDay()];
  const dd = String(now.getDate()).padStart(2, "0");
  const mo = String(now.getMonth() + 1).padStart(2, "0");
  const yyyy = now.getFullYear();

  const timeEl = document.getElementById("live-clock-time");
  const dateEl = document.getElementById("live-clock-date");
  const mobileTimeEl = document.getElementById("mobile-status-time");

  if (timeEl) timeEl.textContent = `${hh}:${mm}:${ss}`;
  if (dateEl) dateEl.textContent = `${dayName}, ${dd}/${mo}/${yyyy}`;
  if (mobileTimeEl) mobileTimeEl.textContent = `${hh}:${mm}`;
}

function getCurrentHHMM() {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
}

function getFormattedNowShort() {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const mo = String(now.getMonth() + 1).padStart(2, "0");
  const yyyy = now.getFullYear();
  return `${hh}:${mm} - ${dd}/${mo}/${yyyy}`;
}

function getInitials(fullName) {
  const parts = String(fullName || "SV").trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[parts.length - 2][0] + parts[parts.length - 1][0]).toUpperCase();
}
