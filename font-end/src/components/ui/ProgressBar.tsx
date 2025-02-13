'use client'

import { AppProgressBar } from 'next-nprogress-bar'
import colors from "tailwindcss/colors"

export default function ProgressBar() {
  return <AppProgressBar color={colors.blue[400]} options={{ showSpinner: false }} />
}