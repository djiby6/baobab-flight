import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { whatsappLink } from "@/lib/site";

export function WhatsAppFloat() {
  return (
    <div className="fixed bottom-5 right-5 z-50 sm:bottom-7 sm:right-7">
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Discuter avec Baobab Flight sur WhatsApp"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.6)] transition-transform duration-300 hover:scale-105 sm:h-16 sm:w-16"
      >
        <span
          aria-hidden
          className="absolute inset-0 animate-pulse-soft rounded-full bg-[#25D366]"
        />
        <WhatsAppIcon className="relative h-7 w-7 sm:h-8 sm:w-8" />
        <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-night px-4 py-2.5 text-xs font-medium text-white opacity-0 shadow-xl transition-all duration-300 group-hover:opacity-100 sm:block">
          <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 align-middle" />
          Devis instantané sur WhatsApp
        </span>
      </a>
    </div>
  );
}
