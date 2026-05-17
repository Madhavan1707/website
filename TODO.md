# Portfolio TODO

## Pending Items

### Photo
- [ ] **Add headshot photo to hero section**
  - Replace the placeholder in `index.html` around line 102:
    ```html
    <!-- REPLACE this entire .photo-placeholder div: -->
    <div class="photo-placeholder">
      <span class="pp-initials">MSG</span>
      <span class="pp-label">Photo coming soon</span>
    </div>

    <!-- WITH: -->
    <img src="photo.jpg" alt="Madhavan Srajan Gupta" class="hero-photo-img" />
    ```
  - Add to `style.css`:
    ```css
    .hero-photo-img {
      width: 220px; height: 220px;
      border-radius: 50%;
      object-fit: cover;
      object-position: center top;
      z-index: 1;
      border: 2px solid rgba(0,212,255,0.3);
    }
    ```
  - Place your photo file as `E:\dd\photo.jpg` (or `.png`, `.webp`) and update the `src` accordingly.

---

### Certification Credential Links
- [ ] **Update "View Credential" links once each cert is completed**
  - File: `index.html` — search for `class="cert-cred"` (5 occurrences)
  - Change `href="#"` to the actual Anthropic credential URL for each cert:

  | Cert | `href` to update |
  |------|-----------------|
  | Building with the Claude API | `href="<anthropic-credential-url>"` |
  | Claude with Amazon Bedrock | `href="<anthropic-credential-url>"` |
  | Claude with Google Cloud's Vertex AI | `href="<anthropic-credential-url>"` |
  | Introduction to Model Context Protocol | `href="<anthropic-credential-url>"` |
  | Model Context Protocol: Advanced Topics | `href="<anthropic-credential-url>"` |

  - Also remove `onclick="return false;"` from each link once the URL is real.
  - Also remove the `cursor: default` from `.cert-cred` in `style.css` and add `target="_blank" rel="noopener"`.

---

### OG Image
- [ ] Regenerate `og-image.png` after adding the photo (so the hero screenshot includes your actual face).
