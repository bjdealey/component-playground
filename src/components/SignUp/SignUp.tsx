import type { CSSProperties, FormEvent } from 'react'
import styles from './SignUp.module.css'

export interface SignUpProps {
  title?: string
  subtitle?: string
  nameValue?: string
  emailValue?: string
  passwordValue?: string
  nameLabel?: string
  emailLabel?: string
  passwordLabel?: string
  submitLabel?: string
  /** Comma-separated providers, each becomes a "Continue with …" button. */
  socials?: string
  socialPrefix?: string
  showSocial?: boolean
  dividerLabel?: string
  showTerms?: boolean
  termsLabel?: string
  footerPrompt?: string
  signinLabel?: string
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
  onNameChange?: (value: string) => void
  onEmailChange?: (value: string) => void
  onPasswordChange?: (value: string) => void
  onSubmit?: () => void
  onSocial?: (index: number) => void
  onSignIn?: () => void
}

function splitList(value: string): string[] {
  return value
    .split(',')
    .map((part) => part.trim())
    .filter((part) => part.length > 0)
}

export default function SignUp({
  title = 'Create your account',
  subtitle = 'Start shipping previews in under a minute.',
  nameValue = '',
  emailValue = '',
  passwordValue = '',
  nameLabel = 'Full name',
  emailLabel = 'Email',
  passwordLabel = 'Password',
  submitLabel = 'Create account',
  socials = 'Google, GitHub',
  socialPrefix = 'Sign up with',
  showSocial = true,
  dividerLabel = 'or',
  showTerms = true,
  termsLabel = 'I agree to the Terms and Privacy Policy',
  footerPrompt = 'Already have an account?',
  signinLabel = 'Sign in',
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
  onNameChange,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onSocial,
  onSignIn,
}: SignUpProps) {
  const providers = splitList(socials)
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
    ['--signup-accent' as string]: accentColor,
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
            {nameLabel}
          </span>
          <input
            type="text"
            className={styles.input}
            style={field}
            value={nameValue}
            placeholder="Ada Okafor"
            autoComplete="name"
            onChange={(event) => onNameChange?.(event.target.value)}
          />
        </label>

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

        <label className={styles.field}>
          <span className={styles.label} style={{ color: labelColor }}>
            {passwordLabel}
          </span>
          <input
            type="password"
            className={styles.input}
            style={field}
            value={passwordValue}
            placeholder="At least 8 characters"
            autoComplete="new-password"
            onChange={(event) => onPasswordChange?.(event.target.value)}
          />
        </label>

        {showTerms && (
          <label className={styles.terms} style={{ color: labelColor }}>
            <input type="checkbox" className={styles.checkbox} style={{ accentColor }} />
            {termsLabel}
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
            onClick={() => onSignIn?.()}
          >
            {signinLabel}
          </button>
        </p>
      )}
    </div>
  )
}
