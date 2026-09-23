/* ============================================================
   LEO HANDS OF NURTURE — app.js v4
   ============================================================ */

(function () {
  'use strict';

  /* ─── Reduced motion ─── */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─── Utilities ─── */
  function throttle(fn, wait) {
    let last = 0;
    return function (...args) {
      const now = Date.now();
      if (now - last >= wait) { last = now; fn.apply(this, args); }
    };
  }

  function debounce(fn, wait) {
    let timer;
    return function (...args) { clearTimeout(timer); timer = setTimeout(() => fn.apply(this, args), wait); };
  }

  const $  = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => [...(ctx || document).querySelectorAll(sel)];

  /* Content supplied later can be added here without changing page markup. */
  const siteData = {
    overallStats: {
      participantsReached: null,
      eventsCompleted: null,
      volunteersInvolved: null,
      communitiesReached: null,
    },
    pillars: Array.from({ length: 8 }, (_, index) => ({
      number: String(index + 1).padStart(2, '0'),
      name: `[PILLAR ${String(index + 1).padStart(2, '0')} — CONTENT TO BE PROVIDED]`,
      description: '[Official pillar description to be provided by the organization.]',
      image: null,
    })),
    teamDepartments: [
      {
        id: 'executive',
        number: '01',
        name: 'EXECUTIVE TEAM',
        description: 'Guiding the overarching strategic vision, partnerships, and core operations of Leo Hands of Nurture in Makassar.',
        members: [
          {
            id: 'intan-soetrisno',
            name: 'Nur Mani Intan Soetrisno',
            age: 16,
            department: 'Executive Team',
            image: 'assets/team/intan-soetrisno.jpg',
            imagePosition: 'center 20%',
            quote: 'To be able to bring service to people in need is honestly such a privilege. Because what’s the point of having something good if you can’t use it to do some good too?',
            instagram: {
              handle: '@intannsoe',
              url: 'https://www.instagram.com/intannsoe/'
            },
            linkedin: null,
            substack: null,
            isLeader: false
          },
          {
            id: 'arwendy-arifin',
            name: 'Arwendy Arifin',
            age: 17,
            department: 'Executive Team',
            image: 'assets/team/arwendy-arifin.jpg',
            imagePosition: 'center 15%',
            quote: 'Smile and be wild',
            instagram: {
              handle: '@apacihehe',
              url: 'https://www.instagram.com/apacihehe/'
            },
            linkedin: null,
            substack: null,
            isLeader: false
          },
          {
            id: 'edith-hoeijaya',
            name: 'Edith Hoeijaya',
            age: 17,
            department: 'Executive Team',
            image: 'assets/team/edith-hoeijaya.jpg',
            imagePosition: 'center 20%',
            quote: 'We may not be able to help everyone, but we can help someone',
            instagram: {
              handle: '@edith_hoeijaya',
              url: 'https://www.instagram.com/edith_hoeijaya/'
            },
            linkedin: null,
            substack: {
              publication: 'Interlinia Publication',
              handle: '@edith hoeijaya',
              url: null
            },
            isLeader: false
          },
          {
            id: 'nur-aqilah-zahrah',
            name: 'Nur Aqilah Zahrah A.',
            age: 16,
            department: 'Executive Team',
            image: 'assets/team/nur-aqilah-zahrah.jpg',
            imagePosition: 'center 25%',
            quote: 'Service to others is the rent you pay for your room here on Earth. — Muhammad Ali',
            instagram: {
              handle: '@nurz_ahraaa',
              url: 'https://www.instagram.com/nurz_ahraaa/'
            },
            linkedin: null,
            substack: null,
            isLeader: false
          },
          {
            id: 'chayla',
            name: 'Chayla',
            age: null,
            department: 'Executive Team',
            image: null,
            quote: null,
            instagram: null,
            linkedin: null,
            substack: null,
            isLeader: false
          }
        ]
      },
      {
        id: 'social-media',
        number: '02',
        name: 'SOCIAL MEDIA TEAM',
        description: 'Documenting community stories, elevating youth voices, and shaping digital storytelling across Makassar and beyond.',
        members: [
          {
            id: 'fiona-gauw',
            name: 'Fiona Gauw',
            age: 16,
            department: 'Social Media Team',
            image: 'assets/team/fiona-gauw.jpg',
            imagePosition: 'center 20%',
            quote: null,
            instagram: null,
            linkedin: null,
            substack: null,
            isLeader: false
          },
          {
            id: 'clarence',
            name: 'Clarence',
            age: null,
            department: 'Social Media Team',
            image: null,
            quote: null,
            instagram: null,
            linkedin: null,
            substack: null,
            isLeader: false
          },
          {
            id: 'rebecca',
            name: 'Rebecca',
            age: null,
            department: 'Social Media Team',
            image: null,
            quote: null,
            instagram: null,
            linkedin: null,
            substack: null,
            isLeader: false
          }
        ]
      },
      {
        id: 'human-resource',
        number: '03',
        name: 'HUMAN RESOURCE TEAM',
        description: 'Fostering member development, volunteer coordination, and building an inclusive, purpose-driven community culture.',
        members: [
          {
            id: 'felix-wilbert-gosal',
            name: 'Felix Wilbert Gosal',
            age: 18,
            department: 'Human Resource Team',
            image: 'assets/team/felix-wilbert-gosal.jpg',
            imagePosition: 'center 20%',
            quote: 'Stop at nothing',
            instagram: null,
            linkedin: null,
            substack: null,
            isLeader: false
          },
          {
            id: 'richard-ernestan-kusuma',
            name: 'Richard Ernestan Kusuma',
            age: 16,
            department: 'Human Resource Team',
            image: 'assets/team/richard-ernestan-kusuma.jpg',
            imagePosition: 'center 18%',
            quote: 'Action is the foundational key to all success.',
            instagram: {
              handle: 'Instagram',
              url: 'https://shorturl.at/9vWtM'
            },
            linkedin: {
              handle: 'LinkedIn Profile',
              url: 'https://www.linkedin.com/in/richard-ernestan-kusuma-89a9b439/'
            },
            substack: null,
            isLeader: false
          },
          {
            id: 'kevin',
            name: 'Kevin',
            age: null,
            department: 'Human Resource Team',
            image: null,
            quote: null,
            instagram: null,
            linkedin: null,
            substack: null,
            isLeader: false
          }
        ]
      }
    ],
    teamCategories: ['EXECUTIVE TEAM', 'SOCIAL MEDIA TEAM', 'HUMAN RESOURCE TEAM'],
    teamMembers: [],
    events: [
      {
        id: 'clearer-vision-brighter-futures',
        title: 'Clearer Vision, Brighter Futures',
        date: '28 June 2026',
        category: 'HEALTH',
        description: 'Free comprehensive eye examination and prescription glasses distribution for community members and youth across Makassar.',
        image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=85',
        location: 'Makassar, South Sulawesi, Indonesia',
        statistics: {
          'Participants Reached': '877',
          'Prescription Glasses Distributed': 'Verified',
          'Community Volunteers': 'Active',
        },
        gallery: [
          { src: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700&q=80', caption: 'Free eye examination at Clearer Vision event' },
          { src: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=700&q=80', caption: 'Community member receiving prescription glasses' },
          { src: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=700&q=80', caption: 'Healthcare outreach team in action' },
        ],
      },
      {
        id: 'event-details-to-be-provided',
        title: 'English Literacy Sessions',
        date: 'Ongoing Program',
        category: 'EDUCATION',
        description: 'Regular English learning and literacy sessions for children in underserved schools and orphanages in Makassar.',
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=85',
        location: 'Makassar, South Sulawesi, Indonesia',
        statistics: {},
        gallery: [
          { src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=700&q=80', caption: 'Children learning English with volunteers' },
        ],
      },
      {
        id: 'event-details-to-be-provided',
        title: 'Orphanage Support & Community Visits',
        date: 'Ongoing Program',
        category: 'COMMUNITY',
        description: 'Regular visits, donations, and hands-on activities bringing joy, mentorship, and essentials to local orphanages.',
        image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=85',
        location: 'Makassar, South Sulawesi, Indonesia',
        statistics: {},
        gallery: [
          { src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=700&q=80', caption: 'Volunteers spending time with children' },
        ],
      },
      {
        id: 'event-details-to-be-provided',
        title: '[EVENT TITLE TO BE PROVIDED]',
        date: '[EVENT DATE TO BE PROVIDED]',
        category: 'EVENT',
        description: '[Event description, location, and verified results will be added when official information is provided.]',
        image: null,
        location: null,
        statistics: {},
        gallery: [],
      },
    ],
  };

  function renderPillars() {
    const grid = $('#pillar-grid');
    if (!grid) return;
    grid.innerHTML = siteData.pillars.map(pillar => `
      <article class="wwd-card" tabindex="0">
        <div class="wwd-card-number" aria-hidden="true">${pillar.number}</div>
        <div class="wwd-card-image wwd-card-image-placeholder" aria-hidden="true">
          ${pillar.image ? `<img src="${pillar.image}" alt="${pillar.name}" loading="lazy" />` : `<span>IMAGE / ICON<br/>TO BE PROVIDED</span>`}
        </div>
        <div class="wwd-card-content">
          <h3 class="wwd-card-title">${pillar.name}</h3>
          <p>${pillar.description}</p>
          <span class="wwd-arrow" aria-hidden="true">→</span>
        </div>
      </article>
    `).join('');
  }

  function renderEventTimeline() {
    const timeline = $('#event-timeline');
    if (!timeline) return;
    const isSubdir = window.location.pathname.includes('/events/');
    const basePath = isSubdir ? '' : 'events/';

    timeline.innerHTML = siteData.events.map((event, index) => {
      const isRight = index % 2 === 1;
      const sideClass = isRight ? 'timeline-side-right' : 'timeline-side-left';

      const cardHtml = `
        <div class="timeline-event-card">
          <div class="timeline-image-wrap ${event.image ? '' : 'timeline-image-placeholder'}" aria-hidden="true">
            ${event.image ? `
              <img src="${event.image}" alt="${event.title}" loading="lazy" />
            ` : `
              <div class="timeline-placeholder-content">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="timeline-placeholder-icon" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <path d="M21 15l-5-5L5 21"/>
                </svg>
                <span>EVENT IMAGE TO BE PROVIDED</span>
              </div>
            `}
          </div>
          <div class="timeline-card-content">
            <div class="timeline-card-meta">
              <span class="timeline-category-tag">${event.category || 'EVENT'}</span>
              <span class="timeline-card-date-inline">${event.date}</span>
            </div>
            <h3 class="timeline-event-title">${event.title}</h3>
            <p class="timeline-event-desc">${event.description}</p>
            <div class="timeline-card-bottom">
              <a class="timeline-cta-btn" href="${basePath}${event.id}.html">VIEW EVENT <span class="cta-arrow" aria-hidden="true">→</span></a>
            </div>
          </div>
        </div>
      `;

      const dateHtml = `
        <div class="timeline-date-display">
          <span class="timeline-date-primary">${event.date}</span>
          ${event.location ? `<span class="timeline-location-tag">📍 ${event.location.split(',')[0]}</span>` : ''}
        </div>
      `;

      return `
        <article class="timeline-row ${sideClass}" data-index="${index}">
          <div class="timeline-col-left ${isRight ? 'timeline-date-col' : 'timeline-card-col'}">
            ${isRight ? dateHtml : cardHtml}
          </div>
          <div class="timeline-col-center">
            <div class="timeline-node" aria-hidden="true">
              <span class="timeline-node-dot"></span>
            </div>
          </div>
          <div class="timeline-col-right ${isRight ? 'timeline-card-col' : 'timeline-date-col'}">
            ${isRight ? cardHtml : dateHtml}
          </div>
        </article>
      `;
    }).join('');
  }

  function renderMemberCard(member, isFeatured = false) {
    const hasPhoto = Boolean(member.image);
    const photoHtml = hasPhoto
      ? `<div class="team-card-avatar-wrap">
           <div class="team-avatar-circle">
             <img src="${member.image}" alt="${member.name}" class="team-card-avatar-img" loading="lazy" style="${member.imagePosition ? `object-position: ${member.imagePosition};` : ''}" />
           </div>
         </div>`
      : `<div class="team-card-avatar-wrap">
           <div class="team-avatar-circle team-avatar-placeholder" aria-label="Photo coming soon">
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="placeholder-avatar-svg" aria-hidden="true">
               <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
             </svg>
             <span class="placeholder-avatar-text">COMING SOON</span>
           </div>
         </div>`;

    const agePill = member.age ? `<span class="team-pill team-age-pill">${member.age} YRS</span>` : '';
    const deptPill = `<span class="team-pill team-dept-pill">${member.department}</span>`;
    
    const quoteHtml = member.quote
      ? `<blockquote class="team-card-quote"><p>“${member.quote}”</p></blockquote>`
      : '';

    let socialHtml = '';
    const socials = [];
    if (member.instagram) {
      socials.push(`
        <a href="${member.instagram.url}" target="_blank" rel="noopener noreferrer" class="team-social-badge" title="Instagram: ${member.instagram.handle}" onclick="event.stopPropagation();" aria-label="${member.name} on Instagram">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="social-icon-svg" aria-hidden="true">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <circle cx="12" cy="12" r="4"/>
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
          </svg>
          <span>${member.instagram.handle}</span>
        </a>
      `);
    }
    if (member.linkedin) {
      socials.push(`
        <a href="${member.linkedin.url}" target="_blank" rel="noopener noreferrer" class="team-social-badge" title="LinkedIn Profile" onclick="event.stopPropagation();" aria-label="${member.name} on LinkedIn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="social-icon-svg" aria-hidden="true">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
            <rect x="2" y="9" width="4" height="12"/>
            <circle cx="4" cy="4" r="2"/>
          </svg>
          <span>${member.linkedin.handle || 'LinkedIn'}</span>
        </a>
      `);
    }
    if (member.substack) {
      socials.push(`
        <span class="team-social-badge team-substack-badge" title="Substack: ${member.substack.publication}" onclick="event.stopPropagation();">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="social-icon-svg" aria-hidden="true">
            <path d="M4 4h16v3H4zM4 9h16v3H4zM4 14l8 6 8-6v6H4z"/>
          </svg>
          <span>${member.substack.handle || member.substack.publication}</span>
        </span>
      `);
    }
    if (socials.length) {
      socialHtml = `<div class="team-card-socials-row">${socials.join('')}</div>`;
    }

    return `
      <article class="team-profile-card ${isFeatured ? 'team-card-featured' : ''} ${hasPhoto ? 'has-portrait' : 'is-placeholder-card'}" data-member-id="${member.id}" tabindex="0" role="button" aria-haspopup="dialog" aria-label="View profile of ${member.name}">
        <div class="team-card-top">
          ${photoHtml}
        </div>
        <div class="team-card-main">
          <div class="team-card-pills-row">
            ${deptPill}
            ${agePill}
          </div>
          <h3 class="team-profile-name">${member.name}</h3>
          ${quoteHtml}
          ${socialHtml}
          <div class="team-card-hover-action">
            <span class="team-view-text">VIEW PROFILE <span class="action-arrow" aria-hidden="true">→</span></span>
          </div>
        </div>
      </article>
    `;
  }

  function renderTeamDirectory() {
    const directory = $('#team-directory-content');
    if (!directory) return;

    directory.innerHTML = siteData.teamDepartments.map((dept, deptIndex) => {
      const leaders = dept.members.filter(m => m.isLeader);
      const members = dept.members.filter(m => !m.isLeader);

      let layoutHtml = '';
      if (leaders.length > 0) {
        layoutHtml = `
          <div class="team-leadership-row">
            <div class="team-leadership-grid">
              ${leaders.map(m => renderMemberCard(m, true)).join('')}
            </div>
          </div>
          ${members.length > 0 ? `
            <div class="team-members-wrapper">
              <div class="team-members-grid ${dept.id === 'executive' ? 'team-grid-executive' : ''}">
                ${members.map(m => renderMemberCard(m, false)).join('')}
              </div>
            </div>
          ` : ''}
        `;
      } else {
        layoutHtml = `
          <div class="team-members-wrapper">
            <div class="team-members-grid ${dept.id === 'executive' ? 'team-grid-executive' : ''}">
              ${members.map(m => renderMemberCard(m, false)).join('')}
            </div>
          </div>
        `;
      }

      return `
        <section class="team-department-block" id="dept-${dept.id}" aria-labelledby="dept-heading-${dept.id}">
          <div class="team-dept-header">
            <div class="team-dept-label-wrap">
              <span class="section-label">${dept.number} — ${dept.name}</span>
            </div>
            <h2 id="dept-heading-${dept.id}" class="team-dept-title display-headline">${dept.name}</h2>
            <p class="team-dept-intro">${dept.description}</p>
          </div>
          ${layoutHtml}
        </section>
      `;
    }).join('');

    initTeamModal();
  }

  function initTeamModal() {
    const overlay = $('#team-modal-overlay');
    const modalBody = $('#team-modal-body');
    const closeBtn = $('#team-modal-close');
    const backdrop = $('#team-modal-backdrop');
    if (!overlay || !modalBody) return;

    let lastFocusedElement = null;

    function openModalForMember(memberId) {
      let foundMember = null;
      for (const dept of siteData.teamDepartments) {
        const m = dept.members.find(item => item.id === memberId);
        if (m) { foundMember = m; break; }
      }
      if (!foundMember) return;

      lastFocusedElement = document.activeElement;

      const hasPhoto = Boolean(foundMember.image);
      const photoHtml = hasPhoto
        ? `<div class="modal-portrait-circle">
             <img src="${foundMember.image}" alt="${foundMember.name}" class="modal-portrait-img" style="${foundMember.imagePosition ? `object-position: ${foundMember.imagePosition};` : ''}" />
           </div>`
        : `<div class="modal-portrait-circle modal-portrait-placeholder" aria-label="Photo coming soon">
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="modal-placeholder-svg" aria-hidden="true">
               <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
             </svg>
             <span class="modal-placeholder-tag">PHOTO COMING SOON</span>
           </div>`;

      let socialsHtml = '';
      const socialButtons = [];
      if (foundMember.instagram) {
        socialButtons.push(`
          <a href="${foundMember.instagram.url}" target="_blank" rel="noopener noreferrer" class="btn-primary modal-action-btn" aria-label="Follow ${foundMember.name} on Instagram">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="modal-btn-svg" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
            </svg>
            <span>Instagram → ${foundMember.instagram.handle}</span>
          </a>
        `);
      }
      if (foundMember.linkedin) {
        socialButtons.push(`
          <a href="${foundMember.linkedin.url}" target="_blank" rel="noopener noreferrer" class="btn-outline-light modal-action-btn" aria-label="Connect with ${foundMember.name} on LinkedIn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="modal-btn-svg" aria-hidden="true">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
              <rect x="2" y="9" width="4" height="12"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
            <span>LinkedIn Profile →</span>
          </a>
        `);
      }
      if (foundMember.substack) {
        socialButtons.push(`
          <div class="modal-substack-info">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="modal-btn-svg" aria-hidden="true">
              <path d="M4 4h16v3H4zM4 9h16v3H4zM4 14l8 6 8-6v6H4z"/>
            </svg>
            <span class="substack-text"><strong>${foundMember.substack.publication}</strong> ${foundMember.substack.handle ? `(${foundMember.substack.handle})` : ''}</span>
          </div>
        `);
      }

      if (socialButtons.length) {
        socialsHtml = `<div class="modal-socials-container">${socialButtons.join('')}</div>`;
      }

      modalBody.innerHTML = `
        <div class="modal-profile-layout">
          <div class="modal-avatar-column">
            ${photoHtml}
          </div>
          <div class="modal-details-column">
            <div class="modal-pills-row">
              <span class="modal-pill modal-dept-pill">${foundMember.department}</span>
              ${foundMember.age ? `<span class="modal-pill modal-age-pill">${foundMember.age} YEARS OLD</span>` : ''}
            </div>
            <h2 id="team-modal-name" class="modal-member-fullname display-headline">${foundMember.name}</h2>
            ${foundMember.quote ? `
              <div class="modal-quote-box">
                <span class="modal-quote-mark" aria-hidden="true">“</span>
                <blockquote class="modal-quote-content">
                  <p>${foundMember.quote}</p>
                </blockquote>
              </div>
            ` : ''}
            ${socialsHtml}
          </div>
        </div>
      `;

      overlay.removeAttribute('hidden');
      document.body.style.overflow = 'hidden';

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          overlay.classList.add('open');
        });
      });

      if (closeBtn) setTimeout(() => closeBtn.focus(), 60);
    }

    function closeModal() {
      if (!overlay || overlay.hasAttribute('hidden')) return;
      overlay.classList.remove('open');
      setTimeout(() => {
        overlay.setAttribute('hidden', '');
        document.body.style.overflow = '';
        if (lastFocusedElement) {
          lastFocusedElement.focus();
        }
      }, 320);
    }

    const cards = $$('.team-profile-card', $('#team-directory-content'));
    cards.forEach(card => {
      const memberId = card.dataset.memberId;
      card.addEventListener('click', () => openModalForMember(memberId));
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModalForMember(memberId);
        }
      });
    });

    if (closeBtn) closeBtn.onclick = closeModal;
    if (backdrop) backdrop.onclick = closeModal;
    overlay.onclick = e => {
      if (e.target === overlay || e.target === backdrop) closeModal();
    };

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && !overlay.hasAttribute('hidden')) {
        closeModal();
      }
    });
  }

  function renderEventDetail() {
    const content = $('#event-detail-content');
    const eventId = document.body.dataset.eventId;
    if (!content || !eventId) return;
    const event = siteData.events.find(item => item.id === eventId) || siteData.events[0];
    const stats = Object.entries(event.statistics || {}).filter(([, value]) => value !== null && value !== undefined && value !== '');
    
    let galleryHtml = '';
    if (event.gallery && event.gallery.length) {
      galleryHtml = `
        <section class="event-gallery" aria-labelledby="event-gallery-heading">
          <div class="section-label">EVENT GALLERY</div>
          <h2 id="event-gallery-heading" class="display-headline">PHOTOS FROM THE FIELD</h2>
          <div class="event-gallery-grid">
            ${event.gallery.map(img => `
              <div class="event-gallery-item">
                <img src="${typeof img === 'string' ? img : img.src}" alt="${typeof img === 'string' ? event.title : (img.caption || event.title)}" loading="lazy" />
                ${typeof img === 'object' && img.caption ? `<span class="event-gallery-caption">${img.caption}</span>` : ''}
              </div>
            `).join('')}
          </div>
        </section>
      `;
    } else {
      galleryHtml = `
        <section class="event-gallery" aria-labelledby="event-gallery-heading">
          <div class="section-label">EVENT GALLERY</div>
          <h2 id="event-gallery-heading" class="display-headline">EVENT GALLERY</h2>
          <p class="event-gallery-placeholder">Photos and additional event documentation will be added here once official event media is provided.</p>
        </section>
      `;
    }

    content.innerHTML = `
      <div class="section-label">EVENT DETAIL</div>
      <h1 id="event-detail-title" class="display-headline">${event.title}</h1>
      <div class="event-meta">
        <span>📅 ${event.date}</span>
        ${event.location ? `<span>📍 ${event.location}</span>` : '<span>📍 LOCATION TO BE PROVIDED</span>'}
        ${event.category ? `<span>🏷️ ${event.category}</span>` : ''}
      </div>
      <div class="event-detail-layout">
        <div class="event-main-image ${event.image ? '' : 'timeline-image-placeholder'}">
          ${event.image ? `<img src="${event.image}" alt="${event.title}" loading="eager" />` : `<span>EVENT IMAGE<br/>TO BE PROVIDED</span>`}
        </div>
        <div class="event-detail-copy">
          <h2 class="event-copy-heading">ABOUT THE EVENT</h2>
          <p>${event.description}</p>
          <div class="event-impact-block">
            <h2 class="event-impact-title">EVENT IMPACT</h2>
            ${stats.length ? `
              <div class="event-stats">
                ${stats.map(([label, value]) => `
                  <div class="event-stat-box">
                    <strong>${value}</strong>
                    <span>${label}</span>
                  </div>
                `).join('')}
              </div>
            ` : `
              <p class="event-pending">Event-specific statistics will be added when verified information is provided.</p>
            `}
          </div>
        </div>
      </div>
      ${galleryHtml}
    `;
  }

  renderPillars();
  renderEventTimeline();
  renderTeamDirectory();
  renderEventDetail();

  /* ─── Smooth scroll (accounts for fixed nav height) ─── */
  function smoothScrollTo(el) {
    if (!el) return;
    const nav = $('#site-header');
    const offset = nav ? nav.offsetHeight + 16 : 80;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  }

  /* ============================================================
     MOBILE MENU — defined at outer scope so all code can call it
     ============================================================ */
  const hamburger       = $('#nav-hamburger');
  const mobileMenu      = $('#mobile-menu');
  const mobileOverlay   = $('#mobile-menu-overlay');
  const mobileMenuClose = $('#mobile-menu-close');
  let   menuOpen        = false;

  function openMobileMenu() {
    if (!mobileMenu || !mobileOverlay || menuOpen) return;
    menuOpen = true;
    mobileOverlay.removeAttribute('hidden');
    /* Double rAF gives browser time to paint before CSS transition kicks in */
    requestAnimationFrame(() => requestAnimationFrame(() => mobileMenu.classList.add('open')));
    if (hamburger) hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    const firstLink = mobileMenu.querySelector('.mobile-nav-link');
    if (firstLink) setTimeout(() => firstLink.focus(), 60);
  }

  function closeMobileMenu() {
    if (!mobileMenu || !mobileOverlay || !menuOpen) return;
    menuOpen = false;
    mobileMenu.classList.remove('open');
    if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    setTimeout(() => mobileOverlay.setAttribute('hidden', ''), 420);
  }

  if (hamburger)       hamburger.addEventListener('click', openMobileMenu);
  if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMobileMenu);
  if (mobileOverlay)   mobileOverlay.addEventListener('click', closeMobileMenu);
  if (mobileMenu) {
    mobileMenu.addEventListener('keydown', e => {
      if (e.key === 'Escape') { closeMobileMenu(); if (hamburger) hamburger.focus(); }
    });
  }

  /* ============================================================
     INTRO SCREEN
     ============================================================ */
  (function initIntro() {
    const intro  = $('#intro-screen');
    const skipBtn = $('#intro-skip');
    if (!intro) return;

    function dismiss() {
      intro.classList.add('fade-out');
      document.body.style.overflow = '';
      setTimeout(revealHeroLines, 200);
      setTimeout(() => intro.classList.add('done'), 750);
    }

    const delay = prefersReducedMotion ? 0 : 1900;
    const autoTimer = setTimeout(dismiss, delay);
    if (skipBtn) skipBtn.addEventListener('click', () => { clearTimeout(autoTimer); dismiss(); });

    document.body.style.overflow = 'hidden';
  })();

  /* ============================================================
     HERO HEADLINE REVEAL
     ============================================================ */
  function revealHeroLines() {
    $$('.hero-line').forEach((line, i) => {
      if (prefersReducedMotion) { line.classList.add('revealed'); return; }
      setTimeout(() => line.classList.add('revealed'), i * 90);
    });
  }

  if (prefersReducedMotion) revealHeroLines();

  /* ============================================================
     NAVIGATION — sticky header + active link + anchor scrolling
     ============================================================ */
  (function initNav() {
    const siteHeader = $('#site-header');
    if (!siteHeader) return;

    const isInnerPage = document.body.classList.contains('inner-page');

    /* Sticky background */
    const onScroll = throttle(() => {
      if (isInnerPage) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.toggle('scrolled', window.scrollY > 60);
      }
    }, 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* Delegate ALL anchor clicks for smooth scroll */
    document.addEventListener('click', e => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      closeMobileMenu();
      smoothScrollTo(target);
    });

    /* Active nav state via IntersectionObserver */
    const sections  = $$('section[id]');
    const navLinks  = $$('.nav-links a');
    if (!sections.length || !navLinks.length) return;

    const linkMap = {};
    navLinks.forEach(l => { const h = l.getAttribute('href'); if (h) linkMap[h] = l; });

    function setActive(id) {
      const scrolled = siteHeader.classList.contains('scrolled');
      navLinks.forEach(l => { l.classList.remove('nav-active'); l.style.color = ''; });
      const active = linkMap[`#${id}`];
      if (active) {
        active.classList.add('nav-active');
        active.style.color = scrolled ? 'var(--campaign-blue)' : 'var(--white)';
      }
    }

    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: '-10% 0px -70% 0px', threshold: 0 });

    sections.forEach(s => sectionObserver.observe(s));
  })();

  /* ============================================================
     HERO CURSOR PARALLAX
     ============================================================ */
  (function initHeroParallax() {
    if (prefersReducedMotion) return;
    const hero = $('.section-hero');
    if (!hero) return;
    const els = $$('[data-parallax]', hero);
    const sparks = $$('.sparkle', hero);
    if (!els.length) return;

    let mx = 0, my = 0, raf = null;
    function apply() {
      const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
      const dx = mx - cx, dy = my - cy;
      els.forEach(el => {
        const s = parseFloat(el.dataset.parallax) || 0.05;
        el.style.transform = `translate(${dx * s}px, ${dy * s}px)`;
      });
      sparks.forEach((sp, i) => {
        const s = 0.015 + i * 0.006;
        sp.style.transform = `translate(${dx * s}px, ${dy * s}px)`;
      });
      raf = null;
    }
    document.addEventListener('mousemove', e => {
      if (window.innerWidth <= 768) return;
      mx = e.clientX; my = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    }, { passive: true });
  })();

  /* ============================================================
     SCROLL PARALLAX — hero background shapes
     ============================================================ */
  (function initScrollParallax() {
    if (prefersReducedMotion) return;
    const shapes = $$('.hero-shape');
    if (!shapes.length) return;
    window.addEventListener('scroll', throttle(() => {
      const sy = window.scrollY;
      shapes.forEach((s, i) => { s.style.transform = `translateY(${sy * (i + 1) * 0.07}px)`; });
    }, 16), { passive: true });
  })();

  /* ============================================================
     INITIATIVES — desktop tab panels
     ============================================================ */
  (function initInitiatives() {
    const tabs   = $$('.init-tab');
    const panels = $$('.init-panel');
    if (!tabs.length || !panels.length) return;

    function activate(tab) {
      const targetId = tab.getAttribute('aria-controls');

      tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      panels.forEach(panel => {
        if (panel.id === targetId) {
          /* Show: set display first, then fade in */
          panel.removeAttribute('hidden');
          panel.style.display = 'grid';
          panel.style.opacity = '0';
          panel.classList.add('active');
          requestAnimationFrame(() => requestAnimationFrame(() => { panel.style.opacity = '1'; }));
        } else {
          panel.classList.remove('active');
          panel.style.opacity = '0';
          setTimeout(() => {
            if (!panel.classList.contains('active')) {
              panel.setAttribute('hidden', '');
              panel.style.display = '';
              panel.style.opacity = '';
            }
          }, 380);
        }
      });
    }

    tabs.forEach(tab => {
      tab.addEventListener('click', () => activate(tab));
      tab.addEventListener('keydown', e => {
        const list = tabs;
        const idx  = list.indexOf(tab);
        let next   = null;
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
          e.preventDefault(); next = list[(idx + 1) % list.length];
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
          e.preventDefault(); next = list[(idx - 1 + list.length) % list.length];
        }
        if (next) { next.focus(); activate(next); }
      });
    });
  })();

  /* ============================================================
     ACCORDION — mobile initiatives
     ============================================================ */
  (function initAccordion() {
    const headers = $$('.acc-header');
    if (!headers.length) return;

    headers.forEach(header => {
      header.addEventListener('click', () => {
        const expanded = header.getAttribute('aria-expanded') === 'true';
        const bodyEl   = document.getElementById(header.getAttribute('aria-controls'));

        if (expanded) {
          header.setAttribute('aria-expanded', 'false');
          if (bodyEl) bodyEl.setAttribute('hidden', '');
        } else {
          /* Collapse all others */
          headers.forEach(h => {
            if (h === header) return;
            h.setAttribute('aria-expanded', 'false');
            const b = document.getElementById(h.getAttribute('aria-controls'));
            if (b) b.setAttribute('hidden', '');
          });
          header.setAttribute('aria-expanded', 'true');
          if (bodyEl) bodyEl.removeAttribute('hidden');
        }
      });
    });
  })();

  /* ============================================================
     ACTIVITY FILTER
     ============================================================ */
  (function initFilter() {
    const filterBtns = $$('.filter-btn');
    const cards      = $$('.today-card');
    if (!filterBtns.length || !cards.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        filterBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');

        cards.forEach(card => {
          const match = filter === 'all' || card.dataset.category === filter;
          if (match) {
            card.style.display = '';
            /* Remove fade class after display is restored */
            requestAnimationFrame(() => requestAnimationFrame(() => card.classList.remove('fade-out')));
          } else {
            card.classList.add('fade-out');
            setTimeout(() => {
              if (card.classList.contains('fade-out')) card.style.display = 'none';
            }, 320);
          }
        });
      });
    });
  })();

  /* ============================================================
     GALLERY + LIGHTBOX
     ============================================================ */
  (function initGallery() {
    const items     = $$('.gallery-item');
    const lightbox  = $('#lightbox');
    const lbOverlay = $('#lightbox-overlay');
    const lbImg     = $('#lightbox-img');
    const lbCap     = $('#lightbox-caption');
    const lbCat     = $('#lightbox-cat');
    const lbDate    = $('#lightbox-date');
    const lbClose   = $('#lightbox-close');
    const lbPrev    = $('#lightbox-prev');
    const lbNext    = $('#lightbox-next');

    if (!lightbox || !items.length) return;

    let current = 0;
    let touchX  = 0;

    lbImg.style.transition = 'opacity 0.18s ease';

    function getData(item) {
      const img = item.querySelector('img');
      return {
        src:     img ? img.src : '',
        alt:     img ? img.alt : '',
        caption: item.dataset.caption || (img ? img.alt : ''),
        cat:     item.dataset.cat  || '',
        date:    item.dataset.date || '',
      };
    }

    function openLightbox(idx) {
      current = idx;
      const d = getData(items[idx]);
      lbImg.src = d.src; lbImg.alt = d.alt;
      lbCap.textContent  = d.caption;
      lbCat.textContent  = d.cat;
      lbDate.textContent = d.date;
      lightbox.removeAttribute('hidden');
      lbOverlay.removeAttribute('hidden');
      document.body.style.overflow = 'hidden';
      lbClose.focus();
    }

    function closeLightbox() {
      lightbox.setAttribute('hidden', '');
      lbOverlay.setAttribute('hidden', '');
      document.body.style.overflow = '';
      const item = items[current];
      if (item) item.focus();
    }

    function navigate(dir) {
      current = (current + dir + items.length) % items.length;
      const d = getData(items[current]);
      lbImg.style.opacity = '0';
      setTimeout(() => {
        lbImg.src = d.src; lbImg.alt = d.alt;
        lbCap.textContent  = d.caption;
        lbCat.textContent  = d.cat;
        lbDate.textContent = d.date;
        lbImg.style.opacity = '1';
      }, 180);
    }

    items.forEach((item, idx) => {
      item.addEventListener('click',   () => openLightbox(idx));
      item.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(idx); }
      });
    });

    lbClose   && lbClose.addEventListener('click', closeLightbox);
    lbOverlay && lbOverlay.addEventListener('click', closeLightbox);
    lbPrev    && lbPrev.addEventListener('click', () => navigate(-1));
    lbNext    && lbNext.addEventListener('click', () => navigate(1));

    document.addEventListener('keydown', e => {
      if (lightbox.hasAttribute('hidden')) return;
      if (e.key === 'Escape')     closeLightbox();
      if (e.key === 'ArrowLeft')  navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
    });

    /* Touch swipe */
    lightbox.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
    lightbox.addEventListener('touchend',   e => {
      const dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 48) navigate(dx < 0 ? 1 : -1);
    }, { passive: true });
  })();

  /* ============================================================
     IMPACT COUNTERS
     ============================================================ */
  (function initCounters() {
    const els = $$('[data-target]');
    if (!els.length) return;

    function animateCount(el, target) {
      if (prefersReducedMotion) { el.textContent = target.toLocaleString(); return; }
      const duration = 1800;
      const start    = performance.now();
      function step(now) {
        const p = Math.min((now - start) / duration, 1);
        const e = 1 - Math.pow(1 - p, 3); /* ease-out cubic */
        el.textContent = Math.round(e * target).toLocaleString();
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target.toLocaleString();
      }
      requestAnimationFrame(step);
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.dataset.counted === 'false') {
          entry.target.dataset.counted = 'true';
          animateCount(entry.target, parseInt(entry.target.dataset.target, 10));
        }
      });
    }, { threshold: 0.2 });

    els.forEach(el => observer.observe(el));
  })();

  /* ============================================================
     SCROLL REVEAL
     ============================================================ */
  (function initReveal() {
    if (prefersReducedMotion) {
      $$('.reveal, .reveal-left, .reveal-right').forEach(el => el.classList.add('in-view'));
      return;
    }

    const targets = [
      { sel: '.about-grid > *',          cls: 'reveal' },
      { sel: '.wwd-card',                cls: 'reveal' },
      { sel: '.impact-stats-grid > *',   cls: 'reveal' },
      { sel: '.today-card',              cls: 'reveal' },
      { sel: '.story-card',              cls: 'reveal' },
      { sel: '.team-card',               cls: 'reveal' },
      { sel: '.team-face',               cls: 'reveal' },
      { sel: '.collab-text-col',         cls: 'reveal-left' },
      { sel: '.collab-form-col',         cls: 'reveal-right' },
      { sel: '.network-inner',           cls: 'reveal' },
      { sel: '.impact-hero-stat',        cls: 'reveal' },
      { sel: '.story-grid > *',          cls: 'reveal' },
    ];

    targets.forEach(({ sel, cls }) => {
      $$(sel).forEach((el, i) => {
        if (el.classList.contains('reveal') ||
            el.classList.contains('reveal-left') ||
            el.classList.contains('reveal-right')) return;
        el.classList.add(cls);
        el.style.transitionDelay = `${Math.min(i * 0.07, 0.42)}s`;
      });
    });

    const revealObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          revealObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });

    $$('.reveal, .reveal-left, .reveal-right').forEach(el => revealObs.observe(el));
  })();

  /* ============================================================
     STORY MODALS
     ============================================================ */
  (function initStoryModals() {
    const storyBtns = $$('button.story-read-more[data-story]');
    if (!storyBtns.length) return;

    let lastFocused = null;

    function openModal(storyId) {
      const overlay = $(`#story-modal-${storyId}`);
      if (!overlay) return;
      lastFocused = document.activeElement;

      /* Remove hidden attribute FIRST so element gets display:flex */
      overlay.removeAttribute('hidden');
      document.body.style.overflow = 'hidden';

      /* Now trigger opacity transition */
      requestAnimationFrame(() => requestAnimationFrame(() => overlay.classList.add('open')));

      const closeBtn = overlay.querySelector('.story-modal-close');
      if (closeBtn) setTimeout(() => closeBtn.focus(), 60);
    }

    function closeModal(overlay) {
      if (!overlay) return;
      overlay.classList.remove('open');
      setTimeout(() => {
        overlay.setAttribute('hidden', '');
        document.body.style.overflow = '';
        if (lastFocused) lastFocused.focus();
      }, 360);
    }

    storyBtns.forEach(btn => {
      btn.addEventListener('click', () => openModal(btn.dataset.story));
    });

    $$('.story-modal-overlay').forEach(overlay => {
      const closeBtn = overlay.querySelector('.story-modal-close');
      if (closeBtn) closeBtn.addEventListener('click', () => closeModal(overlay));
      overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(overlay); });
      overlay.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(overlay); });
    });

    $$('.story-modal-cta a').forEach(link => {
      link.addEventListener('click', () => {
        const open = $('.story-modal-overlay.open');
        if (open) closeModal(open);
      });
    });
  })();

  /* ============================================================
     CONTACT FORM — validation + success/error state
     ============================================================ */
  (function initForm() {
    const form       = $('#collab-form');
    const successMsg = $('#form-success');
    const submitBtn  = $('#form-submit-btn');
    if (!form) return;

    const fields = [
      { id: 'field-name',    errId: 'error-name',    test: v => v.trim().length > 0,                msg: 'Please enter your name.' },
      { id: 'field-email',   errId: 'error-email',   test: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()), msg: 'Please enter a valid email address.' },
      { id: 'field-message', errId: 'error-message', test: v => v.trim().length > 0,                msg: 'Please enter a message.' },
    ];

    /* Live-clear errors as user types */
    fields.forEach(({ id, errId }) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', () => {
        el.classList.remove('error');
        const errEl = document.getElementById(errId);
        if (errEl) { errEl.textContent = ''; errEl.classList.remove('visible'); }
      });
    });

    function showErr(id, errId, msg) {
      const f = document.getElementById(id);
      const e = document.getElementById(errId);
      if (f) f.classList.add('error');
      if (e) { e.textContent = msg; e.classList.add('visible'); }
    }

    form.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;

      fields.forEach(({ id, errId, test, msg }) => {
        const el = document.getElementById(id);
        if (!el) return;
        if (!test(el.value)) {
          showErr(id, errId, msg);
          valid = false;
        }
      });

      if (!valid) {
        const first = form.querySelector('.form-input.error');
        if (first) first.focus();
        return;
      }

      if (submitBtn) { submitBtn.textContent = 'SENDING…'; submitBtn.disabled = true; }

      /* Simulated send — replace with real fetch('/api/contact', ...) when backend is ready */
      setTimeout(() => {
        if (submitBtn) submitBtn.style.display = 'none';
        if (successMsg) {
          successMsg.removeAttribute('hidden');
          successMsg.focus();
        }
        form.reset();
      }, 1100);
    });
  })();

  /* ============================================================
     MOBILE — hide floating hero photos on very small screens
     ============================================================ */
  (function fixMobileHero() {
    const fix = () => {
      const hide = window.innerWidth <= 480;
      $$('.float-photo').forEach(fp => { fp.style.display = hide ? 'none' : ''; });
    };
    fix();
    window.addEventListener('resize', debounce(fix, 200));
  })();

  /* ============================================================
     LAZY LOADING FALLBACK
     ============================================================ */
  if (!('loading' in HTMLImageElement.prototype)) {
    $$('img[loading="lazy"]').forEach(img => img.removeAttribute('loading'));
  }

  /* ============================================================
     MARQUEE — CSS-driven; JS handles reduced-motion only
     ============================================================ */
  (function handleMarquee() {
    if (!prefersReducedMotion) return;
    $$('.marquee-track').forEach(t => { t.style.animation = 'none'; t.style.transform = 'none'; });
    $$('.marquee-content[aria-hidden="true"]').forEach(el => { el.style.display = 'none'; });
    $$('.marquee-content').forEach(el => { el.style.flexWrap = 'wrap'; });
  })();

  /* ============================================================
     CONSOLE BRANDING
     ============================================================ */
  console.log('%cLEO HANDS OF NURTURE', 'font-family:Georgia,serif;font-size:18px;font-weight:bold;color:#1565c0;');
  console.log('%cYouth-Led · Volunteer-Driven · Real Change · Makassar, Indonesia', 'font-family:monospace;color:#00b4d8;');

})();
