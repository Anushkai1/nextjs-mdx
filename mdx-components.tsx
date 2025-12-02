import type { MDXComponents } from 'mdx/types'
import Image, { ImageProps } from 'next/image'

// This file is auto-discovered by Next.js when using @next/mdx in the App Router.
// It allows you to provide/merge custom React components used within MDX.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Customizations for built-ins
    h1: ({ children }) => (
      <h1 className="text-7xl text-white">{children}</h1>
    ),
    h2: ({ children }) => (
        <h1 className="text-7xl" >{children}</h1>
    ),
    // Keep any components provided by MDX files/pages
    ...components,
  }
}
