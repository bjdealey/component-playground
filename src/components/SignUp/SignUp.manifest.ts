import type { ComponentManifest } from '../../lib/types'
import SignUp from './SignUp'

const manifest: ComponentManifest = {
  name: 'SignUp',
  component: SignUp,
  category: 'Forms',
  bindings: {
    onNameChange: 'nameValue',
    onEmailChange: 'emailValue',
    onPasswordChange: 'passwordValue',
  },
  props: [
    { name: 'title', kind: 'text', default: 'Create your account', group: 'Content' },
    {
      name: 'subtitle',
      kind: 'text',
      default: 'Start shipping previews in under a minute.',
      group: 'Content',
    },
    { name: 'nameValue', kind: 'text', default: '', group: 'Content' },
    { name: 'emailValue', kind: 'text', default: '', group: 'Content' },
    { name: 'passwordValue', kind: 'text', default: '', group: 'Content' },
    { name: 'nameLabel', kind: 'text', default: 'Full name', group: 'Content' },
    { name: 'emailLabel', kind: 'text', default: 'Email', group: 'Content' },
    { name: 'passwordLabel', kind: 'text', default: 'Password', group: 'Content' },
    { name: 'submitLabel', kind: 'text', default: 'Create account', group: 'Content' },

    { name: 'showSocial', kind: 'boolean', default: true, group: 'Social' },
    { name: 'socials', kind: 'text', default: 'Google, GitHub', group: 'Social' },
    { name: 'socialPrefix', kind: 'text', default: 'Sign up with', group: 'Social' },
    { name: 'dividerLabel', kind: 'text', default: 'or', group: 'Social' },

    { name: 'showTerms', kind: 'boolean', default: true, group: 'Options' },
    {
      name: 'termsLabel',
      kind: 'text',
      default: 'I agree to the Terms and Privacy Policy',
      group: 'Options',
    },
    { name: 'footerPrompt', kind: 'text', default: 'Already have an account?', group: 'Options' },
    { name: 'signinLabel', kind: 'text', default: 'Sign in', group: 'Options' },

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
      presets: ['handleSubmit', '() => register(name, email, password)', '() => {}'],
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
      name: 'onSignIn',
      kind: 'event',
      default: 'handleSignIn',
      presets: ['handleSignIn', '() => {}'],
      group: 'Events',
    },
    {
      name: 'onNameChange',
      kind: 'event',
      default: 'handleNameChange',
      presets: ['handleNameChange', '(value) => setName(value)', '() => {}'],
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
