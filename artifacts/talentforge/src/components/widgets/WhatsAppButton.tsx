import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919968563781"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-green-600 hover:scale-110 transition-all z-50"
      aria-label="Chat on WhatsApp"
      data-testid="whatsapp-button"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
}
