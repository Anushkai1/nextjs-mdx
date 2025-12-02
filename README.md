## 🚨 Critical: Add mdx-components.tsx for MDX Support

In Next.js App Router, MDX only works properly when you define **mdx-components.tsx** file at the **project root**. Without it, Next.js tries to load MDX with
default React context logic, which triggers the error:

<font color="#ff6369">createContext only works in Client Components. Add the "use client" directive at the top of the file to use it.</font>

This happens because MDX renders components that expect a client environment, but the page is treated as a server component by default. The mdx-components.tsx file tells Next.js exactly which components are client-side, preventing the context error and allowing .mdx pages to render normally.


##  Use React component in an MDX file
When using a React component in an MDX file, the opening and closing tags must be on the same level as the content. Writing it with extra line breaks like:
```html
<CustomButton>
  Click me

</CustomButton>
```
or 
```html
<CustomButton>Click me
</CustomButton>
```

causes errors:<br>
<font color="#ff6369">Error evaluating Node.js code.</font>
Expected a closing tag for <CustomButton> before the end of paragraph.

### ✅ Correct usage:<br>
Keep the content inline with the tags to avoid MDX parsing issues.
```html
<CustomButton>Click me</CustomButton>
```

## 🛠️ Troubleshoot MDX Integration Issue with Turbopack 

I tried adding MDX support using the standard @next/mdx setup:
```js
import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
    pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
```
### ❗ Problem

Right after adding:
```js
export default withMDX(nextConfig)
```
the entire app stopped compiling in Turbopack.
Turbopack threw this <font color="#ff6369">error:</font>

```html
turbopack.rules.{*,next-mdx-rule}: data did not match any variant of untagged enum RuleConfigItemOrShortcut
```


This happened because Next 15.x + Turbopack did not fully support the @next/mdx loader, so the MDX plugin chain broke the compiler.

### ✔️ Temporary Fix

Switching the config to the built-in Rust MDX compiler made the app work again:
```js
/** @type {import("next").NextConfig} */
const nextConfig = {
    experimental: {
        mdxRs: true,
    },
    pageExtensions: ["mdx", "md", "ts", "tsx"],
};

export default nextConfig;
```

This bypassed the old MDX loader and used the Rust compiler, which Turbopack actually supports.

### ✔️ Final Fix — Updating Next.js

I was originally on:

**Next.js version: 15.4.7**

After upgrading to:

**Next.js version: 16.0.6**

The problem disappeared.

Now the original MDX setup works again:
```js
import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
    pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
```
### 🎉 Why?

Next.js 16 includes improved Turbopack + MDX support, fixing the rule-matching bug that prevented the MDX plugin loader from compiling.

### ✅ Summary

Next 15.x + Turbopack + @next/mdx → breaks

Using mdxRs works as a temporary fix

Next 16.x fully fixes Turbopack + MDX compatibility

After upgrading, withMDX(nextConfig) compiles normally again