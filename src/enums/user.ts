export enum USER_ROLES {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  CANDIDATE = 'CANDIDATE',
  EMPLOYEE = 'EMPLOYEE',
}

export enum JOB_LEVEL {
  ALL = "All",
  C_LEVEL = "C-Level",
  VP_LEVEL = "VP-Level",
  DIRECTOR = "Director",
  MANAGER = "Manager",
  NON_MANAGER = "Non-Manager"
}

export enum USER_BADGE {
  PERFORMANCE_READINESS_CREDENTIAL = "PERFORMANCE READINESS CREDENTIAL",
  RELIABILITY = "RELIABILITY",
  SAFETY_CONSCIOUS = "SAFETY-CONSCIOUS",
  GROWTH_MINDSET = "GROWTH MINDSET"
}

export enum ASSESSMENT_STATUS {
  PENDING = "pending",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
  LINK_SENT = "link_sent",
  APPROVED = "approved",
  REJECTED = "rejected"
}
