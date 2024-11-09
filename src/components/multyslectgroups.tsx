import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

type Group = {
  value: string;
  label: string;
};

export default function MultiSelectGroups() {
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

  const toggleGroup = (value: string) => {
    setSelectedGroups((prev) =>
      prev.includes(value)
        ? prev.filter((group) => group !== value)
        : [...prev, value]
    );
  };

  const groups: Group[] = [
    { value: "all", label: "All Customers" },
    { value: "vip", label: "VIP Customers" },
    { value: "new", label: "New Customers" },
  ];

  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor="groups">Assigned Groups</Label>
      <div id="groups" className="flex space-x-2">
        {groups.map((group) => (
          <Badge
            key={group.value}
            onClick={() => toggleGroup(group.value)}
            className={`cursor-pointer ${
              selectedGroups.includes(group.value)
                ? "bg-blue-500 text-white py-2 align-middle"
                : "bg-gray-200 text-gray-700 py-2 align-middle"
            }`}
          >
            {group.label}
          </Badge>
        ))}
      </div>
    </div>
  );
}
