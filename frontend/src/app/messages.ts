export const MESSAGES = {
  VALIDATION: {
    TITLE_REQUIRED: 'Title is required',
    START_REQUIRED: 'Start date & time is required',
    END_REQUIRED: 'End date & time is required',
    END_BEFORE_START: 'End date & time must be after start date & time',
  },
  COMMON: {
    SAVE_ERROR: 'Failed to save event',
  }
} as const;
