import type { CSSProperties, FormEvent } from 'react'
import styles from './SignIn.module.css'

export interface SignInProps {
  title?: string
  subtitle?: string
  emailValue?: string
  passwordValue?: string
  emailLabel?: string
  passwordLabel?: string
  submitLabel?: string
  /** Comma-separated providers, each becomes a "Continue with …" button. */
  socials?: string
  socialPrefix?: string
  showSocial?: boolean
  dividerLabel?: string
  showRemember?: boolean
  rememberLabel?: string
  forgotLabel?: string
  footerPrompt?: string
  signupLabel?: string
  width?: number
  radius?: number
  borderWidth?: number
  padding?: number
  fontSize?: number
  background?: string
  textColor?: string
  labelColor?: string
  accentColor?: string
  borderColor?: string
  onEmailChange?: (value: string) => void
  onPasswordChange?: (value: string) => void
  onSubmit?: () => void
  onSocial?: (index: number) => void
  onForgot?: () => void
  onSignUp?: () => void
}

function splitList(value: string): string[] {
  return value
    .split(',')
    .map((part) => part.trim())
    .filter((part) => part.length > 0)
}

export default function SignIn({
  title = 'Welcome back',
  subtitle = 'Sign in to your account to continue.',
  emailValue = '',
  passwordValue = '',
  emailLabel = 'Email',
  passwordLabel = 'Password',
  submitLabel = 'Sign in',
  socials = 'Google, GitHub',
  socialPrefix = 'Continue with',
  showSocial = true,
  dividerLabel = 'or',
  showRemember = true,
  rememberLabel = 'Remember me',
  forgotLabel = 'Forgot password?',
  footerPrompt = "Don't have an account?",
  signupLabel = 'Sign up',
  width = 380,
  radius = 14,
  borderWidth = 1,
  padding = 28,
  fontSize = 14,
  background = '#ffffff',
  textColor = '#17191c',
  labelColor = '#6b7280',
  accentColor = '#4f46e5',
  borderColor = '#e3e6ea',
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onSocial,
  onForgot,
  onSignUp,
}: SignInProps) {
  const providers = splitList(socials)
  // Nested controls sit a little tighter than the card itself.
  const innerRadius = Math.round(radius * 0.7)

  const card: CSSProperties = {
    width,
    padding,
    borderRadius: radius,
    borderWidth,
    borderColor,
    borderStyle: borderWidth > 0 ? 'solid' : undefined,
    background,
    fontSize,
    ['--signin-accent' as string]: accentColor,
  }

  const field = { borderColor, borderRadius: innerRadius, color: textColor }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    onSubmit?.()
  }

  return (
    <div className={styles.card} style={card}>
      <h2 className={styles.title} style={{ color: textColor, fontSize: Math.round(fontSize * 1.6) }}>
        {title}
      </h2>
      {subtitle && (
        <p className={styles.subtitle} style={{ color: labelColor }}>
          {subtitle}
        </p>
      )}

      {showSocial && providers.length > 0 && (
        <>
          <div className={styles.social}>
            {providers.map((name, index) => (
              <button
                key={index}
                type="button"
                className={styles.socialButton}
                style={{ borderColor, borderRadius: innerRadius, color: textColor }}
                onClick={() => onSocial?.(index)}
              >
                {socialPrefix} {name}
              </button>
            ))}
          </div>

          <div className={styles.divider} style={{ color: labelColor }}>
            <span className={styles.line} style={{ background: borderColor }} />
            {dividerLabel}
            <span className={styles.line} style={{ background: borderColor }} />
          </div>
        </>
      )}

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.field}>
          <span className={styles.label} style={{ color: labelColor }}>
            {emailLabel}
          </span>
          <input
            type="email"
            className={styles.input}
            style={field}
            value={emailValue}
            placeholder="you@example.com"
            autoComplete="email"
            onChange={(event) => onEmailChange?.(event.target.value)}
          />
        </label>

        <div className={styles.field}>
          <div className={styles.labelRow}>
            <span className={styles.label} style={{ color: labelColor }}>
              {passwordLabel}
            </span>
            {forgotLabel && (
              <button
                type="button"
                className={styles.link}
                style={{ color: accentColor, fontSize: Math.round((fontSize - 2) * 10) / 10 }}
                onClick={() => onForgot?.()}
              >
                {forgotLabel}
              </button>
            )}
          </div>
          <input
            type="password"
            className={styles.input}
            style={field}
            value={passwordValue}
            placeholder="••••••••"
            autoComplete="current-password"
            onChange={(event) => onPasswordChange?.(event.target.value)}
          />
        </div>

        {showRemember && (
          <label className={styles.remember} style={{ color: labelColor }}>
            <input type="checkbox" className={styles.checkbox} style={{ accentColor }} />
            {rememberLabel}
          </label>
        )}

        <button
          type="submit"
          className={styles.submit}
          style={{ background: accentColor, borderRadius: innerRadius }}
        >
          {submitLabel}
        </button>
      </form>

      {footerPrompt && (
        <p className={styles.footer} style={{ color: labelColor }}>
          {footerPrompt}{' '}
          <button
            type="button"
            className={styles.link}
            style={{ color: accentColor }}
            onClick={() => onSignUp?.()}
          >
            {signupLabel}
          </button>
        </p>
      )}
    </div>
  )
}
