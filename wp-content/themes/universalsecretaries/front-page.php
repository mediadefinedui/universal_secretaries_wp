<?php
/**
 * Template Name: Front Page Template
 *
 * The template for displaying the home page.
 *
 * @package Universal_Secretaries
 */

get_header();

$theme_uri = get_template_directory_uri();
?>

        <!-- Hero & Book Your Consultation Area -->
        <section id="tax-calculation" class="booking-section-wrapper">
            <div class="container" style="max-width: 1240px;">
                <div class="row align-items-center g-4 g-xl-5">

                    <!-- Left Side: Hero Value Proposition & Example Filing Card -->
                    <div class="col-xl-6 col-lg-6 col-12">
                        <div class="booking-hero-content wow fadeInLeft" data-wow-delay="0.1s">

                            <!-- Top Pill Badge -->
                            <div class="hero-top-badge">
                                <span class="badge-year"><?php echo esc_html( universal_get_field( 'hero_badge_year', null, 'Since 2012' ) ); ?></span>
                                <span class="badge-text"><?php echo esc_html( universal_get_field( 'hero_badge_text', null, 'Qualified company secretaries in Sri Lanka' ) ); ?></span>
                            </div>

                            <!-- Main Headline -->
                            <h1 class="hero-main-title">
                                <?php
                                $hero_title = universal_get_field( 'hero_title', null, "We handle<br><span class=\"title-highlight\">your company<br>registration</span> in<br>Sri Lanka." );
                                echo wp_kses_post( $hero_title );
                                ?>
                            </h1>

                            <!-- Secondary Highlight Headline -->
                            <h3 class="hero-sub-title">
                                <?php
                                $hero_sub = universal_get_field( 'hero_subtitle', null, "Then your <span class=\"sub-highlight\">tax returns</span>, every year after." );
                                echo wp_kses_post( $hero_sub );
                                ?>
                            </h3>

                            <!-- Description -->
                            <p class="hero-description">
                                <?php echo esc_html( universal_get_field( 'hero_description', null, 'Sri Lanka company registration, tax consultation and bookkeeping in one place. Book a private consultation and we take your company from name check to eROC, BO forms and certificate, then stay on as your Company Secretary.' ) ); ?>
                            </p>

                            <!-- Action Buttons -->
                            <div class="hero-action-buttons">
                                <a href="<?php echo esc_url( universal_get_field( 'hero_primary_btn_url', null, '#consultationBookingForm' ) ); ?>" class="btn-hero-primary" id="btnHeroBook">
                                    <span><?php echo esc_html( universal_get_field( 'hero_primary_btn_text', null, 'Book a consultation' ) ); ?></span>
                                </a>
                                <a href="<?php echo esc_url( universal_get_field( 'hero_secondary_btn_url', null, '#how-it-works' ) ); ?>" class="btn-hero-secondary" id="btnHeroHowWeWork">
                                    <span><?php echo esc_html( universal_get_field( 'hero_secondary_btn_text', null, 'See how we work' ) ); ?></span>
                                </a>
                            </div>

                            <!-- Example Filing Floating Card -->
                            <div class="example-filing-card">
                                <!-- Top Right Floating Tag -->
                                <div class="filing-floating-tag">
                                    <span>BO 1 &amp; BO 5 filed</span>
                                </div>

                                <!-- Filing Header -->
                                <div class="filing-header">
                                    <span class="filing-label">Example filing</span>
                                    <span class="filing-status">
                                        <span class="status-dot"></span> In progress
                                    </span>
                                </div>

                                <!-- Company Name & Subtitle -->
                                <h4 class="filing-company-name">Lanka Example Traders (Pvt) Ltd</h4>
                                <p class="filing-company-sub">Sample company, shown to illustrate the stages</p>

                                <!-- Stages / Steps List -->
                                <div class="filing-steps-list">
                                    <div class="filing-step done">
                                        <div class="step-check"><i class="fa fa-check"></i></div>
                                        <div class="step-info">Name search and Section 7 check</div>
                                        <div class="step-stage">Step 1</div>
                                    </div>

                                    <div class="filing-step done">
                                        <div class="step-check"><i class="fa fa-check"></i></div>
                                        <div class="step-info">Forms 1, 18 and 19 submitted on eROC</div>
                                        <div class="step-stage">Step 2</div>
                                    </div>

                                    <div class="filing-step done">
                                        <div class="step-check"><i class="fa fa-check"></i></div>
                                        <div class="step-info">
                                            <span>BO 5 and BO 1 on the BO portal</span>
                                            <span class="badge-new">NEW</span>
                                        </div>
                                        <div class="step-stage">Step 3</div>
                                    </div>

                                    <div class="filing-step done">
                                        <div class="step-check"><i class="fa fa-check"></i></div>
                                        <div class="step-info">Certificate of incorporation</div>
                                        <div class="step-stage">Issued</div>
                                    </div>

                                    <div class="filing-step ongoing">
                                        <div class="step-circle"></div>
                                        <div class="step-info">Company Secretary appointed</div>
                                        <div class="step-stage">Ongoing</div>
                                    </div>
                                </div>

                                <!-- Bottom Floating Badge -->
                                <div class="filing-bottom-badge">
                                    <span>Section 221 secretary appointed</span>
                                </div>
                            </div>
                            <!--// Example Filing Card -->

                        </div>
                    </div>
                    <!--// Left Side -->

                    <!-- Right Side: Book your consultation form -->
                    <div class="col-xl-6 col-lg-6 col-12">

                        <div class="booking-card wow fadeInUp" data-wow-delay="0.15s">

                            <h2 class="booking-card__title">Book your consultation</h2>
                            <p class="booking-card__subtitle">One client per 45-minute slot, by video or phone.</p>

                            <!-- Booking Form -->
                            <form id="consultationBookingForm" novalidate>

                                <div class="booking-alert" id="bookingAlert"></div>

                                <!-- 1. CONSULTATION TYPE -->
                                <div class="booking-group">
                                    <span class="booking-label">CONSULTATION</span>
                                    <div class="consultation-types">
                                        <button type="button" class="consultation-type-btn active" data-type="Company registration">Company registration</button>
                                        <button type="button" class="consultation-type-btn" data-type="Tax consultation">Tax consultation</button>
                                        <button type="button" class="consultation-type-btn" data-type="Bookkeeping">Bookkeeping</button>
                                    </div>
                                </div>

                                <!-- 2. DAY SELECTOR -->
                                <div class="booking-group">
                                    <span class="booking-label">DAY</span>
                                    <div class="day-scroll-wrapper">
                                        <div class="day-scroll-track" id="dayScrollTrack">
                                            <!-- Dynamically populated weekdays by booking-consultation.js -->
                                        </div>
                                    </div>
                                </div>

                                <!-- 3. TIME SLOTS -->
                                <div class="booking-group">
                                    <span class="booking-label">TIME</span>
                                    <div class="time-slot-grid">
                                        <button type="button" class="time-slot-btn active" data-time="07:00-07:45">07:00-07:45</button>
                                        <button type="button" class="time-slot-btn" data-time="07:45-08:30">07:45-08:30</button>
                                        <button type="button" class="time-slot-btn" data-time="08:30-09:15">08:30-09:15</button>
                                        <button type="button" class="time-slot-btn" data-time="09:15-10:00">09:15-10:00</button>
                                        <button type="button" class="time-slot-btn" data-time="10:00-10:45">10:00-10:45</button>
                                        <button type="button" class="time-slot-btn" data-time="10:45-11:30">10:45-11:30</button>
                                    </div>
                                    <div class="time-note">
                                        <i class="fa fa-clock-o"></i>
                                        <span>Sri Lanka time (UTC+5:30). Weekdays, 7:00 a.m. to 12:00 noon.</span>
                                    </div>
                                </div>

                                <!-- 4. YOUR DETAILS -->
                                <div class="booking-group">
                                    <span class="booking-label">YOUR DETAILS</span>

                                    <div class="form-grid-2">
                                        <div class="form-field">
                                            <label class="field-label" for="clientFullName">Full name</label>
                                            <input type="text" id="clientFullName" class="field-input" placeholder="" required>
                                        </div>
                                        <div class="form-field">
                                            <label class="field-label" for="clientPhone">Phone or WhatsApp</label>
                                            <input type="tel" id="clientPhone" class="field-input" placeholder="" required>
                                        </div>
                                    </div>

                                    <div class="form-field full-width">
                                        <label class="field-label" for="clientEmail">Email</label>
                                        <input type="email" id="clientEmail" class="field-input" placeholder="" required>
                                    </div>

                                    <div class="form-field full-width">
                                        <label class="field-label" for="clientNotes">
                                            Anything we should know? <span class="optional-tag">(optional)</span>
                                        </label>
                                        <textarea id="clientNotes" class="field-textarea" rows="3" placeholder="For example: two directors, one foreign shareholder, planned company name"></textarea>
                                    </div>
                                </div>

                                <button type="submit" class="confirm-booking-btn" id="confirmBookingBtn">
                                    <span>Confirm booking</span>
                                    <div class="btn-spinner" id="btnSpinner"></div>
                                </button>

                            </form>

                        </div>

                    </div>
                    <!--// Right Side -->

                </div>
            </div>
        </section>
        <!--// Hero & Book Your Consultation Area -->

        <!-- Services Marquee Ticker Section -->
        <section class="ticker-section" id="tickerSection" aria-label="Services Ticker">
            <div class="ticker-inner">
                <div class="row" id="tickrow">
                    <span>Company registration</span><span>eROC filings</span><span>BO forms 1 to 7</span><span>Annual Return, Form 15</span><span>Beneficial ownership register</span><span>Company Secretary, Section 221</span><span>Income tax returns</span><span>EPF and ETF</span><span>Monthly bookkeeping</span><span>Director and share changes</span><span>Company registration</span><span>eROC filings</span><span>BO forms 1 to 7</span><span>Annual Return, Form 15</span><span>Beneficial ownership register</span><span>Company Secretary, Section 221</span><span>Income tax returns</span><span>EPF and ETF</span><span>Monthly bookkeeping</span><span>Director and share changes</span>
                </div>
            </div>
        </section>
        <!--// Services Marquee Ticker Section -->

        <!-- Page Content -->
        <main class="page-content">

            <!-- About Area -->
            <section id="about-area" class="cr-section about-area bg--white">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-lg-5">
                            <div class="about-area__image">
                                <?php
                                $about_img = universal_get_field( 'home_about_image' );
                                if ( empty( $about_img ) ) {
                                    $about_img = $theme_uri . '/assets/images/about/about-thumbnail.webp';
                                }
                                ?>
                                <img class="wow slideInLeft" style="width: 100%; border-radius: 8px;" src="<?php echo esc_url( $about_img ); ?>" alt="About Universal Secretaries">
                            </div>
                        </div>
                        <div class="col-lg-7">
                            <div class="about-area__content">
                                <h4>WE ARE “<span class="color--theme"><?php echo esc_html( universal_get_field( 'home_about_tagline', null, 'Universal Secretaries' ) ); ?></span>”</h4>
                                <h3 class="cd-headline cx-heading slide">
                                    <?php
                                    $heading = universal_get_field( 'home_about_title', null, 'PROVIDE BEST TAX SOLUTION FOR YOUR BUSINESS PERFORMANCE SUCCESS TO GROWUP' );
                                    echo esc_html( $heading );
                                    ?>
                                </h3>
                                <p><?php echo esc_html( universal_get_field( 'home_about_p1', null, 'Universal Secretaries provides end-to-end corporate secretarial, tax compliance, and financial advisory services in Sri Lanka. Since 2012, we have helped hundreds of businesses incorporate with confidence and maintain seamless statutory compliance.' ) ); ?></p>
                                <p><?php echo esc_html( universal_get_field( 'home_about_p2', null, 'From company incorporation on eROC and mandatory Beneficial Ownership filings to annual returns and corporate income tax filings, every client file is reviewed by qualified chartered professionals.' ) ); ?></p>
                                <a href="<?php echo esc_url( home_url( '/about-us/' ) ); ?>" class="cr-btn">
                                    <span>Read More</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- //About Area -->

            <!-- Behind The Scenes - Process Timeline -->
            <section class="s bts-section" id="how-it-works">
                <div class="wrap bts">
                    <div class="bts-intro rv">
                        <p class="eyebrow"><?php echo esc_html( universal_get_field( 'bts_eyebrow', null, 'Behind the scenes' ) ); ?></p>
                        <div class="sh" style="margin-bottom:14px">
                            <h2><?php echo esc_html( universal_get_field( 'bts_title', null, 'How Sri Lanka company registration works with us' ) ); ?></h2>
                        </div>
                        <p><?php echo esc_html( universal_get_field( 'bts_desc', null, 'Most clients only see the certificate at the end. These are the steps our team works through, including the beneficial ownership forms the Registrar now requires before a company counts as fully incorporated.' ) ); ?></p>
                        <a class="btn" href="<?php echo esc_url( home_url( '/appointment/' ) ); ?>" style="margin-top:10px">Start with a consultation</a>
                    </div>
                    <ol class="tl" id="tl" style="--p: 42.0%;">
                        <li class="rv" data-n="1">
                            <h3>Consultation and file opening</h3>
                            <p>We confirm the structure, directors, shareholders and who the beneficial owners are. You get a written checklist the same day.</p>
                            <span class="who">Managing Director</span>
                        </li>
                        <li class="rv" data-n="2">
                            <h3>Name search and Section 7 check</h3>
                            <p>We test your proposed names against the Registrar's rules before applying, so you are not refused after paying.</p>
                            <span class="who">Company secretarial team</span>
                        </li>
                        <li class="rv" data-n="3">
                            <h3>Forms 1, 18 and 19 on eROC</h3>
                            <p>Articles and incorporation forms are drafted, checked by a second person, signed and submitted online.</p>
                            <span class="who">Company secretarial team</span>
                        </li>
                        <li class="rv boli" data-n="4">
                            <h3>BO 5 and BO 1 on the BO portal <span class="flag">Required since 30 Mar 2026</span></h3>
                            <p>We appoint your authorised person (BO 5) and declare the beneficial owners (BO 1). Without both, the incorporation is sent back.</p>
                            <span class="who">Company secretarial team</span>
                        </li>
                        <li class="rv" data-n="5">
                            <h3>Certificate and secretary appointment</h3>
                            <p>You receive the incorporation documents, and we take on the Company Secretary role required under Section 221.</p>
                            <span class="who">Qualified Company Secretary</span>
                        </li>
                        <li class="rv" data-n="6">
                            <h3>Tax, EPF/ETF and bookkeeping set up</h3>
                            <p>IRD, EPF and ETF registrations are put in place, with monthly bookkeeping if you choose it.</p>
                            <span class="who">Tax &amp; finance team</span>
                        </li>
                        <li class="rv" data-n="7">
                            <h3>Every deadline tracked</h3>
                            <p>Annual returns with BO 4, tax returns, monthly payments and BO 2 or BO 3 after share changes. We contact you before the date.</p>
                            <span class="who">Whole team</span>
                        </li>
                    </ol>
                </div>
            </section>
            <!--// Behind The Scenes -->

            <!-- Compliance Calendar: Deadline Tracker -->
            <section class="s tint" id="calendar">
                <div class="wrap">
                    <div class="sh rv">
                        <div>
                            <p class="eyebrow">Deadline tracker</p>
                            <h2>Your Sri Lanka tax and compliance year at a glance</h2>
                            <p>Tap a month on the dial to see what falls due. We track each of these for you and confirm the dates for your company at the consultation.</p>
                        </div>
                    </div>
                    <div class="cal">
                        <div class="dialbox rv">
                            <svg id="dial" viewBox="0 0 400 400" role="img" aria-label="Twelve-month compliance dial">
                                <circle cx="200" cy="200" r="182" fill="none" style="stroke: var(--sky);" stroke-width="1.5" stroke-dasharray="2 10" opacity="0.6">
                                    <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="60s" repeatCount="indefinite"></animateTransform>
                                </circle>
                                <g class="seg-m" tabindex="0" role="button" aria-label="Jan: EPF &amp; ETF, Tax payments">
                                    <path d="M202.0159516163484,32.012095854848695A168 168 0 0 1 282.24808676001766,53.510231673619586L257.76948951001236,97.10837700885185A118 118 0 0 0 201.41596601624468,82.0084958980485Z" style="fill: var(--light); stroke: none; stroke-width: 0px;"></path>
                                    <text x="237.01112344966046" y="66.87260684066322" text-anchor="middle" font-size="14" font-weight="800" font-family="Manrope,system-ui,sans-serif" style="fill: var(--ink);">Jan</text>
                                    <circle cx="247.10506620865877" cy="24.201499615389565" r="4" style="fill: var(--sky);"></circle>
                                </g>
                                <g class="seg-m" tabindex="0" role="button" aria-label="Feb: Self-assessment 15 Feb, EPF &amp; ETF, Tax payments">
                                    <path d="M285.7398173851336,55.526183289967946A168 168 0 0 1 344.473816710032,114.26018261486635L301.4756569749035,139.77798540806089A118 118 0 0 0 260.2220145919391,98.52434302509653Z" style="fill: var(--sky); stroke: none; stroke-width: 0px;"></path>
                                    <text x="301.1162697096763" y="103.8837302903237" text-anchor="middle" font-size="14" font-weight="800" font-family="Manrope,system-ui,sans-serif" fill="#ffffff">Feb</text>
                                    <circle cx="328.69343417595167" cy="71.30656582404833" r="4" style="fill: var(--sky);"></circle>
                                </g>
                                <g class="seg-m" tabindex="0" role="button" aria-label="Mar: EPF &amp; ETF, Tax payments">
                                    <path d="M346.4897683263804,117.75191323998233A168 168 0 0 1 367.98790414515133,197.98404838365164L317.9915041019515,198.58403398375532A118 118 0 0 0 302.89162299114815,142.23051048998758Z" style="fill: var(--light); stroke: none; stroke-width: 0px;"></path>
                                    <text x="338.12739315933675" y="167.9888765503395" text-anchor="middle" font-size="14" font-weight="800" font-family="Manrope,system-ui,sans-serif" style="fill: var(--ink);">Mar</text>
                                    <circle cx="375.7985003846104" cy="152.8949337913412" r="4" style="fill: var(--sky);"></circle>
                                </g>
                                <g class="seg-m" tabindex="0" role="button" aria-label="Apr: EPF &amp; ETF, Tax payments">
                                    <path d="M367.98790414515133,202.01595161634836A168 168 0 0 1 346.4897683263804,282.24808676001766L302.89162299114815,257.76948951001236A118 118 0 0 0 317.9915041019515,201.41596601624468Z" style="fill: var(--light); stroke: none; stroke-width: 0px;"></path>
                                    <text x="338.12739315933675" y="242.01112344966046" text-anchor="middle" font-size="14" font-weight="800" font-family="Manrope,system-ui,sans-serif" style="fill: var(--ink);">Apr</text>
                                    <circle cx="375.7985003846104" cy="247.10506620865877" r="4" style="fill: var(--sky);"></circle>
                                </g>
                                <g class="seg-m" tabindex="0" role="button" aria-label="May: Self-assessment 15 May, EPF &amp; ETF, Tax payments">
                                    <path d="M344.47381671003205,285.7398173851336A168 168 0 0 1 285.7398173851336,344.47381671003205L260.2220145919391,301.4756569749035A118 118 0 0 0 301.4756569749035,260.2220145919391Z" style="fill: var(--sky); stroke: none; stroke-width: 0px;"></path>
                                    <text x="301.1162697096763" y="306.1162697096763" text-anchor="middle" font-size="14" font-weight="800" font-family="Manrope,system-ui,sans-serif" fill="#ffffff">May</text>
                                    <circle cx="328.69343417595167" cy="328.69343417595167" r="4" style="fill: var(--sky);"></circle>
                                </g>
                                <g class="seg-m" tabindex="0" role="button" aria-label="Jun: EPF &amp; ETF, Tax payments">
                                    <path d="M282.24808676001766,346.4897683263804A168 168 0 0 1 202.0159516163484,367.98790414515133L201.41596601624468,317.9915041019515A118 118 0 0 0 257.76948951001236,302.89162299114815Z" style="fill: var(--light); stroke: none; stroke-width: 0px;"></path>
                                    <text x="237.01112344966046" y="343.12739315933675" text-anchor="middle" font-size="14" font-weight="800" font-family="Manrope,system-ui,sans-serif" style="fill: var(--ink);">Jun</text>
                                    <circle cx="247.10506620865877" cy="375.7985003846104" r="4" style="fill: var(--sky);"></circle>
                                </g>
                                <g class="seg-m" tabindex="0" role="button" aria-label="Jul: EPF &amp; ETF, Tax payments">
                                    <path d="M197.98404838365164,367.98790414515133A168 168 0 0 1 117.7519132399823,346.4897683263804L142.23051048998758,302.89162299114815A118 118 0 0 0 198.58403398375532,317.9915041019515Z" style="fill: var(--light); stroke: none; stroke-width: 0px;"></path>
                                    <text x="162.9888765503395" y="343.12739315933675" text-anchor="middle" font-size="14" font-weight="800" font-family="Manrope,system-ui,sans-serif" style="fill: var(--ink);">Jul</text>
                                    <circle cx="152.8949337913412" cy="375.7985003846104" r="4" style="fill: var(--sky);"></circle>
                                </g>
                                <g class="seg-m" tabindex="0" role="button" aria-label="Aug: Self-assessment 15 Aug, EPF &amp; ETF, Tax payments">
                                    <path d="M114.26018261486634,344.473816710032A168 168 0 0 1 55.526183289967975,285.7398173851337L98.52434302509656,260.2220145919391A118 118 0 0 0 139.77798540806089,301.4756569749035Z" style="fill: var(--sky); stroke: none; stroke-width: 0px;"></path>
                                    <text x="98.88373029032371" y="306.1162697096763" text-anchor="middle" font-size="14" font-weight="800" font-family="Manrope,system-ui,sans-serif" fill="#ffffff">Aug</text>
                                    <circle cx="71.30656582404836" cy="328.69343417595167" r="4" style="fill: var(--sky);"></circle>
                                </g>
                                <g class="seg-m" tabindex="0" role="button" aria-label="Sep: Final tax payment 30 Sep, EPF &amp; ETF, Tax payments">
                                    <path d="M53.510231673619614,282.2480867600177A168 168 0 0 1 32.012095854848695,202.0159516163484L82.0084958980485,201.4159660162447A118 118 0 0 0 97.10837700885187,257.7694895100125Z" style="fill: var(--blue); stroke: none; stroke-width: 0px;"></path>
                                    <text x="61.87260684066325" y="242.0111234496605" text-anchor="middle" font-size="14" font-weight="800" font-family="Manrope,system-ui,sans-serif" fill="#ffffff">Sep</text>
                                    <circle cx="24.201499615389594" cy="247.10506620865883" r="4" style="fill: var(--sky);"></circle>
                                </g>
                                <g class="seg-m" tabindex="0" role="button" aria-label="Oct: BO deadline 21 Oct, EPF &amp; ETF, Tax payments">
                                    <path d="M32.012095854848695,197.98404838365167A168 168 0 0 1 53.510231673619586,117.7519132399823L97.10837700885186,142.23051048998758A118 118 0 0 0 82.0084958980485,198.58403398375532Z" style="fill: var(--purple); stroke: none; stroke-width: 0px;"></path>
                                    <text x="61.872606840663224" y="167.9888765503395" text-anchor="middle" font-size="14" font-weight="800" font-family="Manrope,system-ui,sans-serif" fill="#ffffff">Oct</text>
                                    <circle cx="24.201499615389565" cy="152.8949337913412" r="4" style="fill: var(--sky);"></circle>
                                </g>
                                <g class="seg-m" tabindex="0" role="button" aria-label="Nov: Final return 30 Nov, Self-assessment 15 Nov, EPF &amp; ETF, Tax payments">
                                    <path d="M55.526183289967975,114.26018261486635A168 168 0 0 1 114.26018261486637,55.526183289967946L139.77798540806089,98.52434302509653A118 118 0 0 0 98.52434302509654,139.77798540806089Z" style="fill: var(--blue); stroke: var(--ink); stroke-width: 2.5px;"></path>
                                    <text x="98.88373029032368" y="103.88373029032371" text-anchor="middle" font-size="14" font-weight="800" font-family="Manrope,system-ui,sans-serif" fill="#ffffff">Nov</text>
                                    <circle cx="71.30656582404833" cy="71.30656582404836" r="4" style="fill: var(--sky);"></circle>
                                </g>
                                <g class="seg-m" tabindex="0" role="button" aria-label="Dec: EPF &amp; ETF, Tax payments">
                                    <path d="M117.7519132399822,53.51023167361967A168 168 0 0 1 197.98404838365167,32.012095854848695L198.58403398375535,82.0084958980485A118 118 0 0 0 142.2305104899875,97.10837700885192Z" style="fill: var(--light); stroke: none; stroke-width: 0px;"></path>
                                    <text x="162.98887655033954" y="66.87260684066322" text-anchor="middle" font-size="14" font-weight="800" font-family="Manrope,system-ui,sans-serif" style="fill: var(--ink);">Dec</text>
                                    <circle cx="152.89493379134126" cy="24.201499615389565" r="4" style="fill: var(--sky);"></circle>
                                </g>
                                <circle cx="200" cy="200" r="108" style="fill: var(--surface); stroke: var(--line);"></circle>
                            </svg>
                            <div class="dial-c">
                                <div>
                                    <div class="m" id="dm">Nov</div>
                                    <div class="d" id="dd">Final return 30 Nov, Self-assessment 15 Nov, EPF &amp; ETF, Tax payments</div>
                                </div>
                            </div>
                            <div class="legend">
                                <span><i style="background:var(--blue)"></i>Yearly</span>
                                <span><i style="background:var(--sky)"></i>Quarterly</span>
                                <span><i style="background:var(--purple)"></i>BO</span>
                                <span><i style="background:var(--light); border:1px solid #cbd5e1;"></i>Monthly</span>
                            </div>
                        </div>

                        <div class="lanes">
                            <div class="lane rv">
                                <h3>Every year</h3>
                                <div class="dl">
                                    <div class="due y" data-m="final">
                                        <div class="k">
                                            <span class="ic">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="6" width="18" height="13" rx="2"></rect><path d="M3 10h18M7 15h3"></path></svg>
                                            </span>
                                            <h4>Final tax payment</h4>
                                        </div>
                                        <span class="when">30 September</span>
                                        <p>Balance of income tax for the year of assessment.</p>
                                        <div class="cd" data-md="09-30">
                                            <span><b>332</b><small>days</small></span><span><b>13</b><small>hrs</small></span><span><b>20</b><small>min</small></span>
                                        </div>
                                    </div>

                                    <div class="due y hot" data-m="tax">
                                        <div class="k">
                                            <span class="ic">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="4" y="5" width="16" height="15" rx="2"></rect><path d="M4 10h16M9 3v4M15 3v4"></path></svg>
                                            </span>
                                            <h4>Final return submission</h4>
                                        </div>
                                        <span class="when">30 November</span>
                                        <p>Income tax return for the year of assessment.</p>
                                        <div class="cd" data-md="11-30">
                                            <span><b>28</b><small>days</small></span><span><b>13</b><small>hrs</small></span><span><b>20</b><small>min</small></span>
                                        </div>
                                    </div>

                                    <div class="due y" data-m="ar">
                                        <div class="k">
                                            <span class="ic">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M7 3h8l4 4v14H7z"></path><path d="M10 13h6M10 17h4"></path></svg>
                                            </span>
                                            <h4>Annual Return</h4>
                                        </div>
                                        <span class="when">Form 15, after your AGM</span>
                                        <p>Filed with the Registrar every year. The date follows your company's AGM.</p>
                                    </div>

                                    <div class="due y boc" data-m="bo4">
                                        <div class="k">
                                            <span class="ic">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="9" cy="8" r="3"></circle><path d="M3 20c.8-3.5 3.2-5.5 6-5.5s5.2 2 6 5.5"></path></svg>
                                            </span>
                                            <h4>BO filing</h4>
                                        </div>
                                        <span class="when">BO 4 with each annual return</span>
                                        <p>Existing companies: Registrar's extended deadline 21 Oct 2026.</p>
                                        <div class="cd" data-cd="2026-10-21T23:59:59+05:30">
                                            <span><b>Passed</b><small>check status</small></span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="lane rv">
                                <h3>Every quarter</h3>
                                <div class="dl">
                                    <div class="due q wide hot" data-m="sa">
                                        <div class="k">
                                            <span class="ic">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 2"></path></svg>
                                            </span>
                                            <h4>Self-assessment tax payments</h4>
                                        </div>
                                        <span class="when">Quarterly instalments</span>
                                        <ol class="qs" id="qs">
                                            <li data-md="08-15"><b>15</b>Aug<small>1st</small></li>
                                            <li data-md="11-15" class="next"><b>15</b>Nov<small>2nd</small></li>
                                            <li data-md="02-15"><b>15</b>Feb<small>3rd</small></li>
                                            <li data-md="05-15"><b>15</b>May<small>4th</small></li>
                                        </ol>
                                        <div class="cd urgent" data-md="08-15,11-15,02-15,05-15">
                                            <span><b>13</b><small>days</small></span><span><b>13</b><small>hrs</small></span><span><b>20</b><small>min</small></span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="lane rv">
                                <h3>Every month</h3>
                                <div class="dl">
                                    <div class="due" data-m="epf">
                                        <div class="k">
                                            <span class="ic">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 12h4l3-7 4 14 3-7h4"></path></svg>
                                            </span>
                                            <h4>EPF &amp; ETF</h4>
                                        </div>
                                        <span class="when">Monthly contributions</span>
                                        <p>Payroll contributions remitted every month.</p>
                                        <div class="beat">
                                            <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
                                        </div>
                                    </div>

                                    <div class="due" data-m="pay">
                                        <div class="k">
                                            <span class="ic">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="6" width="18" height="13" rx="2"></rect><path d="M3 10h18M7 15h3"></path></svg>
                                            </span>
                                            <h4>Tax payments</h4>
                                        </div>
                                        <span class="when">Monthly to the IRD</span>
                                        <p>Monthly tax deductions and payments due to the IRD.</p>
                                        <div class="beat">
                                            <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!--// Compliance Calendar -->

            <!-- Testimonial Area -->
            <section id="testimonial-area" class="testimonial-area cr-section">
                <div class="container" style="max-width: 1240px;">
                    <div class="row justify-content-center">
                        <div class="col-lg-8 col-md-10 text-center">
                            <div class="section-title">
                                <span class="testimonial-badge"><i class="fa fa-star"></i> <?php echo esc_html( universal_get_field( 'testi_badge', null, 'CLIENT RECOMMENDATIONS' ) ); ?></span>
                                <h2 class="testimonial-heading"><?php echo esc_html( universal_get_field( 'testi_heading', null, 'WHAT CLIENTS TELL US' ) ); ?></h2>
                                <p class="testimonial-subheading"><?php echo esc_html( universal_get_field( 'testi_subheading', null, 'Trusted by directors, executives, and company founders across Sri Lanka since 2012.' ) ); ?></p>
                            </div>
                        </div>
                    </div>

                    <div class="testimonial-slider-wrapper">
                        <button type="button" class="testi-nav-btn testi-nav-prev" id="testiPrevBtn" aria-label="Previous Testimonials">
                            <i class="fa fa-angle-left"></i>
                        </button>

                        <div class="testimonial-slider-track" id="testimonialSliderTrack">

                            <?php
                            if ( have_rows( 'testimonials_list' ) ) :
                                while ( have_rows( 'testimonials_list' ) ) : the_row();
                                    $client_name       = get_sub_field( 'client_name' );
                                    $client_credential = get_sub_field( 'client_credential' );
                                    $client_title      = get_sub_field( 'client_title' );
                                    $client_avatar     = get_sub_field( 'client_avatar' );
                                    $stars_count       = intval( get_sub_field( 'stars' ) ?: 5 );
                                    $quote             = get_sub_field( 'testimonial_text' );

                                    if ( empty( $client_avatar ) ) {
                                        $client_avatar = $theme_uri . '/assets/img/customers/09.webp';
                                    }
                            ?>
                                <div class="testi-slide-item">
                                    <div class="testi-card">
                                        <div class="testi-card__top">
                                            <div class="testi-card__stars">
                                                <?php for ( $i = 0; $i < $stars_count; $i++ ) : ?>
                                                    <i class="fa fa-star"></i>
                                                <?php endfor; ?>
                                            </div>
                                        </div>
                                        <div class="testi-card__quote-wrap">
                                            <i class="fa fa-quote-left testi-card__quote-icon" aria-hidden="true"></i>
                                            <p class="testi-card__text">
                                                <?php echo esc_html( $quote ); ?>
                                            </p>
                                        </div>
                                        <div class="testi-card__author">
                                            <div class="testi-card__avatar">
                                                <img loading="lazy" src="<?php echo esc_url( $client_avatar ); ?>" alt="<?php echo esc_attr( $client_name ); ?>">
                                            </div>
                                            <div class="testi-card__author-info">
                                                <h4 class="testi-card__name"><?php echo esc_html( $client_name ); ?></h4>
                                                <?php if ( ! empty( $client_credential ) ) : ?>
                                                    <span class="testi-card__credential"><?php echo esc_html( $client_credential ); ?></span>
                                                <?php endif; ?>
                                                <?php if ( ! empty( $client_title ) ) : ?>
                                                    <p class="testi-card__title"><?php echo esc_html( $client_title ); ?></p>
                                                <?php endif; ?>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            <?php
                                endwhile;
                            else :
                                // Default fallback slides
                            ?>
                                <!-- Slide 1 -->
                                <div class="testi-slide-item">
                                    <div class="testi-card">
                                        <div class="testi-card__top">
                                            <div class="testi-card__stars">
                                                <i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>
                                            </div>
                                        </div>
                                        <div class="testi-card__quote-wrap">
                                            <i class="fa fa-quote-left testi-card__quote-icon" aria-hidden="true"></i>
                                            <p class="testi-card__text">
                                                Prashad and Universal Secretaries (Pvt) Ltd have been handling my tax matters for over seven years. I have had an extremely pleasant experience in dealing with him and the company. Prashad has always given me good advice and handled all matters hassle-free. He is always contactable and delivers a prompt and efficient service. I have introduced Prashad to many of my friends who are also extremely happy with the advice and service. All filings are reviewed by qualified personnel to ensure accuracy and compliance.
                                            </p>
                                        </div>
                                        <div class="testi-card__author">
                                            <div class="testi-card__avatar">
                                                <img loading="lazy" src="<?php echo esc_url( $theme_uri . '/assets/img/customers/09.webp' ); ?>" alt="Prasanna de Silva">
                                            </div>
                                            <div class="testi-card__author-info">
                                                <h4 class="testi-card__name">Prasanna de Silva</h4>
                                                <span class="testi-card__credential">FCMA (UK), CFA Finalist</span>
                                                <p class="testi-card__title">Deputy Managing Director, Central Finance Company PLC | Director of Nations Trust Bank PLC</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Slide 2 -->
                                <div class="testi-slide-item">
                                    <div class="testi-card">
                                        <div class="testi-card__top">
                                            <div class="testi-card__stars">
                                                <i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>
                                            </div>
                                        </div>
                                        <div class="testi-card__quote-wrap">
                                            <i class="fa fa-quote-left testi-card__quote-icon" aria-hidden="true"></i>
                                            <p class="testi-card__text">
                                                I have had the pleasure of working closely with Sudharshana Prasad over the past 4 years and have consistently been impressed by his expertise, professionalism, and dedication to client service. Sudharshana Prasad consistently stays updated with the latest developments in the field. This knowledge, coupled with his extensive experience, allows him to provide insightful advice and effective solutions. I endorse Sudharshana Prasad as a good tax consultant.
                                            </p>
                                        </div>
                                        <div class="testi-card__author">
                                            <div class="testi-card__avatar">
                                                <img loading="lazy" src="<?php echo esc_url( $theme_uri . '/assets/img/customers/02.webp' ); ?>" alt="Damitha Serasinghe">
                                            </div>
                                            <div class="testi-card__author-info">
                                                <h4 class="testi-card__name">Damitha Serasinghe</h4>
                                                <span class="testi-card__credential">IT Leadership</span>
                                                <p class="testi-card__title">Deputy Director - IT, Singer Sri Lanka PLC</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Slide 3 -->
                                <div class="testi-slide-item">
                                    <div class="testi-card">
                                        <div class="testi-card__top">
                                            <div class="testi-card__stars">
                                                <i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>
                                            </div>
                                        </div>
                                        <div class="testi-card__quote-wrap">
                                            <i class="fa fa-quote-left testi-card__quote-icon" aria-hidden="true"></i>
                                            <p class="testi-card__text">
                                                I've been a client of Prashad in Colombo for about 8 years. When I was Area Manager for Etihad Airways, he managed the tax affairs of the company including my liabilities as an expat employee. He handled both efficiently, pragmatically and with knowledge of international obligations and treaties. When I started my own company in 2020 I invited Prashad to handle my accounting and tax matters, which he has continued to do very effectively.
                                            </p>
                                        </div>
                                        <div class="testi-card__author">
                                            <div class="testi-card__avatar">
                                                <img loading="lazy" src="<?php echo esc_url( $theme_uri . '/assets/img/customers/06.webp' ); ?>" alt="Dougie Douglas">
                                            </div>
                                            <div class="testi-card__author-info">
                                                <h4 class="testi-card__name">Dougie Douglas</h4>
                                                <span class="testi-card__credential">Former GM Etihad Airways</span>
                                                <p class="testi-card__title">Airpark Vice President | Former General Manager Sri Lanka, Nepal, Maldives &amp; Seychelles at Etihad Airways</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Slide 4 -->
                                <div class="testi-slide-item">
                                    <div class="testi-card">
                                        <div class="testi-card__top">
                                            <div class="testi-card__stars">
                                                <i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>
                                            </div>
                                        </div>
                                        <div class="testi-card__quote-wrap">
                                            <i class="fa fa-quote-left testi-card__quote-icon" aria-hidden="true"></i>
                                            <p class="testi-card__text">
                                                Prashad and the TaxFiling.lk / Universal Secretaries team are highly knowledgeable and dedicated professionals who have provided exceptional support in managing my personal tax matters. They consistently demonstrate a proactive approach, offering not only timely guidance but also practical strategies that make complex issues easier to understand. Their professionalism, attention to detail, and genuine commitment to client success set them apart as trusted advisors.
                                            </p>
                                        </div>
                                        <div class="testi-card__author">
                                            <div class="testi-card__avatar">
                                                <img loading="lazy" src="<?php echo esc_url( $theme_uri . '/assets/img/customers/04.webp' ); ?>" alt="Yasheela Amarawardena">
                                            </div>
                                            <div class="testi-card__author-info">
                                                <h4 class="testi-card__name">Yasheela Amarawardena</h4>
                                                <span class="testi-card__credential">Corporate HR Leadership</span>
                                                <p class="testi-card__title">Head of Human Resources, Overseas Realty (Ceylon) PLC</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Slide 5 -->
                                <div class="testi-slide-item">
                                    <div class="testi-card">
                                        <div class="testi-card__top">
                                            <div class="testi-card__stars">
                                                <i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>
                                            </div>
                                        </div>
                                        <div class="testi-card__quote-wrap">
                                            <i class="fa fa-quote-left testi-card__quote-icon" aria-hidden="true"></i>
                                            <p class="testi-card__text">
                                                He is a very hardworking person and has a very good personality. Having solid expertise in finance and taxation regulations in Sri Lanka. I can confidently recommend him and Universal Secretaries for any corporate entity or individual seeking dependable corporate secretarial and tax advisory services.
                                            </p>
                                        </div>
                                        <div class="testi-card__author">
                                            <div class="testi-card__avatar">
                                                <img loading="lazy" src="<?php echo esc_url( $theme_uri . '/assets/img/customers/03.webp' ); ?>" alt="Dimuthu Suranjana">
                                            </div>
                                            <div class="testi-card__author-info">
                                                <h4 class="testi-card__name">Dimuthu Suranjana</h4>
                                                <span class="testi-card__credential">Banking Executive</span>
                                                <p class="testi-card__title">AGM at National Savings Bank</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Slide 6 -->
                                <div class="testi-slide-item">
                                    <div class="testi-card">
                                        <div class="testi-card__top">
                                            <div class="testi-card__stars">
                                                <i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>
                                            </div>
                                        </div>
                                        <div class="testi-card__quote-wrap">
                                            <i class="fa fa-quote-left testi-card__quote-icon" aria-hidden="true"></i>
                                            <p class="testi-card__text">
                                                I am pleased to recommend Prashad as an outstanding tax consultant and financial advisor. Having worked closely with him for more than 3 years, Prashad’s deep understanding of tax laws and regulations is truly impressive. I had the opportunity to seek his assistance on some complex tax matters, and I was thoroughly impressed by his depth of knowledge, professionalism, and client-focused service.
                                            </p>
                                        </div>
                                        <div class="testi-card__author">
                                            <div class="testi-card__avatar">
                                                <img loading="lazy" src="<?php echo esc_url( $theme_uri . '/assets/img/customers/05.webp' ); ?>" alt="Koshitha Peramunugamage">
                                            </div>
                                            <div class="testi-card__author-info">
                                                <h4 class="testi-card__name">Koshitha Peramunugamage</h4>
                                                <span class="testi-card__credential">B2B Business Leader</span>
                                                <p class="testi-card__title">Head of Business Development - B2B, Singer Sri Lanka PLC</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            <?php endif; ?>

                        </div>

                        <button type="button" class="testi-nav-btn testi-nav-next" id="testiNextBtn" aria-label="Next Testimonials">
                            <i class="fa fa-angle-right"></i>
                        </button>
                    </div>

                    <div class="testimonial-carousel-dots" id="testimonialCarouselDots"></div>
                </div>
            </section>
            <!--// Testimonial Area -->

            <!-- FAQ Area -->
            <section class="s faq" id="faq">
                <div class="wrap" style="max-width:840px">
                    <div class="sh rv">
                        <div>
                            <p class="eyebrow"><span class="eyebrow-dot"></span>FAQ</p>
                            <h2>Before you <span class="title-accent">book</span></h2>
                            <p class="faq-subheading">Everything you need to know about company registration, tax advisory, and consultation bookings in Sri Lanka.</p>
                        </div>
                    </div>

                    <div class="faq-controls-bar">
                        <span class="faq-count-badge">
                            <i class="fa fa-question-circle"></i> 7 questions &amp; answers
                        </span>
                        <button type="button" class="faq-toggle-all-btn" id="faqToggleAllBtn" data-action="expand">
                            <i class="fa fa-expand"></i> Expand All
                        </button>
                    </div>

                    <!-- FAQ Item 1 (Default Open) -->
                    <details open="">
                        <summary>
                            <div class="faq-summary-left">
                                <span class="faq-q-number">01</span>
                                <h3 class="faq-q-title">How do I register a company in Sri Lanka?</h3>
                            </div>
                            <span class="faq-chevron" aria-hidden="true"><i class="fa fa-chevron-down"></i></span>
                        </summary>
                        <div class="faq-content">
                            <p>Company registration in Sri Lanka is done online through the Registrar of Companies <span class="faq-badge-term">eROC system</span>. You reserve a name, file Forms 1, 18 and 19, and since 30 March 2026 file <span class="faq-badge-term">BO 5 and BO 1</span> on the beneficial ownership portal. A Company Secretary must be appointed under <span class="faq-badge-term">Section 221</span>. We handle each step for you, from the first consultation to the certificate.</p>
                        </div>
                    </details>

                    <!-- FAQ Item 2 -->
                    <details>
                        <summary>
                            <div class="faq-summary-left">
                                <span class="faq-q-number">02</span>
                                <h3 class="faq-q-title">Do you offer tax consultation for companies and individuals?</h3>
                            </div>
                            <span class="faq-chevron" aria-hidden="true"><i class="fa fa-chevron-down"></i></span>
                        </summary>
                        <div class="faq-content">
                            <p>Yes. Tax consultation covers individual and company tax planning, VAT compliance, capital gains tax (CGT), income tax returns, self-assessment payments, IRD correspondence, and EPF and ETF.</p>
                        </div>
                    </details>

                    <!-- FAQ Item 3 -->
                    <details>
                        <summary>
                            <div class="faq-summary-left">
                                <span class="faq-q-number">03</span>
                                <h3 class="faq-q-title">What does your online bookkeeping service include?</h3>
                            </div>
                            <span class="faq-chevron" aria-hidden="true"><i class="fa fa-chevron-down"></i></span>
                        </summary>
                        <div class="faq-content">
                            <p>Our online bookkeeping service for Sri Lankan companies covers ledgers, bank and balance sheet reconciliations, payables and receivables, and records ready for your auditor and the IRD, on a fixed monthly scope agreed upfront.</p>
                        </div>
                    </details>

                    <!-- FAQ Item 4 -->
                    <details>
                        <summary>
                            <div class="faq-summary-left">
                                <span class="faq-q-number">04</span>
                                <h3 class="faq-q-title">What is beneficial ownership filing?</h3>
                            </div>
                            <span class="faq-chevron" aria-hidden="true"><i class="fa fa-chevron-down"></i></span>
                        </summary>
                        <div class="faq-content">
                            <p>Since 30 March 2026, companies must declare the people who ultimately own or control them on the Registrar's BO portal. New companies file BO 5 and BO 1 at incorporation. Existing companies file BO 7, and changes after share issues or transfers go on BO 2 or BO 3. Penalties for not complying are serious, and directors can be held personally liable.</p>
                        </div>
                    </details>

                    <!-- FAQ Item 5 -->
                    <details>
                        <summary>
                            <div class="faq-summary-left">
                                <span class="faq-q-number">05</span>
                                <h3 class="faq-q-title">What do I need for the registration consultation?</h3>
                            </div>
                            <span class="faq-chevron" aria-hidden="true"><i class="fa fa-chevron-down"></i></span>
                        </summary>
                        <div class="faq-content">
                            <p>Proposed company names, the directors and shareholders, the beneficial owners and the business activity. If you do not have these yet, book anyway and we will tell you what to prepare.</p>
                        </div>
                    </details>

                    <!-- FAQ Item 6 -->
                    <details>
                        <summary>
                            <div class="faq-summary-left">
                                <span class="faq-q-number">06</span>
                                <h3 class="faq-q-title">Does every company need a Company Secretary?</h3>
                            </div>
                            <span class="faq-chevron" aria-hidden="true"><i class="fa fa-chevron-down"></i></span>
                        </summary>
                        <div class="faq-content">
                            <p>Yes. Section 221 of the Companies Act No. 07 of 2007 requires one. Our team includes a qualified Company Secretary who can act in that role.</p>
                        </div>
                    </details>

                    <!-- FAQ Item 7 -->
                    <details>
                        <summary>
                            <div class="faq-summary-left">
                                <span class="faq-q-number">07</span>
                                <h3 class="faq-q-title">Can I book from outside Sri Lanka?</h3>
                            </div>
                            <span class="faq-chevron" aria-hidden="true"><i class="fa fa-chevron-down"></i></span>
                        </summary>
                        <div class="faq-content">
                            <p>Yes. Consultations run by video or phone, and the booking panel shows Sri Lanka time with your own time zone beside it.</p>
                        </div>
                    </details>

                    <!-- Bottom Assistance Card -->
                    <div class="faq-bottom-card">
                        <div class="faq-bottom-info">
                            <div class="faq-bottom-icon">
                                <i class="fa fa-calendar-check-o"></i>
                            </div>
                            <div class="faq-bottom-text">
                                <h4>Ready to start or have more questions?</h4>
                                <p>Reserve a private 45-minute consultation slot or message our consultant directly on WhatsApp.</p>
                            </div>
                        </div>
                        <div class="faq-bottom-actions">
                            <a href="#consultationBookingForm" class="faq-btn-book">
                                <i class="fa fa-calendar"></i> Book Consultation
                            </a>
                            <a href="https://wa.me/<?php echo esc_attr( universal_get_option( 'contact_whatsapp', '94774087869' ) ); ?>?text=Hello%20Universal%20Secretaries%2C%20I%20have%20a%20question%20before%20booking%20a%20consultation" target="_blank" rel="noopener noreferrer" class="faq-btn-whatsapp">
                                <i class="fa fa-whatsapp"></i> Chat on WhatsApp
                            </a>
                        </div>
                    </div>

                </div>
            </section>
            <!--// FAQ Area -->

        </main>
        <!-- //Page Content -->

<?php
get_footer();
