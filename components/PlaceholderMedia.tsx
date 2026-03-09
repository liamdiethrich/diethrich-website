type PlaceholderType = "image" | "video" | "audio";

type PlaceholderMediaProps = {
  type: PlaceholderType;
  label?: string;
  className?: string;
};

const defaultLabels: Record<PlaceholderType, string> = {
  image: "IMAGE PLACEHOLDER - upload image",
  video: "VIDEO PLACEHOLDER - paste YouTube/Vimeo URL",
  audio: "AUDIO PLACEHOLDER - upload .mp3/.wav"
};

export function PlaceholderMedia({ type, label, className = "" }: PlaceholderMediaProps) {
  if (type === "audio") {
    return (
      <div
        aria-disabled
        className={`flex min-h-16 items-center rounded-sm border border-dashed border-neutral-500 bg-[#2A2A2C] px-4 text-xs uppercase tracking-[0.16em] text-neutral-300 ${className}`}
      >
        {label ?? defaultLabels.audio}
      </div>
    );
  }

  return (
    <div
      className={`flex w-full items-center justify-center rounded-sm border-2 border-dashed border-neutral-500 bg-neutral-100 px-4 py-8 text-center text-xs uppercase tracking-[0.16em] text-neutral-700 ${className}`}
    >
      {label ?? defaultLabels[type]}
    </div>
  );
}
