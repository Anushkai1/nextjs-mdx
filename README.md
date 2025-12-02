## 🚨 Critical: Add mdx-components.tsx for MDX Support

In Next.js App Router, MDX only works properly when you define **mdx-components.tsx** file at the **project root**. Without it, Next.js tries to load MDX with
default React context logic, which triggers the error:

<font color="#ff6369">createContext only works in Client Components. Add the "use client" directive at the top of the file to use it.</font>

This happens because MDX renders components that expect a client environment, but the page is treated as a server component by default. The mdx-components.tsx file tells Next.js exactly which components are client-side, preventing the context error and allowing .mdx pages to render normally.