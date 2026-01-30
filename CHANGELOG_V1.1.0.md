# CHANGELOG - Version 1.1.0

**Release Date**: 2024-01-30
**Breaking Changes**: None
**Upgrade Path**: Fully backward compatible

---

## NEW FEATURES

### onDeclined Callback Support ⭐

Added complete support for handling form decline/refusal events in React components.

#### What's New

1. **New Prop**: `onDeclined: (data: DeclineData) => void`
   - Called when user declines/refuses to sign the form in MosikaSign
   - Receives complete decline data including reason

2. **New Type**: `DeclineData`
   ```typescript
   interface DeclineData {
     type: 'mosikasign:declined';
     slug: string;
     submitterId: string;
     submissionId: string;
     declinedAt: string;          // ISO 8601 format
     declineReason: string;        // User-entered reason
     submitterName?: string;
     submitterEmail?: string;
   }
   ```

3. **Backend Integration**: MosikaSign `declined.html.erb` now sends postMessage event
   - Automatically triggered when user declines
   - Includes decline reason from form submission

#### Usage Example

```typescript
import { MosikaSignForm } from '@mosikasign/react';

function MyComponent() {
  const handleDeclined = (data: DeclineData) => {
    console.log('Form declined:', data);
    console.log('Reason:', data.declineReason);

    // Send to backend API
    fetch('/api/lots/{lotId}/reject-signature/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        submission_id: data.slug,
        decline_reason: data.declineReason
      })
    });
  };

  return (
    <MosikaSignForm
      formUrl="https://mosikasign.example.com/s/abc-123"
      onCompleted={handleCompleted}
      onDeclined={handleDeclined}  // ← NEW
      onError={handleError}
    />
  );
}
```

---

## MODIFIED FILES

### React Component Files

#### 1. `src/types.ts`
**Changes**:
- Added `onDeclined` prop to `MosikaSignFormProps` interface
- Added new `DeclineData` interface with all fields
- Updated `MosikaSignMessage` type union to include `DeclineData`

**Lines Added**: ~15 lines
**Backward Compatible**: ✅ Yes (new optional prop)

#### 2. `src/hooks/usePostMessage.ts`
**Changes**:
- Added `onDeclined` to `UsePostMessageOptions` interface
- Added `onDeclined` parameter to hook function
- Added case `'mosikasign:declined'` in switch statement
- Updated useCallback dependencies to include `onDeclined`

**Lines Added**: ~8 lines
**Backward Compatible**: ✅ Yes (optional parameter)

#### 3. `src/MosikaSignForm.tsx`
**Changes**:
- Added `onDeclined` prop to component destructuring
- Passed `onDeclined` to `usePostMessage` hook

**Lines Added**: ~2 lines
**Backward Compatible**: ✅ Yes (optional prop)

#### 4. `src/index.ts`
**Changes**:
- Exported new `DeclineData` type for TypeScript users

**Lines Added**: ~1 line
**Backward Compatible**: ✅ Yes (new export)

### MosikaSign Backend Files

#### 5. `app/views/submit_form/declined.html.erb`
**Changes**:
- Added postMessage script to notify parent iframe of decline
- Includes: slug, submitterId, submissionId, declinedAt, declineReason
- Extracts decline reason from submission_events

**Lines Added**: ~15 lines
**Backward Compatible**: ✅ Yes (new feature)

### Configuration Files

#### 6. `package.json`
**Changes**:
- Version bumped from 1.0.0 → 1.1.0
- No dependency changes

**Backward Compatible**: ✅ Yes (feature addition)

---

## COMPATIBILITY

### React Versions
- React 16.8.0+ ✅
- React 17.x ✅
- React 18.x ✅

### Browsers
- All modern browsers supporting postMessage API ✅
- IE11+ (with polyfills) ✅

### Breaking Changes
**NONE** - Fully backward compatible

### Migration Path
No changes required to existing code. The `onDeclined` prop is optional.

---

## TESTING CHECKLIST

### Unit Tests
- [ ] `usePostMessage` hook correctly handles 'mosikasign:declined' event
- [ ] `onDeclined` callback is called with correct data structure
- [ ] Type checking for `DeclineData` interface
- [ ] Backward compatibility: existing code without `onDeclined` still works

### Integration Tests
- [ ] MosikaSign form sends `mosikasign:declined` postMessage on decline
- [ ] React component receives and dispatches `onDeclined` callback
- [ ] Decline data matches expected structure
- [ ] Both completed and declined flows work simultaneously

### Manual Testing
- [ ] Open form in iframe
- [ ] Click "Decline" button
- [ ] Enter decline reason
- [ ] Confirm decline
- [ ] React component receives `onDeclined` callback with correct data
- [ ] UI can process decline data and send to backend

---

## BUILD & DEPLOYMENT

### Build
```bash
cd mosikasign-react
npm install
npm run build
```

### Output Files
- `dist/index.js` - CommonJS build
- `dist/index.esm.js` - ES Module build
- `dist/index.d.ts` - TypeScript declarations

### Publish to npm
```bash
npm login
npm publish
```

### Verify Publication
```bash
npm view @mosikasign/react version
# Should show: 1.1.0
```

---

## DOCUMENTATION UPDATES NEEDED

When publishing, update your documentation:

1. **README.md**
   - Add `onDeclined` callback to API reference
   - Add usage example for handling decline
   - Document the `DeclineData` interface

2. **API Reference**
   - Document new prop: `onDeclined`
   - Document new type: `DeclineData`
   - Add event flow diagram

3. **Installation Guide**
   - Mention new feature: "Now supports form decline/refusal handling"

---

## PERFORMANCE IMPACT

- **Bundle Size**: +~0.5 KB (type definitions only, compiled code is minimal)
- **Runtime**: No performance impact (same postMessage mechanism as onCompleted)
- **Memory**: No additional memory usage

---

## SECURITY CONSIDERATIONS

✅ All security measures maintained:
- PostMessage origin validation still enforced
- XSS protection (using React/TypeScript)
- CSRF protection handled by MosikaSign backend
- No new security risks introduced

---

## KNOWN LIMITATIONS

1. **Decline Reason Character Limit**
   - MosikaSign decline form uses textarea (no explicit limit in code)
   - Recommend documenting reasonable limit (e.g., 500 characters)

2. **Decline Reason Extraction**
   - Currently extracts from `submission_events` table
   - If event not found, uses default: "Formulaire refusé par l'utilisateur"

3. **Browser Compatibility**
   - Requires postMessage API support
   - Ancient browsers (IE10 and below) not supported

---

## MIGRATION GUIDE FOR TEAMS

### For Frontend Teams Using Old Component

**Before (v1.0.3)**:
```typescript
<MosikaSignForm
  formUrl={url}
  onCompleted={handleCompleted}
  onError={handleError}
/>
```

**After (v1.1.0)** - Optional upgrade:
```typescript
<MosikaSignForm
  formUrl={url}
  onCompleted={handleCompleted}
  onDeclined={handleDeclined}  // ← Add this line
  onError={handleError}
/>
```

**No forced changes** - Existing code continues to work.

---

## COMMIT MESSAGE

```
feat: Add onDeclined callback support for form decline events

- Add DeclineData interface with decline reason and timestamp
- Add onDeclined prop to MosikaSignForm component
- Implement postMessage listener for decline events in usePostMessage hook
- Update MosikaSign declined.html.erb to send decline postMessage
- Maintain full backward compatibility (no breaking changes)
- Bump version to 1.1.0
```

---

## RELEASE NOTES FOR USERS

### Version 1.1.0 - Form Decline Support

**What's New**: The MosikaSign React component now supports handling form decline/refusal events with a new `onDeclined` callback prop.

**Use Cases**:
- Track when users refuse to sign documents
- Capture decline reasons
- Update backend systems (mark submissions as rejected)
- Trigger alternative workflows (e.g., escalate to manager)

**Example**:
```typescript
<MosikaSignForm
  formUrl={signUrl}
  onDeclined={(data) => {
    console.log(`User ${data.submitterEmail} declined: ${data.declineReason}`);
    updateBackend(data.slug, 'declined');
  }}
/>
```

**Backward Compatibility**: ✅ Fully backward compatible. No code changes required for existing implementations.

**Installation**: `npm install @mosikasign/react@1.1.0`

---

## QUESTIONS?

Refer to the implementation guide: `IMPLEMENTATION_OPTION_2.md`

For more details on integration: `REACT_COMPONENT_ANALYSIS.md`
