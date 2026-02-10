import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import type { FC } from "react";

export const Collapsible: FC<CollapsiblePrimitive.Root.Props> = ({
  ...props
}) => {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
};

export const CollapsibleTrigger: FC<CollapsiblePrimitive.Trigger.Props> = ({
  ...props
}) => {
  return (
    <CollapsiblePrimitive.Trigger data-slot="collapsible-trigger" {...props} />
  );
};

export const CollapsibleContent: FC<CollapsiblePrimitive.Panel.Props> = ({
  ...props
}) => {
  return (
    <CollapsiblePrimitive.Panel data-slot="collapsible-content" {...props} />
  );
};
