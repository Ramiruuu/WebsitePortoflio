    const JSON_URL  = 'https://raw.githubusercontent.com/Ramiruuu/WebsitePortoflio/refs/heads/main/assets/jsonfiles/courses.json';
    const PROXY_URL = 'https://api.allorigins.win/get?url=' + encodeURIComponent(JSON_URL);

    const container = document.getElementById('courses-container');

    fetch(PROXY_URL)
    .then(res => res.json())
    .then(wrapper => {
        const courses = parseCoursesFromText(wrapper.contents);
        if (courses.length === 0) throw new Error('No courses found');
        buildPage(courses);
    })
    .catch(err => {
        console.error(err);
        container.innerHTML = '<p class="cr-error">⚠️ Could not load courses.</p>';
    });


    // ── Fix: handles the malformed JSON in your GitHub file ──────────────────
    // Some entries are missing the opening { so we repair the raw text first,
    // then extract every course object with a broad regex.
    function parseCoursesFromText(raw) {
    // Step 1: Insert missing { before any bare property that starts a record
    // Pattern: a closing }, or , followed by whitespace then "year_level"
    const repaired = raw
        .replace(/,\s*\n(\s*)"year_level"/g, ',\n$1{"year_level"')  // missing { after comma
        .replace(/\}\s*\n(\s*)"year_level"/g, '},\n$1{"year_level"'); // missing { after }

    // Step 2: Extract all objects that look like course records
    const pattern = /"year_level"\s*:\s*"([^"]+)"\s*,\s*"sem"\s*:\s*"([^"]+)"\s*,\s*"code"\s*:\s*"([^"]+)"\s*,\s*"description"\s*:\s*"([^"]+)"\s*,\s*"credit"\s*:\s*"([^"]+)"/g;

    const courses = [];
    let match;
    while ((match = pattern.exec(repaired)) !== null) {
        courses.push({
        year_level:  match[1],
        sem:         match[2],
        code:        match[3],
        description: match[4],
        credit:      match[5]
        });
    }

    return courses;
    }


    // ── Build the full courses section ──────────────────────────────────────
    function buildPage(courses) {
    const yearOrder = ['1st', '2nd', '3rd', '4th'];
    const semOrder  = ['1st', '2nd', 'Summer'];

    // Group: year → sem → list
    const grouped = {};
    courses.forEach(c => {
        if (!grouped[c.year_level])          grouped[c.year_level]        = {};
        if (!grouped[c.year_level][c.sem])   grouped[c.year_level][c.sem] = [];
        grouped[c.year_level][c.sem].push(c);
    });

    // Search bar
    container.innerHTML = `
        <div class="cr-search-wrapper">
        <svg class="cr-search-icon" xmlns="http://www.w3.org/2000/svg" width="15" height="15"
            viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input type="search" id="cr-search" class="cr-search-input"
                placeholder="Search by subject name or code…" autocomplete="off">
        <span id="cr-count" class="cr-search-count"></span>
        </div>
        <div id="cr-grid"></div>
        <p id="cr-empty" class="cr-empty" style="display:none;">No subjects found.</p>
    `;

    const grid = document.getElementById('cr-grid');
    let cardIndex = 0;

    yearOrder.filter(y => grouped[y]).forEach(year => {
        const yearDiv = document.createElement('div');
        yearDiv.className = 'cr-year-block';

        // Compute total units for this year
        const yearTotal = Object.values(grouped[year])
        .flat()
        .reduce((sum, c) => sum + Number(c.credit), 0);

        yearDiv.innerHTML = `
        <div class="cr-year-header">
            <span class="cr-year-number">${year.replace('st','').replace('nd','').replace('rd','').replace('th','')}</span>
            <div class="cr-year-info">
            <h3 class="cr-year-heading">${year} Year</h3>
            <span class="cr-year-total">${yearTotal} total units</span>
            </div>
            <div class="cr-year-line"></div>
        </div>
        `;

        semOrder.filter(s => grouped[year]?.[s]).forEach(sem => {
        const list       = grouped[year][sem];
        const totalUnits = list.reduce((sum, c) => sum + Number(c.credit), 0);

        const semDiv = document.createElement('div');
        semDiv.className = 'cr-sem-block';
        semDiv.innerHTML = `
            <div class="cr-sem-header">
            <span class="cr-sem-label">${sem} Semester</span>
            <span class="cr-sem-badge">${totalUnits} units</span>
            </div>
            <div class="cr-cards-grid"></div>
        `;

        const cardsGrid = semDiv.querySelector('.cr-cards-grid');

        list.forEach(c => {
            const card = document.createElement('div');
            card.className        = 'cr-card';
            card.dataset.code     = c.code.toLowerCase();
            card.dataset.desc     = c.description.toLowerCase();
            card.dataset.original = c.description;
            // stagger animation delay
            card.style.animationDelay = `${cardIndex * 40}ms`;
            cardIndex++;

            card.innerHTML = `
            <div class="cr-card-inner">
                <span class="cr-code">${c.code}</span>
                <p class="cr-desc">${c.description}</p>
                <div class="cr-card-footer">
                <span class="cr-units">${c.credit} <small>units</small></span>
                <span class="cr-dot"></span>
                </div>
            </div>
            <div class="cr-card-glow"></div>
            `;
            cardsGrid.appendChild(card);
        });

        yearDiv.appendChild(semDiv);
        });

        grid.appendChild(yearDiv);
    });

    setupSearch();
    }


    // ── Search ───────────────────────────────────────────────────────────────
    function setupSearch() {
    const input   = document.getElementById('cr-search');
    const countEl = document.getElementById('cr-count');
    const emptyEl = document.getElementById('cr-empty');

    input.addEventListener('input', () => {
        const q = input.value.trim().toLowerCase();
        let visible = 0;

        document.querySelectorAll('.cr-card').forEach(card => {
        const match = !q || card.dataset.code.includes(q) || card.dataset.desc.includes(q);
        card.style.display = match ? '' : 'none';

        const descEl = card.querySelector('.cr-desc');
        if (match && q) {
            const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
            descEl.innerHTML = card.dataset.original.replace(re, '<mark>$1</mark>');
            card.classList.add('cr-match');
        } else {
            descEl.textContent = card.dataset.original;
            card.classList.remove('cr-match');
        }
        
        if (match) visible++;
        });

        document.querySelectorAll('.cr-sem-block').forEach(b => {
        b.style.display = [...b.querySelectorAll('.cr-card')].some(c => c.style.display !== 'none') ? '' : 'none';
        });

        document.querySelectorAll('.cr-year-block').forEach(b => {
        b.style.display = [...b.querySelectorAll('.cr-sem-block')].some(s => s.style.display !== 'none') ? '' : 'none';
        });

        countEl.textContent   = q ? `${visible} subject${visible !== 1 ? 's' : ''} found` : '';
        emptyEl.style.display = (q && visible === 0) ? 'block' : 'none';
    });
    }