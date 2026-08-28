import type { ComponentManifest } from '../../lib/types'
import SignIn from './SignIn'

const manifest: ComponentManifest = {
  name: 'SignIn',
  component: SignIn,
  category: 'Forms',
  bindings: { onEmailChange: 'emailValue', onPasswordChange: 'passwordValue' },
  props: [
    { name: 'title', kind: 'text', default: 'Welcome back', group: 'Content' },
    {
      name: 'subtitle',
      kind: 'text',
      default: 'Sign in to your account to continue.',
      group: 'Content',
    },
    { name: 'emailValue', kind: 'text', default: '', group: 'Content' },
    { name: 'passwordValue', kind: 'text', default: '', group: 'Content' },
    { name: 'emailLabel', kind: 'text', default: 'Email', group: 'Content' },
    { name: 'passwordLabel', kind: 'text', default: 'Password', group: 'Content' },
    { name: 'submitLabel', kind: 'text', default: 'Sign in', group: 'Content' },

    { name: 'showSocial', kind: 'boolean', default: true, group: 'Social' },
    { name: 'socials', kind: 'text', default: 'Google, GitHub', group: 'Social' },
    { name: 'socialPrefix', kind: 'text', default: 'Continue with', group: 'Social' },
    { name: 'dividerLabel', kind: 'text', default: 'or', group: 'Social' },

    { name: 'showRemember', kind: 'boolean', default: true, group: 'Options' },
    { name: 'rememberLabel', kind: 'text', default: 'Remember me', group: 'Options' },
    { name: 'forgotLabel', kind: 'text', default: 'Forgot password?', group: 'Options' },
    { name: 'footerPrompt', kind: 'text', default: "Don't have an account?", group: 'Options' },
    { name: 'signupLabel', kind: 'text', default: 'Sign up', group: 'Options' },

    { name: 'radius', kind: 'number', default: 14, min: 0, max: 28, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 1, min: 0, max: 3, step: 1, group: 'Appearance' },

    { name: 'background', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'textColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'labelColor', kind: 'color', default: '#6b7280', group: 'Colors' },
    { name: 'accentColor', kind: 'color', default: '#4f46e5', group: 'Colors' },
    { name: 'borderColor', kind: 'color', default: '#e3e6ea', group: 'Colors' },

    { name: 'fontSize', kind: 'number', default: 14, min: 11, max: 18, step: 0.5, group: 'Typography' },

    { name: 'width', kind: 'number', default: 380, min: 280, max: 520, step: 10, group: 'Spacing' },
    { name: 'padding', kind: 'number', default: 28, min: 12, max: 48, step: 1, group: 'Spacing' },

    {
      name: 'onSubmit',
      kind: 'event',
      default: 'handleSubmit',
      presets: ['handleSubmit', '() => signIn(email, password)', '() => {}'],
      group: 'Events',
    },
    {
      name: 'onSocial',
      kind: 'event',
      default: 'handleSocial',
      presets: ['handleSocial', '(index) => console.log(index)', '() => {}'],
      group: 'Events',
    },
    {
      name: 'onForgot',
      kind: 'event',
      default: 'handleForgot',
      presets: ['handleForgot', '() => {}'],
      group: 'Events',
    },
    {
      name: 'onSignUp',
      kind: 'event',
      default: 'handleSignUp',
      presets: ['handleSignUp', '() => {}'],
      group: 'Events',
    },
    {
      name: 'onEmailChange',
      kind: 'event',
      default: 'handleEmailChange',
      presets: ['handleEmailChange', '(value) => setEmail(value)', '() => {}'],
      group: 'Events',
    },
    {
      name: 'onPasswordChange',
      kind: 'event',
      default: 'handlePasswordChange',
      presets: ['handlePasswordChange', '(value) => setPassword(value)', '() => {}'],
      group: 'Events',
    },
  ],
}

export default manifest
