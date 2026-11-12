export function canSubmitReviewDecision(note: string): boolean {
  return note.trim().length > 0;
}