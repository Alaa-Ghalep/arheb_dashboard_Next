export const ROLE_OPTIONS = [
  { key: "manage_managers", label: "إدارة المدراء" },
  { key: "manage_services", label: "إدارة الخدمات" },
  { key: "manage_guides", label: "إدارة المرشدين" },
  { key: "manage_tourists", label: "إدارة السياح" },
  { key: "manage_cars", label: "إدارة السيارات" },
  { key: "manage_bookings", label: "إدارة الحجوزات" },
  { key: "view_reports", label: "عرض التقارير" },
  { key: "system_settings", label: "إعدادات النظام" },
] as const;

export type RoleKey = (typeof ROLE_OPTIONS)[number]["key"];

export type ManagerRole = Partial<Record<RoleKey, boolean>>;

export const ROLE_LABELS: Record<RoleKey, string> = Object.fromEntries(
  ROLE_OPTIONS.map(({ key, label }) => [key, label])
) as Record<RoleKey, string>;