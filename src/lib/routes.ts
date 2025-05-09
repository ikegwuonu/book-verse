export const adminRoutes = {
  materials: "/admin/materials",
  addMaterial: "/admin/materials/add",
  textbooks: "/admin/textbooks",
  addTextbook: "/admin/textbooks/add",
  addAdmin: "/admin/add-admin",
  settings: "/admin/settings",
  analytics: "/admin/analytics",
  admin: "/admin/admin",
  home: "/admin",
};
export const routes = {
  explore: "/explore",
  login: "/admin/login",
  home: "/",
  material: (url: string) => `/material?url${url}`,
  textbook: (url: string) => `/textbook?url${url}`,
  allTextbook: "/explore#textbook",
  materialByDept: (dpt: string) => `/explore#${dpt}`,
};
