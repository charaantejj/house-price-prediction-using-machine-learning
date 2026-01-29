
# Backend Integration Guide

To transform this frontend into a full-stack production app with search persistence, follow these steps:

## 1. Supabase Setup (Recommended)
Supabase provides an instant Postgres DB, Auth, and Edge Functions.

### Data Model
Create a `searches` table in your SQL editor:
```sql
create table searches (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  neighborhood text,
  sqft integer,
  bhk integer,
  bathrooms integer,
  estimated_price numeric,
  created_at timestamp with time zone default now()
);
```

### React Integration
1. Install client: `npm install @supabase/supabase-js`
2. Initialize in `services/supabase.ts`:
```typescript
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'YOUR_URL';
const supabaseKey = 'YOUR_KEY';
export const supabase = createClient(supabaseUrl, supabaseKey);
```
3. Update `handlePrediction` in `App.tsx`:
```typescript
const handlePrediction = async (data: HouseInputs) => {
  setIsLoading(true);
  const result = await predictHousePrice(data);
  setResult(result);
  
  // Store the search
  await supabase.from('searches').insert({
    neighborhood: data.neighborhood,
    sqft: data.sqft,
    bhk: data.bhk,
    bathrooms: data.bathrooms,
    estimated_price: result.estimatedPrice
  });
  setIsLoading(false);
};
```

## 2. Real Python ML Backend (Optional)
If you want to move the `priceEngine.ts` logic to a real Python server:
1. Create a Flask/FastAPI endpoint.
2. Port the preprocessing logic (IQR outlier removal, One-Hot Encoding).
3. Use `scikit-learn`'s `RandomForestRegressor.predict()`.
4. Call this API using `fetch()` inside `predictHousePrice`.

## 3. Firebase Alternative
Similar to Supabase, use Firestore to `addDoc` to a `valuation_history` collection after every successful prediction.
