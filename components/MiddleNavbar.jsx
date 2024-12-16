import React, { useState } from 'react';

const MiddleNavbar = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);

  // Handle input change and search logic
  const handleSearchChange = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Fetch search results from the backend API if query is not empty
    if (query) {
      try {
        const response = await fetch(`http://localhost:5000/api/search?q=${query}`);
        const data = await response.json();
        setFilteredCourses(data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    } else {
      setFilteredCourses([]);
    }
  };

  // Toggle modal visibility
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <section className="middle_navbar_section d-none d-md-block d-sm-none">
      <div className="display_flex">
        {/* Logo Section */}
        <div className="navbar_logo_section">
          <a href="https://kvch.in">
            <img
              loading="lazy"
              src="https://kvch.in/assets-new/img/footer-logo.webp"
              alt="kvch logo"
              height="34"
              width="96"
            />
          </a>
        </div>

        {/* Search Section */}
        <div className="navbar_seacrh_section">
          <div
            className="navbar_seacrh_section_input"
            onClick={toggleModal}
          >
            Enter Course, Category or Keyword
          </div>
        </div>

        {/* Right Menu */}
        <ul className="right_menu">
          <li>
            <a href="https://kvch.in/corporate-training">Corporate Training</a>
          </li>

          <li>
            <a href="https://kvch.in/placement">Placement Showcase</a>
          </li>

          <li>
            <a href="https://kvch.in/blogs/">Blogs</a>
          </li>
          <li>
            <a href="https://kvch.in/payment-form">Quick Pay</a>
          </li>
        </ul>
      </div>

      {/* Search Modal */}
      {isModalVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="head_title_close container">
              <button
                type="button"
                className="close search_overlay_close"
                onClick={toggleModal}
                aria-label="Close"
              >
                ✕
              </button>
              <div className="search_input">
                <input
                  style={{ width: '100%' }}
                  className="form-control mr-sm-2 aa-input"
                  type="search"
                  id="inputKeyword"
                  placeholder="Search courses"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="searchResult row" id="suggesstion-box">
              {filteredCourses.length > 0 ? (
                <div id="hidedefaulcourse">
                  <div className="heading">
                    <h3>Search Results</h3>
                  </div>
                  <div className="row">
                    {filteredCourses.map((course, index) => (
                      <div className="col-sm-6 col-lg-4" key={index}>
                        <div className="popular-courses">
                          <h5>{course.name}</h5>
                          <p>{course.learners} Satisfied Learners</p>
                          <a href={course.link} className="knowmore">
                            KNOW MORE <i className="icon-ac-right-arrow-1"></i>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div>No results found</div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MiddleNavbar;
