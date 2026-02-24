import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import type { ComponentProps, ReactNode } from "react";
import Image from "next/image";

type MdxResult = {
  content: ReactNode;
};

const mdxComponents = {
  h2: (props: ComponentProps<"h2">) => <h2 className="mt-10 text-2xl font-semibold" {...props} />,
  h3: (props: ComponentProps<"h3">) => <h3 className="mt-8 text-xl font-semibold" {...props} />,
  p: (props: ComponentProps<"p">) => <p className="mt-4 leading-7 text-slate-700" {...props} />,
  ul: (props: ComponentProps<"ul">) => <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700" {...props} />,
  ol: (props: ComponentProps<"ol">) => <ol className="mt-4 list-decimal space-y-2 pl-6 text-slate-700" {...props} />,
  a: (props: ComponentProps<"a">) => (
    <a className="font-medium text-sky-700 underline decoration-sky-300 underline-offset-4" {...props} />
  ),
  img: ({ src, alt }: ComponentProps<"img">) => (
    <Image
      src={typeof src === "string" ? src : ""}
      alt={alt ?? ""}
      width={1600}
      height={900}
      className="mt-6 h-auto w-full rounded-2xl border border-slate-200 bg-white object-cover shadow-sm"
    />
  ),
  blockquote: (props: ComponentProps<"blockquote">) => (
    <blockquote className="mt-6 border-l-4 border-sky-200 pl-4 italic text-slate-600" {...props} />
  )
};

export async function renderMdx(source: string): Promise<MdxResult> {
  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug]
      }
    }
  });

  return { content };
}
