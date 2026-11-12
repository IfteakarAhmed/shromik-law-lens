# Comparison and Admin Demo Areas

## Build
- Add `/app/compare` with an explicitly illustrative plain-AI comparison and ShromikAI findings sourced from static mock data. Calculate the rejected-citation summary from the sample claim data and switch columns to accessible tabs on mobile.
- Add `/admin` with a left navigation for the sample review queue, editable playbooks, one-time demo API-key display/revoke, sample usage charts, and an analysis trace. Keep actions in memory only, require a note before review decisions, and label every operational dataset as sample data.
- Add `/demo-user`, `/demo-hr`, and `/demo-admin` redirects to the corresponding demo areas.
- Add Bangla and English locale strings, route-specific metadata, and focused tests. Preserve the existing frontend-only/no-persistence project rules.

## Technical details
- Use TanStack file routes, existing shadcn controls and design tokens, existing mock review findings, and Recharts already installed. No backend, secrets, real API credentials, or browser persistence.
