import React, { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Language, LANGUAGES } from "../constants";

interface LanguageDropdownProps {
  value: Language;
  onChange: (value: Language) => void;
  disabled?: boolean;
}

export function LanguageDropdown({ value, onChange, disabled }: LanguageDropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between bg-surface border-border text-primary-text hover:bg-secondary-bg hover:text-primary-text focus:ring-accent"
          disabled={disabled}
          data-testid="language-dropdown-trigger"
        >
          {value}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 bg-surface border-border">
        <Command className="bg-surface">
          <CommandInput
            placeholder="Search language..."
            className="text-primary-text border-b border-border"
            data-testid="language-search-input"
          />
          <CommandList>
            <CommandEmpty className="text-secondary-text p-3 text-sm text-center">
              No language found.
            </CommandEmpty>
            <CommandGroup>
              {LANGUAGES.map((language) => {
                const isSelected = value === language;
                return (
                  <CommandItem
                    key={language}
                    value={language}
                    onSelect={(currentValue) => {
                      const selected = LANGUAGES.find(
                        (l) => l.toLowerCase() === currentValue.toLowerCase()
                      );
                      if (selected) {
                        onChange(selected);
                      }
                      setOpen(false);
                    }}
                    className={cn(
                      // Base styles — always applied
                      "cursor-pointer font-mono text-sm px-3 py-2 rounded-md mx-1 my-0.5",
                      // Default (non-selected) state
                      "text-secondary-text",
                      // Hover state — subtle surface lift, NOT using accent background
                      "hover:bg-border hover:text-primary-text",
                      // Selected state — slightly lighter bg, primary text, accent checkmark handled below
                      // Override shadcn/cmdk's default [aria-selected] cyan background
                      isSelected
                        ? "bg-secondary-bg text-primary-text"
                        : "",
                      // Force override any cmdk aria-selected styles that would apply cyan
                      "data-[selected=true]:bg-secondary-bg data-[selected=true]:text-primary-text",
                    )}
                    data-testid={`language-item-${language}`}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-3.5 w-3.5 text-accent flex-shrink-0",
                        isSelected ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {language}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
