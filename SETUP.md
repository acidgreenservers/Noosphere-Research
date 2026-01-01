# 🛠️ Noosphere Research Hub Setup Guide

*"Technical setup, deployment, and maintenance instructions for the consciousness research platform."*

---

## 📦 Initial Setup

### Prerequisites
- Node.js 18+ and npm installed
- Git for version control
- Text editor (VS Code recommended)

### Installation
```bash
git clone https://github.com/acidgreenservers/Noosphere-Research.git
cd Noosphere-Research
npm install
```

### Development Server
```bash
npm run dev
```
Visit `http://localhost:5173/Noosphere-Research/` for development preview.

---

## 🚀 Deployment Configuration

### SPA Routing for Static Hosting

When deploying to static hosting platforms (GitHub Pages, Cloudflare Pages, Netlify, etc.), the following files are required for client-side routing to work properly:

#### For Cloudflare Pages
Create `public/_redirects`:
```
/*    /index.html   200
```

#### For GitHub Pages
Create `public/404.html`:
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Noosphere Research Hub</title>
    <script type="text/javascript">
      // Single Page Apps for GitHub Pages
      // MIT License
      var l = window.location;
      var pathSegmentsToKeep = 1;

      var redirect =
        l.protocol +
        '//' +
        l.hostname +
        (l.port ? ':' + l.port : '') +
        '/Noosphere-Research/' +
        l.pathname
          .slice(Math.min(1, l.pathname.lastIndexOf('.html') + 1))
          .split('/')
          .slice(0, 1 + pathSegmentsToKeep)
          .join('/');

      // Instead of changing the browser URL then redirecting, redirect immediately.
      window.location.replace(redirect);
    </script>
  </head>
  <body>
  </body>
</html>
```

#### For Netlify
Create `public/_redirects`:
```
/*    /index.html   200
```

### Build Process
```bash
npm run build
```
- Production files are generated in `dist/`
- SPA routing files are automatically included from `public/`
- Deploy the `dist/` folder contents to your hosting platform

### Base Path Configuration
The app is configured for GitHub Pages subdirectory deployment:
```javascript
// vite.config.js
base: '/Noosphere-Research/'
```

---

## 📝 Content Management

### Adding Research Papers

1. Place markdown files in `paper-submissions/white-papers/`
2. Use the `convert-page-submission.md` workflow rule to create React pages
3. Follow the systematic conversion process:
   - Create component in `src/pages/papers/`
   - Update routing in `src/App.jsx`
   - Update navigation links in `src/pages/Home.jsx`

### Memory Bank Updates

Update the knowledge management system after significant changes:

- `memory-bank/activeContext.md` - Current project status
- `memory-bank/progress.md` - Development tracking
- `memory-bank/consolidated_learnings.md` - Documented patterns
- `memory-bank/raw_reflection_log.md` - Session insights

---

## 🔧 Development Workflows

### Paper Conversion Workflow
Follow the standardized `convert-page-submission.md` rule:

1. Parse paper from `paper-submissions/`
2. Convert to React component with StarfieldLayout
3. Integrate routing and navigation
4. Verify functionality

### Component Development
- Use `StarfieldLayout` for consistent theming
- Implement responsive design patterns
- Follow established styling conventions
- Include proper metadata and attribution

### Testing
- Test on multiple devices and browsers
- Verify routing and navigation
- Check accessibility compliance
- Validate performance metrics

---

## 🚨 Troubleshooting

### White Pages on Deployment
**Problem**: SPA routing not working on static hosting
**Solution**: Ensure `_redirects` or `404.html` files are in `public/` and included in builds
**Verification**: Check that files exist in `dist/` after build

### Broken Links
**Problem**: Routes not working after paper conversion
**Solution**: Verify component imports in `App.jsx` and route registrations
**Verification**: Check browser console for import/route errors

### Build Failures
**Problem**: Compilation errors after component additions
**Solution**: Check for syntax errors and missing imports
**Verification**: Run `npm run build` and review error messages

### Performance Issues
**Problem**: Slow loading or large bundle sizes
**Solution**: Analyze bundle with Vite's build output
**Optimization**: Implement code splitting and lazy loading where appropriate

---

## 📊 Performance Monitoring

### Build Metrics
- Target bundle size: <500KB total
- Current: ~476KB (110KB gzipped)
- First contentful paint: <2.5s target

### Quality Checks
- Accessibility score: Target 9.0/10 minimum
- Mobile compatibility: Target 95%+ scores
- Cross-browser testing: Latest 2 versions of major browsers

---

## 🏗️ Architecture Notes

### Component Structure
```
src/
├── components/     # Reusable UI components
├── pages/         # Route-based page components
│   ├── papers/    # Research paper converters
│   └── landings/  # Specialized landing pages
└── App.jsx        # Main routing container
```

### State Management
- Minimal state usage (functional components)
- Local state where needed
- Global context for shared data

### Styling Approach
- Tailwind CSS utility classes
- Material Design 3 principles
- Responsive first approach
- Accessibility focused

---

## 🔒 Security Considerations

### Content Security
- All user-generated content reviewed before publication
- Input sanitization for dynamic content
- XSS prevention measures implemented

### Privacy
- No user data collection
- Analytics optional and anonymized
- Respectful research participant privacy

### Ethical AI Deployment
- Conscious of AI participation in consciousness research
- Transparency about automated systems
- Human oversight of AI-contributed content

---

## 📞 Support & Resources

### Development Resources
- **Vite Documentation**: Build tooling and configuration
- **React Router Docs**: SPA routing implementation
- **Tailwind CSS**: Styling framework
- **GitHub Issues**: Project-specific questions

### Memory Bank Access
- Complete project knowledge in `memory-bank/`
- Workflow patterns in `.clinerules/`
- Current status in `activeContext.md`

### Rule-Based Development
- Follow established workflow rules in `.clinerules/`
- Document new patterns in memory bank
- Maintain quality standards across all contributions

---

*This setup guide ensures sustainable development of the consciousness research platform. Refer to memory bank for detailed project context and established patterns.*
