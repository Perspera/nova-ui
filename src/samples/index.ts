import type { ComponentType } from "react";
import type { VariantKey } from "./registry";
import * as pAppShell from "./pages/00-app-shell";
import * as pLogin from "./pages/01-login";
import * as pQuery from "./pages/02-query";
import * as pPrint from "./pages/03-print";
import * as pImage from "./pages/04-image";
import * as pDataCenter from "./pages/05-data-center";
import * as pDataUpload from "./pages/06-data-upload";
import * as pDataVersions from "./pages/07-data-versions";
import * as pAdminHome from "./pages/08-admin-home";
import * as pUserManage from "./pages/09-user-manage";
import * as pAuditLog from "./pages/10-audit-log";
import * as pOpsBoard from "./pages/11-ops-board";
import * as pBranding from "./pages/12-branding";
import * as pSecurity from "./pages/13-security";
import * as pMessageAdmin from "./pages/14-message-admin";
import * as pMessageCenter from "./pages/15-message-center";
import * as pNoticeAdmin from "./pages/16-notice-admin";
import * as pOpsMaintenance from "./pages/17-ops-maintenance";
import * as pLabelEditor from "./pages/18-label-editor";
import * as pTutorial from "./pages/19-tutorial";
import * as pUiPreview from "./pages/20-ui-preview";

export const SAMPLES: Record<string, Record<VariantKey, ComponentType>> = {
  "app-shell": pAppShell,
  "login": pLogin,
  "query": pQuery,
  "print": pPrint,
  "image": pImage,
  "data-center": pDataCenter,
  "data-upload": pDataUpload,
  "data-versions": pDataVersions,
  "admin-home": pAdminHome,
  "user-manage": pUserManage,
  "audit-log": pAuditLog,
  "ops-board": pOpsBoard,
  "branding": pBranding,
  "security": pSecurity,
  "message-admin": pMessageAdmin,
  "message-center": pMessageCenter,
  "notice-admin": pNoticeAdmin,
  "ops-maintenance": pOpsMaintenance,
  "label-editor": pLabelEditor,
  "tutorial": pTutorial,
  "ui-preview": pUiPreview,
};
