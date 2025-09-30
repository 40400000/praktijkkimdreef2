"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionItem {
  id: string;
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export default function Accordion({ items }: AccordionProps) {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.id} className="border border-gray-200 rounded-xl">
          <button
            onClick={() => toggleAccordion(item.id)}
            className="w-full px-4 py-3 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200 rounded-xl"
          >
            <span className="font-medium text-gray-900">{item.title}</span>
            <ChevronDown 
              className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                openAccordion === item.id ? 'rotate-180' : ''
              }`} 
            />
          </button>
          {openAccordion === item.id && (
            <div className="px-4 pb-4">
              <div className="pt-2 border-t border-gray-100">
                <p className="text-gray-700 text-sm leading-relaxed">
                  {item.content}
                </p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

