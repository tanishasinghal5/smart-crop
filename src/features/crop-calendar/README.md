# Crop Calendar

Install peer dependencies in a React + Tailwind project:

```bash
npm install framer-motion lucide-react
```

Mount the calendar immediately after a recommendation result:

```tsx
import { CropCalendar } from './features/crop-calendar';

<CropCalendar cropName={recommendation.topCrop.name} apiUrl="/api/crop-schedule" />
```

`GET /api/crop-schedule?crop=Rice` may return a `CropSchedule` object. If it fails or is not supplied, the component builds an accessible, realistic demo schedule. Ensure Tailwind `content` includes `src/**/*.{ts,tsx}` and use Tailwind's `dark` class strategy for dark mode.
