



import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CountdownOffer = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });



  const countriesWithCodes = [
    { code: '+91', name: 'IN' }, { code: '+971', name: 'AE' }, { code: '+1', name: 'US' },
    { code: '+20', name: 'EG' }, { code: '+212', name: 'MA' }, { code: '+213', name: 'DZ' },
    { code: '+216', name: 'TN' }, { code: '+218', name: 'LY' }, { code: '+220', name: 'GM' },
    { code: '+221', name: 'SN' }, { code: '+222', name: 'MR' }, { code: '+223', name: 'ML' },
    { code: '+224', name: 'GN' }, { code: '+225', name: 'CI' }, { code: '+226', name: 'BF' },
    { code: '+227', name: 'NE' }, { code: '+228', name: 'TG' }, { code: '+229', name: 'BJ' },
    { code: '+230', name: 'MU' }, { code: '+231', name: 'LR' }, { code: '+232', name: 'SL' },
    { code: '+233', name: 'GH' }, { code: '+234', name: 'NG' }, { code: '+235', name: 'TD' },
    { code: '+236', name: 'CF' }, { code: '+237', name: 'CM' }, { code: '+238', name: 'CV' },
    { code: '+239', name: 'ST' }, { code: '+240', name: 'GQ' }, { code: '+241', name: 'GA' },
    { code: '+242', name: 'CG' }, { code: '+243', name: 'CD' }, { code: '+244', name: 'AO' },
    { code: '+245', name: 'GW' }, { code: '+246', name: 'IO' }, { code: '+248', name: 'SC' },
    { code: '+249', name: 'SD' }, { code: '+250', name: 'RW' }, { code: '+251', name: 'ET' },
    { code: '+252', name: 'SO' }, { code: '+253', name: 'DJ' }, { code: '+254', name: 'KE' },
    { code: '+255', name: 'TZ' }, { code: '+256', name: 'UG' }, { code: '+257', name: 'BI' },
    { code: '+258', name: 'MZ' }, { code: '+260', name: 'ZM' }, { code: '+261', name: 'MG' },
    { code: '+262', name: 'RE/TF' }, { code: '+263', name: 'ZW' }, { code: '+264', name: 'NA' },
    { code: '+265', name: 'MW' }, { code: '+266', name: 'LS' }, { code: '+267', name: 'BW' },
    { code: '+268', name: 'SZ' }, { code: '+269', name: 'KM' }, { code: '+27', name: 'ZA' },
    { code: '+290', name: 'SH' }, { code: '+291', name: 'ER' }, { code: '+297', name: 'AW' },
    { code: '+298', name: 'FO' }, { code: '+299', name: 'GL' }, { code: '+30', name: 'GR' },
    { code: '+31', name: 'NL' }, { code: '+32', name: 'BE' }, { code: '+33', name: 'FR' },
    { code: '+34', name: 'ES' }, { code: '+36', name: 'HU' }, { code: '+39', name: 'IT' },
    { code: '+40', name: 'RO' }, { code: '+41', name: 'CH' }, { code: '+43', name: 'AT' },
    { code: '+44', name: 'GB' }, { code: '+45', name: 'DK' }, { code: '+46', name: 'SE' },
    { code: '+47', name: 'NO' }, { code: '+48', name: 'PL' }, { code: '+49', name: 'DE' },
    { code: '+51', name: 'PE' }, { code: '+52', name: 'MX' }, { code: '+53', name: 'CU' },
    { code: '+54', name: 'AR' }, { code: '+55', name: 'BR' }, { code: '+56', name: 'CL' },
    { code: '+57', name: 'CO' }, { code: '+58', name: 'VE' }, { code: '+60', name: 'MY' },
    { code: '+61', name: 'AU' }, { code: '+62', name: 'ID' }, { code: '+63', name: 'PH' },
    { code: '+64', name: 'NZ' }, { code: '+65', name: 'SG' }, { code: '+66', name: 'TH' },
    { code: '+81', name: 'JP' }, { code: '+82', name: 'KR' }, { code: '+84', name: 'VN' },
    { code: '+86', name: 'CN' }, { code: '+90', name: 'TR' }, { code: '+92', name: 'PK' },
    { code: '+93', name: 'AF' }, { code: '+94', name: 'LK' }, { code: '+95', name: 'MM' },
    { code: '+98', name: 'IR' }, { code: '+211', name: 'SS' }, { code: '+377', name: 'MC' },
    { code: '+378', name: 'SM' }, { code: '+380', name: 'UA' }, { code: '+381', name: 'RS' },
    { code: '+382', name: 'ME' }, { code: '+383', name: 'XK' }, { code: '+385', name: 'HR' },
    { code: '+386', name: 'SI' }, { code: '+387', name: 'BA' }, { code: '+389', name: 'MK' },
    { code: '+420', name: 'CZ' }, { code: '+421', name: 'SK' }, { code: '+423', name: 'LI' },
  ];

  const [isOfferVisible, setIsOfferVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCountryCode, setSelectedCountryCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [courseName, setCourseName] = useState('');
  const [selectMode, setSelectMode] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);  // State for loading button

  const getNextMidnight = () => {
    const now = new Date();
    const nextMidnight = new Date(now);
    nextMidnight.setDate(now.getDate() + 1);
    nextMidnight.setHours(0, 0, 0, 0);
    return nextMidnight.getTime();
  };

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const deadline = getNextMidnight();
      const distance = deadline - now;

      if (distance > 0) {
        setTimeLeft({
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    };

    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();

    return () => clearInterval(countdownInterval);
  }, []);

  const closeOffer = () => {
    setIsOfferVisible(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validation for mandatory fields with separate error messages
    if (!name) {
      toast.error(" Please provide your name.");
      setIsSubmitting(false);
      return;
    }
    if (!email) {
      toast.error("Please provide your email.");
      setIsSubmitting(false);
      return;
    }
    if (!selectedCountryCode) {
      toast.error("Please select your country code.");
      setIsSubmitting(false);
      return;
    }
    if (!phoneNumber) {
      toast.error(" Please provide your phone number.");
      setIsSubmitting(false);
      return;
    }
    if (!courseName) {
      toast.error("Please select your course.");
      setIsSubmitting(false);
      return;
    }
    if (!selectMode) {
      toast.error("Please select Mode.");
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(true); 

    const getFriendlyPageName = (url) => {
      const basePath = new URL(url).pathname.replace(/^\//, '').replace(/[-]/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
      const urlHash = new URL(url).hash.replace(/^#/, '');

      if (urlHash) {
        const formattedHashName = urlHash.replace(/[-]/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
        return formattedHashName || basePath || 'Home';
      }

      return basePath || 'Home';
    };

    const pageFriendlyName = getFriendlyPageName(window.location.href);

    const formData = {
      name: name,
      email: email,
      countryCode: selectedCountryCode,
      number: phoneNumber,
      courseName: courseName,
      selectMode: selectMode,
      query: message,
      pageName: pageFriendlyName,
    };

    fetch('https://kvch.in:859/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        toast.success("Form submitted successfully");

        setName('');
        setEmail('');
        setSelectedCountryCode('');
        setPhoneNumber('');
        setCourseName('');
        setSelectMode('');
        setMessage('');
        setIsSubmitting(false);

        setTimeout(closeModal, 2000);
      })
      .catch(error => {
        console.error('Error:', error);
        setIsSubmitting(false);
      });
  };

  if (!isOfferVisible) return null;

  return (
    <>
      <ToastContainer />
      <section className="top_navbar_offer_section">
        <div className="container">
          <div className="offer_div">
            <div className="offer_div_1st_content">
              Limited Time Offer - Flat 15% Off + 20% Cashback
            </div>
            <div className="navabr_vertical_line"> | </div>
            <div className="offer_div_timmer">
              <div className="offer_div_2nd_content">Offer Ending In</div>
              <ul className="countdown">
                <li>
                  <span className="digit">0</span>
                  <span className="text_ref">D</span>
                </li>
                <li>
                  <span className="digit">{timeLeft.hours}</span>
                  <span className="text_ref">H</span>
                </li>
                <li>
                  <span className="digit">{timeLeft.minutes}</span>
                  <span className="text_ref">M</span>
                </li>
                <li>
                  <span className="digit">{timeLeft.seconds}</span>
                  <span className="text_ref">S</span>
                </li>
              </ul>
              <div className="grab_offer" onClick={openModal}>
                Grab Offer
              </div>
              <div className="close_Offer">
                <button className="close_offer_btn" onClick={closeOffer}>
                  ✕
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div className="modal fade show" role="dialog" style={{ display: 'block', backgroundColor: '#000000ab' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal_form modal-content" style={{ padding: '0' }}>
              <div className="modal-header">
                <h4 className="modal-title">Quick Enquiry</h4>
                <button
                  type="button"
                  className="close"
                  onClick={closeModal}
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <input type="hidden" name="name_number_query" />
                  <input type="hidden" name="comingfrom" value="Enquiry from Home Page" />
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name*"
                      value={name}
                      onChange={(e) => setName(e.target.value)}

                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email*"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}

                    />
                  </div>
                  <div className="form-group d-flex">
                    <select className="countrycode" value={selectedCountryCode}
                      onChange={(e) => setSelectedCountryCode(e.target.value)}>
                      {countriesWithCodes.map((country, index) => (
                        <option key={index} value={country.code}>{country.country} ({country.code} {country.name})</option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      className="form-control"

                      placeholder="Number*"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}

                    />
                  </div>
                  <div className="form-group">
                    <select class="form-control" value={courseName}
                      onChange={(e) => setCourseName(e.target.value)}>
                      <option value="">Select a Course</option>
                      <option value="Java Full Stack Course">Java Full Stack Course</option>
                      <option value="Python Full Stack Course">Python Full Stack Course</option>
                      <option value="Mern Stack Course">Mern Stack Course</option>
                      <option value="Data Science Course">Data Science Course</option>
                      <option value="Machine Learning Course">Machine Learning Course </option>
                      <option value="Data Analytics Course">Data Analytics Course </option>
                      <option value="MIS Course">MIS Course </option>
                      <option value="Software Testing Course">Software Testing Course</option>
                      <option value="API Testing">API Testing </option>
                      <option value="Industrial Training">Industrial Training</option>
                      <option value="Industrial Training">Industrial Training</option>
                      <option value="AWS Certified DevOps Engineer Training">AWS Certified DevOps Engineer Training</option>
                      <option value="AWS Solution Architect Training Course">AWS Solution Architect Training Course </option>
                      <option value="Google Cloud Platform Training">Google Cloud Platform Training</option>
                      <option value="4/6 Weeks IoT Training">4/6 Weeks IoT Training</option>
                      <option value="Other Course">Other Course</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <select className="form-control" value={selectMode}
                      onChange={(e) => setSelectMode(e.target.value)}>
                      <option value="">Select a Mode</option>
                      <option value="Online Mode">Online Mode</option>
                      <option value="Offline Mode">Offline Mode</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <textarea

                      className="form-control"
                      rows="3"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Query"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="modal_btn w-100"
                    disabled={isSubmitting}  // Disable the button during submission
                  >
                    {isSubmitting ? 'Please Wait' : 'Submit'}  {/* Show "Processing..." when submitting */}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CountdownOffer;
