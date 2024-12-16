import React, { useState } from "react";
import HorizontalSplitIcon from '@mui/icons-material/HorizontalSplit';
function BottomNavabr() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Toggle the dropdown visibility
    const toggleDropdown = () => {
        setIsDropdownOpen(prevState => !prevState);
    };


    const courses = [
        { name: 'Java Full Stack', link: 'https://kvch.in/java-full-stack-course' },
        { name: 'Data Science', link: 'https://kvch.in/data-science-course' },
        { name: 'Python Full Stack', link: 'https://kvch.in/python-full-stack-course' },
        { name: 'MERN', link: 'https://kvch.in/mern-stack-course' },
        { name: 'Artificial Intelligence', link: 'https://kvch.in/artificial-intelligence-course' },
        { name: 'Data Analytics Course', link: 'https://kvch.in/data-analytics-course' }
    ];

    return (
        <section className="bottom_navabr_section">
            <div class="countryWiseCourse">
                <a href="#">
                    <img style={{ width: 'auto', height: '20px' }} loading="lazy" src="https://kvch.in/assets-new/img/flags/bhopal.webp" alt="flag" /> India
                    <i class="fa fa-angle-double-down"></i>
                </a>
                <div class="countryWiseCourseDropdown">
                    <ul>
                        <li><a href="https://kvch.in/dubai/" target="_blank">
                            <img loading="lazy" src="https://kvch.in/assets-new/img/flags/dubai.webp" alt="flag" /> Dubai
                        </a></li>
                        <li><a href="https://kvch.in/nigeria/" target="_blank">
                            <img loading="lazy" src="https://kvch.in/assets-new/img/flags/nigeria.webp" alt="flag" /> Nigeria
                        </a></li>
                        <li><a href="https://kvch.in/canada/" target="_blank">
                            <img loading="lazy" src="https://kvch.in/assets-new/img/flags/canada.webp" alt="flag" /> Canada
                        </a></li>
                        <li><a href="https://kvch.in/botswana/" target="_blank">
                            <img loading="lazy" src="https://kvch.in/assets-new/img/flags/botswana.svg" alt="flag" /> Botswana
                        </a></li>
                        <li><a href="https://kvch.in/ghana/" target="_blank">
                            <img loading="lazy" src="https://kvch.in/assets-new/img/flags/ghana.webp" alt="flag" /> Ghana
                        </a></li>
                        <li><a href="https://kvch.in/tanzania/" target="_blank">
                            <img loading="lazy" src="https://kvch.in/assets-new/img/flags/tanzania.webp" alt="flag" /> Tanzania
                        </a></li>
                    </ul>
                </div>
            </div>


            <div className="collapse navbar_collapse justify-content-end">
                <ul className="w-auto">
                    {courses.map(course => (
                        <li key={course.name} className="hidden-sm">
                            <a href={course.link}>{course.name}</a>
                        </li>
                    ))}

                    <li className="right_dropdown_menu right_side_m_menu">
                        <div onClick={toggleDropdown}>
                            <HorizontalSplitIcon />
                        </div>
                        {isDropdownOpen && (
                            <div class="right_dropdown_content">
                                <a class="drodwon_item" href="https://kvch.in/machine-learning-course">Machine Learning</a>
                                <a class="drodwon_item" href="https://kvch.in/best-ms-access-sql-training">SQL</a>
                                <a class="drodwon_item" href="https://kvch.in/software-testing-course">Software Testing Training</a>
                                <a class="drodwon_item" href="https://kvch.in/mis-course">MIS</a>
                                <a class="drodwon_item" href="https://kvch.in/api-testing-course">API Testing Training</a>
                                <a class="drodwon_item" href="https://kvch.in/6-months-industrial-training-full-stack-developer"> Full Stack Development</a>
                                <a class="drodwon_item" href="https://kvch.in/aws-devops-engineer-professional-training">AWS Devops Professional </a>
                                <a class="drodwon_item" href="https://kvch.in/aws-solution-architect-certification-training">AWS Solution Architect</a>
                                <a class="drodwon_item" href="https://kvch.in/campus-training-noida">Campus Training</a>
                                <a class="drodwon_item" href="https://kvch.in/delhi/industrial-training-delhi">Months Industrial Training</a>
                                <a class="drodwon_item" href="https://kvch.in/google-cloud-certification-training-courses">Google Cloud Platform </a>
                                <a class="drodwon_item" href="https://kvch.in/industrial-internship">Industrial Internship</a>
                                <a class="drodwon_item" href="https://kvch.in/iot-6-weeks-project-summer-training-noida">4/6 Weeks IoT Training</a>
                                <a class="drodwon_item" href="https://kvch.in/summer-training-noida">Summer Training</a>
                                <a class="drodwon_item" href="https://kvch.in/working-professionals">Working Professionals</a>
                            </div>
                        )}
                    </li>
                </ul>
            </div>
        </section>
    );
}

export default BottomNavabr;
