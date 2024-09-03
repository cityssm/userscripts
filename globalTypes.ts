// eslint-disable-next-line @eslint-community/eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/naming-convention, @typescript-eslint/no-explicit-any */

export {}

declare global {
  // Spiceworks Object
  const CURRENT_USER: {
    account_id: number
    alpha_tickets_view: boolean
    color_theme: string
    email: string
    id: number
    is_org_restricted: boolean
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    restricted_organization_ids: null | unknown
    role: 'admin' | 'manager' | 'tech'
    selected_date_display_format: string
    spiceworks_user_id: number
    wants_browser_notifications: boolean
    wants_live_updates: boolean
    wants_relative_dates: boolean
  }
}
