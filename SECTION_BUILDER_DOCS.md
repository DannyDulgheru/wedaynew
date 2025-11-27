# Section Builder Component - Complete Documentation

## Overview

The **Section Builder** is a powerful drag-and-drop interface that allows users to create fully customizable event invitation templates by selecting, ordering, and configuring modular sections. Each section type is designed for specific event types (Wedding, Baptism, Birthday, Anniversary, Corporate) and can be toggled on/off, reordered via drag-and-drop, and individually configured.

## Features

### 🎯 Core Functionality

1. **Event-Type-Specific Sections**: Only sections relevant to the selected event type are shown
2. **Drag-and-Drop Reordering**: Use @dnd-kit to reorder sections with smooth animations
3. **Toggle Enable/Disable**: Turn sections on/off with visual feedback
4. **Required vs Optional**: Some sections are mandatory and cannot be disabled
5. **Add New Sections**: Modal to browse and add available sections
6. **Configuration Interface**: Each section can have custom settings
7. **Live Preview**: See the order of enabled sections in real-time
8. **Visual Stats**: Dashboard showing total, enabled, and required sections

### 🛠️ Technical Implementation

- **Framework**: React with TypeScript
- **Drag-and-Drop**: @dnd-kit/core + @dnd-kit/sortable + @dnd-kit/utilities
- **State Management**: React useState hooks
- **Icons**: Lucide React
- **Styling**: Tailwind CSS with gradients

## Installation

```bash
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
npm install lucide-react
```

## Available Section Types

### 1. Hero Section 🌟
- **Name**: Hero Section
- **Description**: Secțiunea principală cu titlu și imagine de fundal
- **Available for**: All event types
- **Required**: Yes
- **Config**: `hasBackgroundImage`, `hasSubtitle`

### 2. Countdown Timer ⏰
- **Name**: Countdown Timer
- **Description**: Numărătoare inversă până la eveniment
- **Available for**: Wedding, Birthday, Anniversary, Corporate
- **Required**: No
- **Config**: `showDays`, `showHours`, `showMinutes`, `showSeconds`

### 3. Love Story 📖
- **Name**: Povestea Noastră
- **Description**: Timeline cu istoria cuplului sau evenimentului
- **Available for**: Wedding, Anniversary
- **Required**: No
- **Config**: `maxMilestones` (max 10)

### 4. Photo Gallery 🖼️
- **Name**: Galerie Foto
- **Description**: Colecție de fotografii în grid sau carousel
- **Available for**: All event types
- **Required**: No
- **Config**: `layout` (grid/carousel), `maxImages` (max 50)

### 5. Event Schedule 📅
- **Name**: Program Eveniment
- **Description**: Agenda detaliat cu timing-uri
- **Available for**: All event types
- **Required**: Yes
- **Config**: `showTiming`, `showIcons`

### 6. Location 📍
- **Name**: Locație
- **Description**: Hartă și detalii despre locație
- **Available for**: All event types
- **Required**: Yes
- **Config**: `showMap`, `showDirections`

### 7. RSVP Form 💬
- **Name**: Formular RSVP
- **Description**: Confirmare participare online
- **Available for**: All event types
- **Required**: Yes
- **Config**: `allowPlusOne`, `askDietary`

### 8. FAQ ❓
- **Name**: Întrebări Frecvente
- **Description**: Răspunsuri la întrebări comune
- **Available for**: All event types
- **Required**: No
- **Config**: `maxQuestions` (max 10)

### 9. Gift Registry 🎁
- **Name**: Listă Cadouri
- **Description**: Registry links sau cont bancar
- **Available for**: Wedding, Baptism, Birthday
- **Required**: No
- **Config**: `showBankAccount`, `showRegistryLinks`

### 10. Dress Code 👔
- **Name**: Dress Code
- **Description**: Cod vestimentar și indicații
- **Available for**: Wedding, Anniversary, Corporate
- **Required**: No
- **Config**: `showExamples`

### 11. Accommodations 🏠
- **Name**: Cazare
- **Description**: Recomandări de hoteluri
- **Available for**: Wedding, Anniversary, Corporate
- **Required**: No
- **Config**: `maxHotels` (max 5)

### 12. Speakers 👥
- **Name**: Speakeri
- **Description**: Profile speakeri și prezentatori
- **Available for**: Corporate only
- **Required**: No
- **Config**: `showBio`, `showPhoto`

### 13. Sponsors 🏆
- **Name**: Sponsori
- **Description**: Logo-uri și info sponsori
- **Available for**: Corporate only
- **Required**: No
- **Config**: `maxSponsors` (max 10)

### 14. Team 👫
- **Name**: Echipa
- **Description**: Membrii echipei sau nași
- **Available for**: Wedding, Baptism, Corporate
- **Required**: No
- **Config**: `showRoles`

### 15. Menu 🍽️
- **Name**: Meniu
- **Description**: Meniu servit la eveniment
- **Available for**: Wedding, Baptism, Birthday, Anniversary
- **Required**: No
- **Config**: `showCourses`

### 16. Entertainment 🎵
- **Name**: Divertisment
- **Description**: Muzică, DJ, activități
- **Available for**: Wedding, Birthday, Corporate
- **Required**: No
- **Config**: `showSchedule`

## Data Structure

### TemplateSection Interface

```typescript
interface TemplateSection {
  id: string;                    // Unique identifier
  type: SectionType;             // Type of section (hero, gallery, etc.)
  name: string;                  // Display name
  description: string;           // User-friendly description
  icon: any;                     // Lucide icon component
  isEnabled: boolean;            // Whether section is currently active
  isRequired: boolean;           // Whether section is mandatory
  order: number;                 // Display order (0-indexed)
  eventTypes: EventType[];       // Which event types support this section
  config?: Record<string, any>;  // Section-specific configuration
}
```

### EventType

```typescript
type EventType = "WEDDING" | "BAPTISM" | "BIRTHDAY" | "ANNIVERSARY" | "CORPORATE";
```

### SectionType

```typescript
type SectionType =
  | "hero"
  | "countdown"
  | "story"
  | "gallery"
  | "schedule"
  | "location"
  | "rsvp"
  | "faq"
  | "registry"
  | "dresscode"
  | "accommodations"
  | "speakers"
  | "sponsors"
  | "team"
  | "menu"
  | "entertainment";
```

## Props

```typescript
interface SectionBuilderProps {
  eventType: EventType;                              // Current event type
  onSectionsChange?: (sections: TemplateSection[]) => void;  // Callback when sections change
}
```

## Usage Example

### Basic Implementation

```tsx
"use client";

import { useState } from "react";
import SectionBuilder, { TemplateSection, EventType } from "@/components/client/SectionBuilder";

export default function CreateEventPage() {
  const [eventType, setEventType] = useState<EventType>("WEDDING");
  const [sections, setSections] = useState<TemplateSection[]>([]);

  const handleSectionsChange = (newSections: TemplateSection[]) => {
    setSections(newSections);
    console.log("Updated sections:", newSections);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Creează Invitație</h1>
      
      {/* Event Type Selector */}
      <select
        value={eventType}
        onChange={(e) => setEventType(e.target.value as EventType)}
        className="mb-6 px-4 py-2 border rounded-lg"
      >
        <option value="WEDDING">Nuntă</option>
        <option value="BAPTISM">Botez</option>
        <option value="BIRTHDAY">Zi de Naștere</option>
        <option value="ANNIVERSARY">Aniversare</option>
        <option value="CORPORATE">Corporativ</option>
      </select>

      {/* Section Builder */}
      <SectionBuilder
        eventType={eventType}
        onSectionsChange={handleSectionsChange}
      />

      {/* Save Button */}
      <button
        onClick={() => console.log("Saving sections:", sections)}
        className="mt-6 px-6 py-3 bg-purple-600 text-white rounded-lg"
      >
        Salvează Invitația
      </button>
    </div>
  );
}
```

### Advanced: With Form Integration

```tsx
import { useForm } from "react-hook-form";
import SectionBuilder from "@/components/client/SectionBuilder";

interface EventFormData {
  title: string;
  date: string;
  location: string;
  sections: TemplateSection[];
}

export default function EventFormWithSections() {
  const { register, handleSubmit, setValue } = useForm<EventFormData>();

  const onSectionsChange = (sections: TemplateSection[]) => {
    setValue("sections", sections);
  };

  const onSubmit = async (data: EventFormData) => {
    const response = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        sections: data.sections
          .filter(s => s.isEnabled)
          .map(s => ({
            type: s.type,
            order: s.order,
            config: s.config,
          })),
      }),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("title")} placeholder="Titlu eveniment" />
      <input {...register("date")} type="date" />
      <input {...register("location")} placeholder="Locație" />
      
      <SectionBuilder
        eventType="WEDDING"
        onSectionsChange={onSectionsChange}
      />
      
      <button type="submit">Salvează</button>
    </form>
  );
}
```

## User Interactions

### Drag and Drop

1. **Grab Handle**: Click and hold the `GripVertical` icon on the left
2. **Drag**: Move the mouse while holding to reorder
3. **Drop**: Release to place in new position
4. **Auto-Reorder**: Order numbers update automatically

### Toggle Enable/Disable

1. **Eye Icon**: Click the eye icon to toggle
2. **Visual Feedback**: 
   - Enabled: Green eye icon, full opacity, purple gradient
   - Disabled: Gray eye-off icon, reduced opacity
3. **Required Sections**: Cannot be disabled (button disabled)

### Add New Section

1. **Click "+" Button**: Opens modal with available sections
2. **Browse Grid**: See all sections not yet added
3. **Click Card**: Instantly adds section to bottom of list
4. **Auto-Close**: Modal closes after adding

### Configure Section

1. **Settings Icon**: Click gear icon on any section
2. **Configuration Modal**: Opens with section-specific options
3. **Save**: Updates section config (TODO: implement modal)

### Remove Section

1. **Trash Icon**: Click trash icon (only on optional sections)
2. **Confirmation**: Browser confirm dialog
3. **Delete**: Removes section from list
4. **Required Protection**: Required sections have no trash icon

## State Management

### Initial State

When component mounts, it initializes sections based on `eventType`:

```typescript
const [sections, setSections] = useState<TemplateSection[]>(() => {
  return availableSections
    .filter((s) => s.eventTypes.includes(eventType))
    .map((s, index) => ({
      ...s,
      id: `section-${s.type}-${Date.now()}-${index}`,
      isEnabled: s.isRequired,
      order: index,
    }));
});
```

### Drag Handling

```typescript
const handleDragEnd = (event: DragEndEvent) => {
  const { active, over } = event;

  if (over && active.id !== over.id) {
    setSections((items) => {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);
      const newItems = arrayMove(items, oldIndex, newIndex).map((item, index) => ({
        ...item,
        order: index,
      }));
      
      onSectionsChange?.(newItems);
      return newItems;
    });
  }
};
```

### Toggle Logic

```typescript
const handleToggle = (id: string) => {
  setSections((items) => {
    const newItems = items.map((item) =>
      item.id === id ? { ...item, isEnabled: !item.isEnabled } : item
    );
    onSectionsChange?.(newItems);
    return newItems;
  });
};
```

## Visual Design

### Color Scheme

- **Primary Gradient**: Purple to Pink (`from-purple-500 to-pink-500`)
- **Enabled Sections**: Light purple background (`from-white to-purple-50`)
- **Disabled Sections**: Gray with opacity
- **Required Badge**: Red (`bg-red-100 text-red-600`)
- **Stats Cards**: Blue, Green, Purple gradients

### Responsive Design

- **Desktop**: Full-width sections, side-by-side action buttons
- **Tablet**: Maintained layout with smaller gaps
- **Mobile**: Stack vertically, touch-friendly drag handles

### Icons Mapping

| Section Type | Icon | Color |
|--------------|------|-------|
| Hero | Sparkles | Purple-Pink gradient |
| Countdown | Clock | Purple-Pink gradient |
| Story | BookOpen | Purple-Pink gradient |
| Gallery | Image | Purple-Pink gradient |
| Schedule | Calendar | Purple-Pink gradient |
| Location | MapPin | Purple-Pink gradient |
| RSVP | MessageSquare | Purple-Pink gradient |
| FAQ | HelpCircle | Purple-Pink gradient |
| Registry | Gift | Purple-Pink gradient |
| Dress Code | Shirt | Purple-Pink gradient |
| Accommodations | Home | Purple-Pink gradient |
| Speakers | Users | Purple-Pink gradient |
| Sponsors | Award | Purple-Pink gradient |
| Team | Users | Purple-Pink gradient |
| Menu | Utensils | Purple-Pink gradient |
| Entertainment | Music | Purple-Pink gradient |

## Integration Points

### 1. Event Creation Page

Add Section Builder to `/app/client/events/create/page.tsx`:

```tsx
import SectionBuilder from "@/components/client/SectionBuilder";

// Inside component
<SectionBuilder
  eventType={formData.eventType}
  onSectionsChange={(sections) => setFormData({ ...formData, sections })}
/>
```

### 2. Event Edit Page

Add to `/app/client/events/[id]/edit/page.tsx`:

```tsx
const [sections, setSections] = useState<TemplateSection[]>(event.sections);

<SectionBuilder
  eventType={event.eventType}
  onSectionsChange={setSections}
/>
```

### 3. Database Schema (Prisma)

```prisma
model Event {
  id          String   @id @default(cuid())
  title       String
  eventType   EventType
  sections    Json?    // Store as JSON array
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

enum EventType {
  WEDDING
  BAPTISM
  BIRTHDAY
  ANNIVERSARY
  CORPORATE
}
```

### 4. API Endpoint

```typescript
// app/api/events/route.ts
export async function POST(req: Request) {
  const { title, eventType, sections } = await req.json();
  
  const event = await prisma.event.create({
    data: {
      title,
      eventType,
      sections: sections
        .filter((s: TemplateSection) => s.isEnabled)
        .map((s: TemplateSection) => ({
          type: s.type,
          name: s.name,
          order: s.order,
          config: s.config,
        })),
    },
  });
  
  return Response.json(event);
}
```

## Performance Optimization

### Memoization

```tsx
import { useMemo } from "react";

const enabledSections = useMemo(
  () => sections.filter(s => s.isEnabled),
  [sections]
);
```

### Lazy Loading Icons

Icons are imported statically but could be lazy-loaded:

```tsx
import dynamic from "next/dynamic";

const DynamicIcon = dynamic(() => import(`lucide-react/${iconName}`));
```

### Virtual Scrolling

For pages with 20+ sections, consider react-window:

```tsx
import { FixedSizeList } from "react-window";

<FixedSizeList
  height={600}
  itemCount={sections.length}
  itemSize={100}
>
  {SortableSectionItem}
</FixedSizeList>
```

## Accessibility

### Keyboard Navigation

- **Tab**: Move between interactive elements
- **Space/Enter**: Activate buttons
- **Arrow Keys**: Could be added for reordering (not currently implemented)

### Screen Readers

- All buttons have descriptive `title` attributes
- Icons paired with text labels
- Semantic HTML structure

### ARIA Labels

Add for better accessibility:

```tsx
<button
  aria-label="Activează secțiunea Hero"
  aria-pressed={section.isEnabled}
  onClick={() => handleToggle(section.id)}
>
```

## Future Enhancements

### 1. Configuration Modals

Create dedicated modals for each section type:

```tsx
{showConfigModal && (
  <ConfigModal
    section={selectedSection}
    onSave={(config) => updateSectionConfig(selectedSection.id, config)}
    onClose={() => setShowConfigModal(false)}
  />
)}
```

### 2. Section Templates

Pre-configured section bundles:

```typescript
const sectionBundles = {
  minimal: ["hero", "location", "rsvp"],
  standard: ["hero", "countdown", "gallery", "location", "rsvp"],
  complete: ["hero", "countdown", "story", "gallery", "schedule", "location", "rsvp", "faq"],
};
```

### 3. Duplicate Sections

Allow multiple instances of the same section:

```typescript
const handleDuplicate = (id: string) => {
  const section = sections.find(s => s.id === id);
  if (section) {
    const duplicate = {
      ...section,
      id: `section-${section.type}-${Date.now()}`,
      order: sections.length,
    };
    setSections([...sections, duplicate]);
  }
};
```

### 4. Import/Export

Save and load section configurations:

```typescript
const exportSections = () => {
  const data = JSON.stringify(sections);
  downloadFile(data, "sections.json");
};

const importSections = (file: File) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const data = JSON.parse(e.target.result);
    setSections(data);
  };
  reader.readAsText(file);
};
```

### 5. Live Preview Integration

Show real invitation preview with current sections:

```tsx
<div className="grid grid-cols-2 gap-6">
  <SectionBuilder ... />
  <InvitationPreview sections={sections.filter(s => s.isEnabled)} />
</div>
```

## Troubleshooting

### Issue: Sections not reordering

**Solution**: Ensure @dnd-kit packages are installed:

```bash
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

### Issue: Required sections can be disabled

**Solution**: Check `isRequired` property and disable toggle button:

```tsx
<button
  disabled={section.isRequired}
  onClick={() => handleToggle(section.id)}
>
```

### Issue: Sections reset on eventType change

**Solution**: Add effect to reinitialize:

```tsx
useEffect(() => {
  setSections(availableSections
    .filter(s => s.eventTypes.includes(eventType))
    .map((s, i) => ({ ...s, id: uuid(), isEnabled: s.isRequired, order: i }))
  );
}, [eventType]);
```

### Issue: onSectionsChange not firing

**Solution**: Ensure callback is passed and called after state updates:

```tsx
setSections(newItems);
onSectionsChange?.(newItems);  // Call after state update
```

## API Reference

### Component: SectionBuilder

```typescript
function SectionBuilder(props: SectionBuilderProps): JSX.Element
```

### Hook: useSortable (from @dnd-kit/sortable)

```typescript
const {
  attributes,    // Props for drag handle
  listeners,     // Event listeners
  setNodeRef,    // Ref callback
  transform,     // Current transform
  transition,    // Transition style
  isDragging,    // Drag state
} = useSortable({ id: section.id });
```

### Utility: arrayMove (from @dnd-kit/sortable)

```typescript
function arrayMove<T>(array: T[], from: number, to: number): T[]
```

## Testing

### Unit Tests

```typescript
import { render, screen } from "@testing-library/react";
import SectionBuilder from "@/components/client/SectionBuilder";

describe("SectionBuilder", () => {
  it("renders sections for wedding event type", () => {
    render(<SectionBuilder eventType="WEDDING" />);
    expect(screen.getByText("Hero Section")).toBeInTheDocument();
  });

  it("disables toggle for required sections", () => {
    render(<SectionBuilder eventType="WEDDING" />);
    const toggleButton = screen.getByTitle("Activează");
    expect(toggleButton).toBeDisabled();
  });
});
```

### Integration Tests

```typescript
it("reorders sections via drag and drop", async () => {
  const onSectionsChange = jest.fn();
  render(<SectionBuilder eventType="WEDDING" onSectionsChange={onSectionsChange} />);
  
  // Simulate drag and drop
  // ...
  
  expect(onSectionsChange).toHaveBeenCalledWith(
    expect.arrayContaining([
      expect.objectContaining({ type: "gallery", order: 0 }),
      expect.objectContaining({ type: "hero", order: 1 }),
    ])
  );
});
```

## Resources

- **@dnd-kit Documentation**: https://docs.dndkit.com/
- **Lucide Icons**: https://lucide.dev/
- **Tailwind CSS**: https://tailwindcss.com/
- **TypeScript**: https://www.typescriptlang.org/

## Support

For issues or questions about the Section Builder component, contact the development team or create an issue in the project repository.

---

**Version**: 1.0.0  
**Last Updated**: January 2025  
**Author**: Weday Development Team
