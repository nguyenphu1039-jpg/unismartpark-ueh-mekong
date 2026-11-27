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

// Phạm vi thống kê KPI thực tế: "all" (Toàn trường 7 bãi) | "current" (Chỉ bãi đang xem)
let kpiScopeMode = "all";

// Bộ đếm dẫn xuất từ sơ đồ thực tế (KHÔNG chứa hằng số cộng thêm hay số liệu giả định)
let kpiStats = {
  free: 0,
  occupied: 0,
  reserved: 0,
  unavailable: 0,
  totalIn: 0,
  totalOut: 0
};

// Scanner State
let html5QrCodeInstance = null;
let isCameraRunning = false;
let isScanModalOpen = false;
let isScannerCooldown = false;
let wasCameraPausedByModal = false;
let wasCameraActiveBeforeModal = false;
let APP_ROLE = "admin"; // "student" (link /) hoặc "admin" (link /admin)
let currentAppViewMode = "admin";
let currentStudentTab = "scan";
let studentSelectedZoneId = "khu-a";
let studentSelectedFreeSlotCode = null;
let availableCameras = [];
let currentCameraIndex = -1;
let currentFacingMode = "environment";
let lastScannedCode = "";
let lastScanTimestamp = 0;
let currentDisplayedStudent = null;
let currentModalStudent = null;
let currentMobileStudentMssv = "31251570240"; // Mặc định Hồ Thị Mỹ Hường (hoặc chọn bất kỳ ai trong 10 SV)

// Audio & Speech Unlock State (100% Mobile iOS/Android & Laptop compatibility)
let sharedAudioCtx = null;
let isAudioSpeechUnlocked = false;
let fallbackTtsAudio = null;

// Real-Time Cloud Sync State (MQTT over WebSockets: Phone <-> Laptop)
const MQTT_BROKERS = [
  "wss://broker.emqx.io:8084/mqtt",
  "wss://broker.hivemq.com:8884/mqtt"
];
const MQTT_SYNC_TOPIC = "ueh-mekong/unismartpark/live-sync-v1";
const CLIENT_SESSION_ID = "ueh_" + Math.random().toString(36).substring(2, 10) + "_" + Date.now().toString(36);
let mqttClient = null;
let currentBrokerIndex = 0;
let isMqttConnected = false;
let hasReceivedInitialRetained = false;
let lastPublishedTimestamp = 0;
let localBroadcastChannel = null;
let lastSpokenEventId = "";

// Activity Logs & Alerts
let activityLogs = [];
let systemAlerts = [];
let currentHistoryStatusFilter = "all";

// ==========================================================================
// 4. KHỞI TẠO HỆ THỐNG (INITIALIZATION - HỖ TRỢ ĐỘC LẬP 2 LINK: / VÀ /admin)
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  APP_ROLE = (document.body && document.body.dataset && document.body.dataset.appRole)
    ? document.body.dataset.appRole
    : "admin";
  currentAppViewMode = APP_ROLE;

  try {
    lastSpokenEventId = localStorage.getItem("unismartpark_last_spoken_event_id") || "";
  } catch (e) {}

  loadDatabase();
  buildAllParkingZones();
  initDefaultLogsAndAlerts();
  kpiStats.totalIn = activityLogs.filter(l => l.badgeType === "in").length;
  kpiStats.totalOut = activityLogs.filter(l => l.badgeType === "out").length;
  loadFullStateSnapshotFromLocal();
  syncDerivedKPIStatsObject();
  populateZoneDropdown();
  populateStudentDropdowns();

  // Khởi tạo danh sách giọng đọc tiếng Việt (vi / vi-VN) và tự động mở khóa Loa ở cú chạm/click đầu tiên
  initVoiceSynthesisVoices();
  ["click", "pointerdown", "touchstart", "keydown"].forEach(evtName => {
    document.addEventListener(evtName, () => {
      if (!isAudioSpeechUnlocked) {
        unlockAudioAndSpeech();
      }
    }, { passive: true });
  });

  // Render giao diện phù hợp theo vai trò của đường link (/ hoặc /admin)
  if (APP_ROLE === "student") {
    renderMobileStudentApp();
    renderStudentParkingTab();
    renderStudentNotificationsTab();
    if (isFloodSimActive) {
      showStudentFloodPopupModal();
    }
  } else {
    render20SlotGrid();
    selectSlot("A01");
    renderScannedStudentCard(students[0], "Check-in (Vào bãi)", true);
    renderKPICards();
    renderRecentActivityTable();
    renderDashboardAlerts();
    renderNotificationsPopover();
    renderStudentDatabaseTable();
    renderCampusMapViews();
    updateWeatherWidgetUI();
  }

  // Khởi tạo kết nối Đồng bộ đám mây thời gian thực (MQTT over WebSockets) giữa 2 Link (/ <-> /admin)
  initCloudSyncMQTT();

  // Start real-time clock
  updateRealTimeClock();
  setInterval(updateRealTimeClock, 1000);

  // Populate available camera devices quietly if supported
  discoverCameraDevices();

  // Optional MSSV query param on Student Link (e.g. ?mssv=31251570287)
  const params = new URLSearchParams(window.location.search);
  if (params.get("mssv")) {
    const found = students.find(s => s.mssv === params.get("mssv"));
    if (found) {
      currentMobileStudentMssv = found.mssv;
      const mobileSelect = document.getElementById("mobile-student-switcher");
      if (mobileSelect) mobileSelect.value = found.mssv;
      renderMobileStudentApp();
    }
  }

  if (window.lucide) {
    lucide.createIcons();
  }
});

// ==========================================================================
// 4B. ĐỒNG BỘ THỜI GIAN THỰC 2 LINK: SINH VIÊN (/) <-> ADMIN (/admin) (MQTT WSS)
// ==========================================================================
function markEventAsSpoken(eventId) {
  if (!eventId) return;
  lastSpokenEventId = eventId;
  try {
    localStorage.setItem("unismartpark_last_spoken_event_id", eventId);
  } catch (e) {}
}

function updateCloudSyncBadgeUI(statusType, customText) {
  const badge = document.getElementById("cloud-sync-badge");
  const dot = document.getElementById("cloud-sync-dot");
  const txt = document.getElementById("cloud-sync-text");
  if (!badge || !dot || !txt) return;

  if (APP_ROLE === "student") {
    if (statusType === "connected") {
      badge.className = "inline-flex items-center gap-1 text-[10px] font-bold text-emerald-200 mt-0.5";
      dot.className = "w-2 h-2 rounded-full bg-emerald-400 animate-pulse";
      txt.textContent = "🟢 Đồng bộ trực tuyến";
    } else if (statusType === "syncing") {
      badge.className = "inline-flex items-center gap-1 text-[10px] font-extrabold text-yellow-200 mt-0.5";
      dot.className = "w-2 h-2 rounded-full bg-yellow-300 animate-ping";
      txt.textContent = "⚡ Vừa đồng bộ!";
      setTimeout(() => {
        if (isMqttConnected) updateCloudSyncBadgeUI("connected");
      }, 1200);
    } else {
      badge.className = "inline-flex items-center gap-1 text-[10px] font-bold text-amber-200 mt-0.5";
      dot.className = "w-2 h-2 rounded-full bg-amber-400 animate-ping";
      txt.textContent = "🟡 Đang kết nối...";
    }
    return;
  }

  if (statusType === "connected") {
    badge.className = "flex items-center gap-1.5 bg-emerald-50 border border-emerald-300 text-emerald-800 px-2.5 py-1.5 rounded-xl text-[11px] font-extrabold shadow-sm transition-all";
    dot.className = "w-2 h-2 rounded-full bg-emerald-500 animate-pulse";
    txt.textContent = customText || "🟢 Đồng bộ trực tuyến";
  } else if (statusType === "syncing") {
    badge.className = "flex items-center gap-1.5 bg-teal-50 border border-teal-400 text-[#005f69] px-2.5 py-1.5 rounded-xl text-[11px] font-extrabold shadow-md scale-[1.02] transition-all";
    dot.className = "w-2 h-2 rounded-full bg-[#f26f21] animate-ping";
    txt.textContent = customText || "⚡ Vừa đồng bộ dữ liệu (<0.2s)";
    setTimeout(() => {
      if (isMqttConnected) updateCloudSyncBadgeUI("connected");
    }, 1200);
  } else {
    badge.className = "flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-700 px-2.5 py-1.5 rounded-xl text-[11px] font-bold shadow-sm transition-all";
    dot.className = "w-2 h-2 rounded-full bg-amber-500 animate-ping";
    txt.textContent = customText || "🟡 Đang kết nối Cloud...";
  }
}

function initCloudSyncMQTT() {
  // Hỗ trợ đồng bộ đa tab tức thì trên cùng thiết bị qua BroadcastChannel
  if ("BroadcastChannel" in window && !localBroadcastChannel) {
    try {
      localBroadcastChannel = new BroadcastChannel("unismartpark_ueh_live_channel");
      localBroadcastChannel.onmessage = (evt) => {
        if (evt.data && evt.data.senderId !== CLIENT_SESSION_ID) {
          applyCloudSyncState(evt.data, false);
        }
      };
    } catch (e) {}
  }

  window.addEventListener("storage", (evt) => {
    if (evt.key === "unismartpark_full_state_v3" && evt.newValue) {
      try {
        const parsed = JSON.parse(evt.newValue);
        if (parsed && parsed.senderId !== CLIENT_SESSION_ID) {
          applyCloudSyncState(parsed, false);
        }
      } catch (e) {}
    }
  });

  connectToMqttBroker(currentBrokerIndex);
}

function connectToMqttBroker(brokerIdx) {
  if (typeof mqtt === "undefined") {
    updateCloudSyncBadgeUI("connecting", "🟡 Chế độ Local (Đang tải MQTT...)");
    return;
  }

  const brokerUrl = MQTT_BROKERS[brokerIdx % MQTT_BROKERS.length];
  updateCloudSyncBadgeUI("connecting", "🟡 Đang kết nối Cloud...");

  try {
    if (mqttClient) {
      try { mqttClient.end(true); } catch (e) {}
    }

    mqttClient = mqtt.connect(brokerUrl, {
      clientId: CLIENT_SESSION_ID + "_" + Math.floor(Math.random() * 999),
      clean: true,
      connectTimeout: 6000,
      reconnectPeriod: 3500
    });

    let fallbackTimer = setTimeout(() => {
      if (!isMqttConnected) {
        currentBrokerIndex = (currentBrokerIndex + 1) % MQTT_BROKERS.length;
        connectToMqttBroker(currentBrokerIndex);
      }
    }, 7000);

    mqttClient.on("connect", () => {
      clearTimeout(fallbackTimer);
      isMqttConnected = true;
      updateCloudSyncBadgeUI("connected", "🟢 Đồng bộ trực tuyến (Phone ↔ Laptop)");

      mqttClient.subscribe(MQTT_SYNC_TOPIC, { qos: 1 }, (err) => {
        if (!err) {
          // Nếu sau 1.4 giây không có gói tin retained nào trên topic mới, đẩy trạng thái hiện tại lên làm chuẩn
          setTimeout(() => {
            if (!hasReceivedInitialRetained && isMqttConnected) {
              publishCloudSyncState({ type: "init_seed" });
            }
          }, 1400);
        }
      });
    });

    mqttClient.on("message", (topic, messageBuffer) => {
      if (topic !== MQTT_SYNC_TOPIC) return;
      try {
        const rawStr = messageBuffer.toString();
        if (!rawStr) return;
        const payload = JSON.parse(rawStr);
        const isFirstRetainedPacket = !hasReceivedInitialRetained;
        hasReceivedInitialRetained = true;

        // Bỏ qua gói tin do chính phiên này vừa phát đi
        if (payload.senderId === CLIENT_SESSION_ID && payload.timestamp === lastPublishedTimestamp) {
          return;
        }
        applyCloudSyncState(payload, isFirstRetainedPacket);
      } catch (parseErr) {
        console.warn("MQTT payload parse warning:", parseErr);
      }
    });

    mqttClient.on("error", (err) => {
      console.warn("MQTT broker error:", brokerUrl, err);
    });

    mqttClient.on("offline", () => {
      isMqttConnected = false;
      updateCloudSyncBadgeUI("connecting", "🟡 Đang kết nối lại Cloud...");
    });
  } catch (err) {
    console.warn("Không thể khởi tạo MQTT:", err);
  }
}

function buildFullSyncState(lastAction = null, scanEvent = null) {
  syncDerivedKPIStatsObject();
  return {
    version: 4,
    senderId: CLIENT_SESSION_ID,
    timestamp: Date.now(),
    students: students,
    parkingZones: parkingZones,
    kpiStats: { ...kpiStats },
    activityLogs: activityLogs.slice(0, 35),
    systemAlerts: systemAlerts.slice(0, 20),
    isFloodSimActive: isFloodSimActive,
    lastAction: lastAction,
    scanEvent: scanEvent
  };
}

function saveFullStateSnapshotToLocal(fullState) {
  try {
    localStorage.setItem(STORAGE_KEY_STUDENTS, JSON.stringify(students));
    localStorage.setItem("unismartpark_full_state_v3", JSON.stringify(fullState));
  } catch (e) {}
}

function loadFullStateSnapshotFromLocal() {
  try {
    const raw = localStorage.getItem("unismartpark_full_state_v3");
    if (!raw) return;
    const snap = JSON.parse(raw);
    if (snap && Array.isArray(snap.students) && snap.parkingZones) {
      students = snap.students;
      parkingZones = snap.parkingZones;
      if (snap.version >= 4 && snap.kpiStats) {
        kpiStats.totalIn = Number(snap.kpiStats.totalIn) || 0;
        kpiStats.totalOut = Number(snap.kpiStats.totalOut) || 0;
      }
      if (Array.isArray(snap.activityLogs) && snap.activityLogs.length > 0) activityLogs = snap.activityLogs;
      if (Array.isArray(snap.systemAlerts) && snap.systemAlerts.length > 0) systemAlerts = snap.systemAlerts;
      isFloodSimActive = Boolean(snap.isFloodSimActive);
      syncDerivedKPIStatsObject();
    }
  } catch (e) {}
}

function publishCloudSyncState(lastAction = null, scanEvent = null) {
  const fullState = buildFullSyncState(lastAction, scanEvent);
  lastPublishedTimestamp = fullState.timestamp;
  saveFullStateSnapshotToLocal(fullState);

  if (localBroadcastChannel) {
    try { localBroadcastChannel.postMessage(fullState); } catch (e) {}
  }

  if (mqttClient && isMqttConnected) {
    try {
      mqttClient.publish(MQTT_SYNC_TOPIC, JSON.stringify(fullState), {
        retain: true,
        qos: 1
      });
      updateCloudSyncBadgeUI("syncing", "🟢 Đồng bộ trực tuyến (Phone ↔ Laptop)");
    } catch (pubErr) {
      console.warn("MQTT publish error:", pubErr);
    }
  }
}

function applyCloudSyncState(payload, isFirstRetainedPacket = false) {
  if (!payload || !Array.isArray(payload.students) || !payload.parkingZones) return;

  students = payload.students;
  parkingZones = payload.parkingZones;
  if (payload.version >= 4 && payload.kpiStats) {
    kpiStats.totalIn = Number(payload.kpiStats.totalIn) || 0;
    kpiStats.totalOut = Number(payload.kpiStats.totalOut) || 0;
  }
  if (Array.isArray(payload.activityLogs)) activityLogs = payload.activityLogs;
  if (Array.isArray(payload.systemAlerts)) systemAlerts = payload.systemAlerts;
  isFloodSimActive = Boolean(payload.isFloodSimActive);
  syncDerivedKPIStatsObject();

  saveDatabase();
  try {
    localStorage.setItem("unismartpark_full_state_v3", JSON.stringify(payload));
  } catch (e) {}

  // Cập nhật tức thì toàn bộ giao diện trên màn hình mà không cần tải lại trang
  populateStudentDropdowns();
  if (APP_ROLE === "student") {
    renderMobileStudentApp();
    renderStudentParkingTab();
    renderStudentNotificationsTab();
  } else {
    updateWeatherWidgetUI();
    render20SlotGrid();
    selectSlot(selectedSlotCode);
    renderKPICards();
    renderRecentActivityTable();
    renderDashboardAlerts();
    renderNotificationsPopover();
    renderStudentDatabaseTable();
    renderCampusMapViews();
    renderStatsBreakdown();
  }

  // Xử lý scanEvent đồng bộ giữa 2 Link (Điện thoại Sinh viên <-> Máy tính Admin) kèm chống lặp F5
  const ev = payload.scanEvent;
  if (ev && ev.eventId) {
    const isNewUnspokenEvent = ev.eventId !== lastSpokenEventId;
    const ageMs = Math.abs(Date.now() - Number(ev.timestamp || 0));
    // Chỉ phát âm thanh cho sự kiện mới phát sinh trong vòng 15 giây gần nhất (hoặc gói tin live vừa bắn sang khi trang đang mở)
    const shouldSpeakNow = isNewUnspokenEvent && (!isFirstRetainedPacket || ageMs <= 15000);

    if (ev.action === "checkin" || ev.action === "checkout") {
      const isCheckIn = ev.action === "checkin";
      const dirLabel = isCheckIn ? "Check-in (Vào bãi)" : "Check-out (Ra bãi)";

      if (APP_ROLE === "admin") {
        updateScanStatusBanner(true, `✔ Quét thành công! (${ev.hoTen})`);
        renderScannedStudentCard(
          {
            mssv: ev.mssv,
            hoTen: ev.hoTen,
            ngaySinh: ev.ngaySinh || "2007",
            bienSo: ev.bienSo,
            dongXe: ev.dongXe || "Xe máy",
            loaiXe: ev.loaiXe || "Xe máy",
            oDo: ev.slotId
          },
          dirLabel,
          isCheckIn,
          ev.zoneName
        );

        if (ev.slotId) {
          for (const zId of Object.keys(parkingZones)) {
            if (parkingZones[zId].some(s => s.code === ev.slotId)) {
              if (currentZoneId !== zId) {
                currentZoneId = zId;
                populateZoneDropdown();
              }
              break;
            }
          }
          render20SlotGrid();
          selectSlot(ev.slotId);
        }
      }

      if (shouldSpeakNow) {
        markEventAsSpoken(ev.eventId);
        const fallbackSpeech = isCheckIn
          ? `Xác nhận thành công. Vị trí đỗ xe của bạn là ô ${formatSlotCodeForSpeech(ev.slotId)}, ${ev.zoneName || "Bãi đỗ xe Khu A"}.`
          : `Xác nhận ra cổng thành công. Đã giải phóng ô ${formatSlotCodeForSpeech(ev.slotId)}.`;

        if (APP_ROLE === "admin") {
          playFeedbackBeep(true);
          speakVietnamese(ev.speechText || fallbackSpeech);
        } else if (APP_ROLE === "student" && ev.mssv === currentMobileStudentMssv) {
          // Nếu đang ở Link Sinh viên (/) và vừa có lượt quét từ cổng Admin cho chính sinh viên đang đăng nhập -> Bật Popup vị trí đỗ xe + Phát loa
          playFeedbackBeep(true);
          speakVietnamese(ev.speechText || fallbackSpeech);
          showScanResultModal({
            type: isCheckIn ? "checkin" : "checkout",
            hoTen: ev.hoTen,
            mssv: ev.mssv,
            bienSo: ev.bienSo,
            slotId: ev.slotId,
            zoneFullLabel: getFullZoneLabelWithRoofBySlotCode(ev.slotId)
          });
        }
      } else if (isNewUnspokenEvent) {
        // Đánh dấu gói tin retained cũ để không bao giờ đọc lại khi F5
        markEventAsSpoken(ev.eventId);
      }
    } else if (ev.action === "fail") {
      if (APP_ROLE === "admin") {
        updateScanStatusBanner(false, `KHÔNG THỂ XÁC NHẬN! Mã lạ: ${ev.mssv || ""}`);
        renderUnknownScannedCard(ev.mssv || "Mã lạ");
      }
      if (shouldSpeakNow) {
        markEventAsSpoken(ev.eventId);
        if (APP_ROLE === "admin") {
          playFeedbackBeep(false);
          speakVietnamese(ev.speechText || "Không thể xác nhận.");
        }
      } else if (isNewUnspokenEvent) {
        markEventAsSpoken(ev.eventId);
      }
    }
  }

  // Xử lý các sự kiện đồng bộ khác từ thiết bị kia gửi sang
  const act = payload.lastAction;
  if (act && payload.senderId !== CLIENT_SESSION_ID) {
    updateCloudSyncBadgeUI("syncing", "⚡ Nhận đồng bộ!");

    if (act.type === "plate_mismatch") {
      showEmergencyStrip(act.title, act.desc);
    } else if (act.type === "plate_match" || act.type === "slot_edit" || act.type === "reserve") {
      if (act.type === "plate_match") hideEmergencyStrip();
      if (APP_ROLE === "admin" && act.slotCode) {
        for (const zId of Object.keys(parkingZones)) {
          if (parkingZones[zId].some(s => s.code === act.slotCode)) {
            if (currentZoneId !== zId) {
              currentZoneId = zId;
              populateZoneDropdown();
            }
            break;
          }
        }
        render20SlotGrid();
        selectSlot(act.slotCode);
      }
    } else if (act.type === "flood_on") {
      if (APP_ROLE === "student") {
        showStudentFloodPopupModal();
        playFeedbackBeep(false);
      } else {
        const pushBanner = document.getElementById("push-notification-banner");
        if (pushBanner) pushBanner.classList.remove("hidden");
      }
    } else if (act.type === "flood_off" || act.type === "reset" || act.type === "clear_all_zones") {
      dismissPushBanner();
      dismissStudentFloodModal();
      hideEmergencyStrip();
      if (APP_ROLE === "admin") {
        renderKPICards();
        renderStatsBreakdown();
      }
    } else if (act.type === "flood_relocate") {
      dismissPushBanner();
      dismissStudentFloodModal();
      if (APP_ROLE === "admin" && act.slotCode) {
        currentZoneId = "khu-a";
        populateZoneDropdown();
        render20SlotGrid();
        selectSlot(act.slotCode);
      }
    }
  }
}

// ==========================================================================
// 5. QUẢN LÝ DATABASE 10 SINH VIÊN & ĐỒNG BỘ LOCALSTORAGE + CLOUD
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

function resetDefaultDatabaseAndSyncCloud() {
  unlockAudioAndSpeech();
  resetDefaultDatabase();
}

function resetDefaultDatabase() {
  students = DEFAULT_STUDENTS.map(s => ({ ...s }));
  saveDatabase();
  isFloodSimActive = false;
  currentZoneId = "khu-a";
  buildAllParkingZones();
  initDefaultLogsAndAlerts();
  kpiStats.totalIn = activityLogs.filter(l => l.badgeType === "in").length;
  kpiStats.totalOut = activityLogs.filter(l => l.badgeType === "out").length;
  syncDerivedKPIStatsObject();
  populateZoneDropdown();
  populateStudentDropdowns();
  render20SlotGrid();
  selectSlot("A01");
  renderScannedStudentCard(students[0], "Check-in (Vào bãi)", true);
  updateScanStatusBanner(true, "Đã reset dữ liệu mẫu đồng bộ Cloud (Phone ↔ Laptop)");
  renderKPICards();
  renderRecentActivityTable();
  renderDashboardAlerts();
  renderNotificationsPopover();
  renderStudentDatabaseTable();
  renderCampusMapViews();
  renderStatsBreakdown();
  renderMobileStudentApp();
  renderStudentParkingTab();
  renderStudentNotificationsTab();
  updateWeatherWidgetUI();
  dismissPushBanner();
  dismissStudentFloodModal();
  hideEmergencyStrip();
  publishCloudSyncState({ type: "reset" });
  playFeedbackBeep(true);
  speakVietnamese("XÁC NHẬN THÀNH CÔNG");
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
    if (!stu.oDo || ["Đã lấy xe", "Chưa gửi", "Ngoài bãi"].includes(stu.trangThaiGui)) return;
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
    if (btnIndoor && btnOutdoor) {
      if (zoneMeta.roofType === "indoor") {
        btnIndoor.className = "px-2.5 py-1 rounded-lg text-xs font-bold transition bg-[#005f69] text-white";
        btnOutdoor.className = "px-2.5 py-1 rounded-lg text-xs font-bold transition text-slate-600 hover:text-slate-900";
      } else {
        btnOutdoor.className = "px-2.5 py-1 rounded-lg text-xs font-bold transition bg-[#f26f21] text-white";
        btnIndoor.className = "px-2.5 py-1 rounded-lg text-xs font-bold transition text-slate-600 hover:text-slate-900";
      }
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
  renderKPICards();
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
  if (btnMoto && btnCar) {
    if (vehicleType === "Xe máy") {
      btnMoto.className = "px-2 py-1 rounded-lg text-xs font-bold transition bg-[#005f69] text-white";
      btnCar.className = "px-2 py-1 rounded-lg text-xs font-bold transition text-slate-600 hover:text-slate-900";
    } else {
      btnCar.className = "px-2 py-1 rounded-lg text-xs font-bold transition bg-[#005f69] text-white";
      btnMoto.className = "px-2 py-1 rounded-lg text-xs font-bold transition text-slate-600 hover:text-slate-900";
    }
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

let isQuickSlotEditMode = false;

function toggleQuickSlotEditMode() {
  isQuickSlotEditMode = !isQuickSlotEditMode;
  const btn = document.getElementById("btn-toggle-quick-edit");
  const dot = document.getElementById("quick-edit-switch-dot");
  const label = document.getElementById("quick-edit-switch-label");
  if (!btn || !dot || !label) return;

  if (isQuickSlotEditMode) {
    btn.className = "px-2.5 py-1.5 rounded-lg text-[11px] font-extrabold border-2 border-[#f26f21] bg-orange-50 text-[#f26f21] flex items-center gap-1.5 shadow-md transition active:scale-95";
    dot.className = "w-2.5 h-2.5 rounded-full bg-[#f26f21] animate-ping";
    label.textContent = "✏️ Đổi nhanh trạng thái ô: BẬT (1 chạm)";
  } else {
    btn.className = "px-2.5 py-1.5 rounded-lg text-[11px] font-extrabold border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 flex items-center gap-1.5 shadow-sm transition active:scale-95";
    dot.className = "w-2.5 h-2.5 rounded-full bg-slate-400";
    label.textContent = "✏️ Đổi nhanh trạng thái ô: TẮT";
  }
}

function handleSlotClick(slotCode) {
  if (isQuickSlotEditMode) {
    // Chế độ Đổi nhanh 1 chạm: Xoay vòng Trống -> Đang sử dụng -> Đặt trước -> Không khả dụng -> Trống
    const slots = parkingZones[currentZoneId] || [];
    const slot = slots.find(s => s.code === slotCode);
    if (!slot) return;
    const cycleOrder = ["free", "occupied", "reserved", "unavailable"];
    const currIdx = cycleOrder.indexOf(slot.status);
    const nextStatus = cycleOrder[(currIdx + 1) % cycleOrder.length];
    selectedSlotCode = slotCode;
    setSlotDirectStatus(nextStatus, slotCode, true);
  } else {
    selectSlot(slotCode);
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
    <div onclick="handleSlotClick('${slot.code}')"
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
// 9. XỬ LÝ CHỌN Ô ĐỖ, HIỂN THỊ KHUNG "THÔNG TIN Ô ĐỖ" & CHỈNH TRỰC TIẾP 4 TRẠNG THÁI
// ==========================================================================
function selectSlot(slotCode) {
  selectedSlotCode = slotCode;
  const slots = parkingZones[currentZoneId] || [];
  const slot = slots.find(s => s.code === slotCode);
  if (!slot) return;

  render20SlotGrid();

  const codeEl = document.getElementById("slot-detail-code");
  const directLabelEl = document.getElementById("direct-edit-slot-label");
  const badgeEl = document.getElementById("slot-detail-badge");
  const zoneTagEl = document.getElementById("slot-detail-zone-tag");
  const areaEl = document.getElementById("slot-detail-area");
  const vehicleEl = document.getElementById("slot-detail-vehicle");
  const statusTextEl = document.getElementById("slot-detail-status-text");
  const studentEl = document.getElementById("slot-detail-student");
  const plateEl = document.getElementById("slot-detail-plate");
  const simInput = document.getElementById("sim-incoming-plate-input");
  const customPlateInput = document.getElementById("slot-direct-custom-plate");
  const directStuSelect = document.getElementById("slot-direct-student-select");

  if (codeEl) codeEl.textContent = slot.code;
  if (directLabelEl) directLabelEl.textContent = slot.code;
  if (zoneTagEl) zoneTagEl.textContent = slot.zoneName.replace(/^\d+\.\s*/, "");
  if (areaEl) areaEl.textContent = `${slot.roofLabel}`;
  if (vehicleEl) vehicleEl.textContent = currentVehicleFilter || slot.vehicleType;
  if (studentEl) studentEl.textContent = slot.studentName ? `${slot.studentName}${slot.studentMssv ? " (" + slot.studentMssv + ")" : ""}` : "— Chưa có —";
  if (plateEl) plateEl.textContent = slot.licensePlate || "—";

  if (simInput) {
    simInput.value = slot.licensePlate || "";
  }
  if (customPlateInput) {
    customPlateInput.value = slot.licensePlate || "";
  }
  if (directStuSelect) {
    if (slot.studentMssv && students.some(s => s.mssv === slot.studentMssv)) {
      directStuSelect.value = slot.studentMssv;
    } else {
      directStuSelect.value = "";
    }
  }

  // Highlight active button among the 4 direct status buttons
  const btnFree = document.getElementById("btn-set-status-free");
  const btnOcc = document.getElementById("btn-set-status-occupied");
  const btnRes = document.getElementById("btn-set-status-reserved");
  const btnUnav = document.getElementById("btn-set-status-unavailable");
  if (btnFree) btnFree.className = `py-1.5 px-2 rounded-lg text-[11px] font-extrabold flex items-center justify-center gap-1 shadow-sm transition active:scale-95 ${slot.status === "free" ? "bg-emerald-600 text-white ring-2 ring-emerald-300" : "bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300"}`;
  if (btnOcc) btnOcc.className = `py-1.5 px-2 rounded-lg text-[11px] font-extrabold flex items-center justify-center gap-1 shadow-sm transition active:scale-95 ${slot.status === "occupied" ? "bg-blue-600 text-white ring-2 ring-blue-300" : "bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-300"}`;
  if (btnRes) btnRes.className = `py-1.5 px-2 rounded-lg text-[11px] font-extrabold flex items-center justify-center gap-1 shadow-sm transition active:scale-95 ${slot.status === "reserved" ? "bg-[#f26f21] text-white ring-2 ring-orange-300" : "bg-orange-50 hover:bg-orange-100 text-[#f26f21] border border-orange-300"}`;
  if (btnUnav) btnUnav.className = `py-1.5 px-2 rounded-lg text-[11px] font-extrabold flex items-center justify-center gap-1 shadow-sm transition active:scale-95 ${slot.status === "unavailable" ? "bg-red-600 text-white ring-2 ring-red-300" : "bg-red-50 hover:bg-red-100 text-red-600 border border-red-300"}`;

  if (slot.status === "free") {
    if (codeEl) codeEl.className = "text-2xl sm:text-3xl font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl";
    if (badgeEl) {
      badgeEl.className = "px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-700 font-bold text-xs sm:text-sm flex items-center gap-1.5 border border-emerald-200";
      badgeEl.innerHTML = `<i data-lucide="check-circle-2" class="w-4 h-4"></i><span>Trống</span>`;
    }
    if (statusTextEl) {
      statusTextEl.textContent = "Sẵn sàng sử dụng";
      statusTextEl.className = "font-bold text-emerald-700";
    }
  } else if (slot.status === "occupied") {
    if (codeEl) codeEl.className = "text-2xl sm:text-3xl font-black text-blue-700 bg-blue-50 border border-blue-200 px-4 py-2 rounded-xl";
    if (badgeEl) {
      badgeEl.className = "px-3.5 py-2 rounded-xl bg-blue-50 text-blue-700 font-bold text-xs sm:text-sm flex items-center gap-1.5 border border-blue-200";
      badgeEl.innerHTML = `<i data-lucide="bike" class="w-4 h-4"></i><span>Đang sử dụng</span>`;
    }
    if (statusTextEl) {
      statusTextEl.textContent = slot.note || "Đang có phương tiện đỗ";
      statusTextEl.className = "font-bold text-blue-700";
    }
  } else if (slot.status === "reserved") {
    if (codeEl) codeEl.className = "text-2xl sm:text-3xl font-black text-[#f26f21] bg-orange-50 border border-orange-200 px-4 py-2 rounded-xl";
    if (badgeEl) {
      badgeEl.className = "px-3.5 py-2 rounded-xl bg-orange-50 text-[#f26f21] font-bold text-xs sm:text-sm flex items-center gap-1.5 border border-orange-200";
      badgeEl.innerHTML = `<i data-lucide="calendar-clock" class="w-4 h-4"></i><span>Đặt trước</span>`;
    }
    if (statusTextEl) {
      statusTextEl.textContent = slot.note || "Đã được sinh viên đặt trước";
      statusTextEl.className = "font-bold text-[#f26f21]";
    }
  } else {
    if (codeEl) codeEl.className = "text-2xl sm:text-3xl font-black text-red-600 bg-red-50 border border-red-200 px-4 py-2 rounded-xl";
    if (badgeEl) {
      badgeEl.className = "px-3.5 py-2 rounded-xl bg-red-50 text-red-600 font-bold text-xs sm:text-sm flex items-center gap-1.5 border border-red-200";
      badgeEl.innerHTML = `<i data-lucide="alert-triangle" class="w-4 h-4"></i><span>Không khả dụng</span>`;
    }
    if (statusTextEl) {
      statusTextEl.textContent = slot.note || "Ngập nước / Tạm ngưng";
      statusTextEl.className = "font-bold text-red-600";
    }
  }

  if (window.lucide) lucide.createIcons();
}

/**
 * Chỉnh trực tiếp trạng thái của 1 ô đỗ xe (Cách 1 & Cách 2):
 * Tự động cập nhật màu sắc ô, tính lại 4 thẻ KPI, ghi log "Hoạt động gần đây" và đồng bộ MQTT Cloud.
 */
function setSlotDirectStatus(newStatus, targetSlotCode = null, isFromQuickCycle = false) {
  const codeToEdit = targetSlotCode || selectedSlotCode;
  const slots = parkingZones[currentZoneId] || [];
  const slot = slots.find(s => s.code === codeToEdit);
  if (!slot) return;

  const directStuSelect = document.getElementById("slot-direct-student-select");
  const customPlateInput = document.getElementById("slot-direct-custom-plate");
  const selectedMssv = directStuSelect ? directStuSelect.value : "";
  const typedPlate = (customPlateInput && customPlateInput.value.trim()) ? customPlateInput.value.trim().toUpperCase() : "";

  if (newStatus === "free") {
    // 1. [🟢 Trống]: Xóa thông tin xe đang đậu/đặt trước và giải phóng ô
    if (slot.studentMssv) {
      const prevStu = students.find(s => s.mssv === slot.studentMssv);
      if (prevStu && prevStu.oDo === slot.code) {
        prevStu.trangThaiGui = "Chưa gửi";
        prevStu.oDo = "";
      }
    }
    slot.status = "free";
    slot.studentMssv = null;
    slot.studentName = null;
    slot.licensePlate = null;
    slot.note = "Sẵn sàng sử dụng";
  } else if (newStatus === "occupied" || newStatus === "reserved") {
    // 2. [🔵 Đang sử dụng] hoặc 3. [🟠 Đặt trước]
    slot.status = newStatus;
    let assignedStu = null;

    if (!isFromQuickCycle && selectedMssv) {
      assignedStu = students.find(s => s.mssv === selectedMssv);
    } else if (slot.studentMssv) {
      assignedStu = students.find(s => s.mssv === slot.studentMssv);
    } else if (!isFromQuickCycle && typedPlate) {
      assignedStu = students.find(s => s.bienSo.toUpperCase() === typedPlate);
    }

    if (assignedStu) {
      // Nếu sinh viên này đang ở ô khác, giải phóng ô cũ trước
      if (assignedStu.oDo && assignedStu.oDo !== slot.code) {
        freeStudentSlot(assignedStu.mssv, assignedStu.oDo);
      }
      assignedStu.oDo = slot.code;
      assignedStu.trangThaiGui = newStatus === "occupied" ? "Đang sử dụng" : "Đặt trước";
      slot.studentMssv = assignedStu.mssv;
      slot.studentName = assignedStu.hoTen;
      slot.licensePlate = assignedStu.bienSo;
      slot.vehicleType = assignedStu.loaiXe || "Xe máy";
      slot.note = newStatus === "occupied"
        ? `Đang sử dụng (${assignedStu.dongXe})`
        : `Đã đặt trước (${assignedStu.dongXe})`;
    } else {
      const plateToUse = (!isFromQuickCycle && typedPlate)
        ? typedPlate
        : (slot.licensePlate || `64B1-${slot.code}.88`);
      slot.licensePlate = plateToUse;
      slot.studentName = slot.studentName || "Sinh viên UEH Mekong";
      slot.note = newStatus === "occupied" ? "Đang sử dụng" : "Đã đặt trước";
    }
  } else if (newStatus === "unavailable") {
    // 4. [🔴 Không khả dụng / Ngập nước]
    if (slot.studentMssv) {
      const prevStu = students.find(s => s.mssv === slot.studentMssv);
      if (prevStu && prevStu.oDo === slot.code) {
        prevStu.trangThaiGui = "Chưa gửi";
        prevStu.oDo = "";
      }
    }
    slot.status = "unavailable";
    slot.studentMssv = null;
    slot.studentName = null;
    slot.licensePlate = null;
    slot.note = isFloodSimActive ? "Không khả dụng / Ngập nước" : "Bảo trì / Không khả dụng";
  }

  saveDatabase();

  const statusMapVN = {
    free: { label: "Trống", badge: "out" },
    occupied: { label: "Đang sử dụng", badge: "in" },
    reserved: { label: "Đặt trước", badge: "reserved" },
    unavailable: { label: "Không khả dụng", badge: "alert" }
  };
  const stInfo = statusMapVN[newStatus] || statusMapVN.free;

  addActivityLog({
    vehicle: currentVehicleFilter || slot.vehicleType || "Xe máy",
    plate: slot.licensePlate || "—",
    studentName: `Admin đổi trạng thái ô ${slot.code} -> ${stInfo.label}`,
    mssv: slot.studentMssv || "ADMIN",
    slot: slot.code,
    status: stInfo.label === "Đang sử dụng" ? "Vào" : (stInfo.label === "Không khả dụng" ? "Cảnh báo" : stInfo.label),
    badgeType: stInfo.badge,
    detail: `Admin đổi trạng thái ô ${slot.code} -> ${stInfo.label}`
  });

  render20SlotGrid();
  selectSlot(slot.code);
  renderKPICards();
  renderRecentActivityTable();
  renderStudentDatabaseTable();
  renderCampusMapViews();
  renderStatsBreakdown();
  renderMobileStudentApp();

  publishCloudSyncState({
    type: "slot_edit",
    slotCode: slot.code,
    status: newStatus
  });
}

function onChangeSlotDirectStudent(mssv) {
  const customPlateInput = document.getElementById("slot-direct-custom-plate");
  if (!mssv) {
    if (customPlateInput) customPlateInput.value = "";
    return;
  }
  const stu = students.find(s => s.mssv === mssv);
  if (!stu) return;
  if (customPlateInput) customPlateInput.value = stu.bienSo;

  const slots = parkingZones[currentZoneId] || [];
  const slot = slots.find(s => s.code === selectedSlotCode);
  if (!slot) return;

  // Nếu ô đang Trống hoặc Không khả dụng, tự động chuyển sang Đang sử dụng khi chọn gán sinh viên
  const targetStatus = (slot.status === "reserved") ? "reserved" : "occupied";
  setSlotDirectStatus(targetStatus, slot.code, false);
}

function applyCustomVehicleToSelectedSlot() {
  const customPlateInput = document.getElementById("slot-direct-custom-plate");
  const directStuSelect = document.getElementById("slot-direct-student-select");
  const typedPlate = (customPlateInput && customPlateInput.value.trim()) ? customPlateInput.value.trim().toUpperCase() : "";

  if (!typedPlate && (!directStuSelect || !directStuSelect.value)) {
    alert("Vui lòng chọn 1 sinh viên trong danh sách hoặc nhập biển số xe cần gán vào ô!");
    return;
  }

  const slots = parkingZones[currentZoneId] || [];
  const slot = slots.find(s => s.code === selectedSlotCode);
  if (!slot) return;

  // Nếu nhập biển số tùy ý không trùng với SV đang chọn trong dropdown thì bỏ chọn dropdown để lấy biển số tùy ý
  if (directStuSelect && directStuSelect.value) {
    const selectedStu = students.find(s => s.mssv === directStuSelect.value);
    if (selectedStu && typedPlate && selectedStu.bienSo.toUpperCase() !== typedPlate) {
      directStuSelect.value = "";
      slot.studentMssv = null;
      slot.studentName = `Xe SV (${typedPlate})`;
    }
  } else {
    slot.studentMssv = null;
    slot.studentName = `Xe SV (${typedPlate})`;
  }

  slot.licensePlate = typedPlate;
  const targetStatus = (slot.status === "reserved") ? "reserved" : "occupied";
  setSlotDirectStatus(targetStatus, slot.code, false);
}

/**
 * Làm trống 100% toàn bộ tất cả 7 bãi đỗ xe (Nhà xe, Ngoài trời, Xe máy, Ô tô):
 * - Đưa toàn bộ 140 ô về trạng thái Trống ("free") và xóa sạch thông tin xe / người đặt gắn trong ô.
 * - Đưa trạng thái gửi xe của toàn bộ sinh viên về "Chưa gửi" và xóa mã ô đỗ cũ.
 * - Cập nhật 4 thẻ KPI về chính xác: Ô trống = tongSoO (100%), còn lại = 0 (0%), Tỷ lệ sử dụng = 0%.
 * - Lưu đè localStorage và phát gói tin MQTT (retain: true, qos: 1) để đồng bộ Link Admin <-> Link Sinh viên.
 */
function clearAllSevenZonesToFree() {
  unlockAudioAndSpeech();
  let totalClearedSlots = 0;

  // 1. Duyệt qua TẤT CẢ 7 bãi đỗ xe và chuyển 100% ô đỗ về Trống ("free")
  Object.keys(parkingZones).forEach(zId => {
    const zSlots = parkingZones[zId] || [];
    zSlots.forEach(slot => {
      slot.status = "free";
      slot.studentMssv = null;
      slot.studentName = null;
      slot.licensePlate = null;
      slot.note = "Sẵn sàng sử dụng";
      totalClearedSlots += 1;
    });
  });

  // 2. Tắt chế độ giả lập ngập nước nếu đang bật để toàn bộ 7 bãi sạch 100%
  isFloodSimActive = false;
  dismissPushBanner();
  dismissStudentFloodModal();
  hideEmergencyStrip();

  // 3. Chuyển trạng thái gửi xe của toàn bộ sinh viên về "Chưa gửi" để không còn dữ liệu rác
  students.forEach(stu => {
    stu.trangThaiGui = "Chưa gửi";
    stu.oDo = "";
  });

  // 4. Đồng bộ lại KPI hoàn toàn từ sơ đồ thực tế (Ô trống = 140 (100%), Đang sử dụng = 0, Đặt trước = 0, Không khả dụng = 0)
  kpiStats.totalIn = 0;
  kpiStats.totalOut = 0;
  syncDerivedKPIStatsObject();

  saveDatabase();

  addActivityLog({
    vehicle: "Toàn trường",
    plate: `7 BÃI (${totalClearedSlots} Ô)`,
    studentName: `Admin làm trống toàn bộ 7 bãi (${totalClearedSlots}/${totalClearedSlots} ô Trống)`,
    mssv: "ADMIN",
    slot: "TẤT CẢ",
    status: "Trống",
    badgeType: "out",
    detail: `Đã giải phóng 100% toàn bộ ${totalClearedSlots} ô trên 7 bãi đỗ xe UEH Mekong`
  });

  playFeedbackBeep(true);
  updateWeatherWidgetUI();
  populateStudentDropdowns();
  render20SlotGrid();
  const currSlots = parkingZones[currentZoneId] || [];
  if (currSlots.length > 0) selectSlot(currSlots[0].code);
  renderKPICards();
  renderRecentActivityTable();
  renderStudentDatabaseTable();
  renderCampusMapViews();
  renderStatsBreakdown();
  renderMobileStudentApp();
  renderStudentParkingTab();
  renderStudentNotificationsTab();

  // 5. Lưu đè localStorage + Đẩy gói tin trạng thái mới lên MQTT (retain: true, qos: 1)
  publishCloudSyncState({
    type: "clear_all_zones",
    totalClearedSlots: totalClearedSlots
  });
}

// Giữ tên hàm tương thích ngược nếu gọi từ nơi khác
function resetAllSlotsInCurrentZoneToFree() {
  clearAllSevenZonesToFree();
}

// ==========================================================================
// 10. PHÂN HỆ 1: CAMERA QUÉT MÃ VẠCH ĐA THIẾT BỊ & CHECK-IN / CHECK-OUT 2 CHIỀU
// ==========================================================================
function switchScanTab(tab) {
  const btnRfid = document.getElementById("scan-tab-rfid");
  const btnBarcode = document.getElementById("scan-tab-barcode");
  const hintText = document.getElementById("scanner-hint-text");
  if (!btnRfid || !btnBarcode) return;

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
  if (typeof Html5Qrcode === "undefined") return [];
  try {
    const devices = await Html5Qrcode.getCameras();
    availableCameras = Array.isArray(devices) ? devices : [];
    const select = document.getElementById("camera-device-select");
    if (select && availableCameras.length > 0) {
      const currentVal = select.value;
      select.innerHTML = `<option value="">-- Danh sách tất cả Camera (${availableCameras.length} ống kính) --</option>` +
        availableCameras.map((d, idx) => `<option value="${d.id}">${d.label || "Camera " + (idx + 1)}</option>`).join("");
      if (currentVal && availableCameras.some(d => d.id === currentVal)) {
        select.value = currentVal;
      } else if (currentCameraIndex >= 0 && availableCameras[currentCameraIndex]) {
        select.value = availableCameras[currentCameraIndex].id;
      }
    }
    return availableCameras;
  } catch (err) {
    // Quyền Camera chưa được cấp; sẽ tự động cập nhật ngay khi bấm Bật Camera
    return [];
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

/**
 * Hệ thống điều khiển Camera thông minh (Dùng chung cho Điện thoại & Laptop):
 * 1. Luôn dừng luồng quét cũ nếu đang chạy (html5QrCodeInstance.isScanning -> stop()).
 * 2. Khởi động bằng cấu hình mềm { facingMode: "environment" } (tự mở Cam sau ĐT hoặc Webcam Laptop).
 * 3. Khối try...catch dự phòng: Nếu { facingMode: "environment" } lỗi trên bất kỳ trình duyệt nào,
 *    tự động gọi Html5Qrcode.getCameras(), lấy devices[devices.length - 1].id và gọi start(cameraId, ...).
 */
async function startSmartCameraScanner(customConstraint = null) {
  unlockAudioAndSpeech();
  switchScanTab("barcode");

  const readerEl = document.getElementById("qr-reader");
  const idlePreviewEl = document.getElementById("scanner-idle-preview");
  const stopBtn = document.getElementById("btn-stop-camera");
  const indicator = document.getElementById("camera-active-indicator");

  if (typeof Html5Qrcode === "undefined") {
    alert("Thư viện html5-qrcode chưa tải xong. Vui lòng kiểm tra kết nối mạng!");
    return;
  }

  // Reset cờ khóa quét khi người dùng chủ động bật lại Camera
  isScanModalOpen = false;
  isScannerCooldown = false;
  wasCameraPausedByModal = false;

  // Bước 1: Luôn kiểm tra và dừng luồng quét cũ nếu đang chạy
  if (html5QrCodeInstance) {
    try {
      if (html5QrCodeInstance.isScanning || isCameraRunning) {
        await html5QrCodeInstance.stop();
      }
    } catch (stopErr) {
      console.warn("Dừng luồng camera cũ:", stopErr);
    }
    isCameraRunning = false;
  }

  if (readerEl) readerEl.classList.remove("hidden");
  if (idlePreviewEl) idlePreviewEl.classList.add("hidden");
  if (stopBtn) stopBtn.classList.remove("hidden");
  if (indicator) {
    indicator.textContent = "Đang mở Camera...";
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

  const scanConfig = {
    fps: 20,
    qrbox: (viewfinderWidth, viewfinderHeight) => {
      const w = Math.max(180, Math.floor(viewfinderWidth * 0.85));
      const h = Math.max(95, Math.floor(viewfinderHeight * 0.55));
      return { width: w, height: h };
    },
    aspectRatio: 1.333334
  };

  // Bước 2: Mặc định dùng cấu hình mềm { facingMode: "environment" } (TUYỆT ĐỐI KHÔNG dùng exact: "environment")
  const primaryConstraint = customConstraint
    ? customConstraint
    : { facingMode: currentFacingMode || "environment" };

  try {
    await html5QrCodeInstance.start(
      primaryConstraint,
      scanConfig,
      (decodedText) => {
        if (isScanModalOpen || isScannerCooldown) return;
        onBarcodeScannedSuccess(decodedText, true);
      },
      () => {}
    );

    isCameraRunning = true;
    const devices = await discoverCameraDevices();
    if (typeof primaryConstraint === "string") {
      const idx = devices.findIndex(d => d.id === primaryConstraint);
      if (idx >= 0) currentCameraIndex = idx;
    } else if (devices.length > 0 && currentCameraIndex < 0) {
      currentCameraIndex = devices.length - 1;
    }

    if (indicator) {
      const camLabel = (currentCameraIndex >= 0 && devices[currentCameraIndex] && devices[currentCameraIndex].label)
        ? devices[currentCameraIndex].label.substring(0, 18)
        : (currentFacingMode === "user" ? "Cam Trước / Webcam" : "Camera Đang Quét");
      indicator.textContent = `🟢 ${camLabel}`;
      indicator.className = "text-[10px] font-bold text-emerald-600";
    }
    updateScanStatusBanner(true, "Camera đã bật! Đưa mã vạch MSSV hoặc QR vào khung ngắm.");
  } catch (primaryErr) {
    console.warn("Cấu hình mềm gặp lỗi, chuyển sang fallback Html5Qrcode.getCameras():", primaryErr);
    // Bước 3: Khối try...catch dự phòng lấy devices[devices.length - 1].id
    try {
      const devices = await Html5Qrcode.getCameras();
      availableCameras = Array.isArray(devices) ? devices : [];
      if (availableCameras.length > 0) {
        currentCameraIndex = availableCameras.length - 1;
        const fallbackCameraId = availableCameras[currentCameraIndex].id;
        await discoverCameraDevices();

        await html5QrCodeInstance.start(
          fallbackCameraId,
          scanConfig,
          (decodedText) => {
            if (isScanModalOpen || isScannerCooldown) return;
            onBarcodeScannedSuccess(decodedText, true);
          },
          () => {}
        );

        isCameraRunning = true;
        const select = document.getElementById("camera-device-select");
        if (select) select.value = fallbackCameraId;
        if (indicator) {
          indicator.textContent = "🟢 Camera Live (Auto)";
          indicator.className = "text-[10px] font-bold text-emerald-600";
        }
        updateScanStatusBanner(true, "Camera đã bật! Đưa mã vạch MSSV hoặc QR vào khung ngắm.");
        return;
      } else {
        throw new Error("Không tìm thấy thiết bị Camera nào.");
      }
    } catch (fallbackErr) {
      console.warn("Không thể mở Camera sau khi đã thử fallback:", fallbackErr);
      if (readerEl) readerEl.classList.add("hidden");
      if (idlePreviewEl) idlePreviewEl.classList.remove("hidden");
      if (stopBtn) stopBtn.classList.add("hidden");
      if (indicator) {
        indicator.textContent = "Dùng Chụp ảnh / Test nhanh";
        indicator.className = "text-[10px] font-bold text-orange-600";
      }
      updateScanStatusBanner(
        false,
        "Vui lòng cấp quyền Camera trên trình duyệt hoặc bấm [📸 Chụp ảnh mã vạch] bên dưới!"
      );
    }
  }
}

// Giữ hàm tương thích ngược nếu nơi nào gọi startCameraScanner
async function startCameraScanner(modeOrId) {
  if (modeOrId === "environment" || modeOrId === "user") {
    currentFacingMode = modeOrId;
    await startSmartCameraScanner({ facingMode: modeOrId });
  } else {
    await startSmartCameraScanner(modeOrId);
  }
}

/**
 * Nút phụ [🔄 Đổi Camera (Trước / Sau)]:
 * Chuyển đổi qua lại giữa các ống kính trong danh sách Html5Qrcode.getCameras() hoặc đảo facingMode.
 */
async function switchCameraLens() {
  unlockAudioAndSpeech();
  const devices = await discoverCameraDevices();

  if (devices && devices.length > 1) {
    if (currentCameraIndex < 0) {
      currentCameraIndex = 0;
    } else {
      currentCameraIndex = (currentCameraIndex + 1) % devices.length;
    }
    const targetCam = devices[currentCameraIndex];
    const select = document.getElementById("camera-device-select");
    if (select) select.value = targetCam.id;
    await startSmartCameraScanner(targetCam.id);
  } else {
    currentFacingMode = currentFacingMode === "environment" ? "user" : "environment";
    await startSmartCameraScanner({ facingMode: currentFacingMode });
  }
}

async function onSelectCameraDevice(deviceId) {
  if (!deviceId) return;
  unlockAudioAndSpeech();
  const idx = availableCameras.findIndex(d => d.id === deviceId);
  if (idx >= 0) currentCameraIndex = idx;
  await startSmartCameraScanner(deviceId);
}

async function stopCameraScanner() {
  const readerEl = document.getElementById("qr-reader");
  const idlePreviewEl = document.getElementById("scanner-idle-preview");
  const stopBtn = document.getElementById("btn-stop-camera");
  const indicator = document.getElementById("camera-active-indicator");

  try {
    if (html5QrCodeInstance && (html5QrCodeInstance.isScanning || isCameraRunning)) {
      await html5QrCodeInstance.stop();
    }
  } catch (e) {
    console.warn("Lỗi khi tắt camera:", e);
  }
  isCameraRunning = false;

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
  // Mở khóa âm thanh ngay khi người dùng chọn/chụp ảnh
  unlockAudioAndSpeech();
  isScanModalOpen = false;
  isScannerCooldown = false;
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
    // TRƯỜNG HỢP 3: Ảnh chụp bị mờ không quét được mã vạch -> Khóa quét + Bíp lỗi + Đọc "Không thể xác nhận." + Hiện Popup đỏ
    isScanModalOpen = true;
    playFeedbackBeep(false);
    speakVietnamese("Không thể xác nhận.");
    updateScanStatusBanner(
      false,
      "KHÔNG THỂ XÁC NHẬN! Ảnh chụp bị mờ hoặc không tìm thấy mã vạch."
    );
    renderUnknownScannedCard("Ảnh mờ / Lỗi mã");
    showScanResultModal({
      type: "fail",
      code: "Ảnh chụp mờ / Không nhận diện được mã",
      reason: "Mã vạch không tồn tại trong hệ thống UEH Mekong hoặc ảnh chụp bị chói mờ."
    });
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
// XỬ LÝ CHUỖI ĐỌC MÃ Ô ĐỖ & TÊN KHU VỰC CHO GIỌNG ĐỌC AI TIẾNG VIỆT
// ==========================================================================
function formatSlotCodeForSpeech(slotCode) {
  const raw = String(slotCode || "A01").trim().toUpperCase();
  const match = raw.match(/^([A-Z]+)(\d+)$/);
  if (!match) return raw.split("").join(" ");
  const letters = match[1].split("").join(" ");
  const digits = match[2];
  // Tách chữ số có số 0 đứng đầu (VD: A03 -> "A 0 3", A15 -> "A 15") để bộ đọc tiếng Việt phát âm rõ từng ký tự
  if (digits.startsWith("0")) {
    return `${letters} ${digits.split("").join(" ")}`;
  }
  return `${letters} ${digits}`;
}

function getZoneDisplayNameBySlotCode(slotCode) {
  const raw = String(slotCode || "A01").trim().toUpperCase();
  if (raw.startsWith("KB")) return "Bãi đỗ xe sau KTX B";
  if (raw.startsWith("SD")) return "Bãi đỗ xe sau Khu D";
  if (raw.startsWith("MM")) return "Bãi đỗ xe trước Mini Mart";
  if (raw.startsWith("TT")) return "Bãi đỗ xe Trung tâm";
  if (raw.startsWith("HT")) return "Bãi đỗ xe sau Hội trường A";
  if (raw.startsWith("D")) return "Bãi đỗ xe Khu D";
  return "Bãi đỗ xe Khu A";
}

function getFullZoneLabelWithRoofBySlotCode(slotCode) {
  const raw = String(slotCode || "A01").trim().toUpperCase();
  if (raw.startsWith("KB")) return "Bãi đỗ xe sau KTX B - Ngoài trời dọc bờ sông";
  if (raw.startsWith("SD")) return "Bãi đỗ xe sau Khu D - Ngoài trời (Giáp KTX A & B)";
  if (raw.startsWith("MM")) return "Bãi đỗ xe trước Mini Mart - Ngoài trời";
  if (raw.startsWith("TT")) return "Bãi đỗ xe Trung tâm - Nhà xe có mái che";
  if (raw.startsWith("HT")) return "Bãi đỗ xe sau Hội trường A - Nhà xe có mái che";
  if (raw.startsWith("D")) return "Bãi đỗ xe Khu D - Nhà xe có mái che";
  return "Bãi đỗ xe Khu A - Nhà xe có mái che";
}

// ==========================================================================
// CHỐNG CAMERA QUÉT LIÊN TỤC (AUTO-PAUSE / LOCK) & MODAL POPUP KẾT QUẢ QUÉT
// ==========================================================================
async function pauseOrStopScannerForModal() {
  wasCameraActiveBeforeModal = Boolean(isCameraRunning || (html5QrCodeInstance && html5QrCodeInstance.isScanning));
  if (!html5QrCodeInstance || !wasCameraActiveBeforeModal) return;

  const indicator = document.getElementById("camera-active-indicator");
  try {
    html5QrCodeInstance.pause(true);
    wasCameraPausedByModal = true;
    if (indicator) {
      indicator.textContent = "⏸️ Đã khóa Cam (Đang hiện Popup)";
      indicator.className = "text-[10px] font-bold text-amber-600";
    }
  } catch (pauseErr) {
    try {
      await html5QrCodeInstance.stop();
    } catch (stopErr) {}
    isCameraRunning = false;
    wasCameraPausedByModal = false;
    const readerEl = document.getElementById("qr-reader");
    const idlePreviewEl = document.getElementById("scanner-idle-preview");
    const stopBtn = document.getElementById("btn-stop-camera");
    if (readerEl) readerEl.classList.add("hidden");
    if (idlePreviewEl) idlePreviewEl.classList.remove("hidden");
    if (stopBtn) stopBtn.classList.add("hidden");
    if (indicator) {
      indicator.textContent = "⏹️ Camera đã tạm dừng";
      indicator.className = "text-[10px] font-semibold text-slate-500";
    }
  }
}

function showScanResultModal(opts) {
  const modal = document.getElementById("modal-scan-result-popup");
  if (!modal) return;
  isScanModalOpen = true;

  const card = document.getElementById("scan-popup-card");
  const iconWrap = document.getElementById("scan-popup-icon-wrap");
  const titleEl = document.getElementById("scan-popup-title");
  const subtitleEl = document.getElementById("scan-popup-subtitle");
  const locCard = document.getElementById("scan-popup-location-card");
  const locHeading = document.getElementById("scan-popup-location-heading");
  const slotCodeEl = document.getElementById("scan-popup-slot-code");
  const zoneNameEl = document.getElementById("scan-popup-zone-name");
  const errBox = document.getElementById("scan-popup-error-box");
  const errTextEl = document.getElementById("scan-popup-error-text");
  const errCodeEl = document.getElementById("scan-popup-error-code");
  const detailsBox = document.getElementById("scan-popup-details-box");
  const stuNameEl = document.getElementById("scan-popup-student-name");
  const stuMssvEl = document.getElementById("scan-popup-student-mssv");
  const stuPlateEl = document.getElementById("scan-popup-student-plate");
  const timeLabelEl = document.getElementById("scan-popup-time-label");
  const timeValEl = document.getElementById("scan-popup-time-val");
  const primaryBtn = document.getElementById("scan-popup-primary-btn");
  const secondaryBtn = document.getElementById("scan-popup-secondary-btn");

  const nowStr = getFormattedNowShort();

  if (opts.type === "checkin") {
    // TRƯỜNG HỢP 1: QUÉT CHECK-IN THÀNH CÔNG (HOẶC ĐẶT CHỖ / ĐIỀU PHỐI THÀNH CÔNG)
    card.className = "bg-white rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl border-[3px] border-emerald-500 space-y-4 animate-slide-up text-center relative overflow-hidden";
    iconWrap.className = "w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner mb-3 border-4 border-emerald-200";
    iconWrap.innerHTML = `<i data-lucide="check" class="w-11 h-11 stroke-[3]"></i>`;
    titleEl.className = "text-xl sm:text-2xl font-black tracking-tight text-emerald-700 uppercase";
    titleEl.textContent = opts.customTitle || "XÁC NHẬN THÀNH CÔNG";
    subtitleEl.textContent = opts.customSubtitle || "Chào mừng bạn vào bãi giữ xe thông minh UEH Mekong";

    locCard.className = "bg-gradient-to-br from-[#005f69] to-[#0d3b42] text-white rounded-2xl p-4 sm:p-5 shadow-lg border border-teal-400/30 space-y-1";
    locCard.classList.remove("hidden");
    locHeading.textContent = opts.customHeading || "📍 VỊ TRÍ BÃI ĐỖ XE CỦA BẠN";
    slotCodeEl.textContent = `Ô ${opts.slotId || "A01"}`;
    zoneNameEl.textContent = opts.zoneFullLabel || getFullZoneLabelWithRoofBySlotCode(opts.slotId);

    errBox.classList.add("hidden");
    detailsBox.classList.remove("hidden");
    stuNameEl.textContent = opts.hoTen || "Sinh viên UEH";
    stuMssvEl.textContent = opts.mssv || "—";
    stuPlateEl.textContent = opts.bienSo || "—";
    timeLabelEl.textContent = opts.customTimeLabel || "Thời gian vào bãi:";
    timeValEl.textContent = nowStr;

    primaryBtn.textContent = "✅ Đã hiểu & Đóng thông báo";
    primaryBtn.className = "w-full py-3.5 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm sm:text-base shadow-lg transition active:scale-95";
    primaryBtn.setAttribute("onclick", "closeScanResultModal(false)");

    if (opts.hideSecondaryBtn) {
      secondaryBtn.classList.add("hidden");
    } else {
      secondaryBtn.textContent = "📷 Quét tiếp lượt kế tiếp (sau 1.5s)";
      secondaryBtn.className = "w-full py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition";
      secondaryBtn.setAttribute("onclick", "closeScanResultModal(true)");
      secondaryBtn.classList.remove("hidden");
    }
  } else if (opts.type === "checkout") {
    // TRƯỜNG HỢP 2: QUÉT CHECK-OUT THÀNH CÔNG (Xe rời bãi)
    card.className = "bg-white rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl border-[3px] border-blue-500 space-y-4 animate-slide-up text-center relative overflow-hidden";
    iconWrap.className = "w-20 h-20 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shadow-inner mb-3 border-4 border-blue-200";
    iconWrap.innerHTML = `<i data-lucide="log-out" class="w-10 h-10 stroke-[2.5]"></i>`;
    titleEl.className = "text-xl sm:text-2xl font-black tracking-tight text-blue-700 uppercase";
    titleEl.textContent = "XÁC NHẬN RA CỔNG THÀNH CÔNG";
    subtitleEl.textContent = "Cảm ơn bạn! Hẹn gặp lại tại UEH Mekong";

    locCard.className = "bg-gradient-to-br from-blue-600 to-indigo-800 text-white rounded-2xl p-4 sm:p-5 shadow-lg border border-blue-400/30 space-y-1";
    locCard.classList.remove("hidden");
    locHeading.textContent = "✅ ĐÃ GIẢI PHÓNG VỊ TRÍ ĐỖ XE";
    slotCodeEl.textContent = `Ô ${opts.slotId || "A01"}`;
    zoneNameEl.textContent = opts.zoneFullLabel || getFullZoneLabelWithRoofBySlotCode(opts.slotId);

    errBox.classList.add("hidden");
    detailsBox.classList.remove("hidden");
    stuNameEl.textContent = opts.hoTen || "Sinh viên UEH";
    stuMssvEl.textContent = opts.mssv || "—";
    stuPlateEl.textContent = opts.bienSo || "—";
    timeLabelEl.textContent = "Thời gian ra cổng:";
    timeValEl.textContent = nowStr;

    primaryBtn.textContent = "✅ Đóng thông báo";
    primaryBtn.className = "w-full py-3.5 px-5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm sm:text-base shadow-lg transition active:scale-95";
    primaryBtn.setAttribute("onclick", "closeScanResultModal(false)");

    secondaryBtn.textContent = "📷 Quét tiếp lượt kế tiếp (sau 1.5s)";
    secondaryBtn.className = "w-full py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition";
    secondaryBtn.setAttribute("onclick", "closeScanResultModal(true)");
    secondaryBtn.classList.remove("hidden");
  } else {
    // TRƯỜNG HỢP 3: QUÉT THẤT BẠI / MÃ KHÔNG HỢP LỆ
    card.className = "bg-white rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl border-[3px] border-red-500 space-y-4 animate-slide-up text-center relative overflow-hidden";
    iconWrap.className = "w-20 h-20 rounded-full bg-red-100 text-red-600 flex items-center justify-center shadow-inner mb-3 border-4 border-red-200";
    iconWrap.innerHTML = `<i data-lucide="x" class="w-11 h-11 stroke-[3]"></i>`;
    titleEl.className = "text-xl sm:text-2xl font-black tracking-tight text-red-600 uppercase";
    titleEl.textContent = "KHÔNG THỂ XÁC NHẬN";
    subtitleEl.textContent = "Barie cổng vẫn đóng — Vui lòng kiểm tra lại thẻ/mã vạch";

    locCard.classList.add("hidden");
    detailsBox.classList.add("hidden");
    errBox.classList.remove("hidden");
    errTextEl.textContent = opts.reason || "Mã vạch không tồn tại trong hệ thống UEH Mekong.";
    errCodeEl.textContent = `Mã đã quét: ${opts.code || "Không xác định"}`;

    primaryBtn.textContent = "🔄 Quét lại";
    primaryBtn.className = "w-full py-3.5 px-5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm sm:text-base shadow-lg transition active:scale-95";
    primaryBtn.setAttribute("onclick", "closeScanResultModal(true)");

    secondaryBtn.textContent = "Đóng & Tắt Camera";
    secondaryBtn.className = "w-full py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition";
    secondaryBtn.setAttribute("onclick", "closeScanResultModal(false)");
    secondaryBtn.classList.remove("hidden");
  }

  modal.classList.remove("hidden");
  if (window.lucide) lucide.createIcons();
}

async function closeScanResultModal(shouldResumeCamera = false) {
  const modal = document.getElementById("modal-scan-result-popup");
  if (modal) modal.classList.add("hidden");

  // Giữ khóa an toàn trong 1.5 giây sau khi đóng Popup để tránh thẻ trước cam bị quét lặp
  isScannerCooldown = true;
  const indicator = document.getElementById("camera-active-indicator");

  if (!shouldResumeCamera) {
    // Kết thúc lượt quét hiện tại: Tắt luồng Camera để không bao giờ tự quét lại khi thẻ còn trước cam
    await stopCameraScanner();
    wasCameraPausedByModal = false;
    wasCameraActiveBeforeModal = false;

    setTimeout(() => {
      isScanModalOpen = false;
      isScannerCooldown = false;
      lastScannedCode = "";
    }, 1500);
  } else {
    // Người dùng chọn [🔄 Quét lại] hoặc [📷 Quét tiếp lượt kế tiếp]: Nghỉ an toàn 1.5s rồi mới mở khóa & resume()
    if (indicator && wasCameraActiveBeforeModal) {
      indicator.textContent = "⏳ Sẵn sàng quét lại sau 1.5s...";
      indicator.className = "text-[10px] font-bold text-amber-600 animate-pulse";
    }

    setTimeout(async () => {
      isScanModalOpen = false;
      isScannerCooldown = false;
      lastScannedCode = "";

      if (wasCameraPausedByModal && html5QrCodeInstance) {
        try {
          html5QrCodeInstance.resume();
          wasCameraPausedByModal = false;
          isCameraRunning = true;
          if (indicator) {
            indicator.textContent = "🟢 Camera Đang Quét";
            indicator.className = "text-[10px] font-bold text-emerald-600";
          }
          updateScanStatusBanner(true, "Camera đã sẵn sàng! Đưa mã vạch tiếp theo vào khung ngắm.");
          return;
        } catch (resumeErr) {
          wasCameraPausedByModal = false;
          await startSmartCameraScanner();
          return;
        }
      } else if (wasCameraActiveBeforeModal) {
        await startSmartCameraScanner();
      }
    }, 1500);
  }
}

// ==========================================================================
// XỬ LÝ KẾT QUẢ QUÉT MÃ (2 CHIỀU CHECK-IN / CHECK-OUT + AUTO-PAUSE + POPUP + MQTT)
// ==========================================================================
function onBarcodeScannedSuccess(rawCode, fromLiveCamera = false) {
  // Chặn tuyệt đối mọi callback quét mới khi Popup đang mở hoặc đang trong 1.5s nghỉ an toàn
  if (isScanModalOpen || isScannerCooldown) {
    return;
  }

  const cleanCode = String(rawCode || "").trim();
  const nowMs = Date.now();
  // Chống quét trùng liên tiếp trong vòng 2.5 giây khi giữ thẻ trước webcam
  if (fromLiveCamera && cleanCode && cleanCode === lastScannedCode && nowMs - lastScanTimestamp < 2500) {
    return;
  }

  // NGAY LẬP TỨC KHÓA CỜ & TẠM DỪNG/TẮT CAMERA ĐỂ KHÔNG BAO GIỜ QUÉT LẶP LIÊN TỤC
  isScanModalOpen = true;
  pauseOrStopScannerForModal();

  if (!cleanCode) {
    playFeedbackBeep(false);
    speakVietnamese("Không thể xác nhận.");
    showScanResultModal({
      type: "fail",
      code: "Trống",
      reason: "Mã vạch không tồn tại trong hệ thống UEH Mekong."
    });
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
    let actionLabel = "";
    let isCheckIn = true;
    let targetSlotId = student.oDo || "A01";
    let cleanZoneName = "Bãi đỗ xe Khu A";
    let fullZoneLabel = "Bãi đỗ xe Khu A - Nhà xe có mái che";
    let speechText = "";

    if (isStudentParked(student.trangThaiGui)) {
      // KHI QUÉT CHECK-OUT THÀNH CÔNG (Xe rời bãi)
      isCheckIn = false;
      actionLabel = "Check-out (Ra bãi)";
      targetSlotId = student.oDo || "A01";
      cleanZoneName = getZoneDisplayNameBySlotCode(targetSlotId);
      fullZoneLabel = getFullZoneLabelWithRoofBySlotCode(targetSlotId);
      const spokenSlot = formatSlotCodeForSpeech(targetSlotId);
      speechText = `Xác nhận ra cổng thành công. Đã giải phóng ô ${spokenSlot}.`;

      student.trangThaiGui = "Chưa gửi";
      student.oDo = "";
      freeStudentSlot(student.mssv, targetSlotId);

      kpiStats.totalOut += 1;

      addActivityLog({
        vehicle: student.loaiXe || "Xe máy",
        plate: student.bienSo,
        studentName: student.hoTen,
        mssv: student.mssv,
        slot: targetSlotId,
        status: "Ra",
        badgeType: "out",
        detail: `Check-out 2 chiều thành công - Giải phóng ô ${targetSlotId}`
      });
    } else {
      // KHI QUÉT CHECK-IN THÀNH CÔNG (Xe vào bãi và được gán/đối chiếu ô đỗ)
      isCheckIn = true;
      actionLabel = "Check-in (Vào bãi)";
      const wasReserved = student.trangThaiGui === "Đặt trước";
      student.trangThaiGui = "Đang sử dụng";

      // Đảm bảo sinh viên có ô đỗ trong Khu A (nếu ô cũ đã bị người khác đỗ thì cấp ô trống mới)
      assignOrActivateStudentSlot(student);
      targetSlotId = student.oDo || "A01";
      cleanZoneName = getZoneDisplayNameBySlotCode(targetSlotId);
      fullZoneLabel = getFullZoneLabelWithRoofBySlotCode(targetSlotId);
      const spokenSlot = formatSlotCodeForSpeech(targetSlotId);
      speechText = `Xác nhận thành công. Vị trí đỗ xe của bạn là ô ${spokenSlot}, ${cleanZoneName}.`;

      kpiStats.totalIn += 1;

      addActivityLog({
        vehicle: student.loaiXe || "Xe máy",
        plate: student.bienSo,
        studentName: student.hoTen,
        mssv: student.mssv,
        slot: targetSlotId,
        status: "Vào",
        badgeType: "in",
        detail: `Check-in thành công - Vị trí: Ô ${targetSlotId} (${cleanZoneName})`
      });
    }

    // Tạo scanEvent để đồng bộ phát loa trên máy tính Admin qua MQTT
    const eventId = "scan_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7);
    const scanEvent = {
      eventId,
      timestamp: Date.now(),
      action: isCheckIn ? "checkin" : "checkout",
      mssv: student.mssv,
      hoTen: student.hoTen,
      ngaySinh: student.ngaySinh,
      bienSo: student.bienSo,
      dongXe: student.dongXe,
      loaiXe: student.loaiXe || "Xe máy",
      slotId: targetSlotId,
      zoneName: cleanZoneName,
      speechText: speechText
    };

    markEventAsSpoken(eventId);
    playFeedbackBeep(true);
    speakVietnamese(speechText);

    saveDatabase();
    updateScanStatusBanner(true, `✔ Quét thành công! (${student.hoTen})`);
    renderScannedStudentCard(student, actionLabel, isCheckIn, cleanZoneName);

    // Chuyển sơ đồ về đúng khu vực và chọn ô của sinh viên vừa quét để thấy hiệu ứng đổi màu trực tiếp
    for (const zId of Object.keys(parkingZones)) {
      if (parkingZones[zId].some(s => s.code === targetSlotId)) {
        if (currentZoneId !== zId) {
          currentZoneId = zId;
          populateZoneDropdown();
        }
        break;
      }
    }
    render20SlotGrid();
    if (targetSlotId) selectSlot(targetSlotId);
    renderKPICards();
    renderRecentActivityTable();
    renderStudentDatabaseTable();
    renderCampusMapViews();
    renderMobileStudentApp();
    if (APP_ROLE === "student") {
      renderStudentParkingTab();
      renderStudentNotificationsTab();
    }

    // Hiển thị Popup thông báo kết quả + Vị trí bãi đỗ xe ngay trên màn hình
    showScanResultModal({
      type: isCheckIn ? "checkin" : "checkout",
      hoTen: student.hoTen,
      mssv: student.mssv,
      bienSo: student.bienSo,
      slotId: targetSlotId,
      zoneFullLabel: fullZoneLabel
    });

    // Đẩy trạng thái + scanEvent đồng bộ thời gian thực lên Cloud (Phone <-> Laptop Admin)
    publishCloudSyncState(
      {
        type: "scan",
        student: { ...student },
        directionLabel: actionLabel,
        isCheckIn: isCheckIn,
        slotCode: targetSlotId,
        zoneName: cleanZoneName,
        bannerText: `✔ Quét thành công! (${student.hoTen})`
      },
      scanEvent
    );
  } else {
    // KHI QUÉT THẤT BẠI / KHÔNG KHỚP MÃ -> Phát 2 tiếng Bíp trầm 200Hz + Đọc "Không thể xác nhận." + Hiện Popup đỏ
    const eventId = "scan_fail_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7);
    const speechText = "Không thể xác nhận.";
    const scanEvent = {
      eventId,
      timestamp: Date.now(),
      action: "fail",
      mssv: cleanCode,
      hoTen: "KHÔNG THỂ XÁC NHẬN",
      bienSo: "Chưa đăng ký",
      dongXe: "Không xác định",
      slotId: "Từ chối",
      zoneName: "Cổng kiểm soát",
      speechText: speechText
    };

    markEventAsSpoken(eventId);
    playFeedbackBeep(false);
    speakVietnamese(speechText);

    updateScanStatusBanner(false, `KHÔNG THỂ XÁC NHẬN! Mã lạ: ${cleanCode}`);
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

    // Hiện Popup đỏ "KHÔNG THỂ XÁC NHẬN" với nút [🔄 Quét lại]
    showScanResultModal({
      type: "fail",
      code: cleanCode,
      reason: "Mã vạch không tồn tại trong hệ thống UEH Mekong."
    });

    publishCloudSyncState(
      {
        type: "scan_fail",
        code: cleanCode,
        bannerText: `KHÔNG THỂ XÁC NHẬN! Mã lạ: ${cleanCode}`
      },
      scanEvent
    );
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
    targetSlot.note = `Đang sử dụng (${student.dongXe})`;
  }
}

function triggerQuickStudentScan() {
  unlockAudioAndSpeech();
  const select = document.getElementById("quick-student-select");
  if (!select || !select.value) return;
  isScanModalOpen = false;
  isScannerCooldown = false;
  lastScannedCode = "";
  onBarcodeScannedSuccess(select.value, false);
}

function triggerManualCodeScan() {
  unlockAudioAndSpeech();
  const input = document.getElementById("manual-scan-input");
  isScanModalOpen = false;
  isScannerCooldown = false;
  if (!input || !input.value.trim()) {
    onBarcodeScannedSuccess("", false);
    return;
  }
  lastScannedCode = "";
  onBarcodeScannedSuccess(input.value.trim(), false);
}

function simulateStrangerScan() {
  unlockAudioAndSpeech();
  isScanModalOpen = false;
  isScannerCooldown = false;
  const randomStrangerCode = "99998888" + Math.floor(100 + Math.random() * 899);
  const input = document.getElementById("manual-scan-input");
  if (input) input.value = randomStrangerCode;
  lastScannedCode = "";
  onBarcodeScannedSuccess(randomStrangerCode, false);
}

function updateScanStatusBanner(isSuccess, message) {
  const banner = document.getElementById("scan-status-banner");
  if (!banner) return;

  if (isSuccess) {
    banner.className = "flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-extrabold text-xs sm:text-sm";
    banner.innerHTML = `<i data-lucide="check-circle-2" class="w-5 h-5 text-emerald-600 shrink-0"></i><span id="scan-status-text">${message}</span>`;
  } else {
    banner.className = "flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-red-50 border border-red-200 text-red-700 font-extrabold text-xs sm:text-sm animate-pulse";
    banner.innerHTML = `<i data-lucide="x-circle" class="w-5 h-5 text-red-600 shrink-0"></i><span id="scan-status-text">${message}</span>`;
  }
  if (window.lucide) lucide.createIcons();
}

function renderScannedStudentCard(student, directionLabel, isCheckIn, customZoneName = null) {
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

  const slotCode = student.oDo || "A01";
  const zoneName = customZoneName || getZoneDisplayNameBySlotCode(slotCode);

  if (avatarEl) {
    avatarEl.textContent = initials;
    avatarEl.className = "w-8 h-8 rounded-full bg-[#005f69] text-white font-extrabold text-xs flex items-center justify-center mb-1 shadow";
  }
  if (nameEl) nameEl.textContent = student.hoTen;
  if (mssvEl) mssvEl.textContent = student.mssv;
  if (dobEl) dobEl.textContent = student.ngaySinh;
  if (plateEl) plateEl.textContent = student.bienSo;
  if (modelEl) modelEl.textContent = `${student.dongXe} (${student.loaiXe || "Xe máy"})`;
  if (slotEl) slotEl.textContent = `Ô ${slotCode} - ${zoneName}`;

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
  if (nameEl) nameEl.textContent = "KHÔNG THỂ XÁC NHẬN";
  if (mssvEl) mssvEl.textContent = strangerCode;
  if (dobEl) dobEl.textContent = "Không có dữ liệu";
  if (plateEl) plateEl.textContent = "Chưa đăng ký";
  if (modelEl) modelEl.textContent = "Không xác định";
  if (slotEl) slotEl.textContent = "Từ chối - Không cấp ô đỗ";

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
// GIỌNG ĐỌC AI TIẾNG VIỆT (WEB SPEECH API + AUDIO UNLOCK + AUDIO TTS DỰ PHÒNG)
// ==========================================================================
function initVoiceSynthesisVoices() {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };
  }
}

function getSharedAudioContext() {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return null;
  if (!sharedAudioCtx) {
    sharedAudioCtx = new AudioCtx();
  }
  if (sharedAudioCtx.state === "suspended") {
    sharedAudioCtx.resume().catch(() => {});
  }
  return sharedAudioCtx;
}

function updateAdminSpeakerBadgeUI(unlocked) {
  const btn = document.getElementById("admin-speaker-status-btn");
  const txt = document.getElementById("admin-speaker-status-text");
  if (!btn || !txt) return;
  if (unlocked) {
    btn.className = "flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-700 px-2.5 py-1.5 rounded-xl text-[11px] font-extrabold shadow-sm transition-all active:scale-95";
    txt.textContent = "🔊 Loa Admin: Sẵn sàng";
  } else {
    btn.className = "flex items-center gap-1.5 bg-orange-50 hover:bg-orange-100 border border-orange-300 text-[#f26f21] px-2.5 py-1.5 rounded-xl text-[11px] font-extrabold shadow-sm animate-pulse transition-all active:scale-95";
    txt.textContent = "🔇 Bấm bật Loa Admin";
  }
}

/**
 * Cơ chế "Mở khóa âm thanh" (Audio/Speech Unlock) tự động cho Laptop Admin & Điện thoại:
 * Gọi ngay ở cú click chuột đầu tiên bất kỳ trên trang Admin hoặc khi bấm [🔊 Loa Admin].
 */
function unlockAudioAndSpeech() {
  try {
    const ctx = getSharedAudioContext();
    if (ctx && !isAudioSpeechUnlocked) {
      // Phát 1 xung âm thanh rỗng (gain = 0) để mở khóa Web Audio API trên Chrome/Edge/Safari
      const buffer = ctx.createBuffer(1, 1, 22050);
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      if (source.start) source.start(0);
    }

    if ("speechSynthesis" in window && !isAudioSpeechUnlocked) {
      // Mồi một SpeechSynthesisUtterance('') rỗng để mở quyền phát loa tự động khi nhận gói tin MQTT từ Điện thoại
      const primeUtter = new SpeechSynthesisUtterance("");
      primeUtter.lang = "vi-VN";
      primeUtter.volume = 0;
      window.speechSynthesis.speak(primeUtter);
    }

    if (!fallbackTtsAudio) {
      fallbackTtsAudio = new Audio();
      fallbackTtsAudio.preload = "auto";
    }

    isAudioSpeechUnlocked = true;
    updateAdminSpeakerBadgeUI(true);
  } catch (e) {
    console.warn("unlockAudioAndSpeech warning:", e);
  }
}

function manualUnlockAdminSpeaker() {
  unlockAudioAndSpeech();
  const stu = currentDisplayedStudent || students[0] || DEFAULT_STUDENTS[0];
  const slotId = (stu && stu.oDo) ? stu.oDo : "A02";
  const spokenSlot = formatSlotCodeForSpeech(slotId);
  const zoneName = getZoneDisplayNameBySlotCode(slotId);
  playFeedbackBeep(true);
  speakVietnamese(`Xác nhận thành công. Vị trí đỗ xe của bạn là ô ${spokenSlot}, ${zoneName}.`);
}

function findBestVietnameseVoice() {
  if (!("speechSynthesis" in window)) return null;
  const voices = window.speechSynthesis.getVoices() || [];
  // Ưu tiên 1: lang === 'vi-VN' hoặc 'vi_VN'
  let viVoice = voices.find(v => v.lang && v.lang.toLowerCase().replace("_", "-") === "vi-vn");
  // Ưu tiên 2: lang chứa 'vi'
  if (!viVoice) {
    viVoice = voices.find(v => v.lang && v.lang.toLowerCase().includes("vi"));
  }
  // Ưu tiên 3: tên giọng đọc chứa Vietnamese / Tiếng Việt / HoaiMy / NamMinh / Linh
  if (!viVoice) {
    viVoice = voices.find(v => v.name && /vietnam|tiếng việt|hoaimy|namminh|linh|an/i.test(v.name));
  }
  return viVoice || null;
}

function playFallbackVietnameseAudioTTS(text) {
  try {
    const encoded = encodeURIComponent(text);
    const ttsUrl = `https://translate.googleapis.com/translate_tts?ie=UTF-8&q=${encoded}&tl=vi&client=tw-ob`;
    if (!fallbackTtsAudio) {
      fallbackTtsAudio = new Audio();
    }
    fallbackTtsAudio.src = ttsUrl;
    fallbackTtsAudio.rate = 1.05;
    const playPromise = fallbackTtsAudio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Nếu trình duyệt chặn CORS audio stream hoặc đang offline, dùng Web Speech API mặc định
        if ("speechSynthesis" in window) {
          const fallbackUtter = new SpeechSynthesisUtterance(text);
          fallbackUtter.lang = "vi-VN";
          fallbackUtter.rate = 1.0;
          window.speechSynthesis.speak(fallbackUtter);
        }
      });
    }
  } catch (err) {
    console.warn("Fallback TTS error:", err);
  }
}

function speakVietnamese(text) {
  if (!voiceAIEnabled) return;
  try {
    getSharedAudioContext();

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = "vi-VN";
      utter.rate = 1.02;
      utter.pitch = 1.0;
      utter.volume = 1.0;

      const viVoice = findBestVietnameseVoice();
      if (viVoice) {
        utter.voice = viVoice;
        utter.onerror = () => {
          playFallbackVietnameseAudioTTS(text);
        };
        window.speechSynthesis.speak(utter);
        return;
      } else {
        // Nếu thiết bị không có sẵn gói giọng vi-VN offline, thử phát cả Web Speech lẫn luồng Audio TTS tiếng Việt dự phòng
        utter.onerror = () => {};
        window.speechSynthesis.speak(utter);
        playFallbackVietnameseAudioTTS(text);
        return;
      }
    }

    // Trường hợp trình duyệt không hỗ trợ speechSynthesis
    playFallbackVietnameseAudioTTS(text);
  } catch (e) {
    console.warn("speakVietnamese error:", e);
    playFallbackVietnameseAudioTTS(text);
  }
}

/**
 * Phát tiếng Bíp bằng Web Audio API:
 * - TRƯỜNG HỢP 1 (isSuccess = true): Phát 1 tiếng "Bíp" thanh (tần số 900Hz, dài 0.15s)
 * - TRƯỜNG HỢP 2 (isSuccess = false): Phát 2 tiếng "Bíp" trầm báo lỗi (tần số 200Hz)
 */
function playFeedbackBeep(isSuccess) {
  try {
    const ctx = getSharedAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    if (isSuccess) {
      // 1 tiếng "Bíp" thanh: tần số 900Hz, dài 0.15s
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(900, now);

      gain.gain.setValueAtTime(0.28, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    } else {
      // 2 tiếng "Bíp" trầm báo lỗi: tần số 200Hz
      const playLowBeep = (startTime, duration) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(200, startTime);

        gain.gain.setValueAtTime(0.32, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + duration);
      };

      playLowBeep(now, 0.15);
      playLowBeep(now + 0.21, 0.18);
    }
  } catch (e) {
    console.warn("playFeedbackBeep error:", e);
  }
}

// Hai nút bấm kiểm tra âm thanh trực quan ngay tại khung "Thiết bị quét tại cổng"
function testAudioSuccessButton() {
  unlockAudioAndSpeech();
  const stu = currentDisplayedStudent || students[0] || DEFAULT_STUDENTS[0];
  const slotId = (stu && stu.oDo) ? stu.oDo : "A03";
  const spokenSlot = formatSlotCodeForSpeech(slotId);
  const zoneName = getZoneDisplayNameBySlotCode(slotId);
  const speechText = `Xác nhận thành công. Vị trí đỗ xe của bạn là ô ${spokenSlot}, ${zoneName}.`;
  playFeedbackBeep(true);
  speakVietnamese(speechText);
  updateScanStatusBanner(true, `✔ Quét thành công! (Ô ${slotId} - ${zoneName})`);
}

function testAudioFailButton() {
  unlockAudioAndSpeech();
  playFeedbackBeep(false);
  speakVietnamese("Không thể xác nhận.");
  updateScanStatusBanner(false, "🔊 KHÔNG THỂ XÁC NHẬN!");
}

function testVoiceAI() {
  testAudioSuccessButton();
}

function toggleVoiceSetting(enabled) {
  voiceAIEnabled = Boolean(enabled);
  if (voiceAIEnabled) {
    testAudioSuccessButton();
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

      kpiStats.totalIn += 1;
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

      publishCloudSyncState({
        type: "plate_match",
        slotCode: slot.code
      });
    } else {
      // SAI BIỂN SỐ -> Phát cảnh báo đỏ "Cảnh báo đỗ sai vị trí đặt trước!"
      playFeedbackBeep(false);
      speakVietnamese(`Cảnh báo đỗ sai vị trí đặt trước tại ô ${slot.code}!`);

      const errTitle = `🚨 CẢNH BÁO ĐỖ SAI VỊ TRÍ ĐẶT TRƯỚC TẠI Ô ${slot.code}!`;
      const errDesc = `Camera AI phát hiện xe biển số [${incomingPlate}] đi vào ô ${slot.code} đã được đặt trước bởi ${slot.studentName || "Sinh viên"} (Biển số đăng ký: [${registeredPlate}]).`;
      showEmergencyStrip(errTitle, errDesc);

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

      publishCloudSyncState({
        type: "plate_mismatch",
        slotCode: slot.code,
        title: errTitle,
        desc: errDesc
      });
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

    kpiStats.totalIn += 1;
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

    publishCloudSyncState({
      type: "plate_match",
      slotCode: slot.code
    });
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
    if (stu.oDo && stu.oDo !== slot.code) {
      freeStudentSlot(stu.mssv, stu.oDo);
    }
    stu.oDo = slot.code;
    stu.trangThaiGui = "Đặt trước";
    saveDatabase();
  }

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

  publishCloudSyncState({
    type: "reserve",
    slotCode: slot.code
  });
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
          if (s.studentMssv) {
            const stu = students.find(st => st.mssv === s.studentMssv);
            if (stu && stu.oDo === s.code) {
              stu.trangThaiGui = "Chưa gửi";
              stu.oDo = "";
            }
          }
          s.status = "unavailable";
          s.studentMssv = null;
          s.studentName = null;
          s.licensePlate = null;
          s.note = "Không khả dụng / Nguy cơ ngập nước bờ sông";
        }
      });
    });
    saveDatabase();

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
    // Khôi phục thời tiết bình thường: Trả các ô bị đóng do ngập nước về Trống ("free") mà không ghi đè dữ liệu khác
    Object.values(parkingZones).forEach(zSlots => {
      zSlots.forEach(s => {
        if (s.status === "unavailable" && s.note && s.note.toLowerCase().includes("ngập")) {
          s.status = "free";
          s.note = "Sẵn sàng sử dụng";
        }
      });
    });
    dismissPushBanner();
    dismissStudentFloodModal();
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
  renderStatsBreakdown();
  renderMobileStudentApp();
  renderStudentParkingTab();
  renderStudentNotificationsTab();

  publishCloudSyncState({
    type: isFloodSimActive ? "flood_on" : "flood_off"
  });
}

function updateWeatherWidgetUI() {
  const tempEl = document.getElementById("weather-temp-text");
  const rainEl = document.getElementById("weather-rain-text");
  const widget = document.getElementById("header-weather-widget");
  const btnFlood = document.getElementById("btn-trigger-flood");
  const headerFloodBtn = document.getElementById("header-flood-trigger-btn");

  if (isFloodSimActive) {
    if (tempEl) tempEl.textContent = "24°C • Mưa to";
    if (rainEl) rainEl.textContent = "Ngập: 98%";
    if (widget) widget.className = "cursor-pointer bg-red-50 border border-red-300 rounded-xl px-2.5 py-1 flex items-center gap-2 animate-pulse";
    if (btnFlood) {
      btnFlood.innerHTML = `<i data-lucide="sun" class="w-4 h-4 shrink-0"></i><span>☀️ Tắt giả lập mưa ngập (Khôi phục thời tiết)</span>`;
      btnFlood.className = "w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md transition";
    }
    if (headerFloodBtn) {
      headerFloodBtn.innerHTML = `<span>☀️ Tắt Cảnh báo Ngập</span>`;
      headerFloodBtn.className = "bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1.5 rounded-xl text-[11px] font-extrabold shadow-sm flex items-center gap-1 transition active:scale-95";
    }
  } else {
    if (tempEl) tempEl.textContent = "28°C";
    if (rainEl) rainEl.textContent = "Mưa: 80%";
    if (widget) widget.className = "cursor-pointer bg-[#eef6ff] hover:bg-blue-100/80 border border-blue-200/70 rounded-xl px-2.5 py-1 flex items-center gap-2 transition";
    if (btnFlood) {
      btnFlood.innerHTML = `<i data-lucide="cloud-rain-wind" class="w-4 h-4 shrink-0"></i><span>🌧️ Giả lập Mưa lớn & Ngập nước bãi ngoài trời</span>`;
      btnFlood.className = "w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#f26f21] to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md transition active:scale-95";
    }
    if (headerFloodBtn) {
      headerFloodBtn.innerHTML = `<span>🌧️ Cảnh báo Mưa/Ngập</span>`;
      headerFloodBtn.className = "bg-gradient-to-r from-[#f26f21] to-red-600 hover:opacity-95 text-white px-2.5 py-1.5 rounded-xl text-[11px] font-extrabold shadow-sm flex items-center gap-1 transition active:scale-95";
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
  unlockAudioAndSpeech();
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
  dismissStudentFloodModal();

  const spokenSlot = formatSlotCodeForSpeech(emptySlot.code);
  playFeedbackBeep(true);
  speakVietnamese(`Đã tự động điều phối và giữ chỗ mới tại ô ${spokenSlot}, Bãi đỗ xe Khu A có mái che cho sinh viên ${stu.hoTen}.`);

  // Chuyển sơ đồ về Khu A và highlight ô mới
  studentSelectedZoneId = "khu-a";
  studentSelectedFreeSlotCode = null;
  selectParkingZone("khu-a");
  selectSlot(emptySlot.code);
  renderKPICards();
  renderRecentActivityTable();
  renderStudentDatabaseTable();
  renderMobileStudentApp();
  if (APP_ROLE === "student") {
    renderStudentParkingTab();
    renderStudentNotificationsTab();
    showScanResultModal({
      type: "checkin",
      customTitle: "ĐÃ CHUYỂN SANG KHU A AN TOÀN",
      customSubtitle: "Hệ thống đã giữ chỗ mới có mái che tránh mưa ngập cho bạn",
      customHeading: "☔ VỊ TRÍ CÓ MÁI CHE MỚI CỦA BẠN",
      customTimeLabel: "Thời gian giữ chỗ:",
      hideSecondaryBtn: true,
      hoTen: stu.hoTen,
      mssv: stu.mssv,
      bienSo: stu.bienSo,
      slotId: emptySlot.code,
      zoneFullLabel: "Bãi đỗ xe Khu A - Nhà xe có mái che"
    });
  }

  publishCloudSyncState({
    type: "flood_relocate",
    slotCode: emptySlot.code,
    studentMssv: stu.mssv
  });
}

// ==========================================================================
// 13. GIAO DIỆN ĐỘC LẬP [📱 APP SINH VIÊN (/)] & 4 TAB BOTTOM NAV MOBILE-FIRST
// ==========================================================================
function switchAppMode(mode) {
  currentAppViewMode = mode === "student" ? "student" : "admin";
  const adminView = document.getElementById("admin-main-view");
  const studentView = document.getElementById("student-app-view");
  const btnAdmin = document.getElementById("btn-mode-admin");
  const btnStudent = document.getElementById("btn-mode-student");
  // Ở phiên bản tách 2 đường link độc lập (/ và /admin), các nút chuyển đổi không cùng tồn tại
  if (!adminView || !studentView) return;

  if (mode === "student") {
    adminView.classList.add("hidden");
    studentView.classList.remove("hidden");
    if (btnStudent) btnStudent.className = "px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all bg-[#f26f21] text-white shadow-sm";
    if (btnAdmin) btnAdmin.className = "px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all text-slate-600 hover:text-slate-900";
    renderMobileStudentApp();
  } else {
    studentView.classList.add("hidden");
    adminView.classList.remove("hidden");
    if (btnAdmin) btnAdmin.className = "px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all bg-[#005f69] text-white shadow-sm";
    if (btnStudent) btnStudent.className = "px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all text-slate-600 hover:text-slate-900";
    render20SlotGrid();
  }
}

function populateStudentDropdowns() {
  const quickSelect = document.getElementById("quick-student-select");
  if (quickSelect) {
    quickSelect.innerHTML = students.map(s =>
      `<option value="${s.mssv}">${s.hoTen} (${s.mssv}${s.oDo ? " - " + s.oDo : " - Chưa gửi"})</option>`
    ).join("");
  }

  const slotDirectSelect = document.getElementById("slot-direct-student-select");
  if (slotDirectSelect) {
    const currVal = slotDirectSelect.value;
    slotDirectSelect.innerHTML = `<option value="">-- Chọn nhanh 1 trong 10 SV nhóm --</option>` +
      students.map(s =>
        `<option value="${s.mssv}">${s.hoTen} • ${s.bienSo} (${s.dongXe})</option>`
      ).join("");
    if (currVal && students.some(s => s.mssv === currVal)) {
      slotDirectSelect.value = currVal;
    }
  }

  const mobileSelect = document.getElementById("mobile-student-switcher");
  if (mobileSelect) {
    mobileSelect.innerHTML = students.map(s =>
      `<option value="${s.mssv}" ${s.mssv === currentMobileStudentMssv ? "selected" : ""}>${s.hoTen}</option>`
    ).join("");
  }

  updateStudentCountBadges();
}

function onSwitchMobileStudent(mssv) {
  currentMobileStudentMssv = mssv;
  renderMobileStudentApp();
  renderStudentParkingTab();
  renderStudentNotificationsTab();
}

function switchStudentTab(tabName) {
  const validTabs = ["scan", "parking", "card", "alerts"];
  if (!validTabs.includes(tabName)) return;

  // Tắt camera nếu người dùng rời khỏi tab Quét Mã để tiết kiệm pin và tránh quét nhầm
  if (currentStudentTab === "scan" && tabName !== "scan" && isCameraRunning) {
    stopCameraScanner();
  }

  currentStudentTab = tabName;

  validTabs.forEach(t => {
    const sec = document.getElementById(`student-tab-${t}`);
    const navBtn = document.getElementById(`student-nav-${t}`);
    if (sec) {
      if (t === tabName) sec.classList.remove("hidden");
      else sec.classList.add("hidden");
    }
    if (navBtn) {
      if (t === tabName) {
        navBtn.className = "relative flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl bg-teal-50 text-[#005f69] font-extrabold text-[11px] transition";
      } else {
        navBtn.className = "relative flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl text-slate-500 hover:bg-slate-50 font-bold text-[11px] transition";
      }
    }
  });

  if (tabName === "parking") {
    renderStudentParkingTab();
  } else if (tabName === "card" || tabName === "scan") {
    renderMobileStudentApp();
  } else if (tabName === "alerts") {
    renderStudentNotificationsTab();
  }

  if (window.lucide) lucide.createIcons();
}

function renderMobileStudentApp() {
  const stu = students.find(s => s.mssv === currentMobileStudentMssv) || students[0];
  if (!stu) return;

  const setTxt = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  const initials = getInitials(stu.hoTen);

  // Cập nhật thanh tóm tắt nhanh ở Tab 1 (Quét Mã)
  setTxt("student-home-avatar", initials);
  setTxt("student-home-name", stu.hoTen);
  setTxt("student-home-plate", stu.bienSo);
  setTxt("student-home-model", stu.dongXe);
  setTxt("student-home-slot-badge", stu.oDo ? `Ô ${stu.oDo}` : "Chưa có ô");

  const homeStatusEl = document.getElementById("student-home-status-badge");

  // Cập nhật Thẻ UEH điện tử ở Tab 3 (Thẻ UEH)
  setTxt("mobile-student-name", stu.hoTen);
  setTxt("mobile-avatar-box", initials);
  setTxt("mobile-card-name", stu.hoTen);
  setTxt("mobile-card-mssv", stu.mssv);
  setTxt("mobile-card-dob", stu.ngaySinh);
  setTxt("mobile-card-plate", stu.bienSo);
  setTxt("mobile-card-model", stu.dongXe);
  setTxt("mobile-current-slot-badge", stu.oDo ? `Ô ${stu.oDo}` : "Chưa có");

  const pillEl = document.getElementById("mobile-parking-status-pill");
  const statusTxtEl = document.getElementById("mobile-current-status-text");

  if (isStudentParked(stu.trangThaiGui)) {
    if (pillEl) {
      pillEl.textContent = "Đang sử dụng";
      pillEl.className = "px-3 py-1 rounded-full text-xs font-extrabold bg-blue-100 text-blue-700 shadow-sm";
    }
    if (homeStatusEl) {
      homeStatusEl.textContent = "Đang đỗ";
      homeStatusEl.className = "inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700";
    }
    if (statusTxtEl) {
      statusTxtEl.textContent = "Đang đỗ trong bãi";
      statusTxtEl.className = "text-[11px] font-bold text-blue-700 truncate";
    }
  } else if (stu.trangThaiGui === "Đặt trước") {
    if (pillEl) {
      pillEl.textContent = "Đặt trước";
      pillEl.className = "px-3 py-1 rounded-full text-xs font-extrabold bg-orange-100 text-[#f26f21] shadow-sm";
    }
    if (homeStatusEl) {
      homeStatusEl.textContent = "Đặt trước";
      homeStatusEl.className = "inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-100 text-[#f26f21]";
    }
    if (statusTxtEl) {
      statusTxtEl.textContent = "Đã giữ chỗ trước";
      statusTxtEl.className = "text-[11px] font-bold text-[#f26f21] truncate";
    }
  } else {
    const outLabel = stu.trangThaiGui || "Chưa gửi";
    if (pillEl) {
      pillEl.textContent = outLabel;
      pillEl.className = "px-3 py-1 rounded-full text-xs font-extrabold bg-slate-100 text-slate-600 shadow-sm";
    }
    if (homeStatusEl) {
      homeStatusEl.textContent = outLabel;
      homeStatusEl.className = "inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600";
    }
    if (statusTxtEl) {
      statusTxtEl.textContent = "Chưa gửi xe trong bãi";
      statusTxtEl.className = "text-[11px] font-bold text-slate-500 truncate";
    }
  }

  // Render mã vạch CODE_128 sắc nét trên Tab 3
  renderSafeJsBarcode("#mobile-student-barcode", stu.mssv, {
    format: "CODE128",
    lineColor: "#000000",
    width: 2.1,
    height: 62,
    displayValue: true,
    fontSize: 14,
    fontOptions: "bold",
    margin: 6
  });

  // Cập nhật trạng thái chấm đỏ thông báo mưa ngập trên thanh Bottom Nav
  const notifDot = document.getElementById("mobile-notif-tab-badge");
  const mobileFloodCard = document.getElementById("mobile-flood-alert-card");
  if (notifDot) {
    if (isFloodSimActive) notifDot.classList.remove("hidden");
    else notifDot.classList.add("hidden");
  }
  if (mobileFloodCard) {
    if (isFloodSimActive) mobileFloodCard.classList.remove("hidden");
    else mobileFloodCard.classList.add("hidden");
  }

  if (window.lucide) lucide.createIcons();
}

function renderStudentParkingTab() {
  const zoneSelect = document.getElementById("student-zone-select");
  const gridEl = document.getElementById("student-parking-grid");
  if (!zoneSelect || !gridEl) return;

  // Populate 7 UEH Mekong zones
  zoneSelect.innerHTML = PARKING_ZONES_META.map(z =>
    `<option value="${z.id}" ${z.id === studentSelectedZoneId ? "selected" : ""}>🅿️ ${z.name}</option>`
  ).join("");

  const zoneMeta = PARKING_ZONES_META.find(z => z.id === studentSelectedZoneId) || PARKING_ZONES_META[0];
  const slots = parkingZones[zoneMeta.id] || [];
  const freeCount = slots.filter(s => s.status === "free").length;

  const roofBadge = document.getElementById("student-zone-roof-badge");
  const availEl = document.getElementById("student-zone-avail-count");

  if (roofBadge) {
    if (isFloodSimActive && zoneMeta.floodRisk) {
      roofBadge.textContent = "⚠️ Nguy cơ ngập";
      roofBadge.className = "px-2.5 py-1 rounded-xl text-[11px] font-extrabold bg-red-600 text-white animate-pulse";
    } else if (zoneMeta.roofType === "indoor") {
      roofBadge.textContent = "🏠 Có mái che";
      roofBadge.className = "px-2.5 py-1 rounded-xl text-[11px] font-extrabold bg-[#005f69] text-white";
    } else {
      roofBadge.textContent = "☀️ Ngoài trời";
      roofBadge.className = "px-2.5 py-1 rounded-xl text-[11px] font-extrabold bg-[#f26f21] text-white";
    }
  }

  if (availEl) {
    availEl.textContent = `Còn ${freeCount}/${slots.length} ô trống`;
    availEl.className = freeCount > 0 ? "text-xs font-extrabold text-emerald-700" : "text-xs font-extrabold text-red-600";
  }

  // Render compact mobile 20-slot grid
  gridEl.innerHTML = slots.map(slot => {
    const isPicked = studentSelectedFreeSlotCode === slot.code && slot.status === "free";
    const isMine = slot.studentMssv && slot.studentMssv === currentMobileStudentMssv;

    let cardStyle = "bg-emerald-50 border-emerald-400 text-emerald-800 hover:bg-emerald-100 cursor-pointer";
    let label = "Trống";
    let iconName = "bike";

    if (slot.status === "occupied") {
      cardStyle = isMine
        ? "bg-blue-600 border-blue-800 text-white ring-2 ring-blue-300"
        : "bg-blue-100 border-blue-300 text-blue-800 opacity-85";
      label = isMine ? "Xe bạn" : "Đã đỗ";
    } else if (slot.status === "reserved") {
      cardStyle = isMine
        ? "bg-[#f26f21] border-orange-700 text-white ring-2 ring-orange-300"
        : "bg-orange-100 border-orange-300 text-[#f26f21] opacity-90";
      label = isMine ? "Bạn đặt" : "Đặt trước";
    } else if (slot.status === "unavailable") {
      cardStyle = "bg-red-100 border-red-400 text-red-700 opacity-90";
      label = (isFloodSimActive && slot.note && slot.note.includes("ngập")) ? "Ngập" : "Khóa";
      iconName = "ban";
    }

    if (isPicked) {
      cardStyle = "bg-emerald-600 border-[#f26f21] text-white ring-4 ring-orange-300 scale-[1.03] shadow-md cursor-pointer";
      label = "Đang chọn";
    }

    return `
      <button type="button" onclick="onStudentTapSlot('${slot.code}')"
              class="rounded-xl border-2 p-2 flex flex-col items-center justify-center gap-0.5 transition active:scale-95 ${cardStyle}">
        <span class="text-xs font-black leading-none">${slot.code}</span>
        <i data-lucide="${iconName}" class="w-4 h-4 my-0.5"></i>
        <span class="text-[9px] font-extrabold leading-none truncate max-w-full">${label}</span>
      </button>
    `;
  }).join("");

  // Show or hide the big [Đặt chỗ trước ngay] booking bar
  const bookingBar = document.getElementById("student-booking-bar");
  const selectedTitle = document.getElementById("student-selected-slot-title");
  const pickedSlot = slots.find(s => s.code === studentSelectedFreeSlotCode && s.status === "free");

  if (bookingBar) {
    if (pickedSlot) {
      bookingBar.classList.remove("hidden");
      if (selectedTitle) {
        selectedTitle.textContent = `Ô ${pickedSlot.code} • ${zoneMeta.name.replace(/^\d+\.\s*/, "")}`;
      }
    } else {
      bookingBar.classList.add("hidden");
      studentSelectedFreeSlotCode = null;
    }
  }

  if (window.lucide) lucide.createIcons();
}

function onStudentSelectZone(zoneId) {
  if (!parkingZones[zoneId]) return;
  studentSelectedZoneId = zoneId;
  studentSelectedFreeSlotCode = null;
  renderStudentParkingTab();
}

function onStudentTapSlot(slotCode) {
  unlockAudioAndSpeech();
  const slots = parkingZones[studentSelectedZoneId] || [];
  const slot = slots.find(s => s.code === slotCode);
  if (!slot) return;

  if (slot.status === "free") {
    studentSelectedFreeSlotCode = (studentSelectedFreeSlotCode === slotCode) ? null : slotCode;
    renderStudentParkingTab();
  } else {
    studentSelectedFreeSlotCode = null;
    renderStudentParkingTab();
  }
}

function studentBookSelectedSlotOnMap() {
  unlockAudioAndSpeech();
  if (!studentSelectedFreeSlotCode) return;

  const stu = students.find(s => s.mssv === currentMobileStudentMssv) || students[0];
  if (!stu) return;

  const slots = parkingZones[studentSelectedZoneId] || [];
  const slot = slots.find(s => s.code === studentSelectedFreeSlotCode);
  if (!slot || slot.status !== "free") {
    alert("Ô đỗ này vừa có người khác chọn. Vui lòng chọn ô màu xanh lá khác!");
    studentSelectedFreeSlotCode = null;
    renderStudentParkingTab();
    return;
  }

  // Giải phóng ô cũ nếu sinh viên đang giữ chỗ/đỗ ở ô khác
  freeStudentSlot(stu.mssv, stu.oDo);

  // Đặt chỗ ô mới
  slot.status = "reserved";
  slot.studentMssv = stu.mssv;
  slot.studentName = stu.hoTen;
  slot.licensePlate = stu.bienSo;
  slot.vehicleType = stu.loaiXe || "Xe máy";
  slot.note = `Đặt trước từ App Sinh viên (${stu.dongXe})`;

  stu.oDo = slot.code;
  stu.trangThaiGui = "Đặt trước";
  saveDatabase();

  const cleanZoneName = getZoneDisplayNameBySlotCode(slot.code);
  const fullZoneLabel = getFullZoneLabelWithRoofBySlotCode(slot.code);

  addActivityLog({
    vehicle: stu.loaiXe || "Xe máy",
    plate: stu.bienSo,
    studentName: stu.hoTen,
    mssv: stu.mssv,
    slot: slot.code,
    status: "Đặt trước",
    badgeType: "reserved",
    detail: `Sinh viên đặt chỗ trước ô ${slot.code} (${cleanZoneName}) từ App`
  });

  const bookedCode = slot.code;
  studentSelectedFreeSlotCode = null;

  const spokenSlot = formatSlotCodeForSpeech(bookedCode);
  playFeedbackBeep(true);
  speakVietnamese(`Đã đặt chỗ trước thành công tại ô ${spokenSlot}, ${cleanZoneName}.`);

  renderMobileStudentApp();
  renderStudentParkingTab();
  renderStudentNotificationsTab();

  showScanResultModal({
    type: "checkin",
    customTitle: "ĐẶT CHỖ TRƯỚC THÀNH CÔNG",
    customSubtitle: "Ô đỗ của bạn đã được đồng bộ màu Cam lên bản đồ Admin",
    customHeading: "🟠 VỊ TRÍ BẠN VỪA ĐẶT TRƯỚC",
    customTimeLabel: "Thời gian đặt chỗ:",
    hideSecondaryBtn: true,
    hoTen: stu.hoTen,
    mssv: stu.mssv,
    bienSo: stu.bienSo,
    slotId: bookedCode,
    zoneFullLabel: fullZoneLabel
  });

  publishCloudSyncState({
    type: "reserve",
    slotCode: bookedCode,
    studentMssv: stu.mssv
  });
}

function renderStudentNotificationsTab() {
  const listEl = document.getElementById("student-notifications-list");
  const mobileFloodCard = document.getElementById("mobile-flood-alert-card");
  const notifDot = document.getElementById("mobile-notif-tab-badge");

  if (mobileFloodCard) {
    if (isFloodSimActive) mobileFloodCard.classList.remove("hidden");
    else mobileFloodCard.classList.add("hidden");
  }
  if (notifDot) {
    if (isFloodSimActive) notifDot.classList.remove("hidden");
    else notifDot.classList.add("hidden");
  }

  if (!listEl) return;

  const alertsHTML = systemAlerts.map(a => {
    const isDanger = a.type === "flood" || a.type === "security" || a.title.includes("KHẨN");
    return `
      <div class="p-3 rounded-2xl border ${isDanger ? "bg-red-50 border-red-200" : "bg-slate-50 border-slate-200"} flex items-start gap-2.5">
        <div class="p-2 rounded-xl ${isDanger ? "bg-red-100 text-red-600" : "bg-teal-100 text-[#005f69]"} shrink-0">
          <i data-lucide="${a.icon || "bell"}" class="w-4 h-4"></i>
        </div>
        <div class="min-w-0 flex-1">
          <div class="flex items-center justify-between gap-2">
            <div class="font-extrabold text-xs text-slate-900 leading-snug">${a.title}</div>
            <span class="text-[10px] font-bold text-slate-400 shrink-0">${a.time}</span>
          </div>
          <p class="text-[11px] text-slate-600 mt-1 leading-relaxed">${a.desc}</p>
        </div>
      </div>
    `;
  }).join("");

  const myLogs = activityLogs.filter(l => l.mssv === currentMobileStudentMssv).slice(0, 5);
  const myLogsHTML = myLogs.map(log => `
    <div class="p-3 rounded-2xl border border-slate-200 bg-white flex items-start gap-2.5">
      <div class="p-2 rounded-xl bg-orange-50 text-[#f26f21] shrink-0">
        <i data-lucide="history" class="w-4 h-4"></i>
      </div>
      <div class="min-w-0 flex-1">
        <div class="flex items-center justify-between gap-2">
          <div class="font-extrabold text-xs text-slate-800">Ô ${log.slot} • ${log.status}</div>
          <span class="text-[10px] font-bold text-slate-400">${log.time}</span>
        </div>
        <p class="text-[11px] text-slate-500 mt-0.5">${log.detail || ""}</p>
      </div>
    </div>
  `).join("");

  listEl.innerHTML = alertsHTML + (myLogsHTML ? `<div class="pt-2 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Hoạt động gần đây của bạn</div>${myLogsHTML}` : "");
  if (window.lucide) lucide.createIcons();
}

function showStudentFloodPopupModal() {
  const modal = document.getElementById("student-flood-popup-modal");
  if (modal) modal.classList.remove("hidden");
  renderStudentNotificationsTab();
  if (window.lucide) lucide.createIcons();
}

function dismissStudentFloodModal() {
  const modal = document.getElementById("student-flood-popup-modal");
  if (modal) modal.classList.add("hidden");
}

function downloadActiveMobileStudentBarcodePNG() {
  const stu = students.find(s => s.mssv === currentMobileStudentMssv) || students[0];
  if (stu) {
    downloadStudentBarcodeAsPNG(stu);
  }
}

function triggerScanFromMobileApp() {
  unlockAudioAndSpeech();
  isScanModalOpen = false;
  isScannerCooldown = false;
  lastScannedCode = "";
  onBarcodeScannedSuccess(currentMobileStudentMssv, false);
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

  publishCloudSyncState({
    type: "reserve",
    slotCode: targetCode,
    studentMssv: stu.mssv
  });
}

// ==========================================================================
// 14. SƠ ĐỒ KHUÔN VIÊN UEH MEKONG TƯƠNG TÁC (7 KHU VỰC BÃI ĐỖ XE - CHUẨN HÌNH 1)
// ==========================================================================
function toggleInlineCampusMap(forceState) {
  isInlineCampusMapOpen = typeof forceState === "boolean" ? forceState : !isInlineCampusMapOpen;
  const gridContainer = document.getElementById("parking-20-grid-container");
  const mapContainer = document.getElementById("inline-campus-map-container");
  const labelEl = document.getElementById("btn-toggle-campus-label");
  if (!gridContainer || !mapContainer) return;

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
  if (!digitalEl || !imgEl) return;

  if (mode === "image") {
    digitalEl.classList.add("hidden");
    imgEl.classList.remove("hidden");
    if (btnImg) btnImg.className = "px-3 py-2 rounded-xl text-xs font-bold bg-[#005f69] text-white shadow-sm";
    if (btnDig) btnDig.className = "px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200";
  } else {
    imgEl.classList.add("hidden");
    digitalEl.classList.remove("hidden");
    if (btnDig) btnDig.className = "px-3 py-2 rounded-xl text-xs font-bold bg-[#005f69] text-white shadow-sm";
    if (btnImg) btnImg.className = "px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200";
  }
}

function openOriginalMapModal() {
  switchSidebarTab("campus-map");
  switchCampusMapDisplay("image");
}

// ==========================================================================
// 15. RENDER KPI CARDS (100% TÍNH TỪ SƠ ĐỒ THỰC TẾ - SINGLE SOURCE OF TRUTH)
// ==========================================================================
function computeRealKPIStats(scope = kpiScopeMode) {
  const slots = scope === "current"
    ? (parkingZones[currentZoneId] || [])
    : Object.values(parkingZones).flat();

  const tongSoO = slots.length;
  const oTrong = slots.filter(s => s.status === "free" || s.status === "available").length;
  const dangSuDung = slots.filter(s => s.status === "occupied").length;
  const daDatTruoc = slots.filter(s => s.status === "reserved").length;
  const khongKhaDung = slots.filter(s => s.status === "unavailable").length;

  // Nếu count === 0 bắt buộc hiển thị 0% (tuyệt đối không làm tròn lên 1%)
  const calcPct = (count) => (tongSoO > 0 && count > 0) ? Math.round((count / tongSoO) * 100) : 0;

  return {
    tongSoO,
    oTrong,
    dangSuDung,
    daDatTruoc,
    khongKhaDung,
    pctTrong: calcPct(oTrong),
    pctDangSuDung: calcPct(dangSuDung),
    pctDaDatTruoc: calcPct(daDatTruoc),
    pctKhongKhaDung: calcPct(khongKhaDung),
    utilizationPct: calcPct(dangSuDung)
  };
}

function syncDerivedKPIStatsObject() {
  const allStats = computeRealKPIStats("all");
  kpiStats.free = allStats.oTrong;
  kpiStats.occupied = allStats.dangSuDung;
  kpiStats.reserved = allStats.daDatTruoc;
  kpiStats.unavailable = allStats.khongKhaDung;
  return allStats;
}

function setKPIScopeMode(mode) {
  kpiScopeMode = mode === "current" ? "current" : "all";
  renderKPICards();
}

function renderKPICards() {
  const allStats = syncDerivedKPIStatsObject();
  const currStats = computeRealKPIStats("current");
  const activeStats = kpiScopeMode === "current" ? currStats : allStats;
  const totalZonesCount = Object.keys(parkingZones).length || PARKING_ZONES_META.length;
  const currZoneMeta = PARKING_ZONES_META.find(z => z.id === currentZoneId);
  const currZoneShort = currZoneMeta
    ? currZoneMeta.name.replace(/^\d+\.\s*/, "").replace(/\s*\(.*?\)\s*/g, "").trim()
    : "Bãi đang xem";

  const setEl = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };

  // 4 thẻ KPI tổng quan tính trực tiếp từ danh sách ô đỗ thực tế
  setEl("kpi-free-count", activeStats.oTrong);
  setEl("kpi-free-pct", `(${activeStats.pctTrong}%)`);
  setEl("kpi-occupied-count", activeStats.dangSuDung);
  setEl("kpi-occupied-pct", `(${activeStats.pctDangSuDung}%)`);
  setEl("kpi-reserved-count", activeStats.daDatTruoc);
  setEl("kpi-reserved-pct", `(${activeStats.pctDaDatTruoc}%)`);
  setEl("kpi-unavailable-count", activeStats.khongKhaDung);
  setEl("kpi-unavailable-pct", `(${activeStats.pctKhongKhaDung}%)`);

  // Đồng bộ khung "Thống kê nhanh"
  setEl("stat-total-in", (Number(kpiStats.totalIn) || 0).toLocaleString("vi-VN"));
  setEl("stat-total-out", (Number(kpiStats.totalOut) || 0).toLocaleString("vi-VN"));
  setEl("stat-utilization-rate", `${activeStats.utilizationPct}%`);

  // Cập nhật thanh hiển thị Phạm vi thống kê & 2 nút chuyển đổi nhanh phía trên 4 thẻ KPI
  const scopeSummaryEl = document.getElementById("kpi-scope-summary-text");
  const btnAll = document.getElementById("btn-kpi-scope-all");
  const btnCurrent = document.getElementById("btn-kpi-scope-current");

  if (btnAll) {
    btnAll.textContent = `Toàn trường (${totalZonesCount} bãi - ${allStats.tongSoO} ô)`;
    btnAll.className = kpiScopeMode === "all"
      ? "px-2.5 py-1 rounded-lg text-[11px] font-extrabold transition bg-[#005f69] text-white shadow-sm"
      : "px-2.5 py-1 rounded-lg text-[11px] font-bold transition text-slate-600 hover:text-slate-900";
  }
  if (btnCurrent) {
    btnCurrent.textContent = `Chỉ bãi đang xem (${currStats.tongSoO} ô)`;
    btnCurrent.className = kpiScopeMode === "current"
      ? "px-2.5 py-1 rounded-lg text-[11px] font-extrabold transition bg-[#f26f21] text-white shadow-sm"
      : "px-2.5 py-1 rounded-lg text-[11px] font-bold transition text-slate-600 hover:text-slate-900";
  }
  if (scopeSummaryEl) {
    scopeSummaryEl.textContent = kpiScopeMode === "current"
      ? `${currZoneShort} (${currStats.tongSoO} ô)`
      : `Toàn trường (${totalZonesCount} bãi - ${allStats.tongSoO} ô)`;
  }
}

function addActivityLog(entry) {
  activityLogs.unshift({
    time: getCurrentHHMM(),
    ...entry
  });
  if (activityLogs.length > 50) activityLogs.pop();
}

function normalizeSearchText(str) {
  return String(str || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();
}

function getVehicleModelForLog(log) {
  if (log.model) return log.model;
  if (log.mssv && log.mssv !== "—" && log.mssv !== "ADMIN" && log.mssv !== "AUTO-AI") {
    const matched = students.find(s => s.mssv === log.mssv);
    if (matched) return `${matched.dongXe} (${matched.loaiXe || "Xe máy"})`;
  }
  return log.vehicle || "Xe máy";
}

function getSlotAndZoneDisplayForLog(slotText) {
  const raw = String(slotText || "—").trim();
  if (/^(KB|SD|MM|TT|HT|D|A)\d{2}$/i.test(raw)) {
    return `${raw.toUpperCase()} • ${getZoneDisplayNameBySlotCode(raw)}`;
  }
  return raw;
}

function setHistoryStatusFilter(filterKey) {
  currentHistoryStatusFilter = ["all", "in", "out", "reserved", "alert"].includes(filterKey) ? filterKey : "all";
  const filterStyles = {
    all: { active: "bg-[#005f69] text-white shadow-sm", idle: "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200" },
    in: { active: "bg-emerald-600 text-white shadow-sm", idle: "bg-white hover:bg-emerald-50 text-slate-700 border border-slate-200" },
    out: { active: "bg-blue-600 text-white shadow-sm", idle: "bg-white hover:bg-blue-50 text-slate-700 border border-slate-200" },
    reserved: { active: "bg-[#f26f21] text-white shadow-sm", idle: "bg-white hover:bg-orange-50 text-slate-700 border border-slate-200" },
    alert: { active: "bg-red-600 text-white shadow-sm", idle: "bg-white hover:bg-red-50 text-slate-700 border border-slate-200" }
  };

  Object.keys(filterStyles).forEach(key => {
    const btn = document.getElementById(`history-filter-${key}`);
    if (!btn) return;
    const isActive = key === currentHistoryStatusFilter;
    btn.className = `px-3 py-1.5 rounded-lg text-xs ${isActive ? "font-extrabold " + filterStyles[key].active : "font-bold " + filterStyles[key].idle} transition`;
  });

  renderRecentActivityTable();
}

function getFilteredActivityLogs() {
  const searchEl = document.getElementById("history-search-input");
  const q = searchEl ? normalizeSearchText(searchEl.value) : "";

  return activityLogs.filter(log => {
    if (currentHistoryStatusFilter !== "all" && log.badgeType !== currentHistoryStatusFilter) {
      return false;
    }
    if (!q) return true;
    const haystack = normalizeSearchText([
      log.time,
      log.studentName,
      log.mssv,
      log.plate,
      log.vehicle,
      getVehicleModelForLog(log),
      log.slot,
      getSlotAndZoneDisplayForLog(log.slot),
      log.status,
      log.detail
    ].join(" "));
    return haystack.includes(q);
  });
}

function exportActivityHistoryCSV() {
  const rowsData = getFilteredActivityLogs();
  const headers = ["Thời gian", "Họ tên", "MSSV", "Biển số xe", "Dòng xe", "Ô đỗ / Khu vực", "Trạng thái", "Chi tiết"];
  const rows = rowsData.map(log => [
    log.time || "",
    log.studentName || "—",
    log.mssv || "—",
    log.plate || "—",
    getVehicleModelForLog(log),
    getSlotAndZoneDisplayForLog(log.slot),
    log.status || "",
    log.detail || ""
  ].map(val => `"${String(val).replace(/"/g, '""')}"`).join(","));

  const csvContent = "\uFEFF" + [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "lich_su_ra_vao_ueh_mekong.csv";
  a.click();
  URL.revokeObjectURL(url);
}

function clearActivityHistory() {
  if (activityLogs.length === 0) return;
  if (!confirm("Bạn có chắc muốn xóa toàn bộ nhật ký Lịch sử ra vào?")) return;
  activityLogs = [];
  kpiStats.totalIn = 0;
  kpiStats.totalOut = 0;
  renderRecentActivityTable();
  renderKPICards();
  renderStudentNotificationsTab();
  publishCloudSyncState({ type: "clear_history" });
}

function renderRecentActivityTable() {
  const tbody = document.getElementById("recent-activity-tbody");
  const fullTbody = document.getElementById("full-history-tbody");
  const countSummaryEl = document.getElementById("history-count-summary");

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
    if (activityLogs.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" class="py-6 text-center text-xs font-semibold text-slate-400">Chưa có hoạt động ra vào nào được ghi nhận.</td></tr>`;
    } else {
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
  }

  const filteredLogs = getFilteredActivityLogs();
  if (countSummaryEl) {
    countSummaryEl.textContent = `Đang hiển thị ${filteredLogs.length} / ${activityLogs.length} bản ghi`;
  }

  if (fullTbody) {
    if (filteredLogs.length === 0) {
      fullTbody.innerHTML = `<tr><td colspan="7" class="py-8 text-center text-xs font-semibold text-slate-400">Không tìm thấy lịch sử ra vào phù hợp.</td></tr>`;
    } else {
      fullTbody.innerHTML = filteredLogs.map(log => `
        <tr class="hover:bg-slate-50 transition">
          <td class="py-2.5 px-3 font-bold text-slate-700 tabular-nums whitespace-nowrap">${log.time}</td>
          <td class="py-2.5 px-3">
            <div class="font-bold text-slate-900">${log.studentName || "—"}</div>
            ${log.detail ? `<div class="text-[11px] text-slate-500">${log.detail}</div>` : ""}
          </td>
          <td class="py-2.5 px-3 font-mono text-slate-700 whitespace-nowrap">${log.mssv || "—"}</td>
          <td class="py-2.5 px-3 font-mono font-bold text-[#005f69] whitespace-nowrap">${log.plate || "—"}</td>
          <td class="py-2.5 px-3 font-semibold text-slate-700 whitespace-nowrap">${getVehicleModelForLog(log)}</td>
          <td class="py-2.5 px-3 font-extrabold text-[#f26f21]">${getSlotAndZoneDisplayForLog(log.slot)}</td>
          <td class="py-2.5 px-3 text-right whitespace-nowrap">${getBadgeHTML(log)}</td>
        </tr>
      `).join("");
    }
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
// 16. QUẢN LÝ CƠ SỞ DỮ LIỆU SINH VIÊN + THÊM/SỬA/XÓA + TÌM KIẾM + CSV + MÃ VẠCH
// ==========================================================================
function updateStudentCountBadges(filteredCount = null) {
  const total = students.length;
  const sidebarBadge = document.getElementById("sidebar-student-count-badge");
  const headerLabel = document.getElementById("header-student-count-label");
  const summaryEl = document.getElementById("student-db-count-summary");

  if (sidebarBadge) sidebarBadge.textContent = String(total);
  if (headerLabel) headerLabel.textContent = `${total} SV`;
  if (summaryEl) {
    if (filteredCount !== null && filteredCount !== total) {
      summaryEl.textContent = `Hiển thị ${filteredCount} / ${total} sinh viên`;
    } else {
      summaryEl.textContent = `Tổng: ${total} sinh viên`;
    }
  }
}

function renderStudentDatabaseTable() {
  const tbody = document.getElementById("student-db-tbody");
  const searchInput = document.getElementById("student-search-input");
  const q = searchInput ? normalizeSearchText(searchInput.value) : "";

  const matchedItems = students
    .map((stu, idx) => ({ stu, idx }))
    .filter(({ stu }) => {
      if (!q) return true;
      const haystack = normalizeSearchText([
        stu.mssv,
        stu.hoTen,
        stu.ngaySinh,
        stu.bienSo,
        stu.dongXe,
        stu.loaiXe,
        stu.oDo,
        stu.trangThaiGui
      ].join(" "));
      return haystack.includes(q);
    });

  updateStudentCountBadges(matchedItems.length);
  if (!tbody) return;

  if (matchedItems.length === 0) {
    tbody.innerHTML = `<tr><td colspan="10" class="py-8 text-center text-xs font-semibold text-slate-400">Không tìm thấy sinh viên nào khớp với từ khóa tìm kiếm.</td></tr>`;
    return;
  }

  tbody.innerHTML = matchedItems.map(({ stu, idx }, rowNum) => {
    const statusBadge = isStudentParked(stu.trangThaiGui)
      ? `<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-700">Đang sử dụng</span>`
      : stu.trangThaiGui === "Đặt trước"
      ? `<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-orange-100 text-[#f26f21]">Đặt trước</span>`
      : `<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600">${stu.trangThaiGui || "Chưa gửi"}</span>`;

    return `
      <tr class="hover:bg-slate-50 transition">
        <td class="py-2.5 px-3 font-bold text-slate-500">${rowNum + 1}</td>
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
        <td class="py-2.5 px-3 text-right space-x-1 whitespace-nowrap">
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
  switchSidebarTab("students");
}

function scanStudentByIndex(idx) {
  const stu = students[idx];
  if (!stu) return;
  unlockAudioAndSpeech();
  isScanModalOpen = false;
  isScannerCooldown = false;
  switchSidebarTab("overview");
  lastScannedCode = "";
  onBarcodeScannedSuccess(stu.mssv, false);
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
  renderKPICards();
  renderCampusMapViews();
  renderStatsBreakdown();
  renderMobileStudentApp();
  closeStudentFormModal();
  publishCloudSyncState({ type: "student_crud" });
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
  renderKPICards();
  renderCampusMapViews();
  renderStatsBreakdown();
  renderMobileStudentApp();
  publishCloudSyncState({ type: "student_crud" });
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
          trangThaiGui: cols[7] || "Đang sử dụng"
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
      renderKPICards();
      renderCampusMapViews();
      renderStatsBreakdown();
      renderMobileStudentApp();
      publishCloudSyncState({ type: "student_crud" });
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
  unlockAudioAndSpeech();
  isScanModalOpen = false;
  isScannerCooldown = false;
  closeBarcodeModal();
  switchSidebarTab("overview");
  lastScannedCode = "";
  onBarcodeScannedSuccess(currentModalStudent.mssv, false);
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
    if (typeof selector === "string" && !document.querySelector(selector)) return;
    JsBarcode(selector, String(value || "31251570287"), options);
  } catch (e) {
    console.warn("JsBarcode error:", e);
  }
}

// ==========================================================================
// 18. ĐIỀU HƯỚNG SIDEBAR BÊN PHẢI & ĐỒNG HỒ THỜI GIAN THỰC
// ==========================================================================
let activeAdminTab = "overview";

function switchSidebarTab(tabName) {
  switchAppMode("admin");
  const aliasMap = {
    campus: "campus-map",
    parking: "parking-lots",
    "student-db": "students"
  };
  const normalizedTab = aliasMap[tabName] || tabName || "overview";
  activeAdminTab = normalizedTab;

  const knownTabs = ["overview", "campus-map", "parking-lots", "history", "students", "alerts", "stats", "settings"];
  let domTabIds = [];
  if (typeof document !== "undefined" && typeof document.querySelectorAll === "function") {
    domTabIds = Array.from(document.querySelectorAll('section[id^="tab-"]')).map(el => el.id.replace(/^tab-/, ""));
  }
  const allTabs = Array.from(new Set([...knownTabs, ...domTabIds]));

  allTabs.forEach(t => {
    const sec = document.getElementById(`tab-${t}`);
    const btn = document.getElementById(`nav-btn-${t}`);
    const isActive = t === normalizedTab;

    if (sec) {
      if (isActive) {
        sec.classList.remove("hidden");
        if (sec.style) sec.style.display = "";
      } else {
        sec.classList.add("hidden");
      }
    }
    if (btn) {
      if (isActive) {
        btn.className = "sidebar-nav-btn w-full px-2.5 py-2 rounded-xl font-bold text-xs flex items-center justify-between gap-1.5 transition bg-[#005f69] text-white shadow-sm shrink-0";
        if (btn.setAttribute) btn.setAttribute("aria-current", "page");
      } else {
        btn.className = "sidebar-nav-btn w-full px-2.5 py-2 rounded-xl font-semibold text-xs flex items-center justify-between gap-1.5 transition text-teal-100/80 hover:bg-white/10 hover:text-white shrink-0";
        if (btn.removeAttribute) btn.removeAttribute("aria-current");
      }
    }
  });

  if (normalizedTab === "history") {
    renderRecentActivityTable();
  } else if (normalizedTab === "students") {
    renderStudentDatabaseTable();
  } else if (normalizedTab === "stats") {
    renderStatsBreakdown();
  } else if (normalizedTab === "campus-map" || normalizedTab === "parking-lots") {
    renderCampusMapViews();
  } else if (normalizedTab === "alerts") {
    renderDashboardAlerts();
  } else if (normalizedTab === "overview") {
    render20SlotGrid();
    renderKPICards();
  }

  if (window.lucide) lucide.createIcons();
}

function switchTab(tabName) {
  switchSidebarTab(tabName);
}

function renderStatsBreakdown() {
  const container = document.getElementById("stats-breakdown-container");
  if (!container) return;
  container.innerHTML = PARKING_ZONES_META.map(z => {
    const slots = parkingZones[z.id] || [];
    const total = slots.length || 20;
    const occupied = slots.filter(s => s.status === "occupied").length;
    const pct = (total > 0 && occupied > 0) ? Math.round((occupied / total) * 100) : 0;
    return `
      <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
        <div class="flex justify-between items-center text-xs font-bold">
          <span class="text-slate-800">${z.name}</span>
          <span class="text-[#005f69]">${occupied}/${total} ô (${pct}%)</span>
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
