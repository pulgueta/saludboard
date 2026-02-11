/**
 * Global Clerk appearance configuration.
 *
 * Maps the SaludBoard design system's CSS variables into Clerk's
 * theming system so all Clerk components render consistently with
 * the rest of the application — in both light and dark mode.
 *
 * @see https://clerk.com/docs/tanstack-react-start/guides/customizing-clerk/appearance-prop/variables
 */
export const clerkAppearance = {
  variables: {
    colorPrimary: "var(--primary)",
    colorDanger: "var(--destructive)",
    colorSuccess: "var(--success)",
    colorWarning: "var(--warning)",
    colorNeutral: "var(--muted-foreground)",
    colorForeground: "var(--foreground)",
    colorPrimaryForeground: "var(--primary-foreground)",
    colorMutedForeground: "var(--muted-foreground)",
    colorMuted: "var(--muted)",
    colorBackground: "var(--card)",
    colorInputForeground: "var(--foreground)",
    colorInput: "var(--input)",
    colorRing: "var(--ring)",
    colorBorder: "var(--border)",
    fontFamily: "'Geist Variable', sans-serif",
    borderRadius: "var(--radius)",
  },
  elements: {
    rootBox: "w-full",
    cardBox: "shadow-none ring-0 w-full",
    card: "shadow-none ring-0 bg-transparent w-full",
    headerTitle: "text-foreground",
    headerSubtitle: "text-muted-foreground",
    socialButtonsBlockButton: "border-border text-foreground hover:bg-muted",
    formFieldLabel: "text-foreground",
    formFieldInput:
      "border-input bg-background text-foreground focus:ring-ring",
    footerActionLink: "text-primary hover:text-primary/80",
    identityPreview: "border-border",
    formButtonPrimary: "bg-primary text-primary-foreground hover:bg-primary/90",
    badge: "bg-primary text-primary-foreground",
    avatarBox: "ring-border",
  },
};
