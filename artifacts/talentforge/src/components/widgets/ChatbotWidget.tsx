import { useState } from "react";
import { MessageSquare, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "framer-motion";

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-20 left-0 w-80 bg-background border border-border rounded-xl shadow-xl overflow-hidden flex flex-col"
          >
            <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="font-semibold">TalentBot</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-primary-foreground/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 h-64 overflow-y-auto bg-muted/30 flex flex-col gap-3">
              <div className="bg-card border border-border rounded-lg p-3 text-sm max-w-[85%] rounded-tl-none shadow-sm">
                Hi! I'm TalentBot. How can I help you with your hiring needs today?
              </div>
            </div>

            <div className="p-3 bg-background border-t border-border flex gap-2">
              <Input placeholder="Type a message..." className="flex-1" />
              <Button size="icon" className="shrink-0">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full shadow-lg p-0 flex items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground"
        aria-label="Toggle Chatbot"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </Button>
    </div>
  );
}
