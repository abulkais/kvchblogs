import React from 'react';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import PhoneCallbackIcon from '@mui/icons-material/PhoneCallback';

const Footer = () => {
    return (
        <>
            <footer className="page-footer ">
                <div className="container">
                    <div className="footer-top">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-3 col-lg-3 col-md-6">
                                    <div className="footer-column">
                                        <div className="footer-logo">
                                            <a href="https://kvch.in">
                                                <img
                                                    loading="lazy"
                                                    data-src="https://kvch.in/assets-new/img/footer-logo.webp"
                                                    src="https://kvch.in/assets-new/img/footer-logo.webp"
                                                    height={70}
                                                    width={199}
                                                    alt="kvch"
                                                />
                                            </a>
                                        </div>
                                        <p>
                                            <AttachEmailIcon />
                                            <a href="mailto:training@kvch.in"> training@kvch.in</a>
                                        </p>
                                        <p>

                                            <PhoneCallbackIcon />
                                            <a href="tel:+917701928452"> +91 7701-928-452</a>
                                        </p>
                                        <div className="sponsor-images">
                                            <img
                                                loading="lazy"
                                                data-src="https://kvch.in/assets-new/img/sponsor-images-1.webp"
                                                src="https://kvch.in/assets-new/img/sponsor-images-1.webp"
                                                height={64}
                                                width={128}
                                                alt="DMCA"
                                            />{" "}
                                            <img
                                                loading="lazy"
                                                data-src="https://kvch.in/assets-new/img/sponsor-images-2.webp"
                                                src="https://kvch.in/assets-new/img/sponsor-images-2.webp"
                                                height={46}
                                                width={130}
                                                alt="copyspace"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-3 col-md-6">
                                    <div className="footer-column quick-link">
                                        <h4>Company</h4>
                                        <ul>
                                            <li>
                                                <a href="https://kvch.in/">Training Solutions</a>
                                            </li>
                                            <li>
                                                <a href="https://kvch.in/corporate-training">For Your Organization</a>
                                            </li>
                                            <li>
                                                <a href="https://kvch.in/about">About Us</a>
                                            </li>
                                            <li>
                                                <a href="https://kvch.in/contact">Contact Us</a>
                                            </li>
                                            <li>
                                                <a href="https://kvch.in/blogs">Blogs</a>
                                            </li>
                                            <li className="d-lg-none d-md-block ">
                                                <a href="https://kvch.in/payment-form">Quick Pay</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-3 col-md-6">
                                    <div className="footer-column">
                                        <h4>Services</h4>
                                        <ul>
                                            <li>
                                                <a href="https://kvch.in/industrial-internship">Industrial Internship</a>
                                            </li>
                                            <li>
                                                <a href="https://kvch.in/working-professionals">Training for Professionals</a>
                                            </li>
                                            <li>
                                                <a href="https://kvch.in/corporate-training">Corporate Training</a>
                                            </li>
                                            <li>
                                                <a href="https://kvch.in/in-house-training">In-House Training</a>
                                            </li>
                                            <li>
                                                <a href="https://kvch.in/fly-me-a-trainer">Fly Me a Trainer</a>
                                            </li>
                                            <li>
                                                <a href="https://kvch.in/study-abroad">Study Abroad</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-3 col-md-6">
                                    <div className="footer-column">
                                        <h4>Get the latest Updates</h4>
                                        <p>
                                            Get the best learning and development news, research and resources
                                            direct to your inbox.
                                        </p>
                                      
                                        <div className="payment">
                                            <p>Secure Payment By</p>
                                            <a href="quick-pay">
                                                <img
                                                    loading="lazy"
                                                    data-src="https://kvch.in/assets-new/img/payment.webp"
                                                    src="https://kvch.in/assets-new/img/payment.webp"
                                                    height={21}
                                                    width={263}
                                                    alt="payment"
                                                />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="footer-text">
                                <p>KVCH® is a registered trademark of the KV Computer Home Pvt. Ltd.</p>
                                <p>
                                    KVCH Pvt. Ltd. is rated 4.2 stars by google.com based on 1,121
                                    reviews.
                                </p>
                            </div>
                            <div className="global-presence">
                                <h4>Global presence</h4>
                                <ul className="clearfix">
                                    <li>
                                        <a href="https://kvch.in/nigeria/">
                                            <img
                                                loading="lazy"
                                                data-src="https://kvch.in/assets-new/img/nigeria.webp"
                                                src="https://kvch.in/assets-new/img/nigeria.webp"
                                                alt="kvch"
                                                height={50}
                                                width={50}
                                            />
                                            <span>Nigeria</span>
                                        </a>
                                    </li>
                                    <li>
                                        <span>
                                            <img
                                                loading="lazy"
                                                data-src="https://kvch.in/assets-new/img/kenya.webp"
                                                src="https://kvch.in/assets-new/img/kenya.webp"
                                                alt="kvch"
                                                height={50}
                                                width={50}
                                            />
                                            <span>Kenya</span>
                                        </span>
                                    </li>
                                    <li>
                                        <span>
                                            <img
                                                loading="lazy"
                                                data-src="https://kvch.in/assets-new/img/dubai-flag.webp"
                                                src="https://kvch.in/assets-new/img/dubai-flag.webp"
                                                alt="kvch"
                                                height={50}
                                                width={50}
                                            />
                                            <span>Dubai</span>
                                        </span>
                                    </li>
                                    <li>
                                        <span>
                                            <img
                                                loading="lazy"
                                                data-src="https://kvch.in/assets-new/img/botswana-flag.webp"
                                                src="https://kvch.in/assets-new/img/botswana-flag.webp"
                                                alt="kvch"
                                                height={50}
                                                width={50}
                                            />
                                            <span>Botswana</span>
                                        </span>
                                    </li>
                                    <li>
                                        <span>
                                            <img
                                                loading="lazy"
                                                data-src="https://kvch.in/assets-new/img/tanzania-flag.webp"
                                                src="https://kvch.in/assets-new/img/tanzania-flag.webp"
                                                alt="kvch"
                                                height={50}
                                                width={50}
                                            />
                                            <span>Tanzania</span>
                                        </span>
                                    </li>
                                    <li>
                                        <span>
                                            <img
                                                loading="lazy"
                                                data-src="https://kvch.in/assets-new/img/rwanda.webp"
                                                src="https://kvch.in/assets-new/img/rwanda.webp"
                                                alt="kvch"
                                                height={50}
                                                width={50}
                                            />
                                            <span>Rwanda</span>
                                        </span>
                                    </li>
                                    <li>
                                        <span>
                                            <img
                                                loading="lazy"
                                                data-src="https://kvch.in/assets-new/img/Brazil.webp"
                                                src="https://kvch.in/assets-new/img/Brazil.webp"
                                                alt="kvch"
                                                height={50}
                                                width={50}
                                            />
                                            <span>Brazil</span>
                                        </span>
                                    </li>
                                    <li>
                                        <span>
                                            <img
                                                loading="lazy"
                                                data-src="https://kvch.in/assets-new/img/argentina.webp"
                                                src="https://kvch.in/assets-new/img/argentina.webp"
                                                alt="kvch"
                                                height={50}
                                                width={50}
                                            />
                                            <span>Argentina</span>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <hr style={{ borderTop: '1px solid rgba(211, 208, 255, .26)' }} />
                    <div class="row justify-content-between mt-4">
                        <div class="col-lg-4 text-white">
                            <p class="my-0">Copyright © 2024  <a class="text-white" href="https://kvch.in/">KVCH</a> |  All Rights Reserved</p>
                        </div>
                        <div class="col-lg-4 text-white">
                            <p class="mr-0 text-end">
                                <a href="https://kvch.in/terms-condition" class="text-white">Term &amp; Condition</a> • <a href="https://kvch.in/privacy-policy" class="text-white">Privacy Policy</a></p>
                        </div>
                        <div class="col-lg-4 text-white ">
                            <div class="foot_social_network ">
                                <a href="https://www.facebook.com/KVCHGLOBAL/" target="_blank"><img loading="lazy" data-src="https://sisgain.ae/assets/images/home/at_facebook.svg" src="https://sisgain.ae/assets/images/home/at_facebook.svg" width="30" height="30" alt="Facebook Icon" /></a>
                                <a href="https://x.com/kvchnoida" target="_blank"><img loading="lazy" data-src="https://sisgain.ae/assets/images/home/at_twitter.svg" src="https://sisgain.ae/assets/images/home/at_twitter.svg" width="30" height="30" alt="Twitter Icon" /></a>
                                <a href="https://www.linkedin.com/company/kvchglobal/" target="_blank"><img loading="lazy" data-src="https://sisgain.ae/assets/images/home/at_linkedin.svg" src="https://sisgain.ae/assets/images/home/at_linkedin.svg" width="30" height="30" alt="LinkedIn Icon" /></a>
                                <a href="https://www.instagram.com/kvchacademy/" target="_blank"><img loading="lazy" data-src="https://sisgain.ae/assets/images/home/at_instagram.svg" src="https://sisgain.ae/assets/images/home/at_instagram.svg" width="30" height="30" alt="Instagram Icon" /></a>
                                <a href="https://www.youtube.com/@KVCHGLOBAL" target="_blank"><img loading="lazy" data-src="https://sisgain.ae/assets/images/home/at_youtube.svg" src="https://sisgain.ae/assets/images/home/at_youtube.svg" width="30" height="30" alt="YouTube Icon" /></a></div>
                        </div>
                    </div>
                </div>
            </footer>

        </>
    )
}

export default Footer;