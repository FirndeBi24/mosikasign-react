# IMPLEMENTATION GUIDE - MosikaSign React Component v1.1.0

**Purpose**: Step-by-step guide to build, test, and deploy the updated component with onDeclined support

**Timeline**: ~2 hours (build + test + publish)

---

## PHASE 1: VERIFY CHANGES (15 minutes)

### Step 1.1: Verify Modified Files

```bash
cd C:\Users\djaan\Documents\Firnde Bi\recup\mosikasign-react

# Check git status to see what changed
git status

# Expected files modified:
# - src/types.ts
# - src/hooks/usePostMessage.ts
# - src/MosikaSignForm.tsx
# - src/index.ts
# - package.json
```

### Step 1.2: Review Changes

```bash
# See the diff of changes
git diff src/types.ts
git diff src/hooks/usePostMessage.ts
git diff src/MosikaSignForm.tsx
git diff src/index.ts
git diff package.json
```

### Step 1.3: Verify MosikaSign Backend

```bash
cd C:\Users\djaan\Documents\Firnde Bi\recup\MosikaSign

# Check declined.html.erb was updated
git status app/views/submit_form/declined.html.erb
git diff app/views/submit_form/declined.html.erb
```

**Expected Changes**:
- Added postMessage script block
- Includes decline reason extraction
- Sends to parent window

---

## PHASE 2: BUILD (30 minutes)

### Step 2.1: Install Dependencies

```bash
cd C:\Users\djaan\Documents\Firnde Bi\recup\mosikasign-react

# Install npm dependencies
npm install

# Verify all dependencies installed
npm list | head -20
```

**Expected**: No errors, all packages installed

### Step 2.2: TypeScript Compilation Check

```bash
# Check TypeScript compilation
npx tsc --noEmit

# Expected: No errors
```

### Step 2.3: Build Component

```bash
# Build the component
npm run build

# This creates:
# - dist/index.js (CommonJS)
# - dist/index.esm.js (ES Module)
# - dist/index.d.ts (TypeScript declarations)
```

**Expected Output**:
```
dist/
├── index.js
├── index.esm.js
├── index.d.ts
├── index.d.ts.map
└── (other bundled files)
```

### Step 2.4: Verify Build Output

```bash
# Check that declarations include DeclineData
grep -n "DeclineData" dist/index.d.ts

# Expected output:
# export interface DeclineData { ... }
# export type MosikaSignMessage = ... | DeclineData | ...
```

### Step 2.5: Check Bundle Size

```bash
# Check size of bundles
ls -lh dist/index.js dist/index.esm.js

# Expected: ~5-10 KB each (minimal increase from v1.0.0)
```

---

## PHASE 3: UNIT TESTING (30 minutes)

### Step 3.1: Create Test Files (if not exist)

If you have Jest/testing setup, add tests. If not, create basic tests:

**File**: `src/__tests__/usePostMessage.test.ts`

```typescript
import { renderHook } from '@testing-library/react';
import { usePostMessage } from '../hooks/usePostMessage';

describe('usePostMessage - onDeclined', () => {
  it('should call onDeclined callback when mosikasign:declined event received', () => {
    const onDeclined = jest.fn();

    renderHook(() => usePostMessage({ onDeclined }));

    // Simulate postMessage from iframe
    const declineData = {
      type: 'mosikasign:declined',
      slug: 'test-slug',
      submitterId: '123',
      submissionId: '456',
      declinedAt: '2024-01-30T10:30:00Z',
      declineReason: 'Test decline reason'
    };

    window.postMessage(declineData, '*');

    expect(onDeclined).toHaveBeenCalledWith(declineData);
  });

  it('should not interfere with onCompleted', () => {
    const onCompleted = jest.fn();
    const onDeclined = jest.fn();

    renderHook(() => usePostMessage({ onCompleted, onDeclined }));

    const completedData = {
      type: 'mosikasign:completed',
      slug: 'test-slug',
      submitterId: '123',
      submissionId: '456',
      completedAt: '2024-01-30T10:30:00Z'
    };

    window.postMessage(completedData, '*');

    expect(onCompleted).toHaveBeenCalledWith(completedData);
    expect(onDeclined).not.toHaveBeenCalled();
  });
});
```

### Step 3.2: Run Tests

```bash
# If using Jest
npm test

# Expected: Tests pass with no errors
```

### Step 3.3: Type Checking

```bash
# Run TypeScript strict checking
npx tsc --strict --noEmit

# Expected: No type errors
```

---

## PHASE 4: MANUAL TESTING (45 minutes)

### Step 4.1: Setup Test Environment

```bash
# Start MosikaSign Rails app (if using Docker)
cd C:\Users\djaan\Documents\Firnde Bi\recup\MosikaSign

docker compose build
docker compose up -d

# Wait for services to start
sleep 10
docker compose ps

# Expected: All services running
```

### Step 4.2: Link Component Locally

```bash
cd C:\Users\djaan\Documents\Firnde Bi\recup\mosikasign-react

# Create local npm link
npm link

# This allows local projects to use this component from disk
```

### Step 4.3: Test in Frontend

**Option A**: If using FirnDeBi frontend

```bash
cd C:\Users\djaan\Documents\Firnde Bi\recup\firndebi-front

# Link the component
npm link @mosikasign/react

# Start dev server
npm run dev

# Navigate to signature-management page
# Open browser at http://localhost:4028/ministere/signature-management
```

**Option B**: Create minimal test app

```bash
# Create test app
npx create-react-app mosikasign-test

cd mosikasign-test

# Link component
npm link @mosikasign/react

# Update src/App.jsx
```

**Test Code** (`src/App.jsx`):

```typescript
import React, { useState } from 'react';
import { MosikaSignForm, type DeclineData } from '@mosikasign/react';

function App() {
  const [status, setStatus] = useState('waiting');
  const [data, setData] = useState(null);

  const handleCompleted = (data) => {
    console.log('✅ Completed:', data);
    setStatus('completed');
    setData(data);
  };

  const handleDeclined = (data: DeclineData) => {
    console.log('❌ Declined:', data);
    console.log('Reason:', data.declineReason);
    setStatus('declined');
    setData(data);
  };

  const handleError = (error) => {
    console.error('Error:', error);
    setStatus('error');
    setData(error);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>MosikaSign Test - v1.1.0</h1>

      <p>Status: <strong>{status}</strong></p>

      {data && (
        <pre style={{ background: '#f0f0f0', padding: '10px' }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}

      <h2>Test Form</h2>
      <MosikaSignForm
        formUrl="https://your-mosikasign-instance.com/s/test-slug"
        onCompleted={handleCompleted}
        onDeclined={handleDeclined}
        onError={handleError}
        height="600px"
      />
    </div>
  );
}

export default App;
```

```bash
npm start

# Navigate to http://localhost:3000
```

### Step 4.4: Manual Test Scenarios

**Scenario 1: Form Completion** ✅
1. Load form
2. Fill required fields
3. Click "Sign" button
4. Verify `onCompleted` callback triggered
5. Check data includes: slug, submitterId, submissionId, completedAt

**Scenario 2: Form Decline** ✅
1. Load form
2. Click "Decline" button
3. Enter decline reason (e.g., "Invalid documents")
4. Click "Confirm Decline"
5. **Verify `onDeclined` callback triggered**
6. **Check data includes**: slug, submitterId, submissionId, declinedAt, declineReason
7. Verify reason matches what was entered

**Scenario 3: Error Handling** ✅
1. Use invalid form URL
2. Verify `onError` callback triggered
3. Check error data is correct

**Scenario 4: Backward Compatibility** ✅
1. Test component WITHOUT `onDeclined` prop
2. Verify existing completed/error flows still work
3. No console errors

### Step 4.5: Browser Console Checks

While testing, open browser DevTools (F12) and check:

```javascript
// Should see logs:
// ✅ "✅ Completed: { type: 'mosikasign:completed', slug: '...', ... }"
// ✅ "❌ Declined: { type: 'mosikasign:declined', slug: '...', declineReason: '...', ... }"
// ✅ No error messages or warnings
```

### Step 4.6: Check Network Tab

In browser DevTools Network tab:
- Verify postMessage is being sent (not visible in Network, but you'll see the event logged)
- Verify backend API call is made (if testing with backend)

---

## PHASE 5: GIT COMMIT (10 minutes)

### Step 5.1: Stage Changes

```bash
# Go to mosikasign-react directory
cd C:\Users\djaan\Documents\Firnde Bi\recup\mosikasign-react

# Stage all changes
git add src/ package.json CHANGELOG_V1.1.0.md

# Also stage MosikaSign changes
cd ..\MosikaSign
git add app/views/submit_form/declined.html.erb
```

### Step 5.2: Create Commit

**For mosikasign-react**:

```bash
git commit -m "feat: Add onDeclined callback support for form decline events

- Add DeclineData interface with decline reason and timestamp
- Add onDeclined prop to MosikaSignForm component
- Implement postMessage listener for decline events in usePostMessage hook
- Update TypeScript types to include decline event
- Bump version to 1.1.0

BREAKING CHANGES: None - fully backward compatible
"
```

**For MosikaSign**:

```bash
cd ..\MosikaSign

git commit -m "feat: Send postMessage on form decline for iframe integration

- Add postMessage script to declined.html.erb
- Include decline reason extracted from submission_events
- Include all submitter data for parent window notification
- Enables React component onDeclined callback

BREAKING CHANGES: None - new feature
"
```

### Step 5.3: Verify Commits

```bash
git log --oneline -5

# Should show your new commits at top
```

---

## PHASE 6: PUBLISH TO NPM (15 minutes)

### Step 6.1: Authenticate with npm

```bash
npm login

# If you're not logged in, you'll be prompted for:
# - Username
# - Password
# - Email (for 2FA if enabled)
```

### Step 6.2: Update Version Tags

```bash
cd C:\Users\djaan\Documents\Firnde Bi\recup\mosikasign-react

# Verify version is 1.1.0
cat package.json | grep version

# Expected:
# "version": "1.1.0",
```

### Step 6.3: Create Git Tag

```bash
# Tag the release
git tag v1.1.0

# Verify tag created
git tag -l

# Push tag to remote
git push origin v1.1.0
```

### Step 6.4: Publish to npm

```bash
cd C:\Users\djaan\Documents\Firnde Bi\recup\mosikasign-react

# This will automatically build before publishing
npm publish

# Expected output:
# npm notice Publishing to https://registry.npmjs.org/
# npm notice Publishing package

# Watch for successful completion (npm notice publish success)
```

### Step 6.5: Verify Publication

```bash
# Check npm registry
npm view @mosikasign/react version

# Expected output:
# 1.1.0

# Also check on website
# https://www.npmjs.com/package/@mosikasign/react
```

---

## PHASE 7: UPDATE FRONTEND (30 minutes)

### Step 7.1: Update Package Version in FirnDeBi

```bash
cd C:\Users\djaan\Documents\Firnde Bi\recup\firndebi-front

# Update package.json
npm install @mosikasign/react@1.1.0

# Or manually update package.json:
# "@mosikasign/react": "^1.1.0"

npm install
```

### Step 7.2: Implement onDeclined Handler

**File**: `src/app/ministere/signature-management/SignatureManagementPage.jsx`

```typescript
import { rejectSignature } from '@/services/lots';

export function SignatureManagementPage() {
  // ... existing code ...

  const handleSignatureDeclined = useCallback(async (declineData) => {
    if (!signingSession) return;

    const submissionSlug = declineData.slug;
    const declineReason = declineData.declineReason;

    // Validation
    if (!submissionSlug || typeof submissionSlug !== 'string') {
      logger.error('Missing or invalid submission slug:', declineData);
      showErrorToast('Une erreur technique est survenue. Données de refus invalides.');
      return;
    }

    const sessionKey = `${signingSession.lotId}-${submissionSlug}-decline`;

    // Prevent duplicate processing
    if (completingSessionIdRef.current === sessionKey) {
      logger.warn('Signature decline already in progress for this session, ignoring duplicate call');
      return;
    }

    completingSessionIdRef.current = sessionKey;
    setSigningInProgress(true);

    try {
      logger.info(`Rejecting signature for lot ${signingSession.lotId}`, {
        submission_slug: submissionSlug,
        reason: declineReason
      });

      // Call backend to record the decline
      await rejectSignature(
        signingSession.lotId,
        {
          submission_id: submissionSlug,
          decline_reason: declineReason
        },
        signatureAbortControllerRef.current?.signal
      );

      logger.info('Signature decline recorded successfully');

      // Close modal and reset guard BEFORE refresh
      completingSessionIdRef.current = null;
      setSigningSession(null);

      // Show success message
      showSuccessToast('Signature refusée avec succès!');

      // Refresh the list to update status
      try {
        await loadSignatureData();
      } catch (refreshError) {
        logger.error('Failed to refresh signature list after decline:', refreshError);
        showInfoToast('Refus enregistré. Veuillez rafraîchir la page pour voir les changements.');
      }
    } catch (error) {
      logger.error('Failed to reject signature:', error);
      handleGlobalApiError(error);
      completingSessionIdRef.current = null;
    } finally {
      setSigningInProgress(false);
    }
  }, [signingSession, loadSignatureData]);

  // In JSX, update MosikaSignForm:
  return (
    <>
      {/* ... existing code ... */}

      <MosikaSignForm
        formUrl={signingSession.signUrl}
        onCompleted={handleSignatureComplete}
        onDeclined={handleSignatureDeclined}  // ← ADD THIS LINE
        onError={handleSignatureError}
      />
    </>
  );
}
```

### Step 7.3: Verify Integration

```bash
# Start frontend
npm run dev

# Test with actual MosikaSign form
# Navigate to signature-management page
# Test decline flow end-to-end
```

---

## PHASE 8: DOCUMENTATION UPDATES (20 minutes)

### Step 8.1: Update Component README

**File**: `C:\Users\djaan\Documents\Firnde Bi\recup\mosikasign-react\README.md`

Add section:

```markdown
## Form Decline Handling

The component now supports handling form decline events via the `onDeclined` callback:

### Example

\`\`\`typescript
import { MosikaSignForm, type DeclineData } from '@mosikasign/react';

function MyComponent() {
  const handleDeclined = (data: DeclineData) => {
    console.log(`Form declined at ${data.declinedAt}`);
    console.log(`Reason: ${data.declineReason}`);

    // Send to backend API
    fetch('/api/forms/{formId}/decline', {
      method: 'POST',
      body: JSON.stringify({
        submission_id: data.slug,
        decline_reason: data.declineReason
      })
    });
  };

  return (
    <MosikaSignForm
      formUrl={formUrl}
      onDeclined={handleDeclined}
    />
  );
}
\`\`\`

### DeclineData Interface

\`\`\`typescript
interface DeclineData {
  type: 'mosikasign:declined';
  slug: string;                    // Submission identifier
  submitterId: string;             // MosikaSign submitter ID
  submissionId: string;            // MosikaSign submission ID
  declinedAt: string;              // ISO 8601 timestamp
  declineReason: string;           // User-entered reason
  submitterName?: string;          // Signer name (if available)
  submitterEmail?: string;         // Signer email (if available)
}
\`\`\`
```

### Step 8.2: Update Project Documentation

Add to your project's API documentation that `/reject-signature/` endpoint is now available and can be called when form is declined.

---

## VERIFICATION CHECKLIST

Before considering this complete, verify:

- [ ] All 5 source files modified correctly
- [ ] Component builds without errors
- [ ] No TypeScript errors
- [ ] Unit tests pass (if you have them)
- [ ] Manual testing completed all scenarios
- [ ] Git commits created
- [ ] Published to npm as v1.1.0
- [ ] Frontend updated to use v1.1.0
- [ ] onDeclined handler implemented in SignatureManagementPage
- [ ] End-to-end test: form decline → backend API call → status update
- [ ] Documentation updated

---

## TROUBLESHOOTING

### Build Fails

```bash
# Clear dist and node_modules
rm -rf dist node_modules
npm install
npm run build
```

### postMessage Not Working

Check:
1. MosikaSign declined.html.erb has the script block
2. Browser console shows postMessage event (use DevTools)
3. allowedOrigins setting if used

### Component Not Receiving Event

```javascript
// Add debug logging in browser console
window.addEventListener('message', (event) => {
  console.log('Message received:', event.data);
});
```

### npm Publish Fails

```bash
# Verify logged in
npm whoami

# If not logged in
npm login

# Try publish again
npm publish
```

---

## SUMMARY

**Total Time**: ~2 hours
**Phases**: 8 phases (verify → build → test → commit → publish → integrate → docs → verify)

**Result**:
- ✅ Component v1.1.0 published to npm
- ✅ MosikaSign backend updated with decline postMessage
- ✅ FirnDeBi frontend integrated with onDeclined handler
- ✅ Complete signature refusal workflow working end-to-end
- ✅ Full backward compatibility maintained

---

**Next Steps**:
1. Deploy FirnDeBi frontend to staging
2. Deploy MosikaSign backend to staging
3. Perform end-to-end testing in staging
4. Deploy to production
