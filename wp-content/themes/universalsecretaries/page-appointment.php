<?php
/**
 * Template Name: Appointment Page
 *
 * @package Universal_Secretaries
 */

get_header();
?>

        <!-- Breadcrumb Area -->
        <div id="cr-breadcrumb-area" class="cr-breadcrumb-area section-padding--md">
            <div class="container">
                <div class="row">
                    <div class="col-xl-6 col-lg-7 col-md-8">
                        <div class="cr-breadcrumb">
                            <ul class="cr-breadcrumb__pagination">
                                <li><a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a></li>
                                <li>Appointment</li>
                            </ul>
                            <h1><?php the_title(); ?></h1>
                            <p>Schedule a private 45-minute consultation with our qualified Sri Lankan chartered secretaries and tax advisors.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--// Breadcrumb Area -->

        <!-- Page Content -->
        <main class="page-content">

            <!-- Appointment -->
            <div class="appointment bg--white section-padding--xlg">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-xl-8 col-lg-10">
                            <div class="pg-appintment">
                                <div class="pg-appintment__title text-center">
                                    <h2>MAKE AN APPOINTMENT</h2>
                                    <p>Fill out the form below or connect via WhatsApp for urgent ROC filing assistance.</p>
                                </div>
                                <div class="pg-appintment__box">
                                    <form action="#" method="POST" id="appointment-form">
                                        <div class="row">
                                            <div class="col-lg-6 col-md-6">
                                                <div class="single-input">
                                                    <input type="text" name="user-first-name" id="user-first-name" placeholder="First Name" required>
                                                </div>
                                            </div>
                                            <div class="col-lg-6 col-md-6">
                                                <div class="single-input">
                                                    <input type="text" name="user-last-name" id="user-last-name" placeholder="Last Name" required>
                                                </div>
                                            </div>
                                            <div class="col-lg-6 col-md-6">
                                                <div class="single-input">
                                                    <input type="email" name="user-email" id="user-email" placeholder="Email" required>
                                                </div>
                                            </div>
                                            <div class="col-lg-6 col-md-6">
                                                <div class="single-input">
                                                    <input type="text" name="user-phone" id="user-phone" placeholder="Phone" required>
                                                </div>
                                            </div>
                                            <div class="col-lg-6 col-md-6">
                                                <div class="single-input">
                                                    <select class="select2-another" name="user-select-advisor" id="user-select-advisor">
                                                        <option value="0">Select Advisor</option>
                                                        <option value="1">Sudarshana Prashad (Managing Director)</option>
                                                        <option value="2">Nishadi Jayasiri (Company Secretary)</option>
                                                        <option value="3">Buddhika Ekanayaka (Audit &amp; Reporting)</option>
                                                        <option value="4">Umesha Kuruwita (Tax &amp; Finance)</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-lg-6 col-md-6">
                                                <div class="single-input">
                                                    <input type="text" name="user-select-date" id="user-select-date" placeholder="Select Date" data-select="datepicker" required>
                                                </div>
                                            </div>
                                            <div class="col-lg-12">
                                                <div class="single-input">
                                                    <textarea cols="30" rows="5" name="message" placeholder="Details of corporate matters or questions"></textarea>
                                                </div>
                                            </div>
                                            <div class="col-lg-12">
                                                <div class="single-input button">
                                                    <button type="submit" class="cr-btn"><span>Submit Appointment</span></button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </main>
        <!-- //Page Content -->

<?php
get_footer();

