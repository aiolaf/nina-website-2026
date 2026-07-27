"use client";

import { useEffect, useRef, useState } from "react";

/**
 * YouTube-embed die pas mount als hij in beeld komt, zelfde patroon als
 * FilloutEmbed: scheelt third-party JS op de eerste paint.
 */
export default function LazyYouTube({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="aspect-video overflow-hidden rounded-2xl border border-border bg-bg-muted"
    >
      {visible && (
        <iframe
          src={url}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full border-0"
        />
      )}
    </div>
  );
}
