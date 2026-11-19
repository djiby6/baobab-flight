import Image from "next/image";
import { cn } from "@/lib/cn";

type LogoProps = {
  className?: string;
  imageClassName?: string;
  priority?: boolean;
};

export function Logo({
  className,
  imageClassName,
  priority = false,
}: LogoProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-xl bg-white px-2.5 py-1.5 shadow-lg shadow-violet/25 ring-1 ring-white/25",
        className,
      )}
    >
      <Image
        src="/baobab-flight-logo.png"
        alt="Baobab Flight — Local Service, International Fun!"
        width={846}
        height={383}
        priority={priority}
        sizes="(max-width: 640px) 80px, 100px"
        className={cn("h-9 w-auto sm:h-10", imageClassName)}
      />
    </span>
  );
}
