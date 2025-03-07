
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ReactNode } from "react";

interface FilterAccordionProps {
  defaultValues?: string[];
  children: ReactNode;
}

export const FilterAccordion = ({
  defaultValues,
  children,
}: FilterAccordionProps) => {
  return (
    <Accordion
      type="multiple"
      className="space-y-4"
      defaultValue={defaultValues}
    >
      {children}
    </Accordion>
  );
};

export interface FilterSectionProps {
  title: string;
  value: string;
  children: ReactNode;
}

export const FilterSection = ({ title, value, children }: FilterSectionProps) => {
  return (
    <AccordionItem value={value}>
      <AccordionTrigger className="text-base font-medium">
        {title}
      </AccordionTrigger>
      <AccordionContent>
        {children}
      </AccordionContent>
    </AccordionItem>
  );
};
