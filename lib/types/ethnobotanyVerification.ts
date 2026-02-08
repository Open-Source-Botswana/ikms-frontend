import { RecordStatus, VerificationRole } from "./botanical";
import { WorkflowStatus } from "./ethnobotanical";

export const VERIFICATION_STAGES_CONFIG = {
  1: {
    name: 'Data Capture',
    status: 'draft' as RecordStatus,
    allowedRoles: ['admin', 'officer'] as VerificationRole[],
    nextStatus: 'pending_review' as RecordStatus
  },
  2: {
    name: 'Expert Verification',
    status: 'pending_review' as RecordStatus,
    allowedRoles: ['admin', 'ethnoExpert', 'ethnoCouncilMember'] as VerificationRole[],
    nextStatus: 'pending_approval' as RecordStatus
  },
  3: {
    name: 'Final Approval',
    status: 'pending_approval' as RecordStatus,
    allowedRoles: ['admin', 'communityLeader', 'superAdmin'] as VerificationRole[],
    nextStatus: 'published' as RecordStatus
  }
} as const;


export type StageActionMap = {
  1: 'submit_for_review';
  2: 'approve' | 'request_revision' | 'deny';
  3: 'publish' | 'deny';
};

export type VerificationAction =
  | { stage: 1; action: 'submit_for_review'; comments?: string }
  | { stage: 2; action: 'approve' | 'request_revision' | 'deny'; comments: string }
  | { stage: 3; action: 'publish' | 'deny'; comments: string };

export const ACTION_CONFIG = {
  submit_for_review: {
    label: 'Submit for Expert Review',
    requiresComment: false,
    nextStatus: 'pending_review' as WorkflowStatus,
    color: 'bg-blue-500 hover:bg-blue-600'
  },
  approve: {
    label: 'Approve & Forward to Final Approval',
    requiresComment: false,
    nextStatus: 'pending_approval' as WorkflowStatus,
    color: 'bg-green-500 hover:bg-green-600'
  },
  request_revision: {
    label: 'Request Revisions',
    requiresComment: true,
    nextStatus: 'revision_requested' as WorkflowStatus,
    color: 'bg-yellow-500 hover:bg-yellow-600'
  },
  deny: {
    label: 'Deny Record',
    requiresComment: true,
    nextStatus: 'denied' as WorkflowStatus,
    color: 'bg-red-500 hover:bg-red-600'
  },
  publish: {
    label: 'Publish Record',
    requiresComment: false,
    nextStatus: 'published' as WorkflowStatus,
    color: 'bg-purple-600 hover:bg-purple-700'
  }
} as const;
