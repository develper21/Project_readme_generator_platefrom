# 🧪 Testing Guide

## Manual Testing Checklist

### 1. Authentication Testing

#### GitHub OAuth
- [ ] Click "Sign in with GitHub"
- [ ] Authorize application
- [ ] Verify redirect to dashboard
- [ ] Check user info displays correctly
- [ ] Test sign out functionality

#### Session Persistence
- [ ] Refresh page while logged in
- [ ] Verify session persists
- [ ] Close and reopen browser
- [ ] Check auto-login works

### 2. Repository Fetching

#### Basic Functionality
- [ ] Repositories load on dashboard
- [ ] Repository count is accurate
- [ ] Repository details display correctly:
  - Name
  - Description
  - Language
  - Stars/Forks/Issues
  - Last updated date
  - Public/Private status

#### Filtering
- [ ] Click "All Projects" - shows all repos
- [ ] Click "Public" - shows only public repos
- [ ] Click "Private" - shows only private repos
- [ ] Verify counts update correctly

#### Search
- [ ] Search by repository name
- [ ] Search by description
- [ ] Search by language
- [ ] Verify results filter correctly
- [ ] Clear search shows all repos

### 3. README Generation

#### Small Repository (< 10 files)
- [ ] Click "Generate README"
- [ ] Loading indicator appears
- [ ] Generation completes in < 30 seconds
- [ ] README displays in modal
- [ ] Content is relevant to project

#### Medium Repository (10-50 files)
- [ ] Generation completes in < 60 seconds
- [ ] All major files analyzed
- [ ] Technologies detected correctly
- [ ] README is comprehensive

#### Large Repository (> 50 files)
- [ ] System limits to 50 files
- [ ] Important files prioritized
- [ ] Generation still completes
- [ ] README quality maintained

### 4. README Preview Modal

#### Display
- [ ] Modal opens correctly
- [ ] Repository name shown
- [ ] README content displays
- [ ] Scroll works for long content
- [ ] Close button works

#### View Modes
- [ ] Toggle to "Preview" mode
- [ ] Toggle to "Raw Markdown" mode
- [ ] Both modes display correctly
- [ ] Line count and size shown

#### Actions
- [ ] Download README.md file
- [ ] Verify file downloads correctly
- [ ] File contains correct content
- [ ] Copy to clipboard works
- [ ] Paste verifies content copied

### 5. Error Handling

#### Network Errors
- [ ] Disconnect internet
- [ ] Try to fetch repos
- [ ] Error message displays
- [ ] Retry button works

#### API Errors
- [ ] Invalid GitHub token (simulate)
- [ ] Error handled gracefully
- [ ] User-friendly message shown

#### Generation Failures
- [ ] Invalid repository
- [ ] AI API failure
- [ ] Fallback template used
- [ ] User notified appropriately

### 6. UI/UX Testing

#### Responsive Design
- [ ] Test on desktop (1920x1080)
- [ ] Test on laptop (1366x768)
- [ ] Test on tablet (768x1024)
- [ ] Test on mobile (375x667)
- [ ] All elements accessible
- [ ] No horizontal scroll

#### Loading States
- [ ] Spinner shows while loading repos
- [ ] Button disabled during generation
- [ ] Loading text updates
- [ ] No UI freezing

#### Statistics
- [ ] Total projects count correct
- [ ] Public repos count correct
- [ ] Private repos count correct
- [ ] Total stars count correct

## API Testing

### Test `/api/repos`

```bash
# Must be authenticated first
curl http://localhost:3000/api/repos \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN"
```

Expected: Array of repositories

### Test `/api/generate`

```bash
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN" \
  -d '{
    "owner": "username",
    "repo": "repo-name",
    "repoData": {
      "description": "Test repo",
      "language": "JavaScript",
      "stars": 0,
      "forks": 0
    }
  }'
```

Expected: Generated README with metadata

## Performance Testing

### Load Time
- [ ] Dashboard loads in < 3 seconds
- [ ] Repositories fetch in < 5 seconds
- [ ] README generation < 60 seconds

### Concurrent Users
- [ ] Multiple users can use simultaneously
- [ ] No session conflicts
- [ ] Database handles concurrent requests

## Security Testing

### Authentication
- [ ] Cannot access dashboard without login
- [ ] Session expires appropriately
- [ ] Tokens stored securely
- [ ] No token leakage in URLs

### Authorization
- [ ] Can only see own repositories
- [ ] Cannot generate for others' private repos
- [ ] API validates user ownership

### Data Protection
- [ ] No sensitive data in logs
- [ ] Environment variables secure
- [ ] No API keys in client code

## Browser Compatibility

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari
- [ ] Mobile Chrome

## Test Scenarios

### Scenario 1: First-Time User
1. Visit homepage
2. Click "Sign in with GitHub"
3. Authorize application
4. See dashboard with repos
5. Generate README for first repo
6. Download generated file
7. Success!

### Scenario 2: Returning User
1. Visit homepage
2. Auto-login (session exists)
3. Dashboard loads immediately
4. Generate README for new repo
5. Copy to clipboard
6. Success!

### Scenario 3: Error Recovery
1. Start README generation
2. Simulate network failure
3. See error message
4. Retry generation
5. Success on retry

### Scenario 4: Multiple Generations
1. Generate README for repo A
2. Download it
3. Close modal
4. Generate README for repo B
5. Copy to clipboard
6. Both work correctly

## Known Limitations

1. **File Limit**: Maximum 50 files analyzed per repo
2. **File Size**: Files > 100KB skipped
3. **Rate Limits**: GitHub API limited to 5000 requests/hour
4. **AI Quota**: Gemini free tier has usage limits
5. **Generation Time**: Large repos may take 30-60 seconds

## Reporting Issues

When reporting issues, include:
- Browser and version
- Steps to reproduce
- Expected vs actual behavior
- Console errors (if any)
- Network errors (if any)
- Screenshots (if applicable)

## Success Metrics

✅ **All tests pass** = Production ready!

- Authentication: 100% working
- Repository fetching: 100% working
- README generation: 95%+ success rate
- UI/UX: No major issues
- Performance: Within acceptable limits
- Security: No vulnerabilities found

## Next Steps After Testing

1. Fix any identified issues
2. Document edge cases
3. Add automated tests (optional)
4. Deploy to production
5. Monitor real-world usage
6. Gather user feedback
7. Iterate and improve

---

**Happy Testing! 🎯**
